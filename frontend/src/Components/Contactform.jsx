// import React from "react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// const ContactForm = () => {
//   const [result, setResult] = useState("");

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setResult("Sending....");
//     const formData = new FormData(event.target);
//     formData.append("access_key", "9cabbf2b-8e43-4017-86e1-0d49f4c6b811");

//     const response = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
//     if (data.success) {
//       setResult("Form Submitted Successfully");
//       event.target.reset();
//     } else {
//       setResult("Error");
//     }
//   };

//   return (
//     <>
//       <style>{`
//         .cf-card {
//           background: #F7EFE6;
//           border: 1.5px solid #EDD8C4;
//           border-radius: 20px;
//           padding: 2rem;
//           max-width: 500px;
//           margin: 50px auto;
//           box-shadow: 0 4px 20px rgba(61,35,24,0.08);
//         }
//         .cf-title {
//           font-size: 1.5rem;
//           color: #3D2318;
//           margin-bottom: 10px;
//         }
//         .cf-input, .cf-textarea {
//           width: 100%;
//           border: 1.5px solid #EDD8C4;
//           border-radius: 10px;
//           padding: 10px;
//           margin-bottom: 12px;
//           outline: none;
//         }
//         .cf-input:focus, .cf-textarea:focus {
//           border-color: #C96A42;
//         }
//         .cf-submit {
//           width: 100%;
//           background: #C96A42;
//           color: white;
//           border: none;
//           padding: 12px;
//           border-radius: 50px;
//           cursor: pointer;
//         }
//       `}</style>

//       <motion.div
//         className="cf-card"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="cf-title">Contact Us</h2>

//         <form onSubmit={onSubmit}>
//           <motion.input
//             type="text"
//             required
//             name="name"
//             placeholder="Your Name"
//             className="cf-input"
//             whileFocus={{ scale: 1.02 }}
//           />

//           <motion.input
//             type="email"
//             required
//             name="email"
//             placeholder="Your Email"
//             className="cf-input"
//             whileFocus={{ scale: 1.02 }}
//           />

//           <motion.textarea
//             name="message"
//             placeholder="Your Message"
//             required
//             rows={4}
//             className="cf-textarea"
//             whileFocus={{ scale: 1.01 }}
//           />

//           <motion.button
//             type="submit"
//             className="cf-submit"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//           >
//             Send Message
//           </motion.button>
//           <span>{result}</span>
//         </form>
//       </motion.div>
//     </>
//   );
// };

// export default ContactForm;















import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm = () => {
  const [result, setResult]   = useState(""); // "success" | "error" | ""
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    const formData = new FormData(e.target);
    formData.append("access_key", "9cabbf2b-8e43-4017-86e1-0d49f4c6b811");
    try {
      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) { setResult("success"); e.target.reset(); }
      else setResult("error");
    } catch { setResult("error"); }
    finally { setLoading(false); }
  };

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--terra)",
    marginBottom: 6,
  };

  const inputBase = {
    width: "100%",
    background: "white",
    border: "1.5px solid var(--cream-deeper)",
    borderRadius: "var(--radius-md)",
    padding: "12px 16px",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    color: "var(--espresso)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.18s, box-shadow 0.18s",
  };

  const onFocus = (e) => {
    e.target.style.borderColor  = "var(--terra)";
    e.target.style.boxShadow    = "0 0 0 3px rgba(201,106,66,0.1)";
  };
  const onBlur = (e) => {
    e.target.style.borderColor  = "var(--cream-deeper)";
    e.target.style.boxShadow    = "none";
  };

  return (
    <motion.div
      style={{
        background: "var(--cream)",
        border: "1.5px solid var(--cream-deeper)",
        borderRadius: "var(--radius-xl)",
        padding: "clamp(1.75rem, 4vw, 2.5rem)",
        maxWidth: 520,
        margin: "0 auto",
        boxShadow: "var(--shadow-md)",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Title */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 6 }}>
          Get In Touch
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 600, color: "var(--espresso)", margin: 0, letterSpacing: "-0.02em" }}>
          Send Us a Message
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--mist)", marginTop: 4 }}>
          We'll get back to you within 1–2 hours.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {result === "success" ? (
          /* ── Success state ── */
          <motion.div
            key="success"
            style={{ textAlign: "center", padding: "2.5rem 1rem" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <motion.div
              style={{ fontSize: "3.5rem", marginBottom: 16, display: "inline-block" }}
              animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              ✅
            </motion.div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--espresso)", marginBottom: 8, fontWeight: 600, letterSpacing: "-0.01em" }}>
              Message Sent!
            </h3>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--mist)", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 20 }}>
              Thank you for reaching out. We'll reply to your message shortly.
            </p>
            <motion.button
              onClick={() => setResult("")}
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send Another
            </motion.button>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.form
            key="form"
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Name */}
            <div>
              <label style={labelStyle}>Full Name</label>
              <motion.input
                name="name"
                type="text"
                required
                placeholder="Your full name"
                style={inputBase}
                onFocus={onFocus}
                onBlur={onBlur}
                whileFocus={{ scale: 1.005 }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <motion.input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                style={inputBase}
                onFocus={onFocus}
                onBlur={onBlur}
                whileFocus={{ scale: 1.005 }}
              />
            </div>

            {/* Subject */}
            <div>
              <label style={labelStyle}>Subject</label>
              <motion.input
                name="subject"
                type="text"
                placeholder="How can we help?"
                style={inputBase}
                onFocus={onFocus}
                onBlur={onBlur}
                whileFocus={{ scale: 1.005 }}
              />
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>Message</label>
              <motion.textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us more about your inquiry…"
                style={{ ...inputBase, resize: "vertical", minHeight: 110 }}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            {/* Error notice */}
            <AnimatePresence>
              {result === "error" && (
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 14px",
                    background: "rgba(239,68,68,0.07)",
                    border: "1px solid rgba(239,68,68,0.22)",
                    borderRadius: "var(--radius-md)",
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span style={{ fontSize: "1rem" }}>⚠️</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#dc2626", margin: 0, fontWeight: 500 }}>
                    Something went wrong. Please try again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="btn-terra"
              style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.75 : 1 }}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
            >
              {loading ? (
                <>
                  <span style={{ width: 14, height: 14, border: "2px solid rgba(250,247,242,0.4)", borderTopColor: "var(--cream)", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </>
              )}
            </motion.button>

            {/* Privacy note */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--mist)", textAlign: "center", margin: 0 }}>
              🔒 Your information is secure and never shared.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactForm;