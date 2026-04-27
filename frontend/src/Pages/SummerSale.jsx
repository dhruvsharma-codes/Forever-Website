// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Title from "../Components/Title";

// // Categories that get 10% off
// const SALE_CATEGORIES = ["Bottomwear","Topwear"];
// const DISCOUNT = 0.1;

// // Discounted Item Card — shows original + discounted price
// const SaleItem = ({ id, image, name, originalPrice, salePrice }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ y: -5 }}
//     >
//       <Link
//         to={`/product/${id}`}
//         style={{ textDecoration: "none", display: "block" }}
//       >
//         <motion.div
//           style={{
//             background: "#F7EFE6",
//             border: "1.5px solid #EDD8C4",
//             borderRadius: 18,
//             overflow: "hidden",
//             boxShadow: "0 2px 10px rgba(61,35,24,0.07)",
//           }}
//           whileHover={{
//             borderColor: "#C96A42",
//             boxShadow: "0 14px 36px rgba(61,35,24,0.16)",
//           }}
//           transition={{ duration: 0.22 }}
//         >
//           {/* Image */}
//           <div
//             style={{
//               overflow: "hidden",
//               background: "#EDD8C4",
//               aspectRatio: "1/1.1",
//               position: "relative",
//             }}
//           >
//             <motion.img
//               src={image[0]}
//               alt={name}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 display: "block",
//               }}
//               whileHover={{ scale: 1.08 }}
//               transition={{ duration: 0.45, ease: "easeOut" }}
//             />
//             {/* Sale badge */}
//             <span
//               style={{
//                 position: "absolute",
//                 top: 10,
//                 left: 10,
//                 background: "#C96A42",
//                 color: "#F7EFE6",
//                 fontSize: "0.62rem",
//                 letterSpacing: "0.08em",
//                 fontWeight: 700,
//                 padding: "3px 10px",
//                 borderRadius: 60,
//                 textTransform: "uppercase",
//               }}
//             >
//               10% OFF
//             </span>
//           </div>

//           {/* Info */}
//           <div style={{ padding: "12px 14px 15px" }}>
//             <p
//               style={{
//                 color: "#7A4A38",
//                 fontSize: "0.82rem",
//                 fontWeight: 500,
//                 margin: "0 0 6px",
//                 lineHeight: 1.4,
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {name}
//             </p>
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <span
//                 style={{
//                   color: "#C96A42",
//                   fontSize: "0.88rem",
//                   fontWeight: 700,
//                 }}
//               >
//                 {currency}
//                 {salePrice.toFixed(0)}
//               </span>
//               <span
//                 style={{
//                   color: "#98A98E",
//                   fontSize: "0.75rem",
//                   textDecoration: "line-through",
//                 }}
//               >
//                 {currency}
//                 {originalPrice}
//               </span>
//             </div>
//           </div>
//         </motion.div>
//       </Link>
//     </motion.div>
//   );
// };

// const SummerSale = () => {
//   const { products } = useContext(ShopContext);
//   const [filtered, setFiltered] = useState([]);
//   const [activeSubCat, setActiveSubCat] = useState("All");
//   const [sortType, setSortType] = useState("relevant");

//   // Filter: only subCategory in SALE_CATEGORIES
//   useEffect(() => {
//     if (products.length === 0) return;
//     let sale = products.filter((p) => SALE_CATEGORIES.includes(p.subCategory));

//     if (activeSubCat !== "All") {
//       sale = sale.filter((p) => p.subCategory === activeSubCat);
//     }

//     switch (sortType) {
//       case "low-high":
//         sale = [...sale].sort((a, b) => a.price - b.price);
//         break;
//       case "high-low":
//         sale = [...sale].sort((a, b) => b.price - a.price);
//         break;
//       default:
//         break;
//     }

//     setFiltered(sale);
//   }, [products, activeSubCat, sortType]);

//   const getSalePrice = (price) => price - price * DISCOUNT;

//   return (
//     <>
//       <style>{`
//                 .sale-page { min-height: 80vh; background: #F0E8DF; }
//                 .sale-hero {
//                     background: linear-gradient(135deg, #3D2318 0%, #7A4A38 50%, #C96A42 100%);
//                     padding: 3rem 2rem 2.5rem;
//                     text-align: center;
//                     position: relative;
//                     overflow: hidden;
//                 }
//                 .sale-hero::before { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(247,239,230,0.06); pointer-events: none; }
//                 .sale-hero::after { content: ''; position: absolute; bottom: -40px; left: -40px; width: 150px; height: 150px; border-radius: 50%; background: rgba(152,169,142,0.1); pointer-events: none; }
//                 .sale-body { padding: 2rem; max-width: 1200px; margin: 0 auto; }
//                 .sale-filter-btn { padding: 8px 18px; border-radius: 50px; border: 1.5px solid #EDD8C4; background: #F7EFE6; color: #7A4A38; font-size: 0.78rem; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; }
//                 .sale-filter-btn.active { background: #C96A42; color: #F7EFE6; border-color: #C96A42; }
//                 .sale-filter-btn:hover:not(.active) { border-color: #C96A42; color: #C96A42; }
//                 .sale-sort { appearance: none; background: #F7EFE6; border: 1.5px solid #EDD8C4; border-radius: 50px; padding: 8px 32px 8px 14px; font-size: 0.78rem; color: #7A4A38; font-weight: 600; cursor: pointer; outline: none; font-family: inherit; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C96A42' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
//                 .sale-sort:focus { border-color: #C96A42; }
//                 .sale-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.25rem; margin-top: 1.5rem; }
//             `}</style>

//       <div className="sale-page">
//         {/* Hero */}
//         <div className="sale-hero">
//           <div style={{ position: "relative", zIndex: 1 }}>
//             <motion.span
//               style={{
//                 display: "inline-block",
//                 background: "rgba(247,239,230,0.15)",
//                 border: "1px solid rgba(247,239,230,0.25)",
//                 borderRadius: 60,
//                 padding: "4px 16px",
//                 fontSize: "0.68rem",
//                 fontWeight: 700,
//                 letterSpacing: "0.18em",
//                 color: "#EDD8C4",
//                 textTransform: "uppercase",
//                 marginBottom: 12,
//               }}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               ☀️ Limited Time
//             </motion.span>

//             <motion.h1
//               style={{
//                 fontFamily: "'Georgia',serif",
//                 fontSize: "clamp(1.8rem,5vw,2.8rem)",
//                 color: "#F7EFE6",
//                 margin: "0 0 8px",
//                 lineHeight: 1.2,
//               }}
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.16 }}
//             >
//               Summer Sale — 10% Off
//             </motion.h1>

//             <motion.p
//               style={{
//                 color: "rgba(247,239,230,0.72)",
//                 fontSize: "0.9rem",
//                 margin: "0 0 20px",
//                 maxWidth: 480,
//                 marginLeft: "auto",
//                 marginRight: "auto",
//                 lineHeight: 1.6,
//               }}
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.24 }}
//             >
//               Flat 10% off on all Bottomwear &amp; Winterwear. Discount applied
//               automatically at checkout.
//             </motion.p>

//             {/* Stats */}
//             <motion.div
//               style={{
//                 display: "inline-flex",
//                 gap: 24,
//                 background: "rgba(247,239,230,0.12)",
//                 border: "1px solid rgba(247,239,230,0.2)",
//                 borderRadius: 12,
//                 padding: "10px 24px",
//               }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.32 }}
//             >
//               <div style={{ textAlign: "center" }}>
//                 <p
//                   style={{
//                     fontSize: "1.2rem",
//                     fontWeight: 800,
//                     color: "#F7EFE6",
//                     margin: 0,
//                   }}
//                 >
//                   {filtered.length}
//                 </p>
//                 <p
//                   style={{
//                     fontSize: "0.65rem",
//                     color: "rgba(247,239,230,0.65)",
//                     margin: 0,
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Products
//                 </p>
//               </div>
//               <div style={{ width: 1, background: "rgba(247,239,230,0.2)" }} />
//               <div style={{ textAlign: "center" }}>
//                 <p
//                   style={{
//                     fontSize: "1.2rem",
//                     fontWeight: 800,
//                     color: "#F7EFE6",
//                     margin: 0,
//                   }}
//                 >
//                   10%
//                 </p>
//                 <p
//                   style={{
//                     fontSize: "0.65rem",
//                     color: "rgba(247,239,230,0.65)",
//                     margin: 0,
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Discount
//                 </p>
//               </div>
//               <div style={{ width: 1, background: "rgba(247,239,230,0.2)" }} />
//               <div style={{ textAlign: "center" }}>
//                 <p
//                   style={{
//                     fontSize: "1.2rem",
//                     fontWeight: 800,
//                     color: "#F7EFE6",
//                     margin: 0,
//                   }}
//                 >
//                   Auto
//                 </p>
//                 <p
//                   style={{
//                     fontSize: "0.65rem",
//                     color: "rgba(247,239,230,0.65)",
//                     margin: 0,
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Applied
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="sale-body">
//           {/* Filter + Sort bar */}
//           <motion.div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               flexWrap: "wrap",
//               gap: 12,
//               marginBottom: 8,
//             }}
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             {/* Category filter pills */}
//             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//               {["All", ...SALE_CATEGORIES].map((cat) => (
//                 <button
//                   key={cat}
//                   className={`sale-filter-btn ${activeSubCat === cat ? "active" : ""}`}
//                   onClick={() => setActiveSubCat(cat)}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Sort */}
//             <select
//               className="sale-sort"
//               value={sortType}
//               onChange={(e) => setSortType(e.target.value)}
//             >
//               <option value="relevant">Sort: Relevant</option>
//               <option value="low-high">Sale Price: Low → High</option>
//               <option value="high-low">Sale Price: High → Low</option>
//             </select>
//           </motion.div>

//           <p style={{ fontSize: "0.78rem", color: "#98A98E", marginBottom: 4 }}>
//             Showing{" "}
//             <span style={{ color: "#C96A42", fontWeight: 700 }}>
//               {filtered.length}
//             </span>{" "}
//             sale items
//           </p>

//           {/* Discount info banner */}
//           <motion.div
//             style={{
//               background: "rgba(201,106,66,0.08)",
//               border: "1px solid rgba(201,106,66,0.2)",
//               borderRadius: 10,
//               padding: "10px 16px",
//               marginBottom: 4,
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <svg
//               width="15"
//               height="15"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#C96A42"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="10" />
//               <line x1="12" y1="8" x2="12" y2="12" />
//               <line x1="12" y1="16" x2="12.01" y2="16" />
//             </svg>
//             <p
//               style={{
//                 fontSize: "0.78rem",
//                 color: "#C96A42",
//                 fontWeight: 600,
//                 margin: 0,
//               }}
//             >
//               Sale prices shown below. 10% discount auto-applied at checkout —
//               original price charged at product page, discount reflected in cart
//               total.
//             </p>
//           </motion.div>

//           {/* Products grid */}
//           <AnimatePresence mode="wait">
//             {filtered.length === 0 ? (
//               <motion.div
//                 style={{
//                   textAlign: "center",
//                   padding: "4rem 2rem",
//                   color: "#98A98E",
//                 }}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <div style={{ fontSize: "3rem", marginBottom: 12 }}>◎</div>
//                 <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
//                   No sale products found.
//                   <br />
//                   Check back soon!
//                 </p>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key={activeSubCat + sortType}
//                 className="sale-grid"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {filtered.map((item, index) => (
//                   <motion.div
//                     key={item._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{
//                       delay: Math.min(index * 0.04, 0.4),
//                       duration: 0.4,
//                     }}
//                   >
//                     <SaleItem
//                       id={item._id}
//                       image={item.image}
//                       name={item.name}
//                       originalPrice={item.price}
//                       salePrice={getSalePrice(item.price)}
//                     />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Bottom note */}
//           {filtered.length > 0 && (
//             <motion.div
//               style={{
//                 marginTop: "3rem",
//                 textAlign: "center",
//                 padding: "1.5rem",
//                 background: "#F7EFE6",
//                 borderRadius: 14,
//                 border: "1.5px solid #EDD8C4",
//               }}
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//             >
//               <p
//                 style={{
//                   fontSize: "0.82rem",
//                   color: "#7A4A38",
//                   margin: 0,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 🛒 Add products to cart normally — the{" "}
//                 <strong>10% discount is automatically applied</strong> when you
//                 checkout.
//                 <br />
//                 Prices shown here reflect the discounted amount for your
//                 reference.
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SummerSale;












import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Title from "../Components/Title";

const SALE_SUBCATS = ["Bottomwear", "Topwear"];
const DISCOUNT = 0.1;

const SaleCard = ({ id, image, name, originalPrice, salePrice }) => {
  const { currency } = useContext(ShopContext);
  const savingsPct = Math.round(DISCOUNT * 100);

  return (
    <Link to={`/product/${id}`} style={{ textDecoration: "none", display: "block" }}>
      <motion.article
        className="product-card"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="product-card-img">
          <img src={image[0]} alt={name} loading="lazy" />
          {/* Sale badge */}
          <span className="badge badge-terra" style={{ position: "absolute", top: 12, left: 12, fontSize: "0.62rem" }}>
            {savingsPct}% OFF
          </span>
        </div>

        <div style={{ padding: "14px 16px 18px" }}>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--bark)", fontSize: "0.84rem", fontWeight: 500, margin: "0 0 6px", lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {name}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="price">{currency}{salePrice.toFixed(0)}</span>
            <span className="price-original">{currency}{originalPrice}</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

const SummerSale = () => {
  const { products } = useContext(ShopContext);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [sort, setSort] = useState("relevant");

  useEffect(() => {
    if (!products.length) return;
    let sale = products.filter(p => SALE_SUBCATS.includes(p.subCategory));
    if (activeCat !== "All") sale = sale.filter(p => p.subCategory === activeCat);
    if (sort === "low-high") sale = [...sale].sort((a, b) => a.price - b.price);
    else if (sort === "high-low") sale = [...sale].sort((a, b) => b.price - a.price);
    setFiltered(sale);
  }, [products, activeCat, sort]);

  const getSalePrice = price => price - price * DISCOUNT;

  return (
    <>
      <style>{`
        .sale-page { min-height: 80vh; background: var(--cream); }

        .sale-hero {
          background: linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 35%, var(--bark) 65%, var(--terra) 100%);
          padding: clamp(3rem, 6vw, 5rem) 2rem clamp(2.5rem, 5vw, 4rem);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .sale-body { padding: 2.5rem 0; }

        .cat-pill {
          padding: 8px 20px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--cream-deeper);
          background: var(--cream);
          color: var(--bark);
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-pill.active { background: var(--espresso); color: var(--cream); border-color: var(--espresso); }
        .cat-pill:hover:not(.active) { border-color: var(--terra); color: var(--terra); background: rgba(201,106,66,0.05); }

        .sale-sort {
          appearance: none;
          background: var(--cream);
          border: 1.5px solid var(--cream-deeper);
          border-radius: var(--radius-full);
          padding: 9px 34px 9px 16px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--bark);
          font-weight: 600;
          cursor: pointer;
          outline: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C96A42' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          transition: border-color 0.18s;
        }
        .sale-sort:focus { border-color: var(--terra); box-shadow: 0 0 0 3px rgba(201,106,66,0.1); }
      `}</style>

      <div className="sale-page">
        {/* ── Hero ── */}
        <div className="sale-hero">
          {/* Decorative elements */}
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(250,247,242,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -50, left: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(143,168,136,0.07)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(250,247,242,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.span
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(250,247,242,0.12)", border: "1px solid rgba(250,247,242,0.22)", borderRadius: "var(--radius-full)", padding: "5px 18px", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(250,247,242,0.7)", textTransform: "uppercase", marginBottom: 16 }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            >
              ☀️ Limited Time
            </motion.span>

            <motion.h1
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, color: "var(--cream)", margin: "0 0 10px", lineHeight: 1.15, letterSpacing: "-0.02em" }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            >
              Summer Sale
            </motion.h1>

            <motion.p
              style={{ fontFamily: "var(--font-body)", color: "rgba(250,247,242,0.7)", fontSize: "0.92rem", maxWidth: 440, margin: "0 auto 24px", lineHeight: 1.65 }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            >
              Flat 10% off on all Bottomwear & Topwear. Discount applied automatically at checkout — no coupon needed.
            </motion.p>

            {/* Stats bar */}
            <motion.div
              style={{ display: "inline-flex", gap: 24, background: "rgba(250,247,242,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(250,247,242,0.18)", borderRadius: "var(--radius-lg)", padding: "12px 28px" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            >
              {[
                { label: "Products", value: filtered.length || "…" },
                { label: "Discount", value: "10%" },
                { label: "Applied", value: "Auto" },
              ].map(({ label, value }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div style={{ width: 1, background: "rgba(250,247,242,0.2)" }} />}
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "var(--cream)", margin: 0, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "rgba(250,247,242,0.55)", margin: 0, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>{label}</p>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="sale-body">
          {/* Toolbar */}
          <motion.div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["All", ...SALE_SUBCATS].map(cat => (
                <button key={cat} className={`cat-pill${activeCat === cat ? " active" : ""}`} onClick={() => setActiveCat(cat)}>
                  {cat}
                </button>
              ))}
            </div>
            <select className="sale-sort" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="relevant">Relevance</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </motion.div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--mist)", marginBottom: 16 }}>
            Showing <span style={{ color: "var(--terra)", fontWeight: 700 }}>{filtered.length}</span> sale items
          </p>

          {/* Auto-apply note */}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(201,106,66,0.06)", border: "1px solid rgba(201,106,66,0.18)", borderRadius: "var(--radius-md)", padding: "10px 16px", marginBottom: 20 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--terra)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--terra)", fontWeight: 600, margin: 0 }}>
              Prices shown include the 10% discount. Automatically applied at checkout — no code needed.
            </p>
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--mist)" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <div style={{ fontSize: "3rem", marginBottom: 12, opacity: 0.35 }}>🏷️</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>No sale products found. Check back soon!</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCat + sort}
                className="products-grid"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                {filtered.map((item, i) => (
                  <motion.div key={item._id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.04, 0.36), duration: 0.4 }}>
                    <SaleCard id={item._id} image={item.image} name={item.name} originalPrice={item.price} salePrice={getSalePrice(item.price)} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom CTA */}
          {filtered.length > 0 && (
            <motion.div
              style={{ marginTop: "3rem", textAlign: "center", padding: "2rem", background: "var(--cream-dark)", borderRadius: "var(--radius-xl)", border: "1.5px solid var(--cream-deeper)" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--bark)", marginBottom: 14, fontWeight: 500 }}>
                🛒 Add items to your cart normally — the <strong>10% discount</strong> is reflected automatically at checkout.
              </p>
              <Link to="/collection" className="btn-secondary">Browse All Products →</Link>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default SummerSale;