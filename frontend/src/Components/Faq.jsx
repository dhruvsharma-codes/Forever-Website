// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const faqs = [
//   { q: "How long does delivery take?", a: "We deliver within 3–5 business days. In metro cities, it usually takes 2–3 days. Once your order is placed, a tracking link will be sent to you via SMS and email." },
//   { q: "Are the products 100% authentic?", a: "Absolutely! All our products are sourced directly from authorized distributors and brands. Every item goes through a quality check before dispatch. We guarantee authenticity." },
//   { q: "How can I return or exchange a product?", a: "You can request a return within 7 days of delivery. The product must be unused and in its original packaging. Simply contact our support team — the process is quick and hassle-free." },
//   { q: "What payment methods are accepted?", a: "We accept UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery. All transactions are SSL encrypted and 100% secure." },
//   { q: "Can I cancel my order?", a: "Yes, you can cancel your order before it is dispatched. You can do this from your account or by contacting us directly. Refunds are processed within 5–7 business days." },
//   { q: "Is gift wrapping available?", a: "Yes! You can select the \"Gift Wrapping\" option at checkout. We pack your order in beautiful handcrafted packaging — perfect for gifting." },
//   { q: "How can I contact customer support?", a: "You can reach us via WhatsApp, email, or through the Contact page on our website. We are available Monday to Sunday, 9 AM to 9 PM, and usually respond within 1–2 hours." },
// ];

// const FAQ = () => {
//   const [openIndex, setOpenIndex] = useState(null);
//   const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

//   return (
//     <section style={{ background: 'var(--cream-dark)', padding: '5rem 2rem', margin: '4rem -2rem' }}>
//       <div style={{ maxWidth: 760, margin: '0 auto' }}>
//         {/* Header */}
//         <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
//           <motion.p
//             style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--terra)', textTransform: 'uppercase', marginBottom: 8 }}
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             Got Questions?
//           </motion.p>
//           <motion.h2
//             style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 600, color: 'var(--espresso)', marginBottom: 8, letterSpacing: '-0.02em' }}
//             initial={{ opacity: 0, y: 14 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.08 }}
//           >
//             Frequently Asked Questions
//           </motion.h2>
//           <motion.p
//             style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--mist)' }}
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.16 }}
//           >
//             Everything you need to know before you shop
//           </motion.p>
//         </div>

//         {/* Accordion */}
//         <motion.div
//           style={{ border: '1.5px solid var(--cream-deeper)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--cream)', boxShadow: 'var(--shadow-md)' }}
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.55 }}
//         >
//           {faqs.map((item, i) => {
//             const isOpen = openIndex === i;
//             return (
//               <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--cream-deeper)' : 'none' }}>
//                 <motion.button
//                   style={{
//                     width: '100%',
//                     background: isOpen ? 'rgba(201,106,66,0.04)' : 'transparent',
//                     border: 'none',
//                     padding: '1.2rem 1.5rem',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     cursor: 'pointer',
//                     gap: 16,
//                     textAlign: 'left',
//                     transition: 'background 0.2s',
//                   }}
//                   onClick={() => toggle(i)}
//                   whileTap={{ scale: 0.99 }}
//                 >
//                   <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: isOpen ? 700 : 600, color: isOpen ? 'var(--terra)' : 'var(--espresso)', lineHeight: 1.5, letterSpacing: '0.01em' }}>
//                     {item.q}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: isOpen ? 45 : 0 }}
//                     transition={{ duration: 0.25, ease: 'easeInOut' }}
//                     style={{ width: 24, height: 24, borderRadius: '50%', background: isOpen ? 'var(--terra)' : 'var(--cream-dark)', border: `1.5px solid ${isOpen ? 'var(--terra)' : 'var(--cream-deeper)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: isOpen ? 'var(--cream)' : 'var(--bark)', transition: 'background 0.2s, border-color 0.2s, color 0.2s' }}
//                   >
//                     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                       <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//                     </svg>
//                   </motion.div>
//                 </motion.button>

//                 <AnimatePresence initial={false}>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
//                       style={{ overflow: 'hidden' }}
//                     >
//                       <div style={{ padding: '0 1.5rem 1.3rem' }}>
//                         <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'var(--mist)', lineHeight: 1.8, margin: 0, borderLeft: '2px solid var(--cream-deeper)', paddingLeft: '1rem' }}>
//                           {item.a}
//                         </p>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })}
//         </motion.div>

//         <motion.div
//           style={{ textAlign: 'center', marginTop: '2rem' }}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.3 }}
//         >
//           <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'var(--mist)' }}>
//             Still have questions?{' '}
//             <a href="/contact" style={{ color: 'var(--terra)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
//               Contact us →
//             </a>
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;















































































import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  ["How long does delivery take?", "3–5 business days, usually 2–3 in metro cities. You'll get a tracking link by SMS and email once your order ships."],
  ["Are the products 100% authentic?", "Yes. Everything comes from authorised distributors and passes a quality check before dispatch."],
  ["How can I return or exchange a product?", "Request a return within 7 days of delivery. The item must be unused and in its original packaging. Contact support and we'll arrange pickup."],
  ["What payment methods are accepted?", "UPI (GPay, PhonePe, Paytm), cards, net banking and cash on delivery. All online payments are SSL encrypted."],
  ["Can I cancel my order?", "Yes, any time before it ships, from your account or by contacting us. Refunds take 5–7 business days."],
  ["Is gift wrapping available?", "Yes. Choose \"Gift Wrapping\" at checkout and we'll pack your order in handcrafted packaging."],
  ["How can I contact support?", "Use WhatsApp, email or the Contact page. We're available daily, 9 AM to 9 PM, and reply within 1–2 hours."],
];

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: "var(--cream-dark)", padding: "5rem 2rem", margin: "4rem -2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "var(--espresso)", margin: "0 0 2.5rem", letterSpacing: "-.02em" }}>
          Questions before you buy
        </motion.h2>
        <div style={{ display: "grid", gap: 12 }}>
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i} layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}
                style={{ background: "#fff", borderRadius: 18, border: `1px solid ${isOpen ? "var(--terra)" : "var(--cream-deeper)"}`,
                  boxShadow: isOpen ? "var(--shadow-md)" : "none", overflow: "hidden", transition: "border-color .3s, box-shadow .3s" }}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "20px 24px", background: "none", border: 0, cursor: "pointer", textAlign: "left" }}>
                  <span style={{ font: `${isOpen ? 700 : 600} .95rem var(--font-body)`, color: isOpen ? "var(--terra)" : "var(--espresso)" }}>{q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0, background: isOpen ? "var(--terra)" : "var(--cream-dark)", color: isOpen ? "#fff" : "var(--bark)" }}
                    style={{ width: 28, height: 28, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: "1.1rem", flexShrink: 0 }}>+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                      <p style={{ margin: 0, padding: "0 24px 22px", color: "var(--mist)", lineHeight: 1.8, fontSize: ".9rem" }}>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default FAQ;