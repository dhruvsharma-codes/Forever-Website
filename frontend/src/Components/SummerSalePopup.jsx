import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SummerSalePopup = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup after 1.2s — only if not dismissed in this session
    const dismissed = sessionStorage.getItem("summer_popup_dismissed");
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("summer_popup_dismissed", "true");
  };

  const shopNow = () => {
    dismiss();
    navigate("/summer-sale");
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            onClick={dismiss}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(61,35,24,0.45)",
              zIndex: 1000,
              backdropFilter: "blur(4px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Popup */}
          <motion.div
            style={{
              position: "fixed",
              top: "20%",
              left: "35%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 550,
              background: "#F7EFE6",
              borderRadius: 22,
              overflow: "hidden",
              zIndex: 1001,
              boxShadow: "0 24px 80px rgba(61,35,24,0.28)",
            }}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <motion.button
              onClick={dismiss}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 2,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(61,35,24,0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#3D2318",
              }}
              whileHover={{ background: "rgba(201,106,66,0.2)", scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>

            {/* Top banner */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #3D2318 0%, #7A4A38 50%, #C96A42 100%)",
                padding: "2rem 2rem 1.5rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "rgba(247,239,230,0.07)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -30,
                  left: -30,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(152,169,142,0.1)",
                  pointerEvents: "none",
                }}
              />

              <motion.p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  color: "rgba(247,239,230,0.7)",
                  textTransform: "uppercase",
                  margin: "0 0 8px",
                  fontWeight: 700,
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Limited Time Offer
              </motion.p>

              <motion.h2
                style={{
                  fontFamily: "'Georgia',serif",
                  fontSize: "clamp(1.6rem,5vw,2.2rem)",
                  color: "#F7EFE6",
                  margin: "0 0 8px",
                  lineHeight: 1.2,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                ☀️ Summer Sale
              </motion.h2>

              <motion.div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(247,239,230,0.15)",
                  borderRadius: 60,
                  padding: "6px 18px",
                  border: "1px solid rgba(247,239,230,0.25)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.36 }}
              >
                <span
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 900,
                    color: "#F7EFE6",
                    letterSpacing: "-0.02em",
                  }}
                >
                  10% OFF
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div style={{ padding: "1.5rem 2rem 2rem" }}>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#3D2318",
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                On All Bottomwear &amp; Winterwear
              </p>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#7A4A38",
                  textAlign: "center",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                }}
              >
                Refresh your wardrobe this season! Get 10% off on all bottomwear
                and winterwear styles — pants, jeans, jackets, hoodies and more.
              </p>

              {/* Category pills */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: "1.5rem",
                }}
              >
                {["Bottomwear", "Winterwear"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(201,106,66,0.1)",
                      border: "1px solid rgba(201,106,66,0.25)",
                      color: "#C96A42",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "5px 14px",
                      borderRadius: 20,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Discount badge */}
              <div
                style={{
                  background: "rgba(201,106,66,0.07)",
                  border: "1px dashed rgba(201,106,66,0.3)",
                  borderRadius: 10,
                  padding: "10px 16px",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C96A42"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#C96A42",
                    fontWeight: 700,
                  }}
                >
                  Auto-applied at checkout — no coupon code needed
                </span>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                <motion.button
                  onClick={shopNow}
                  style={{
                    flex: 1,
                    background: "#C96A42",
                    color: "#F7EFE6",
                    border: "none",
                    borderRadius: 50,
                    padding: "13px",
                    fontSize: "0.84rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 16px rgba(201,106,66,0.35)",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Shop Now →
                </motion.button>
                <motion.button
                  onClick={dismiss}
                  style={{
                    padding: "13px 20px",
                    background: "transparent",
                    border: "1.5px solid #EDD8C4",
                    borderRadius: 50,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#7A4A38",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                  whileHover={{ borderColor: "#C96A42" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Maybe Later
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SummerSalePopup;










