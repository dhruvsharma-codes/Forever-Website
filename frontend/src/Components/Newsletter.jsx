import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_sapjsac",
        "template_qeoeczs",
        { user_email: email },
        "lBDdwvZ7SzXzAp8Rt"
      );
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ margin: '3rem 0' }}>
      <motion.div
        style={{
          background: 'linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 40%, var(--bark) 70%, var(--terra) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative circles */}
        {[
          { size: 280, top: -80, right: -80, opacity: 0.06 },
          { size: 180, bottom: -50, left: -50, opacity: 0.05 },
          { size: 100, top: '40%', left: '25%', opacity: 0.03 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: c.size,
            height: c.size,
            borderRadius: '50%',
            background: 'rgba(250,247,242,1)',
            opacity: c.opacity,
            top: c.top,
            bottom: c.bottom,
            left: c.left,
            right: c.right,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(250,247,242,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <motion.span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(250,247,242,0.12)',
              border: '1px solid rgba(250,247,242,0.22)',
              borderRadius: 'var(--radius-full)',
              padding: '5px 18px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: 'rgba(250,247,242,0.75)',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            ✉️ Newsletter
          </motion.span>

          {/* Headline */}
          <motion.h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              fontWeight: 600,
              color: 'var(--cream)',
              margin: '0 0 10px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22 }}
          >
            Subscribe & Get{' '}
            <em style={{ color: 'rgba(250,247,242,0.75)', fontStyle: 'italic', fontWeight: 300 }}>20% Off</em>
          </motion.h2>

          <motion.p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(250,247,242,0.65)',
              fontSize: '0.9rem',
              maxWidth: 400,
              margin: '0 auto 2rem',
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Be the first to know about new arrivals, exclusive drops, and member-only offers.
          </motion.p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.38 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    display: 'flex',
                    maxWidth: 480,
                    margin: '0 auto',
                    background: 'rgba(250,247,242,0.12)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(250,247,242,0.2)',
                    borderRadius: 'var(--radius-full)',
                    padding: 5,
                    gap: 4,
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      padding: '10px 18px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--cream)',
                      minWidth: 0,
                    }}
                  />
                  <style>{`.nl-inp::placeholder{color:rgba(250,247,242,0.45);}`}</style>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: 'var(--cream)',
                      color: 'var(--espresso)',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '10px 24px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      opacity: loading ? 0.75 : 1,
                    }}
                    whileHover={{ background: '#fff' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {loading ? '…' : 'Subscribe'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'rgba(250,247,242,0.15)',
                    border: '1px solid rgba(250,247,242,0.3)',
                    borderRadius: 'var(--radius-full)',
                    padding: '14px 28px',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🎉</span>
                  <span style={{ fontFamily: 'var(--font-body)', color: 'var(--cream)', fontWeight: 600, fontSize: '0.9rem' }}>
                    You're in! Check your inbox.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(250,247,242,0.35)', marginTop: 16 }}>
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;