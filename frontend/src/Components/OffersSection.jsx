// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const getSaleEndTime = () => {
//   const stored = sessionStorage.getItem("sale_end_time");
//   if (stored) return parseInt(stored);
//   const end = Date.now() + 7 * 24 * 60 * 60 * 1000;
//   sessionStorage.setItem("sale_end_time", end.toString());
//   return end;
// };

// const pad = n => String(n).padStart(2, "0");

// const CountdownUnit = ({ value, label, delay }) => (
//   <motion.div
//     style={{ textAlign: 'center' }}
//     initial={{ opacity: 0, y: 12 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ delay }}
//   >
//     <div style={{
//       background: 'rgba(250,247,242,0.1)',
//       backdropFilter: 'blur(12px)',
//       border: '1px solid rgba(250,247,242,0.18)',
//       borderRadius: 'var(--radius-md)',
//       padding: 'clamp(12px, 2vw, 18px) clamp(14px, 2.5vw, 22px)',
//       marginBottom: 8,
//       minWidth: 60,
//     }}>
//       <span style={{
//         fontFamily: 'var(--font-display)',
//         fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
//         fontWeight: 700,
//         color: 'var(--cream)',
//         letterSpacing: '-0.03em',
//         display: 'block',
//         lineHeight: 1,
//       }}>
//         {pad(value)}
//       </span>
//     </div>
//     <span style={{
//       fontFamily: 'var(--font-body)',
//       fontSize: '0.62rem',
//       fontWeight: 700,
//       letterSpacing: '0.18em',
//       color: 'rgba(250,247,242,0.5)',
//       textTransform: 'uppercase',
//     }}>
//       {label}
//     </span>
//   </motion.div>
// );

// const Separator = () => (
//   <span style={{
//     fontFamily: 'var(--font-display)',
//     fontSize: 'clamp(1.4rem, 3vw, 2rem)',
//     fontWeight: 700,
//     color: 'rgba(250,247,242,0.35)',
//     marginBottom: 28,
//     display: 'block',
//     lineHeight: 1,
//     alignSelf: 'flex-start',
//     marginTop: 12,
//   }}>:</span>
// );

// const OffersSection = () => {
//   const navigate = useNavigate();
//   const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

//   useEffect(() => {
//     const endTime = getSaleEndTime();
//     const tick = () => {
//       const diff = Math.max(0, endTime - Date.now());
//       setTime({
//         d: Math.floor(diff / 86400000),
//         h: Math.floor((diff % 86400000) / 3600000),
//         m: Math.floor((diff % 3600000) / 60000),
//         s: Math.floor((diff % 60000) / 1000),
//       });
//     };
//     tick();
//     const id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <section style={{ margin: '4rem 0' }}>
//       <motion.div
//         style={{
//           background: 'linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 35%, var(--bark) 65%, var(--terra) 100%)',
//           borderRadius: 'var(--radius-xl)',
//           padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 4rem)',
//           position: 'relative',
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           textAlign: 'center',
//           gap: '2rem',
//         }}
//         initial={{ opacity: 0, y: 32 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: '-60px' }}
//         transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
//       >
//         {/* Decorative elements */}
//         <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(250,247,242,0.04)', pointerEvents: 'none' }} />
//         <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(143,168,136,0.07)', pointerEvents: 'none' }} />
//         {/* Dot grid */}
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(250,247,242,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

//         <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
//           {/* Badge */}
//           <motion.span
//             style={{
//               display: 'inline-flex', alignItems: 'center', gap: 6,
//               background: 'rgba(250,247,242,0.12)', border: '1px solid rgba(250,247,242,0.22)',
//               borderRadius: 'var(--radius-full)', padding: '5px 18px',
//               fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700,
//               letterSpacing: '0.2em', color: 'rgba(250,247,242,0.7)', textTransform: 'uppercase', marginBottom: 16,
//             }}
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.15 }}
//           >
//             ☀️ Summer Sale — Ending Soon
//           </motion.span>

//           {/* Headline */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.22 }}
//           >
//             <h2 style={{
//               fontFamily: 'var(--font-display)',
//               fontSize: 'clamp(1.8rem, 5vw, 3rem)',
//               fontWeight: 600,
//               color: 'var(--cream)',
//               margin: '0 0 10px',
//               lineHeight: 1.15,
//               letterSpacing: '-0.02em',
//             }}>
//               Flat <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(250,247,242,0.7)' }}>10% Off</em> on
//             </h2>
//             <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
//               {["Bottomwear", "Winterwear"].map(cat => (
//                 <span key={cat} style={{
//                   background: 'rgba(250,247,242,0.15)', border: '1px solid rgba(250,247,242,0.25)',
//                   color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: '0.82rem',
//                   fontWeight: 600, padding: '6px 18px', borderRadius: 'var(--radius-full)',
//                 }}>
//                   {cat}
//                 </span>
//               ))}
//             </div>
//           </motion.div>

//           {/* Countdown */}
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.3 }}
//           >
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(250,247,242,0.5)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>
//               Sale ends in
//             </p>
//             <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 'clamp(8px, 2vw, 14px)' }}>
//               <CountdownUnit value={time.d} label="Days" delay={0.35} />
//               <Separator />
//               <CountdownUnit value={time.h} label="Hours" delay={0.4} />
//               <Separator />
//               <CountdownUnit value={time.m} label="Mins" delay={0.45} />
//               <Separator />
//               <CountdownUnit value={time.s} label="Secs" delay={0.5} />
//             </div>
//           </motion.div>

//           {/* CTA */}
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4 }}
//           >
//             <motion.button
//               onClick={() => navigate("/summer-sale")}
//               style={{
//                 background: 'var(--cream)',
//                 color: 'var(--espresso)',
//                 border: 'none',
//                 borderRadius: 'var(--radius-full)',
//                 padding: '14px 36px',
//                 fontFamily: 'var(--font-body)',
//                 fontSize: '0.82rem',
//                 fontWeight: 700,
//                 letterSpacing: '0.1em',
//                 textTransform: 'uppercase',
//                 cursor: 'pointer',
//                 boxShadow: '0 8px 32px rgba(44,24,16,0.28)',
//               }}
//               whileHover={{ scale: 1.03, background: '#fff' }}
//               whileTap={{ scale: 0.97 }}
//             >
//               Shop Summer Sale →
//             </motion.button>
//           </motion.div>

//           <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(250,247,242,0.35)', marginTop: 8 }}>
//             Discount applied automatically · No coupon needed · While stocks last
//           </p>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default OffersSection;







































































import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const END_KEY = "sale_end_time";
const getEnd = () => {
  const s = sessionStorage.getItem(END_KEY);
  if (s) return parseInt(s, 10);
  const e = Date.now() + 7 * 864e5; sessionStorage.setItem(END_KEY, String(e)); return e;
};
const pad = n => String(n).padStart(2, "0");

// digit flips when value changes
const Unit = ({ v, label }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ position: "relative", overflow: "hidden", minWidth: 72, padding: "16px 10px", borderRadius: 16, marginBottom: 8,
      background: "rgba(251,247,241,.1)", border: "1px solid rgba(251,247,241,.2)", backdropFilter: "blur(12px)" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={v} initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "block", font: "700 clamp(1.9rem,5vw,2.8rem)/1 var(--font-display)", color: "var(--cream)", fontVariantNumeric: "tabular-nums" }}>
          {pad(v)}
        </motion.span>
      </AnimatePresence>
    </div>
    <span style={{ fontSize: ".66rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(251,247,241,.55)" }}>{label}</span>
  </div>
);

const OffersSection = () => {
  const navigate = useNavigate();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const end = getEnd();
    const tick = () => {
      const x = Math.max(0, end - Date.now());
      setT({ d: Math.floor(x / 864e5), h: Math.floor((x % 864e5) / 36e5), m: Math.floor((x % 36e5) / 6e4), s: Math.floor((x % 6e4) / 1e3) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  return (
    <section style={{ margin: "5rem 0" }}>
      <style>{`
        .of{position:relative;overflow:hidden;text-align:center;border-radius:var(--radius-xl);padding:clamp(3rem,7vw,5.5rem) clamp(1.5rem,5vw,4rem);
          background:linear-gradient(125deg,var(--espresso),var(--espresso-mid) 40%,var(--terra-deep));}
        .of::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 20%,rgba(184,146,74,.3),transparent 45%);animation:floaty 8s ease-in-out infinite}
        .of-pulse{width:8px;height:8px;border-radius:50%;background:#ff7a59;box-shadow:0 0 0 0 rgba(255,122,89,.7);animation:pulse 1.6s infinite}
        @keyframes pulse{70%{box-shadow:0 0 0 10px rgba(255,122,89,0)}100%{box-shadow:0 0 0 0 rgba(255,122,89,0)}}
      `}</style>
      <motion.div className="of" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 18px", borderRadius: 999, marginBottom: 20,
            background: "rgba(251,247,241,.12)", border: "1px solid rgba(251,247,241,.22)", color: "rgba(251,247,241,.85)", fontSize: ".74rem", fontWeight: 700, letterSpacing: ".1em" }}>
            <i className="of-pulse" /> Sale ends soon
          </span>
          <h2 style={{ font: "300 clamp(2.2rem,6vw,4rem)/1.05 var(--font-display)", color: "var(--cream)", margin: "0 0 18px", letterSpacing: "-.03em" }}>
            10% off <em style={{ fontWeight: 600, color: "var(--gold)" }}>bottomwear</em> and winterwear
          </h2>
          <p style={{ color: "rgba(251,247,241,.65)", margin: "0 0 2.2rem", fontSize: ".92rem" }}>Applied automatically at checkout. No code needed.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(8px,2vw,16px)", marginBottom: "2.4rem" }}>
            <Unit v={t.d} label="Days" /><Unit v={t.h} label="Hours" /><Unit v={t.m} label="Mins" /><Unit v={t.s} label="Secs" />
          </div>
          <motion.button onClick={() => navigate("/summer-sale")} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{ background: "var(--cream)", color: "var(--espresso)", border: 0, borderRadius: 999, padding: "16px 42px", cursor: "pointer",
              font: "800 .8rem var(--font-body)", letterSpacing: ".14em", textTransform: "uppercase", boxShadow: "0 14px 40px rgba(0,0,0,.3)" }}>
            Shop the sale
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
export default OffersSection;