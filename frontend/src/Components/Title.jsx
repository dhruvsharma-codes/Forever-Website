// import React from "react";
// import { motion } from "framer-motion";

// const Title = ({ text1, text2 }) => (
//   <motion.div
//     style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, marginBottom: 4 }}
//     initial={{ opacity: 0, y: 16 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true, margin: '-60px' }}
//     transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
//   >
//     <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
//       <span style={{
//         fontFamily: 'var(--font-display)',
//         fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
//         fontWeight: 300,
//         color: 'var(--mist)',
//         letterSpacing: '-0.01em',
//         lineHeight: 1,
//       }}>
//         {text1}
//       </span>
//       <span style={{
//         fontFamily: 'var(--font-display)',
//         fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
//         fontWeight: 700,
//         color: 'var(--espresso)',
//         letterSpacing: '-0.02em',
//         lineHeight: 1,
//       }}>
//         {text2}
//       </span>
//     </div>
//     {/* Animated underline */}
//     <motion.div
//       style={{ display: 'flex', gap: 4, alignItems: 'center' }}
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true }}
//       transition={{ delay: 0.15, duration: 0.4 }}
//     >
//       <motion.span
//         style={{ display: 'block', height: 2, background: 'var(--terra)', borderRadius: 2 }}
//         initial={{ width: 0 }}
//         whileInView={{ width: 40 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
//       />
//       <motion.span
//         style={{ display: 'block', height: 2, background: 'var(--sage)', borderRadius: 2 }}
//         initial={{ width: 0 }}
//         whileInView={{ width: 20 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
//       />
//     </motion.div>
//   </motion.div>
// );

// export default Title;
































































































import React from "react";
import { motion } from "framer-motion";

const Title = ({ text1, text2 }) => (
  <motion.div style={{ display: "inline-flex", flexDirection: "column", gap: 10 }}
    initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
    <h2 style={{ display: "flex", gap: 12, margin: 0, overflow: "hidden", lineHeight: 1.1 }}>
      {[[text1, 300, "var(--mist)"], [text2, 700, "var(--espresso)"]].map(([t, w, c], i) => (
        <motion.span key={i}
          variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } } }}
          style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: w, color: c, letterSpacing: "-0.02em", fontSize: "clamp(1.7rem,4vw,2.6rem)" }}>
          {t}
        </motion.span>
      ))}
    </h2>
    <motion.span
      variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] } } }}
      style={{ height: 2, width: 64, transformOrigin: "left", background: "linear-gradient(90deg,var(--terra),var(--gold))", borderRadius: 2 }} />
  </motion.div>
);
export default Title;