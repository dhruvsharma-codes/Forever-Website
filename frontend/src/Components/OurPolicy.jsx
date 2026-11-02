// import React from "react";
// import { assets } from "../assets/assets";
// import { motion } from "framer-motion";

// const policies = [
//   {
//     icon: assets.exchange_icon,
//     title: "Easy Exchange",
//     desc: "Hassle-free exchange on all orders within 7 days of delivery.",
//     emoji: "🔄",
//   },
//   {
//     icon: assets.quality_icon,
//     title: "7-Day Returns",
//     desc: "Not satisfied? Return within 7 days for a full refund, no questions asked.",
//     emoji: "↩️",
//   },
//   {
//     icon: assets.support_img,
//     title: "24/7 Support",
//     desc: "Our team is always here to help you — chat, call, or email anytime.",
//     emoji: "💬",
//   },
// ];

// const OurPolicy = () => (
//   <section style={{ margin: '3rem 0' }}>
//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//       gap: '1rem',
//     }}>
//       {policies.map((p, i) => (
//         <motion.div
//           key={i}
//           style={{
//             background: 'var(--cream)',
//             border: '1.5px solid var(--cream-deeper)',
//             borderRadius: 'var(--radius-lg)',
//             padding: '2rem 1.75rem',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 14,
//             boxShadow: 'var(--shadow-sm)',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//           initial={{ opacity: 0, y: 28 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-40px' }}
//           transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
//           whileHover={{ y: -5, borderColor: 'rgba(201,106,66,0.4)', boxShadow: 'var(--shadow-lg)' }}
//         >
//           {/* Background emoji watermark */}
//           <span style={{
//             position: 'absolute',
//             bottom: -8,
//             right: 12,
//             fontSize: '4.5rem',
//             opacity: 0.05,
//             pointerEvents: 'none',
//             userSelect: 'none',
//             lineHeight: 1,
//           }}>
//             {p.emoji}
//           </span>

//           {/* Icon */}
//           <div style={{
//             width: 48,
//             height: 48,
//             borderRadius: 'var(--radius-md)',
//             background: 'rgba(201,106,66,0.08)',
//             border: '1px solid rgba(201,106,66,0.15)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//             <img src={p.icon} alt={p.title} style={{
//               width: 22,
//               filter: 'invert(42%) sepia(40%) saturate(500%) hue-rotate(330deg) brightness(85%)',
//             }} />
//           </div>

//           <div>
//             <p style={{
//               fontFamily: 'var(--font-body)',
//               color: 'var(--espresso)',
//               fontSize: '0.9rem',
//               fontWeight: 700,
//               margin: '0 0 6px',
//               letterSpacing: '0.01em',
//             }}>
//               {p.title}
//             </p>
//             <p style={{
//               fontFamily: 'var(--font-body)',
//               color: 'var(--mist)',
//               fontSize: '0.83rem',
//               lineHeight: 1.65,
//               margin: 0,
//             }}>
//               {p.desc}
//             </p>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   </section>
// );

// export default OurPolicy;

























































import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const policies = [
  { icon: assets.exchange_icon, title: "Easy exchange", desc: "Swap any item within 7 days of delivery, with no forms to fight through." },
  { icon: assets.quality_icon, title: "7-day returns", desc: "Not right? Send it back within 7 days for a full refund." },
  { icon: assets.support_img, title: "Support that answers", desc: "Chat, call or email us. Most replies arrive within two hours." },
];

const OurPolicy = () => (
  <section style={{ margin: "4rem 0" }}>
    <style>{`
      .pol{position:relative;overflow:hidden;background:#fff;border:1px solid var(--cream-deeper);border-radius:var(--radius-lg);padding:2rem 1.8rem;display:flex;gap:18px;align-items:flex-start;
        transition:transform .5s var(--ease),box-shadow .5s,border-color .3s}
      .pol::before{content:'';position:absolute;left:0;top:0;height:3px;width:100%;background:linear-gradient(90deg,var(--terra),var(--gold));transform:scaleX(0);transform-origin:left;transition:transform .6s var(--ease)}
      .pol:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);border-color:transparent}.pol:hover::before{transform:scaleX(1)}
      .pol-ic{width:54px;height:54px;flex-shrink:0;border-radius:16px;display:grid;place-items:center;background:rgba(194,86,46,.09);transition:transform .5s var(--ease),background .3s}
      .pol:hover .pol-ic{transform:rotate(-8deg) scale(1.08);background:rgba(194,86,46,.16)}
    `}</style>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.2rem" }}>
      {policies.map((p, i) => (
        <motion.div key={p.title} className="pol" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="pol-ic">
            <img src={p.icon} alt="" style={{ width: 24, filter: "invert(38%) sepia(60%) saturate(700%) hue-rotate(335deg) brightness(90%)" }} />
          </div>
          <div>
            <h3 style={{ margin: "0 0 6px", font: "700 1rem var(--font-body)", color: "var(--espresso)" }}>{p.title}</h3>
            <p style={{ margin: 0, color: "var(--mist)", fontSize: ".86rem", lineHeight: 1.7 }}>{p.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);
export default OurPolicy;