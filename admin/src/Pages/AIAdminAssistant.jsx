import { useState, useRef } from "react";
import { backendUrl } from "../App";

const PEXELS_API_KEY = "wepMbzG4bEAcIzfdhFd44YuilJPsAEF62tTWoBYQh64fz0E3igZEPHmq";

// 🔑 Gemini API config
const GEMINI_API_KEY = "AIzaSyDYzGjWlYnRkaa-GmyoaREEl_AxVElOHMM";
const GEMINI_MODEL = "gemini-2.5-flash";

const systemPrompt = `You are an AI product generator for an Indian ecommerce clothing store.
Given a product description, return ONLY valid JSON (no markdown, no explanation) with these exact fields:
{
  "name": "short attractive product title max 6 words",
  "description": "exactly 100-140 word high quality product description for Indian ecommerce",
  "price": number in INR realistic for Indian market (no quotes),
  "category": "Men" or "Women" or "Kids",
  "subcategory": "Topwear" or "Bottomwear" or "Winterwear",
  "bestseller": true or false (boolean),
  "sizes": array subset of ["S","M","L","XL","XXL"] that makes sense for the product,
  "image_query": "concise 4-6 word pexels image search query for realistic product photo"
}
Return ONLY the JSON object. No backticks. No extra text. No explanation.`;

const categoryColors = {
  Men: { bg: "#E8F0FF", text: "#2952CC" },
  Women: { bg: "#FDE8F5", text: "#A0277A" },
  Kids: { bg: "#E8FAE8", text: "#1E7A1E" },
};

const subcategoryIcons = {
  Topwear: "👕",
  Bottomwear: "👖",
  Winterwear: "🧥",
};

export default function AIAdminAssistant() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [status, setStatus] = useState({ msg: "", type: "" });
  const [step, setStep] = useState("input"); // input | preview | done
  const [fetchingImages, setFetchingImages] = useState(false);
  const token = localStorage.getItem("token") || "";
  const promptRef = useRef();

  const setMsg = (msg, type = "info") => setStatus({ msg, type });

  async function generate() {
    if (!prompt.trim()) {
      setMsg("Please describe a product first.", "error");
      promptRef.current?.focus();
      return;
    }
    setLoading(true);
    setStep("input");
    setProduct(null);
    setImages([]);
    setMsg("AI is generating product details...", "info");

    try {
      // ✅ Gemini API call
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await res.json();

      // ✅ Gemini response parsing
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Invalid AI response");
      const parsed = JSON.parse(jsonMatch[0]);

      setProduct(parsed);
      setSelectedSizes(parsed.sizes || []);
      setStep("preview");
      setMsg("Product generated! Review and add to store.", "success");
      await fetchImagesFor(parsed.image_query);
    } catch (e) {
      setMsg("Generation failed: " + e.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function fetchImagesFor(query) {
    if (!query) return;
    setFetchingImages(true);
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=4&orientation=portrait`,
        { headers: { Authorization: PEXELS_API_KEY } }
      );
      const data = await res.json();
      if (data.photos?.length) {
        setImages(data.photos.map((p) => p.src.medium));
      } else {
        setImages([]);
        setMsg("No images found for query. Try editing the image query.", "info");
      }
    } catch {
      setImages([]);
    } finally {
      setFetchingImages(false);
    }
  }

  function toggleSize(s) {
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function submitProduct() {
    if (!product) return;
    if (selectedSizes.length === 0) {
      setMsg("Please select at least one size.", "error");
      return;
    }
    setSubmitting(true);
    setMsg("Adding product to store...", "info");

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("subCategory", product.subcategory);
      formData.append("bestseller", product.bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(selectedSizes));

      for (let i = 0; i < Math.min(images.length, 4); i++) {
        try {
          const imgRes = await fetch(images[i]);
          const blob = await imgRes.blob();
          formData.append(`image${i + 1}`, blob, `image${i + 1}.jpg`);
        } catch {}
      }

      const res = await fetch(`${backendUrl}/api/product/add`, {
        method: "POST",
        headers: { token },
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setMsg("Product added successfully!", "success");
        setStep("done");
      } else {
        setMsg(result.message || "Failed to add product.", "error");
      }
    } catch (e) {
      setMsg("Error: " + e.message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setPrompt("");
    setProduct(null);
    setImages([]);
    setSelectedSizes([]);
    setStep("input");
    setStatus({ msg: "", type: "" });
  }

  const catStyle = product ? categoryColors[product.category] || {} : {};

  return (
    <div style={styles.root}>
      {/* ── Header ── */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoMark}>✦</div>
          <div>
            <div style={styles.headerTitle}>AI Product Assistant</div>
            <div style={styles.headerSub}>Describe → Generate → Publish</div>
          </div>
        </div>
        {step !== "input" && (
          <button style={styles.resetBtn} onClick={reset}>
            + New Product
          </button>
        )}
      </div>

      {/* ── Input area ── */}
      <div style={styles.section}>
        <label style={styles.label}>Product description</label>
        <div style={styles.inputRow}>
          <input
            ref={promptRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && generate()}
            placeholder='e.g. "Slim fit navy blue chinos for men, office wear"'
            style={styles.input}
            disabled={loading}
          />
          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            style={{ ...styles.genBtn, opacity: loading || !prompt.trim() ? 0.5 : 1 }}
          >
            {loading ? <Spinner /> : "Generate ✦"}
          </button>
        </div>

        {/* Status bar */}
        {status.msg && (
          <div
            style={{
              ...styles.statusBar,
              background:
                status.type === "error"
                  ? "#FFF0EE"
                  : status.type === "success"
                  ? "#EEFAF3"
                  : "#F0F4FF",
              color:
                status.type === "error"
                  ? "#C0392B"
                  : status.type === "success"
                  ? "#1A7A47"
                  : "#2952CC",
              borderColor:
                status.type === "error"
                  ? "#F5C6C0"
                  : status.type === "success"
                  ? "#A8E0C0"
                  : "#C0CEFF",
            }}
          >
            {status.type === "error" ? "✕ " : status.type === "success" ? "✓ " : "◎ "}
            {status.msg}
          </div>
        )}
      </div>

      {/* ── Done state ── */}
      {step === "done" && (
        <div style={styles.doneCard}>
          <div style={styles.doneIcon}>✓</div>
          <div style={styles.doneTitle}>Product live on your store!</div>
          <div style={styles.doneSub}>
            <strong>{product?.name}</strong> has been added to{" "}
            {product?.category} → {product?.subcategory}
          </div>
          <button style={styles.genBtn} onClick={reset}>
            Add another product
          </button>
        </div>
      )}

      {/* ── Preview card ── */}
      {step === "preview" && product && (
        <div style={styles.previewWrap}>
          {/* Left: images */}
          <div style={styles.imagesCol}>
            <div style={styles.label}>Product images</div>
            {fetchingImages ? (
              <div style={styles.imgLoadBox}>
                <Spinner /> Fetching images…
              </div>
            ) : images.length > 0 ? (
              <div style={styles.imgGrid}>
                {images.map((src, i) => (
                  <img key={i} src={src} alt="" style={styles.imgThumb} />
                ))}
              </div>
            ) : (
              <div style={styles.imgEmpty}>No images fetched</div>
            )}

            <div style={{ marginTop: 12 }}>
              <div style={styles.label}>Image search query</div>
              <div style={styles.queryRow}>
                <input
                  defaultValue={product.image_query}
                  id="imgquery"
                  style={{ ...styles.input, fontSize: 12 }}
                />
                <button
                  style={{ ...styles.smallBtn }}
                  onClick={() =>
                    fetchImagesFor(document.getElementById("imgquery").value)
                  }
                >
                  Refetch
                </button>
              </div>
            </div>
          </div>

          {/* Right: fields */}
          <div style={styles.fieldsCol}>
            {/* Name */}
            <Field label="Product name">
              <input
                defaultValue={product.name}
                style={styles.fieldInput}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </Field>

            {/* Category + subcat badges */}
            <div style={styles.badgeRow}>
              <span
                style={{
                  ...styles.badge,
                  background: catStyle.bg,
                  color: catStyle.text,
                }}
              >
                {product.category}
              </span>
              <span style={{ ...styles.badge, background: "#F5F0FF", color: "#6B3FA0" }}>
                {subcategoryIcons[product.subcategory]} {product.subcategory}
              </span>
              {product.bestseller && (
                <span style={{ ...styles.badge, background: "#FFF8E0", color: "#B8860B" }}>
                  ★ Bestseller
                </span>
              )}
            </div>

            {/* Category / Subcategory selects */}
            <div style={styles.twoCol}>
              <Field label="Category">
                <select
                  value={product.category}
                  style={styles.fieldInput}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                >
                  {["Men", "Women", "Kids"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Sub-category">
                <select
                  value={product.subcategory}
                  style={styles.fieldInput}
                  onChange={(e) => setProduct({ ...product, subcategory: e.target.value })}
                >
                  {["Topwear", "Bottomwear", "Winterwear"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Price */}
            <Field label="Price (₹)">
              <input
                type="number"
                value={product.price}
                style={{ ...styles.fieldInput, maxWidth: 140 }}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
              />
            </Field>

            {/* Sizes */}
            <Field label="Available sizes">
              <div style={styles.sizesRow}>
                {["S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    style={{
                      ...styles.sizePill,
                      background: selectedSizes.includes(s) ? "#2952CC" : "#F0F2FF",
                      color: selectedSizes.includes(s) ? "#fff" : "#2952CC",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            {/* Bestseller toggle */}
            <Field label="Bestseller">
              <label style={styles.checkRow}>
                <input
                  type="checkbox"
                  checked={product.bestseller}
                  onChange={(e) =>
                    setProduct({ ...product, bestseller: e.target.checked })
                  }
                  style={{ width: 15, height: 15, cursor: "pointer" }}
                />
                <span style={{ fontSize: 13, color: "#444" }}>Mark as bestseller</span>
              </label>
            </Field>

            {/* Description */}
            <Field label="Description">
              <textarea
                value={product.description}
                rows={5}
                style={{ ...styles.fieldInput, resize: "vertical" }}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Field>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <Field label="Tags">
                <div style={styles.tagsRow}>
                  {product.tags.map((t, i) => (
                    <span key={i} style={styles.tag}>
                      #{t}
                    </span>
                  ))}
                </div>
              </Field>
            )}

            {/* Actions */}
            <div style={styles.actionRow}>
              <button
                onClick={generate}
                disabled={loading}
                style={{ ...styles.smallBtn, opacity: loading ? 0.5 : 1 }}
              >
                {loading ? "Regenerating…" : "↺ Regenerate"}
              </button>
              <button
                onClick={submitProduct}
                disabled={submitting}
                style={{
                  ...styles.submitBtn,
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                {submitting ? <><Spinner /> Adding…</> : "✓ Add to store"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Suggestions ── */}
      {step === "input" && !loading && (
        <div style={styles.suggestions}>
          <div style={styles.label}>Try these examples</div>
          <div style={styles.sugRow}>
            {[
              "Floral maxi dress for women summer collection",
              "Slim fit navy chinos for men office wear",
              "Kids dinosaur print hoodie ages 5-10",
              "Women white linen top casual wear",
            ].map((s) => (
              <button
                key={s}
                style={styles.sugBtn}
                onClick={() => {
                  setPrompt(s);
                  setTimeout(() => generate(), 100);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 14,
        height: 14,
        border: "2px solid currentColor",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        marginRight: 6,
        verticalAlign: "middle",
      }}
    />
  );
}

const styles = {
  root: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#FAFAFA",
    minHeight: "100vh",
    padding: "0 0 60px",
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid #EDEEF2",
    padding: "18px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 14 },
  logoMark: {
    width: 38,
    height: 38,
    background: "#1A1A2E",
    color: "#E8C97A",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 700,
  },
  headerTitle: { fontSize: 16, fontWeight: 600, color: "#1A1A2E" },
  headerSub: { fontSize: 12, color: "#888", marginTop: 1 },
  resetBtn: {
    padding: "8px 16px",
    background: "#1A1A2E",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 500,
  },
  section: { padding: "28px 32px 0" },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 6,
    display: "block",
  },
  inputRow: { display: "flex", gap: 10, marginTop: 6 },
  input: {
    flex: 1,
    padding: "11px 14px",
    border: "1.5px solid #E5E7EB",
    borderRadius: 10,
    fontSize: 14,
    background: "#fff",
    color: "#1A1A2E",
    outline: "none",
    fontFamily: "inherit",
  },
  genBtn: {
    padding: "11px 22px",
    background: "#1A1A2E",
    color: "#E8C97A",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 4,
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  },
  statusBar: {
    marginTop: 12,
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    border: "1px solid",
    display: "inline-block",
  },
  previewWrap: {
    display: "flex",
    gap: 24,
    padding: "28px 32px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  imagesCol: {
    width: 220,
    flexShrink: 0,
  },
  imgGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    marginTop: 8,
  },
  imgThumb: {
    width: "100%",
    aspectRatio: "3/4",
    objectFit: "cover",
    borderRadius: 8,
    border: "1px solid #EDEEF2",
  },
  imgLoadBox: {
    height: 160,
    background: "#F5F6FA",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    color: "#888",
    gap: 6,
    marginTop: 8,
  },
  imgEmpty: {
    height: 100,
    background: "#F5F6FA",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    color: "#aaa",
    marginTop: 8,
  },
  queryRow: { display: "flex", gap: 6, marginTop: 4 },
  smallBtn: {
    padding: "8px 14px",
    background: "#fff",
    border: "1.5px solid #E5E7EB",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    color: "#1A1A2E",
    fontFamily: "inherit",
  },
  fieldsCol: {
    flex: 1,
    minWidth: 300,
    background: "#fff",
    borderRadius: 14,
    border: "1px solid #EDEEF2",
    padding: "20px 22px",
  },
  fieldInput: {
    padding: "9px 12px",
    border: "1.5px solid #E5E7EB",
    borderRadius: 8,
    fontSize: 13,
    background: "#FAFAFA",
    color: "#1A1A2E",
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
  },
  badgeRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 },
  badge: {
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  sizesRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  sizePill: {
    padding: "5px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  checkRow: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" },
  tagsRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  tag: {
    padding: "3px 10px",
    background: "#F5F6FA",
    color: "#555",
    borderRadius: 20,
    fontSize: 11,
    border: "1px solid #EDEEF2",
  },
  actionRow: {
    display: "flex",
    gap: 10,
    marginTop: 18,
    paddingTop: 16,
    borderTop: "1px solid #EDEEF2",
  },
  submitBtn: {
    padding: "10px 22px",
    background: "#1A7A47",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontFamily: "inherit",
  },
  doneCard: {
    margin: "32px auto",
    maxWidth: 420,
    background: "#fff",
    border: "1px solid #EDEEF2",
    borderRadius: 16,
    padding: "36px 32px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  doneIcon: {
    width: 56,
    height: 56,
    background: "#EEFAF3",
    color: "#1A7A47",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 700,
  },
  doneTitle: { fontSize: 18, fontWeight: 700, color: "#1A1A2E" },
  doneSub: { fontSize: 14, color: "#666", lineHeight: 1.5 },
  suggestions: { padding: "28px 32px 0" },
  sugRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 },
  sugBtn: {
    padding: "8px 14px",
    background: "#fff",
    border: "1.5px solid #E5E7EB",
    borderRadius: 20,
    fontSize: 12,
    color: "#444",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  },
};