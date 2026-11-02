import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange",
    desc: "Hassle-free exchange on all orders within 7 days of delivery.",
    emoji: "🔄",
  },
  {
    icon: assets.quality_icon,
    title: "7-Day Returns",
    desc: "Not satisfied? Return within 7 days for a full refund, no questions asked.",
    emoji: "↩️",
  },
  {
    icon: assets.support_img,
    title: "24/7 Support",
    desc: "Our team is always here to help you — chat, call, or email anytime.",
    emoji: "💬",
  },
];

const OurPolicy = () => (
  <section style={{ margin: '3rem 0' }}>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1rem',
    }}>
      {policies.map((p, i) => (
        <motion.div
          key={i}
          style={{
            background: 'var(--cream)',
            border: '1.5px solid var(--cream-deeper)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: 'var(--shadow-sm)',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -5, borderColor: 'rgba(201,106,66,0.4)', boxShadow: 'var(--shadow-lg)' }}
        >
          {/* Background emoji watermark */}
          <span style={{
            position: 'absolute',
            bottom: -8,
            right: 12,
            fontSize: '4.5rem',
            opacity: 0.05,
            pointerEvents: 'none',
            userSelect: 'none',
            lineHeight: 1,
          }}>
            {p.emoji}
          </span>

          {/* Icon */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(201,106,66,0.08)',
            border: '1px solid rgba(201,106,66,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img src={p.icon} alt={p.title} style={{
              width: 22,
              filter: 'invert(42%) sepia(40%) saturate(500%) hue-rotate(330deg) brightness(85%)',
            }} />
          </div>

          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--espresso)',
              fontSize: '0.9rem',
              fontWeight: 700,
              margin: '0 0 6px',
              letterSpacing: '0.01em',
            }}>
              {p.title}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--mist)',
              fontSize: '0.83rem',
              lineHeight: 1.65,
              margin: 0,
            }}>
              {p.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default OurPolicy;