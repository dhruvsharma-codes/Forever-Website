// import { assets } from "../assets/assets";
// import ContactForm from "../Components/Contactform";
// import Newsletter from "../Components/Newsletter";
// import Title from "../Components/Title";
// import { motion } from "framer-motion";

// const Contact = () => (
//   <>
//     <style>{`
//             .contact-page { padding-bottom:2rem; }
//             .contact-header { padding-top:2.5rem; border-top:2px solid #EDD8C4; text-align:center; margin-bottom:1rem; }
//             .contact-img { border-radius:16px; object-fit:cover; box-shadow:0 12px 40px rgba(61,35,24,0.15); }
//             .contact-card { background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:16px; padding:2rem 2.5rem; display:flex; flex-direction:column; gap:1.2rem; box-shadow:0 4px 16px rgba(61,35,24,0.07); align-self:flex-start; }
//             .contact-store { color:#7A4A38; font-size:1rem; font-weight:700; letter-spacing:0.04em; }
//             .contact-detail { color:#98A98E; font-size:0.86rem; line-height:1.8; }
//             .contact-hr { width:100%; height:1px; background:#EDD8C4; border:none; margin:4px 0; }
//             .explore-btn { display:inline-flex; align-items:center; gap:10px; background:transparent; color:#C96A42; border:2px solid #C96A42; padding:12px 28px; font-size:0.78rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; border-radius:50px; cursor:pointer; transition:background 0.3s, color 0.3s, transform 0.2s; align-self:flex-start; font-family:inherit; }
//             .explore-btn:hover { background:#C96A42; color:#F7EFE6; transform:translateY(-2px); }

//             /* Divider between sections */
//             .contact-section-divider {
//                 width: 100%;
//                 height: 1px;
//                 background: linear-gradient(90deg, transparent, #EDD8C4, transparent);
//                 margin: 2.5rem 0;
//             }
//         `}</style>

//     <div className="contact-page">
//       {/* ── HEADER ── */}
//       <div className="contact-header">
//         <Title text1="CONTACT" text2="US" />
//       </div>

//       {/* ── STORE INFO + IMAGE ── */}
//       <div className="flex flex-col justify-center gap-10 my-10 md:flex-row mb-12 items-start">
//         <motion.img
//           className="w-full md:max-w-[460px] contact-img"
//           src={assets.contact_img}
//           alt="contact"
//           initial={{ opacity: 0, x: -30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         />
//         <motion.div
//           className="contact-card flex-1"
//           initial={{ opacity: 0, x: 30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           <p className="contact-store">Our Store</p>
//           <p className="contact-detail">
//             857 Munda Mazra
//             <br />
//             YamunaNagar, Haryana, India
//           </p>
//           <hr className="contact-hr" />
//           <p className="contact-detail">
//             <span style={{ color: "#C96A42", fontWeight: 600 }}>Phone:</span>{" "}
//             +91 8053103060
//           </p>
//           <p className="contact-detail">
//             <span style={{ color: "#C96A42", fontWeight: 600 }}>Email:</span>{" "}
//             forever@shop.com
//           </p>
//           <p className="contact-detail">
//             <span style={{ color: "#C96A42", fontWeight: 600 }}>Hours:</span>{" "}
//             Mon–Sat, 9am – 8pm
//           </p>
//           <hr className="contact-hr" />
//           <p className="contact-store">Careers at Forever</p>
//           <p className="contact-detail">
//             Learn more about our teams and job openings.
//           </p>
//           <motion.button className="explore-btn" whileTap={{ scale: 0.96 }}>
//             Explore Jobs →
//           </motion.button>
//         </motion.div>
//       </div>

//       {/* ── DIVIDER ── */}
//       <div className="contact-section-divider" />

//       {/* ── CONTACT FORM ── */}
//       <ContactForm />

//       {/* ── NEWSLETTER ── */}
//       <Newsletter />
//     </div>
//   </>
// );

// export default Contact;
































import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import Newsletter from "../Components/Newsletter";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.append("access_key", "9cabbf2b-8e43-4017-86e1-0d49f4c6b811");
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);
    if (data.success) { setResult("success"); e.target.reset(); }
    else setResult("error");
  };

  const inputStyle = {
    width: '100%', background: 'white', border: '1.5px solid var(--cream-deeper)',
    borderRadius: 'var(--radius-md)', padding: '12px 16px',
    fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--espresso)',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.18s, box-shadow 0.18s',
  };

  return (
    <motion.div
      style={{ background: 'var(--cream)', border: '1.5px solid var(--cream-deeper)', borderRadius: 'var(--radius-xl)', padding: 'clamp(2rem, 4vw, 2.5rem)', maxWidth: 520, margin: '0 auto', boxShadow: 'var(--shadow-md)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <Title text1="SEND US" text2="A MESSAGE" />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--mist)', marginTop: 4 }}>
          We'll get back to you within 1–2 hours.
        </p>
      </div>

      {result === 'success' ? (
        <motion.div
          style={{ textAlign: 'center', padding: '2rem' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>✅</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--espresso)', marginBottom: 8, fontWeight: 600 }}>Message Sent!</h3>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '0.88rem' }}>
            Thank you for reaching out. We'll reply shortly.
          </p>
          <button onClick={() => setResult('')} className="btn-secondary" style={{ marginTop: 16 }}>Send Another</button>
        </motion.div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terra)', display: 'block', marginBottom: 6 }}>Full Name</label>
            <input name="name" type="text" required placeholder="Your name" style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--terra)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,106,66,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--cream-deeper)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terra)', display: 'block', marginBottom: 6 }}>Email Address</label>
            <input name="email" type="email" required placeholder="you@example.com" style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--terra)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,106,66,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--cream-deeper)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terra)', display: 'block', marginBottom: 6 }}>Message</label>
            <textarea name="message" required rows={4} placeholder="How can we help you?" style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
              onFocus={e => { e.target.style.borderColor = 'var(--terra)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,106,66,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--cream-deeper)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          {result === 'error' && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#ef4444', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '10px 14px', margin: 0 }}>
              Something went wrong. Please try again.
            </p>
          )}
          <motion.button
            type="submit"
            disabled={loading}
            className="btn-terra"
            style={{ width: '100%', justifyContent: 'center', marginTop: 4, opacity: loading ? 0.75 : 1 }}
            whileHover={!loading ? { scale: 1.01 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
          >
            {loading ? (
              <>
                <span style={{ width: 14, height: 14, border: '2px solid rgba(250,247,242,0.4)', borderTopColor: 'var(--cream)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                Sending…
              </>
            ) : 'Send Message →'}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

const Contact = () => (
  <>
    <style>{`
      .contact-page { padding-bottom: 2rem; }
      .contact-header { padding-top: 2.5rem; border-top: 2px solid var(--cream-deeper); text-align: center; margin-bottom: 1rem; }
      .contact-info-card {
        background: var(--cream);
        border: 1.5px solid var(--cream-deeper);
        border-radius: var(--radius-xl);
        padding: 2rem 2.5rem;
        flex: 1;
        box-shadow: var(--shadow-sm);
        align-self: flex-start;
      }
      .contact-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--cream-deeper); }
      .contact-row:last-of-type { border-bottom: none; }
      .contact-row-icon { width: 36px; height: 36px; border-radius: var(--radius-md); background: rgba(201,106,66,0.08); border: 1px solid rgba(201,106,66,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.9rem; }
      .explore-btn { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--terra); border: 2px solid var(--terra); padding: 11px 26px; font-family: var(--font-body); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; border-radius: var(--radius-full); cursor: pointer; transition: all 0.22s; margin-top: 16px; }
      .explore-btn:hover { background: var(--terra); color: var(--cream); transform: translateY(-2px); }
    `}</style>

    <div className="contact-page">
      <div className="contact-header">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* ── Store info + image ── */}
      <div className="flex flex-col justify-center gap-10 my-10 md:flex-row items-start">
        <motion.div
          style={{ flex: 1, borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', maxWidth: 460, flexShrink: 0 }}
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src={assets.contact_img} alt="Contact Forever" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
        </motion.div>

        <motion.div
          className="contact-info-card"
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--espresso)', margin: '0 0 16px', letterSpacing: '-0.01em' }}>Our Store</p>

          {[
            { icon: '📍', label: 'Address', value: '857 Munda Mazra, YamunaNagar, Haryana, India' },
            { icon: '📞', label: 'Phone', value: '+91 8053103060' },
            { icon: '✉️', label: 'Email', value: 'forever@shop.com' },
            { icon: '🕐', label: 'Hours', value: 'Monday–Saturday, 9am – 8pm IST' },
          ].map(({ icon, label, value }) => (
            <div key={label} className="contact-row">
              <div className="contact-row-icon">{icon}</div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terra)', margin: '0 0 3px' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--bark)', margin: 0, lineHeight: 1.5 }}>{value}</p>
              </div>
            </div>
          ))}

          <div style={{ borderTop: '1px solid var(--cream-deeper)', marginTop: 16, paddingTop: 16 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--espresso)', margin: '0 0 6px' }}>Careers at Forever</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--mist)', margin: 0 }}>Learn more about our teams and open positions.</p>
            <motion.button className="explore-btn" whileTap={{ scale: 0.96 }}>Explore Jobs →</motion.button>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="divider" style={{ margin: '3rem 0' }} />

      {/* ── Contact form ── */}
      <ContactForm />

      <Newsletter />
    </div>
  </>
);

export default Contact;