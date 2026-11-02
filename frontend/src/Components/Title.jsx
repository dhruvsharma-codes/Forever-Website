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