// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import emailjs from "emailjs-com";

// const Newsletter = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await emailjs.send(
//         "service_sapjsac",
//         "template_qeoeczs",
//         { user_email: email },
//         "lBDdwvZ7SzXzAp8Rt"
//       );
//       setSubmitted(true);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section style={{ margin: '3rem 0' }}>
//       <motion.div
//         style={{
//           background: 'linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 40%, var(--bark) 70%, var(--terra) 100%)',
//           borderRadius: 'var(--radius-xl)',
//           padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
//           position: 'relative',
//           overflow: 'hidden',
//           textAlign: 'center',
//         }}
//         initial={{ opacity: 0, y: 32 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: '-60px' }}
//         transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
//       >
//         {/* Decorative circles */}
//         {[
//           { size: 280, top: -80, right: -80, opacity: 0.06 },
//           { size: 180, bottom: -50, left: -50, opacity: 0.05 },
//           { size: 100, top: '40%', left: '25%', opacity: 0.03 },
//         ].map((c, i) => (
//           <div key={i} style={{
//             position: 'absolute',
//             width: c.size,
//             height: c.size,
//             borderRadius: '50%',
//             background: 'rgba(250,247,242,1)',
//             opacity: c.opacity,
//             top: c.top,
//             bottom: c.bottom,
//             left: c.left,
//             right: c.right,
//             pointerEvents: 'none',
//           }} />
//         ))}

//         {/* Grid pattern overlay */}
//         <div style={{
//           position: 'absolute',
//           inset: 0,
//           backgroundImage: 'radial-gradient(circle, rgba(250,247,242,0.06) 1px, transparent 1px)',
//           backgroundSize: '28px 28px',
//           pointerEvents: 'none',
//         }} />

//         <div style={{ position: 'relative', zIndex: 1 }}>
//           {/* Badge */}
//           <motion.span
//             style={{
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: 6,
//               background: 'rgba(250,247,242,0.12)',
//               border: '1px solid rgba(250,247,242,0.22)',
//               borderRadius: 'var(--radius-full)',
//               padding: '5px 18px',
//               fontFamily: 'var(--font-body)',
//               fontSize: '0.68rem',
//               fontWeight: 700,
//               letterSpacing: '0.2em',
//               color: 'rgba(250,247,242,0.75)',
//               textTransform: 'uppercase',
//               marginBottom: 16,
//             }}
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.15 }}
//           >
//             ✉️ Newsletter
//           </motion.span>

//           {/* Headline */}
//           <motion.h2
//             style={{
//               fontFamily: 'var(--font-display)',
//               fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
//               fontWeight: 600,
//               color: 'var(--cream)',
//               margin: '0 0 10px',
//               lineHeight: 1.2,
//               letterSpacing: '-0.02em',
//             }}
//             initial={{ opacity: 0, y: 14 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.22 }}
//           >
//             Subscribe & Get{' '}
//             <em style={{ color: 'rgba(250,247,242,0.75)', fontStyle: 'italic', fontWeight: 300 }}>20% Off</em>
//           </motion.h2>

//           <motion.p
//             style={{
//               fontFamily: 'var(--font-body)',
//               color: 'rgba(250,247,242,0.65)',
//               fontSize: '0.9rem',
//               maxWidth: 400,
//               margin: '0 auto 2rem',
//               lineHeight: 1.7,
//             }}
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.3 }}
//           >
//             Be the first to know about new arrivals, exclusive drops, and member-only offers.
//           </motion.p>

//           {/* Form */}
//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.38 }}
//           >
//             <AnimatePresence mode="wait">
//               {!submitted ? (
//                 <motion.form
//                   key="form"
//                   onSubmit={onSubmit}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   style={{
//                     display: 'flex',
//                     maxWidth: 480,
//                     margin: '0 auto',
//                     background: 'rgba(250,247,242,0.12)',
//                     backdropFilter: 'blur(12px)',
//                     border: '1px solid rgba(250,247,242,0.2)',
//                     borderRadius: 'var(--radius-full)',
//                     padding: 5,
//                     gap: 4,
//                   }}
//                 >
//                   <input
//                     type="email"
//                     placeholder="Enter your email address"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     required
//                     style={{
//                       flex: 1,
//                       background: 'transparent',
//                       border: 'none',
//                       outline: 'none',
//                       padding: '10px 18px',
//                       fontFamily: 'var(--font-body)',
//                       fontSize: '0.88rem',
//                       color: 'var(--cream)',
//                       minWidth: 0,
//                     }}
//                   />
//                   <style>{`.nl-inp::placeholder{color:rgba(250,247,242,0.45);}`}</style>
//                   <motion.button
//                     type="submit"
//                     disabled={loading}
//                     style={{
//                       background: 'var(--cream)',
//                       color: 'var(--espresso)',
//                       border: 'none',
//                       borderRadius: 'var(--radius-full)',
//                       padding: '10px 24px',
//                       fontFamily: 'var(--font-body)',
//                       fontSize: '0.76rem',
//                       fontWeight: 700,
//                       letterSpacing: '0.1em',
//                       textTransform: 'uppercase',
//                       cursor: loading ? 'not-allowed' : 'pointer',
//                       whiteSpace: 'nowrap',
//                       flexShrink: 0,
//                       opacity: loading ? 0.75 : 1,
//                     }}
//                     whileHover={{ background: '#fff' }}
//                     whileTap={{ scale: 0.97 }}
//                   >
//                     {loading ? '…' : 'Subscribe'}
//                   </motion.button>
//                 </motion.form>
//               ) : (
//                 <motion.div
//                   key="success"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//                   style={{
//                     display: 'inline-flex',
//                     alignItems: 'center',
//                     gap: 10,
//                     background: 'rgba(250,247,242,0.15)',
//                     border: '1px solid rgba(250,247,242,0.3)',
//                     borderRadius: 'var(--radius-full)',
//                     padding: '14px 28px',
//                   }}
//                 >
//                   <span style={{ fontSize: '1.2rem' }}>🎉</span>
//                   <span style={{ fontFamily: 'var(--font-body)', color: 'var(--cream)', fontWeight: 600, fontSize: '0.9rem' }}>
//                     You're in! Check your inbox.
//                   </span>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(250,247,242,0.35)', marginTop: 16 }}>
//             No spam, ever. Unsubscribe anytime.
//           </p>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Newsletter;


























































import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";

const Newsletter = () => {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async e => {
    e.preventDefault(); setLoading(true); setErr("");
    try {
      await emailjs.send("service_sapjsac", "template_qeoeczs", { user_email: email }, "lBDdwvZ7SzXzAp8Rt");
      setDone(true);
    } catch { setErr("Couldn't subscribe. Check your email address and try again."); }
    finally { setLoading(false); }
  };

  return (
    <section style={{ margin: "4rem 0" }}>
      <style>{`
        .nl-box{position:relative;overflow:hidden;text-align:center;border-radius:var(--radius-xl);padding:clamp(3rem,7vw,5rem) clamp(1.5rem,5vw,4rem);
          background:linear-gradient(120deg,var(--espresso),var(--espresso-mid),var(--terra-deep),var(--espresso));background-size:300% 300%;animation:nlg 14s ease infinite}
        @keyframes nlg{50%{background-position:100% 50%}}
        .nl-inp{flex:1;min-width:0;background:transparent;border:0;outline:0;padding:12px 20px;font:400 .92rem var(--font-body);color:var(--cream)}
        .nl-inp::placeholder{color:rgba(251,247,241,.5)}
        .nl-form{display:flex;max-width:500px;margin:0 auto;padding:6px;gap:6px;border-radius:999px;background:rgba(251,247,241,.1);
          border:1px solid rgba(251,247,241,.22);backdrop-filter:blur(12px);transition:border-color .3s,box-shadow .3s}
        .nl-form:focus-within{border-color:var(--gold);box-shadow:0 0 0 4px rgba(184,146,74,.2)}
      `}</style>
      <motion.div className="nl-box" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <div className="floaty" style={{ position: "absolute", top: -70, right: -70, width: 260, height: 260, borderRadius: "50%", background: "rgba(184,146,74,.18)", filter: "blur(40px)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(2rem,5vw,3.2rem)", color: "var(--cream)", margin: "0 0 12px", letterSpacing: "-.025em", lineHeight: 1.1 }}>
            Get 20% off your first order
          </h2>
          <p style={{ color: "rgba(251,247,241,.7)", maxWidth: 420, margin: "0 auto 2rem", lineHeight: 1.7, fontSize: ".94rem" }}>
            Join for early access to new drops and member-only offers. One email a week, no spam.
          </p>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form key="f" onSubmit={onSubmit} className="nl-form" exit={{ opacity: 0, scale: 0.95 }}>
                <input className="nl-inp" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" />
                <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.96 }} className="btn-terra" style={{ padding: "12px 26px", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Joining…" : "Get my 20%"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 380, damping: 18 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "14px 28px", borderRadius: 999, background: "rgba(251,247,241,.14)", border: "1px solid rgba(251,247,241,.3)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" opacity=".4" />
                  <motion.polyline points="7 12.5 10.5 16 17 8.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.5 }} />
                </svg>
                <span style={{ color: "var(--cream)", fontWeight: 600 }}>You're in. Check your inbox for your code.</span>
              </motion.div>
            )}
          </AnimatePresence>
          {err && <p role="alert" style={{ color: "#ffb4a2", fontSize: ".8rem", marginTop: 14 }}>{err}</p>}
        </div>
      </motion.div>
    </section>
  );
};
export default Newsletter;