// import React, { useState } from 'react';



// const faqs = [
//   {
//     q: 'How long does delivery take?',
//     a: 'We deliver within 3–5 business days. In metro cities, it usually takes 2–3 days. Once your order is placed, a tracking link will be sent to you via SMS and email.',
//   },
//   {
//     q: 'Are the products 100% authentic?',
//     a: 'Absolutely! All our products are sourced directly from authorized distributors and brands. Every item goes through a quality check before dispatch. We guarantee authenticity.',
//   },
//   {
//     q: 'How can I return or exchange a product?',
//     a: 'You can request a return within 7 days of delivery. The product must be unused and in its original packaging. Simply contact our support team — the process is quick and hassle-free.',
//   },
//   {
//     q: 'What payment methods are accepted?',
//     a: 'We accept UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery. All transactions are SSL encrypted and 100% secure.',
//   },
//   {
//     q: 'Can I cancel my order?',
//     a: 'Yes, you can cancel your order before it is dispatched. You can do this from your account or by contacting us directly. Refunds are processed within 5–7 business days.',
//   },
//   {
//     q: 'Is gift wrapping available?',
//     a: 'Yes! You can select the "Gift Wrapping" option at checkout. We pack your order in beautiful handcrafted packaging — perfect for gifting.',
//   },
//   {
//     q: 'How can I contact customer support?',
//     a: 'You can reach us via WhatsApp, email, or through the Contact page on our website. We are available Monday to Sunday, 9 AM to 9 PM, and usually respond within 1–2 hours.',
//   },
// ];

// const ChevronIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="6 9 12 15 18 9" />
//   </svg>
// );

// const FAQ = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

//   return (
//     <>
//       <style>{`
//         .faq-section {
//           background-color: #FDF5EF;
//           padding: 4rem 2rem;
//         }
//         .faq-inner {
//           max-width: 760px;
//           margin: 0 auto;
//         }
//         .faq-header {
//           text-align: center;
//           margin-bottom: 2.5rem;
//         }
//         .faq-eyebrow {
//           font-size: 0.7rem;
//           font-weight: 600;
//           letter-spacing: 0.18em;
//           color: #D4755B;
//           text-transform: uppercase;
//           margin-bottom: 0.5rem;
//         }
//         .faq-title {
//           font-size: 1.75rem;
//           font-weight: 600;
//           color: #4A2E26;
//           margin-bottom: 0.5rem;
//         }
//         .faq-subtitle {
//           font-size: 0.9rem;
//           color: #8B5A4A;
//         }
//         .faq-list {
//           border: 1.5px solid #E8D5C4;
//           border-radius: 16px;
//           overflow: hidden;
//           background: #FFFDF9;
//         }
//         .faq-item {
//           border-bottom: 1px solid #F0E0D4;
//         }
//         .faq-item:last-child {
//           border-bottom: none;
//         }
//         .faq-question {
//           width: 100%;
//           background: transparent;
//           border: none;
//           padding: 1.1rem 1.4rem;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           cursor: pointer;
//           gap: 16px;
//           text-align: left;
//           transition: background 0.2s;
//         }
//         .faq-question:hover {
//           background: #FDF0E8;
//         }
//         .faq-question.open {
//           background: #FDF0E8;
//         }
//         .faq-q-text {
//           font-size: 0.88rem;
//           font-weight: 600;
//           color: #4A2E26;
//           letter-spacing: 0.01em;
//           line-height: 1.5;
//         }
//         .faq-chevron {
//           color: #D4755B;
//           flex-shrink: 0;
//           transition: transform 0.3s ease;
//         }
//         .faq-chevron.open {
//           transform: rotate(180deg);
//         }
//         .faq-answer {
//           overflow: hidden;
//           max-height: 0;
//           transition: max-height 0.35s ease, padding 0.3s ease;
//           padding: 0 1.4rem;
//         }
//         .faq-answer.open {
//           max-height: 200px;
//           padding: 0 1.4rem 1.1rem;
//         }
//         .faq-a-text {
//           font-size: 0.83rem;
//           color: #8B5A4A;
//           line-height: 1.75;
//           border-left: 2px solid #E8D5C4;
//           padding-left: 1rem;
//         }
//         .faq-cta {
//           text-align: center;
//           margin-top: 2rem;
//         }
//         .faq-cta p {
//           font-size: 0.85rem;
//           color: #8B5A4A;
//         }
//         .faq-cta a {
//           color: #D4755B;
//           font-weight: 600;
//           text-decoration: none;
//           border-bottom: 1px solid #E8A88F;
//           transition: color 0.2s;
//         }
//         .faq-cta a:hover {
//           color: #B85A3E;
//         }
//       `}</style>

//       <section className="faq-section">
//         <div className="faq-inner">
//           <div className="faq-header">
//             <p className="faq-eyebrow">Got Questions?</p>
//             <h2 className="faq-title">Frequently Asked Questions</h2>
//             <p className="faq-subtitle">Sabse common sawaalon ke jawab yahan hain</p>
//           </div>

//           <div className="faq-list">
//             {faqs.map((item, i) => {
//               const isOpen = openIndex === i;
//               return (
//                 <div className="faq-item" key={i}>
//                   <button
//                     className={`faq-question ${isOpen ? 'open' : ''}`}
//                     onClick={() => toggle(i)}
//                     aria-expanded={isOpen}
//                   >
//                     <span className="faq-q-text">{item.q}</span>
//                     <span className={`faq-chevron ${isOpen ? 'open' : ''}`}>
//                       <ChevronIcon />
//                     </span>
//                   </button>
//                   <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
//                     <p className="faq-a-text">{item.a}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="faq-cta">
//             <p>Aur koi sawaal? <a href="/contact">Hum se baat karein →</a></p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default FAQ;



import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
    { q:'How long does delivery take?', a:'We deliver within 3–5 business days. In metro cities, it usually takes 2–3 days. Once your order is placed, a tracking link will be sent to you via SMS and email.' },
    { q:'Are the products 100% authentic?', a:'Absolutely! All our products are sourced directly from authorized distributors and brands. Every item goes through a quality check before dispatch. We guarantee authenticity.' },
    { q:'How can I return or exchange a product?', a:'You can request a return within 7 days of delivery. The product must be unused and in its original packaging. Simply contact our support team — the process is quick and hassle-free.' },
    { q:'What payment methods are accepted?', a:'We accept UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery. All transactions are SSL encrypted and 100% secure.' },
    { q:'Can I cancel my order?', a:'Yes, you can cancel your order before it is dispatched. You can do this from your account or by contacting us directly. Refunds are processed within 5–7 business days.' },
    { q:'Is gift wrapping available?', a:'Yes! You can select the "Gift Wrapping" option at checkout. We pack your order in beautiful handcrafted packaging — perfect for gifting.' },
    { q:'How can I contact customer support?', a:'You can reach us via WhatsApp, email, or through the Contact page on our website. We are available Monday to Sunday, 9 AM to 9 PM, and usually respond within 1–2 hours.' },
]

const Chevron = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
)

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null)
    const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

    return (
        <section style={{ background:'#F0E8DF', padding:'4rem 2rem' }}>
            <div style={{ maxWidth:760, margin:'0 auto' }}>
                {/* Header */}
                <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
                    <motion.p
                        style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.18em', color:'#C96A42', textTransform:'uppercase', marginBottom:6 }}
                        initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4 }}
                    >Got Questions?</motion.p>
                    <motion.h2
                        style={{ fontSize:'1.75rem', fontWeight:700, color:'#3D2318', marginBottom:6, fontFamily:"'Georgia',serif" }}
                        initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.08, duration:0.45 }}
                    >Frequently Asked Questions</motion.h2>
                    <motion.p
                        style={{ fontSize:'0.9rem', color:'#7A4A38', margin:0 }}
                        initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.16, duration:0.4 }}
                    >Everything you need to know before you shop</motion.p>
                </div>

                {/* Accordion */}
                <motion.div
                    style={{ border:'1.5px solid #EDD8C4', borderRadius:16, overflow:'hidden', background:'#F7EFE6' }}
                    initial={{ opacity:0, y:24 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
                >
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i
                        return (
                            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #F0DDD0' : 'none' }}>
                                <motion.button
                                    style={{
                                        width:'100%', background: isOpen ? 'rgba(201,106,66,0.06)' : 'transparent',
                                        border:'none', padding:'1.1rem 1.4rem',
                                        display:'flex', justifyContent:'space-between', alignItems:'center',
                                        cursor:'pointer', gap:16, textAlign:'left',
                                        transition:'background 0.2s',
                                    }}
                                    onClick={() => toggle(i)}
                                    whileTap={{ scale:0.99 }}
                                >
                                    <span style={{ fontSize:'0.88rem', fontWeight:700, color: isOpen ? '#C96A42' : '#3D2318', letterSpacing:'0.01em', lineHeight:1.5 }}>
                                        {item.q}
                                    </span>
                                    <motion.span
                                        style={{ color:'#C96A42', flexShrink:0, display:'flex' }}
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration:0.28, ease:'easeInOut' }}
                                    >
                                        <Chevron />
                                    </motion.span>
                                </motion.button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="answer"
                                            initial={{ height:0, opacity:0 }}
                                            animate={{ height:'auto', opacity:1 }}
                                            exit={{ height:0, opacity:0 }}
                                            transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
                                            style={{ overflow:'hidden' }}
                                        >
                                            <div style={{ padding:'0 1.4rem 1.2rem' }}>
                                                <p style={{
                                                    fontSize:'0.83rem', color:'#7A4A38', lineHeight:1.75, margin:0,
                                                    borderLeft:'2px solid #EDD8C4', paddingLeft:'1rem',
                                                }}>
                                                    {item.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </motion.div>

                <motion.div
                    style={{ textAlign:'center', marginTop:'2rem' }}
                    initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.3, duration:0.4 }}
                >
                    <p style={{ fontSize:'0.85rem', color:'#7A4A38' }}>
                        Still have questions?{' '}
                        <a href="/contact" style={{ color:'#C96A42', fontWeight:700, textDecoration:'none', borderBottom:'1px solid #EDAC8E' }}>
                            Contact us →
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export default FAQ