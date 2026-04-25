// import React from "react";
// import { motion } from "framer-motion";

// const Title = ({ text1, text2 }) => {
//   return (
//     <motion.div
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 14,
//         marginBottom: 12,
//       }}
//       initial={{ opacity: 0, x: -20 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true, margin: "-60px" }}
//       transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//     >
//       <p
//         style={{
//           fontSize: "clamp(1.3rem,3vw,1.7rem)",
//           letterSpacing: "0.06em",
//           fontFamily: "'Georgia',serif",
//           margin: 0,
//         }}
//       >
//         <span style={{ color: "#98A98E", fontWeight: 400 }}>{text1} </span>
//         <span style={{ color: "#7A4A38", fontWeight: 700 }}>{text2}</span>
//       </p>
//       <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//         <motion.span
//           style={{
//             display: "block",
//             width: 46,
//             height: 2,
//             background: "#C96A42",
//             borderRadius: 2,
//           }}
//           initial={{ scaleX: 0, originX: 0 }}
//           whileInView={{ scaleX: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.45, delay: 0.15 }}
//         />
//         <motion.span
//           style={{
//             display: "block",
//             width: 28,
//             height: 2,
//             background: "#98A98E",
//             borderRadius: 2,
//           }}
//           initial={{ scaleX: 0, originX: 0 }}
//           whileInView={{ scaleX: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.45, delay: 0.25 }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// export default Title;





















import React from "react";
import { motion } from "framer-motion";

const Title = ({ text1, text2 }) => (
  <motion.div
    style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, marginBottom: 4 }}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
        fontWeight: 300,
        color: 'var(--mist)',
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}>
        {text1}
      </span>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
        fontWeight: 700,
        color: 'var(--espresso)',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        {text2}
      </span>
    </div>
    {/* Animated underline */}
    <motion.div
      style={{ display: 'flex', gap: 4, alignItems: 'center' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, duration: 0.4 }}
    >
      <motion.span
        style={{ display: 'block', height: 2, background: 'var(--terra)', borderRadius: 2 }}
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        style={{ display: 'block', height: 2, background: 'var(--sage)', borderRadius: 2 }}
        initial={{ width: 0 }}
        whileInView={{ width: 20 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  </motion.div>
);

export default Title;