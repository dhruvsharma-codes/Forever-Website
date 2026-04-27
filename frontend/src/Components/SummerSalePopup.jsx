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












// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const SummerSalePopup = () => {
//   const [visible, setVisible] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const dismissed = sessionStorage.getItem("summer_popup_dismissed");
//     if (!dismissed) {
//       const t = setTimeout(() => setVisible(true), 1400);
//       return () => clearTimeout(t);
//     }
//   }, []);

//   const dismiss = () => {
//     setVisible(false);
//     sessionStorage.setItem("summer_popup_dismissed", "true");
//   };

//   const shopNow = () => { dismiss(); navigate("/summer-sale"); };

//   return (
//     <AnimatePresence>
//       {visible && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             onClick={dismiss}
//             style={{
//               position: 'fixed', inset: 0,
//               background: 'rgba(44,24,16,0.5)',
//               backdropFilter: 'blur(8px)',
//               WebkitBackdropFilter: 'blur(8px)',
//               zIndex: 1000,
//             }}
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//           />

//           {/* Popup */}
//           <motion.div
//             style={{
//               position: 'fixed',
//               top: '20%', left: '40%',
//               transform: 'translate(-20%,-40%)',
//               width: '90%',
//               maxWidth: 520,
//               background: 'rgba(250,247,242,0.92)',
//               backdropFilter: 'blur(32px) saturate(180%)',
//               WebkitBackdropFilter: 'blur(32px) saturate(180%)',
//               border: '1.5px solid rgba(212,197,176,0.7)',
//               borderRadius: 'var(--radius-xl)',
//               overflow: 'hidden',
//               zIndex: 1001,
//               boxShadow: '0 40px 100px rgba(44,24,16,0.35), 0 0 0 1px rgba(255,255,255,0.3) inset',
//             }}
//             initial={{ opacity: 0, scale: 0.88, y: 24 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.93, y: 12 }}
//             transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
//           >
//             {/* Close btn */}
//             <motion.button
//               onClick={dismiss}
//               style={{
//                 position: 'absolute', top: 14, right: 14, zIndex: 2,
//                 width: 34, height: 34, borderRadius: '50%',
//                 background: 'rgba(44,24,16,0.08)', border: 'none',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 cursor: 'pointer', color: 'var(--espresso)',
//               }}
//               whileHover={{ background: 'rgba(201,106,66,0.18)', scale: 1.08 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                 <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </motion.button>

//             {/* Hero banner */}
//             <div style={{
//               background: 'linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 45%, var(--terra) 100%)',
//               padding: '2.5rem 2.5rem 2rem',
//               textAlign: 'center',
//               position: 'relative',
//               overflow: 'hidden',
//             }}>
//               {/* Decorative circles */}
//               <div style={{ position: 'absolute', top: -50, right: -50, width: 160, height: 160, borderRadius: '50%', background: 'rgba(250,247,242,0.06)', pointerEvents: 'none' }} />
//               <div style={{ position: 'absolute', bottom: -30, left: -30, width: 110, height: 110, borderRadius: '50%', background: 'rgba(143,168,136,0.08)', pointerEvents: 'none' }} />
//               <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(250,247,242,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />

//               <motion.p
//                 style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.24em', color: 'rgba(250,247,242,0.6)', textTransform: 'uppercase', margin: '0 0 10px', fontWeight: 700, position: 'relative' }}
//                 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
//               >
//                 Limited Time Offer
//               </motion.p>

//               <motion.h2
//                 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 5vw, 2.4rem)', color: 'var(--cream)', margin: '0 0 14px', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.02em', position: 'relative' }}
//                 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
//               >
//                 ☀️ Summer Sale
//               </motion.h2>

//               <motion.div
//                 style={{
//                   display: 'inline-flex', alignItems: 'center', gap: 6,
//                   background: 'rgba(250,247,242,0.14)', border: '1px solid rgba(250,247,242,0.25)',
//                   borderRadius: 'var(--radius-full)', padding: '8px 20px', position: 'relative',
//                 }}
//                 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.36 }}
//               >
//                 <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--cream)', letterSpacing: '-0.02em' }}>
//                   10% OFF
//                 </span>
//               </motion.div>
//             </div>

//             {/* Content */}
//             <div style={{ padding: '1.75rem 2.5rem 2.25rem' }}>
//               <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--espresso)', fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>
//                 On All Bottomwear & Winterwear
//               </p>
//               <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--mist)', textAlign: 'center', lineHeight: 1.65, marginBottom: '1.5rem' }}>
//                 Refresh your wardrobe this season. Pants, jeans, jackets, hoodies and more — all 10% off.
//               </p>

//               {/* Category pills */}
//               <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
//                 {["Bottomwear", "Winterwear"].map(tag => (
//                   <span key={tag} style={{
//                     background: 'rgba(201,106,66,0.08)', border: '1px solid rgba(201,106,66,0.2)',
//                     color: 'var(--terra)', fontFamily: 'var(--font-body)', fontSize: '0.75rem',
//                     fontWeight: 700, padding: '5px 16px', borderRadius: 'var(--radius-full)',
//                   }}>
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               {/* Auto-apply note */}
//               <div style={{
//                 background: 'rgba(201,106,66,0.06)', border: '1px dashed rgba(201,106,66,0.25)',
//                 borderRadius: 'var(--radius-md)', padding: '10px 16px', marginBottom: '1.5rem',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//               }}>
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--terra)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
//                 </svg>
//                 <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--terra)', fontWeight: 600 }}>
//                   Auto-applied at checkout — no code needed
//                 </span>
//               </div>

//               {/* Buttons */}
//               <div style={{ display: 'flex', gap: 10 }}>
//                 <motion.button
//                   onClick={shopNow}
//                   style={{
//                     flex: 1, background: 'var(--espresso)', color: 'var(--cream)', border: 'none',
//                     borderRadius: 'var(--radius-full)', padding: '13px', fontFamily: 'var(--font-body)',
//                     fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em',
//                     textTransform: 'uppercase', cursor: 'pointer',
//                     boxShadow: '0 4px 20px rgba(44,24,16,0.22)',
//                   }}
//                   whileHover={{ background: 'var(--terra)', scale: 1.02 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   Shop Now →
//                 </motion.button>
//                 <motion.button
//                   onClick={dismiss}
//                   style={{
//                     padding: '13px 20px', background: 'transparent',
//                     border: '1.5px solid var(--cream-deeper)', borderRadius: 'var(--radius-full)',
//                     fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
//                     color: 'var(--mist)', cursor: 'pointer', whiteSpace: 'nowrap',
//                   }}
//                   whileHover={{ borderColor: 'var(--terra)', color: 'var(--terra)' }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   Maybe Later
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SummerSalePopup;