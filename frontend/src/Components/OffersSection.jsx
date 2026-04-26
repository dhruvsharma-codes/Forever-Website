// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// // Sale ends 7 days from now — resets each session
// const getSaleEndTime = () => {
//   const stored = sessionStorage.getItem("sale_end_time");
//   if (stored) return parseInt(stored);
//   const end = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
//   sessionStorage.setItem("sale_end_time", end.toString());
//   return end;
// };

// const pad = (n) => String(n).padStart(2, "0");

// const CountdownBox = ({ value, label, delay }) => (
//   <motion.div
//     style={{ textAlign: "center", minWidth: 64 }}
//     initial={{ opacity: 0, y: 12 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ delay }}
//   >
//     <div
//       style={{
//         background: "rgba(247,239,230,0.12)",
//         border: "1px solid rgba(247,239,230,0.2)",
//         borderRadius: 10,
//         padding: "10px 16px",
//         marginBottom: 6,
//         minWidth: 56,
//       }}
//     >
//       <span
//         style={{
//           fontSize: "clamp(1.4rem,4vw,2rem)",
//           fontWeight: 900,
//           color: "#F7EFE6",
//           letterSpacing: "-0.02em",
//           fontFamily: "'Georgia',serif",
//         }}
//       >
//         {pad(value)}
//       </span>
//     </div>
//     <span
//       style={{
//         fontSize: "0.65rem",
//         fontWeight: 700,
//         letterSpacing: "0.16em",
//         color: "rgba(247,239,230,0.65)",
//         textTransform: "uppercase",
//       }}
//     >
//       {label}
//     </span>
//   </motion.div>
// );

// const OffersSection = () => {
//   const navigate = useNavigate();
//   const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

//   useEffect(() => {
//     const endTime = getSaleEndTime();
//     const tick = () => {
//       const diff = Math.max(0, endTime - Date.now());
//       const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const s = Math.floor((diff % (1000 * 60)) / 1000);
//       setTimeLeft({ d, h, m, s });
//     };
//     tick();
//     const id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <section style={{ margin: "4rem 0" }}>
//       <motion.div
//         style={{
//           background:
//             "linear-gradient(135deg, #3D2318 0%, #7A4A38 45%, #C96A42 100%)",
//           borderRadius: 22,
//           padding: "clamp(2rem,5vw,3.5rem) clamp(1.5rem,4vw,3rem)",
//           position: "relative",
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           textAlign: "center",
//           gap: "1.5rem",
//         }}
//         initial={{ opacity: 0, y: 32 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-60px" }}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       >
//         {/* Decorative circles */}
//         <div
//           style={{
//             position: "absolute",
//             top: -60,
//             right: -60,
//             width: 200,
//             height: 200,
//             borderRadius: "50%",
//             background: "rgba(247,239,230,0.06)",
//             pointerEvents: "none",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             bottom: -40,
//             left: -40,
//             width: 160,
//             height: 160,
//             borderRadius: "50%",
//             background: "rgba(152,169,142,0.09)",
//             pointerEvents: "none",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             top: "40%",
//             left: "20%",
//             width: 80,
//             height: 80,
//             borderRadius: "50%",
//             background: "rgba(247,239,230,0.04)",
//             pointerEvents: "none",
//           }}
//         />

//         {/* Badge */}
//         <motion.span
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 6,
//             background: "rgba(247,239,230,0.15)",
//             border: "1px solid rgba(247,239,230,0.25)",
//             borderRadius: 60,
//             padding: "5px 16px",
//             fontSize: "0.7rem",
//             fontWeight: 700,
//             letterSpacing: "0.18em",
//             color: "#EDD8C4",
//             textTransform: "uppercase",
//           }}
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.15 }}
//         >
//           ☀️ Summer Sale — Ending Soon
//         </motion.span>

//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.22 }}
//         >
//           <h2
//             style={{
//               fontFamily: "'Georgia',serif",
//               fontSize: "clamp(1.6rem,5vw,2.6rem)",
//               color: "#F7EFE6",
//               margin: "0 0 10px",
//               lineHeight: 1.2,
//             }}
//           >
//             Flat{" "}
//             <span style={{ color: "#EDD8C4", fontStyle: "italic" }}>
//               10% Off
//             </span>{" "}
//             on
//           </h2>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: 10,
//               flexWrap: "wrap",
//             }}
//           >
//             {["Bottomwear", "Winterwear"].map((cat) => (
//               <span
//                 key={cat}
//                 style={{
//                   background: "rgba(247,239,230,0.18)",
//                   border: "1px solid rgba(247,239,230,0.3)",
//                   color: "#F7EFE6",
//                   fontSize: "0.82rem",
//                   fontWeight: 700,
//                   padding: "5px 16px",
//                   borderRadius: 20,
//                 }}
//               >
//                 {cat}
//               </span>
//             ))}
//           </div>
//         </motion.div>

//         {/* Countdown */}
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.3 }}
//         >
//           <p
//             style={{
//               fontSize: "0.72rem",
//               color: "rgba(247,239,230,0.6)",
//               letterSpacing: "0.14em",
//               textTransform: "uppercase",
//               fontWeight: 600,
//               marginBottom: 14,
//             }}
//           >
//             Sale ends in
//           </p>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "flex-start",
//               gap: "clamp(8px,2vw,16px)",
//             }}
//           >
//             <CountdownBox value={timeLeft.d} label="Days" delay={0.35} />
//             <span
//               style={{
//                 fontSize: "clamp(1.2rem,3vw,1.8rem)",
//                 fontWeight: 900,
//                 color: "rgba(247,239,230,0.5)",
//                 marginTop: 8,
//                 lineHeight: 1,
//               }}
//             >
//               :
//             </span>
//             <CountdownBox value={timeLeft.h} label="Hours" delay={0.4} />
//             <span
//               style={{
//                 fontSize: "clamp(1.2rem,3vw,1.8rem)",
//                 fontWeight: 900,
//                 color: "rgba(247,239,230,0.5)",
//                 marginTop: 8,
//                 lineHeight: 1,
//               }}
//             >
//               :
//             </span>
//             <CountdownBox value={timeLeft.m} label="Mins" delay={0.45} />
//             <span
//               style={{
//                 fontSize: "clamp(1.2rem,3vw,1.8rem)",
//                 fontWeight: 900,
//                 color: "rgba(247,239,230,0.5)",
//                 marginTop: 8,
//                 lineHeight: 1,
//               }}
//             >
//               :
//             </span>
//             <CountdownBox value={timeLeft.s} label="Secs" delay={0.5} />
//           </div>
//         </motion.div>

//         {/* CTA */}
//         <motion.div
//           style={{
//             display: "flex",
//             gap: 12,
//             flexWrap: "wrap",
//             justifyContent: "center",
//           }}
//           initial={{ opacity: 0, y: 12 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.4 }}
//         >
//           <motion.button
//             onClick={() => navigate("/summer-sale")}
//             style={{
//               background: "#F7EFE6",
//               color: "#3D2318",
//               border: "none",
//               borderRadius: 50,
//               padding: "13px 32px",
//               fontSize: "0.84rem",
//               fontWeight: 700,
//               letterSpacing: "0.1em",
//               textTransform: "uppercase",
//               cursor: "pointer",
//               fontFamily: "inherit",
//               boxShadow: "0 4px 20px rgba(61,35,24,0.25)",
//             }}
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.96 }}
//           >
//             Shop Summer Sale →
//           </motion.button>
//         </motion.div>

//         {/* Fine print */}
//         <p
//           style={{
//             fontSize: "0.7rem",
//             color: "rgba(247,239,230,0.45)",
//             margin: 0,
//           }}
//         >
//           Discount applied automatically · No coupon needed · While stocks last
//         </p>
//       </motion.div>
//     </section>
//   );
// };

// export default OffersSection;











import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const getSaleEndTime = () => {
  const stored = sessionStorage.getItem("sale_end_time");
  if (stored) return parseInt(stored);
  const end = Date.now() + 7 * 24 * 60 * 60 * 1000;
  sessionStorage.setItem("sale_end_time", end.toString());
  return end;
};

const pad = n => String(n).padStart(2, "0");

const CountdownUnit = ({ value, label, delay }) => (
  <motion.div
    style={{ textAlign: 'center' }}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
  >
    <div style={{
      background: 'rgba(250,247,242,0.1)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(250,247,242,0.18)',
      borderRadius: 'var(--radius-md)',
      padding: 'clamp(12px, 2vw, 18px) clamp(14px, 2.5vw, 22px)',
      marginBottom: 8,
      minWidth: 60,
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: 700,
        color: 'var(--cream)',
        letterSpacing: '-0.03em',
        display: 'block',
        lineHeight: 1,
      }}>
        {pad(value)}
      </span>
    </div>
    <span style={{
      fontFamily: 'var(--font-body)',
      fontSize: '0.62rem',
      fontWeight: 700,
      letterSpacing: '0.18em',
      color: 'rgba(250,247,242,0.5)',
      textTransform: 'uppercase',
    }}>
      {label}
    </span>
  </motion.div>
);

const Separator = () => (
  <span style={{
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
    fontWeight: 700,
    color: 'rgba(250,247,242,0.35)',
    marginBottom: 28,
    display: 'block',
    lineHeight: 1,
    alignSelf: 'flex-start',
    marginTop: 12,
  }}>:</span>
);

const OffersSection = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const endTime = getSaleEndTime();
    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ margin: '4rem 0' }}>
      <motion.div
        style={{
          background: 'linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 35%, var(--bark) 65%, var(--terra) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 4rem)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '2rem',
        }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(250,247,242,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(143,168,136,0.07)', pointerEvents: 'none' }} />
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(250,247,242,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Badge */}
          <motion.span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(250,247,242,0.12)', border: '1px solid rgba(250,247,242,0.22)',
              borderRadius: 'var(--radius-full)', padding: '5px 18px',
              fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.2em', color: 'rgba(250,247,242,0.7)', textTransform: 'uppercase', marginBottom: 16,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            ☀️ Summer Sale — Ending Soon
          </motion.span>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22 }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 600,
              color: 'var(--cream)',
              margin: '0 0 10px',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Flat <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(250,247,242,0.7)' }}>10% Off</em> on
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {["Bottomwear", "Winterwear"].map(cat => (
                <span key={cat} style={{
                  background: 'rgba(250,247,242,0.15)', border: '1px solid rgba(250,247,242,0.25)',
                  color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                  fontWeight: 600, padding: '6px 18px', borderRadius: 'var(--radius-full)',
                }}>
                  {cat}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(250,247,242,0.5)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>
              Sale ends in
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 'clamp(8px, 2vw, 14px)' }}>
              <CountdownUnit value={time.d} label="Days" delay={0.35} />
              <Separator />
              <CountdownUnit value={time.h} label="Hours" delay={0.4} />
              <Separator />
              <CountdownUnit value={time.m} label="Mins" delay={0.45} />
              <Separator />
              <CountdownUnit value={time.s} label="Secs" delay={0.5} />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => navigate("/summer-sale")}
              style={{
                background: 'var(--cream)',
                color: 'var(--espresso)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '14px 36px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(44,24,16,0.28)',
              }}
              whileHover={{ scale: 1.03, background: '#fff' }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Summer Sale →
            </motion.button>
          </motion.div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(250,247,242,0.35)', marginTop: 8 }}>
            Discount applied automatically · No coupon needed · While stocks last
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default OffersSection;