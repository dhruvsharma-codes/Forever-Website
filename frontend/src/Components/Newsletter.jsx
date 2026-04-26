// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import emailjs from "emailjs-com";

// const Newsletter = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [email, setEmail] = useState("");

//   // const onSubmit = (e) => {
//   //   e.preventDefault();
//   //   setSubmitted(true);
//   // };


//   const onSubmit = (e) => {
//   e.preventDefault();
  

//   emailjs.send(
//     "service_sapjsac",     // EmailJS service id
//     "template_qeoeczs",    // template id
//     {
//       user_email: email   // jo user ne input me dala
//     },
//     "lBDdwvZ7SzXzAp8Rt"      // public key
//   )
//   .then(() => {
//     setSubmitted(true);   // success hone ke baad UI change
//   })
//   .catch((err) => {
//     console.error(err);
//     alert("Email send nahi hua ❌");
//   });
// };

//   return (
//     <section style={{ margin: "3rem 0" }}>
//       <style>{`
//                 .nl-section {
//                     background: linear-gradient(135deg,#7A4A38 0%,#C96A42 50%,#7A4A38 100%);
//                     border-radius:22px;
//                     padding:3.5rem 2rem;
//                     text-align:center;
//                     position:relative; overflow:hidden;
//                 }
//                 .nl-section::before {
//                     content:''; position:absolute; top:-60px; right:-60px;
//                     width:210px; height:210px; border-radius:50%;
//                     background:rgba(247,239,230,0.06); pointer-events:none;
//                 }
//                 .nl-section::after {
//                     content:''; position:absolute; bottom:-40px; left:-40px;
//                     width:150px; height:150px; border-radius:50%;
//                     background:rgba(152,169,142,0.12); pointer-events:none;
//                 }
//                 .nl-form {
//                     display:flex; max-width:460px; margin:0 auto;
//                     background:#F7EFE6; border-radius:60px; overflow:hidden;
//                     box-shadow:0 8px 32px rgba(61,35,24,0.28);
//                     position:relative; z-index:1;
//                 }
//                 .nl-form input {
//                     flex:1; background:transparent; border:none; outline:none;
//                     padding:13px 20px; font-size:0.84rem; color:#7A4A38; min-width:0;
//                 }
//                 .nl-form input::placeholder { color:#98A98E; }
//                 .nl-form button {
//                     background:#3D2318; color:#F7EFE6; border:none;
//                     padding:13px 26px; font-size:0.72rem; font-weight:700;
//                     letter-spacing:0.14em; text-transform:uppercase;
//                     cursor:pointer; border-radius:0 60px 60px 0;
//                     white-space:nowrap; transition:background 0.2s;
//                 }
//                 .nl-form button:hover { background:#C96A42; }
//             `}</style>

//       <motion.div
//         className="nl-section"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-60px" }}
//         transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//       >
//         <motion.span
//           style={{
//             display: "inline-block",
//             background: "rgba(247,239,230,0.15)",
//             color: "#EDD8C4",
//             fontSize: "0.7rem",
//             letterSpacing: "0.2em",
//             fontWeight: 700,
//             padding: "5px 18px",
//             borderRadius: 60,
//             marginBottom: 16,
//             textTransform: "uppercase",
//             border: "1px solid rgba(247,239,230,0.22)",
//           }}
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.15, duration: 0.4 }}
//         >
//           Newsletter
//         </motion.span>

//         <motion.h2
//           style={{
//             color: "#F7EFE6",
//             fontFamily: "'Georgia',serif",
//             fontSize: "clamp(1.4rem,3vw,2rem)",
//             margin: "0 0 10px",
//             lineHeight: 1.3,
//           }}
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.22, duration: 0.5 }}
//         >
//           Subscribe & Get 20% Off
//         </motion.h2>

//         <motion.p
//           style={{
//             color: "rgba(247,239,230,0.75)",
//             fontSize: "0.88rem",
//             maxWidth: 400,
//             margin: "0 auto 1.8rem",
//             lineHeight: 1.7,
//           }}
//           initial={{ opacity: 0, y: 12 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//         >
//           Be the first to know about special launches, trends, and member-only
//           benefits.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//         >
//           {!submitted ? (
//             <form onSubmit={onSubmit} className="nl-form">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button type="submit">Subscribe</button>
//             </form>
//           ) : (
//             <motion.p
//               style={{
//                 color: "#F7EFE6",
//                 fontWeight: 700,
//                 fontSize: "1rem",
//                 letterSpacing: "0.06em",
//                 margin: 0,
//               }}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ type: "spring", stiffness: 400 }}
//             >
//               🎉 You're in! Check your inbox.
//             </motion.p>
//           )}
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default Newsletter;











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