// import React from "react";
// import Title from "../Components/Title";
// import { assets } from "../assets/assets.js";
// import Newsletter from "../Components/Newsletter";
// import { motion } from "framer-motion";

// const About = () => {
//   const cards = [
//     {
//       icon: "✦",
//       title: "Quality Assurance",
//       desc: "From selecting premium fabrics to ensuring precise stitching and finishing, every piece undergoes strict quality checks. We deliver clothing that meets and exceeds your expectations.",
//     },
//     {
//       icon: "⟡",
//       title: "Convenience",
//       desc: "We make shopping simple, fast, and stress-free. With an easy-to-navigate store, secure payments, and quick delivery, find your perfect outfit from home.",
//     },
//     {
//       icon: "◈",
//       title: "Exceptional Service",
//       desc: "Our customers are at the heart of everything we do. From browsing to delivery, our friendly support team is always ready to assist you every step of the way.",
//     },
//   ];

//   return (
//     <>
//       <style>{`
//                 .about-page { padding-bottom:2rem; }
//                 .about-header { padding-top:2rem; padding-bottom:1rem; border-top:2px solid #EDD8C4; text-align:center; }
//                 .about-img { border-radius:16px; object-fit:cover; box-shadow:0 12px 40px rgba(61,35,24,0.15); }
//                 .about-text { color:#98A98E; font-size:0.9rem; line-height:1.9; }
//                 .about-mission { color:#C96A42; font-weight:700; font-size:0.78rem; letter-spacing:0.16em; text-transform:uppercase; border-left:3px solid #C96A42; padding-left:10px; }
//                 .about-divider { width:100%; height:1px; background:linear-gradient(90deg,transparent,#EDD8C4,transparent); margin:2.5rem 0; }
//                 .why-card { flex:1; padding:2.5rem 2rem; background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:16px; display:flex; flex-direction:column; gap:14px; box-shadow:0 2px 10px rgba(61,35,24,0.06); }
//                 .why-icon { font-size:1.8rem; margin-bottom:4px; }
//                 .why-title { color:#7A4A38; font-size:0.9rem; font-weight:700; letter-spacing:0.04em; }
//                 .why-desc { color:#98A98E; font-size:0.84rem; line-height:1.8; }
//             `}</style>

//       <div className="about-page">
//         <div className="about-header">
//           <Title text1="ABOUT" text2="US" />
//         </div>

//         <div className="flex flex-col gap-16 my-10 md:flex-row items-center">
//           <motion.img
//             className="w-full md:max-w-110 about-img"
//             src={assets.about_img}
//             alt="about"
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           />
//           <motion.div
//             className="flex flex-col justify-center gap-5 md:w-1/2"
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             <p className="about-text">
//               At Forever, we believe fashion is more than just clothing — it's a
//               way to express who you are. Our collection blends timeless style
//               with modern trends, offering high-quality pieces that make you
//               feel confident and comfortable.
//             </p>
//             <p className="about-text">
//               We're more than just a clothing store — we're a community built on
//               style, self-expression, and confidence. Every piece is
//               thoughtfully designed and carefully crafted to bring you comfort,
//               quality, and individuality.
//             </p>
//             <div>
//               <p className="about-mission">Our Mission</p>
//               <p className="about-text mt-3">
//                 To empower individuals to embrace their unique style through
//                 high-quality, affordable fashion. We're committed to clothing
//                 that not only looks good but feels good, while promoting
//                 confidence and a sustainable future for fashion.
//               </p>
//             </div>
//           </motion.div>
//         </div>

//         <div className="about-divider" />

//         <div className="py-4 text-2xl">
//           <Title text1="WHY" text2="CHOOSE US" />
//         </div>

//         <div className="flex flex-col gap-4 mb-10 md:flex-row">
//           {cards.map((c, i) => (
//             <motion.div
//               key={i}
//               className="why-card"
//               initial={{ opacity: 0, y: 28 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1, duration: 0.5 }}
//               whileHover={{
//                 y: -5,
//                 borderColor: "#C96A42",
//                 boxShadow: "0 14px 36px rgba(61,35,24,0.14)",
//               }}
//             >
//               <span className="why-icon">{c.icon}</span>
//               <p className="why-title">{c.title}</p>
//               <p className="why-desc">{c.desc}</p>
//             </motion.div>
//           ))}
//         </div>

//         <Newsletter />
//       </div>
//     </>
//   );
// };

// export default About;
















// import React from "react";
// import Title from "../Components/Title";
// import { assets } from "../assets/assets";
// import Newsletter from "../Components/Newsletter";
// import { motion } from "framer-motion";

// const cards = [
//   {
//     emoji: "✦",
//     title: "Quality Assurance",
//     desc: "From selecting premium fabrics to ensuring precise stitching and finishing, every piece undergoes strict quality checks. We deliver clothing that meets and exceeds your expectations.",
//   },
//   {
//     emoji: "⟡",
//     title: "Convenience",
//     desc: "We make shopping simple, fast, and stress-free. With an easy-to-navigate store, secure payments, and quick delivery, find your perfect outfit from home.",
//   },
//   {
//     emoji: "◈",
//     title: "Exceptional Service",
//     desc: "Our customers are at the heart of everything we do. From browsing to delivery, our friendly support team is always ready to assist you every step of the way.",
//   },
// ];

// const stats = [
//   { value: "500+", label: "Products" },
//   { value: "10K+", label: "Happy Customers" },
//   { value: "4.9★", label: "Avg. Rating" },
//   { value: "7 Days", label: "Return Policy" },
// ];

// const About = () => (
//   <>
//     <style>{`
//       .about-page { padding-bottom: 2rem; }

//       .about-header {
//         padding-top: 2.5rem;
//         padding-bottom: 1rem;
//         border-top: 2px solid var(--cream-deeper);
//         text-align: center;
//       }

//       .about-img {
//         border-radius: var(--radius-xl);
//         object-fit: cover;
//         box-shadow: var(--shadow-xl);
//         width: 100%;
//         display: block;
//       }

//       .about-text {
//         font-family: var(--font-body);
//         color: var(--mist);
//         font-size: 0.9rem;
//         line-height: 1.85;
//       }

//       .about-mission-label {
//         font-family: var(--font-body);
//         color: var(--terra);
//         font-weight: 700;
//         font-size: 0.72rem;
//         letter-spacing: 0.18em;
//         text-transform: uppercase;
//         border-left: 3px solid var(--terra);
//         padding-left: 10px;
//         margin-bottom: 8px;
//       }

//       .why-card {
//         flex: 1;
//         padding: 2rem;
//         background: var(--cream);
//         border: 1.5px solid var(--cream-deeper);
//         border-radius: var(--radius-lg);
//         display: flex;
//         flex-direction: column;
//         gap: 12px;
//         box-shadow: var(--shadow-sm);
//         position: relative;
//         overflow: hidden;
//         transition: all 0.28s ease;
//       }
//       .why-card:hover {
//         border-color: rgba(201,106,66,0.4);
//         box-shadow: var(--shadow-lg);
//         transform: translateY(-5px);
//       }

//       .stat-card {
//         background: var(--cream);
//         border: 1.5px solid var(--cream-deeper);
//         border-radius: var(--radius-lg);
//         padding: 1.5rem;
//         text-align: center;
//         flex: 1;
//         min-width: 120px;
//       }
//     `}</style>

//     <div className="about-page">
//       <div className="about-header">
//         <Title text1="ABOUT" text2="US" />
//       </div>

//       {/* ── Hero section ── */}
//       <div className="flex flex-col gap-12 my-10 md:flex-row items-center">
//         <motion.div
//           style={{ flex: 1 }}
//           initial={{ opacity: 0, x: -28 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <img className="about-img" src={assets.about_img} alt="About Forever" />
//         </motion.div>

//         <motion.div
//           className="flex flex-col justify-center gap-5 md:w-1/2"
//           initial={{ opacity: 0, x: 28 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           <p className="about-text">
//             At Forever, we believe fashion is more than just clothing — it's a way to express who you are. Our collection blends timeless style with modern trends, offering high-quality pieces that make you feel confident and comfortable.
//           </p>
//           <p className="about-text">
//             We're more than just a clothing store — we're a community built on style, self-expression, and confidence. Every piece is thoughtfully designed and carefully crafted to bring you comfort, quality, and individuality.
//           </p>
//           <div>
//             <p className="about-mission-label">Our Mission</p>
//             <p className="about-text">
//               To empower individuals to embrace their unique style through high-quality, affordable fashion. We're committed to clothing that not only looks good but feels good, while promoting confidence and a sustainable future for fashion.
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       {/* ── Stats strip ── */}
//       <motion.div
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '1rem',
//           margin: '3rem 0',
//           padding: '2rem',
//           background: 'linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 50%, var(--bark) 100%)',
//           borderRadius: 'var(--radius-xl)',
//           position: 'relative',
//           overflow: 'hidden',
//         }}
//         initial={{ opacity: 0, y: 24 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.55 }}
//       >
//         {/* Dot grid */}
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(250,247,242,0.05) 1px, transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />
//         {stats.map(({ value, label }, i) => (
//           <motion.div key={label} style={{ flex: 1, minWidth: 120, textAlign: 'center', position: 'relative' }}
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: i * 0.08, duration: 0.4 }}
//           >
//             <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--cream)', margin: '0 0 4px', letterSpacing: '-0.02em', lineHeight: 1 }}>
//               {value}
//             </p>
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(250,247,242,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
//               {label}
//             </p>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* ── Why choose us ── */}
//       <div style={{ padding: '1rem 0 2rem' }}>
//         <div style={{ marginBottom: '2rem' }}>
//           <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 6 }}>
//             Our Commitment
//           </p>
//           <Title text1="WHY" text2="CHOOSE US" />
//         </div>

//         <div className="flex flex-col gap-4 mb-10 md:flex-row">
//           {cards.map((c, i) => (
//             <motion.div
//               key={i}
//               className="why-card"
//               initial={{ opacity: 0, y: 28 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1, duration: 0.5 }}
//             >
//               {/* Background emoji watermark */}
//               <span style={{
//                 position: 'absolute', bottom: -8, right: 16,
//                 fontSize: '5rem', opacity: 0.04,
//                 pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
//                 fontFamily: 'var(--font-display)',
//               }}>
//                 {c.emoji}
//               </span>

//               <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(201,106,66,0.08)', border: '1px solid rgba(201,106,66,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--terra)' }}>{c.emoji}</span>
//               </div>

//               <p style={{ fontFamily: 'var(--font-body)', color: 'var(--espresso)', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>{c.title}</p>
//               <p style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '0.84rem', lineHeight: 1.75, margin: 0 }}>{c.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <Newsletter />
//     </div>
//   </>
// );

// export default About;





















































































import React from "react";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import Newsletter from "../Components/Newsletter";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];
const reveal = (d = 0, x = 0) => ({ initial: { opacity: 0, y: 36, x }, whileInView: { opacity: 1, y: 0, x: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.9, delay: d, ease } });

const cards = [
  ["01", "Quality assurance", "Every piece is checked for fabric, stitching and finish before it ships, so what arrives matches what you saw."],
  ["02", "Convenience", "A simple store, secure payments and quick delivery. Find your outfit from home without the hassle."],
  ["03", "Real support", "A friendly team that helps from browsing to delivery, and sorts out problems without making you chase."],
];
const stats = [["500+", "Styles"], ["10K+", "Customers"], ["7 days", "Easy returns"], ["Free", "Shipping over ₹999"]];

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  return (
    <>
      <style>{`
        .ab-hero{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,6vw,5rem);align-items:center;margin:2.5rem 0 4rem}
        @media(max-width:820px){.ab-hero{grid-template-columns:1fr}}
        .ab-img{position:relative;border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-xl)}
        .ab-img img{display:block;width:100%;object-fit:cover}
        .ab-card{position:relative;overflow:hidden;padding:2.2rem 2rem;background:#fff;border:1px solid var(--cream-deeper);border-radius:var(--radius-lg);transition:transform .5s var(--ease),box-shadow .5s}
        .ab-card:hover{transform:translateY(-8px);box-shadow:var(--shadow-lg)}
        .ab-card b{position:absolute;right:18px;top:6px;font:700 4.5rem var(--font-display);color:rgba(194,86,46,.08);line-height:1}
      `}</style>

      <div style={{ borderTop: "2px solid var(--cream-deeper)", paddingTop: "2.5rem", textAlign: "center" }}><Title text1="ABOUT" text2="US" /></div>

      <section className="ab-hero">
        <motion.div className="ab-img" {...reveal(0, -40)}>
          <motion.img style={{ y }} src={assets.about_img} alt="Forever" />
        </motion.div>
        <motion.div {...reveal(0.1, 40)} style={{ display: "grid", gap: 20 }}>
          <p style={{ margin: 0, font: "300 clamp(1.5rem,2.6vw,2.1rem)/1.35 var(--font-display)", color: "var(--espresso)", letterSpacing: "-.02em" }}>
            Fashion is a way to say who you are. We make it <em style={{ fontWeight: 600, color: "var(--terra)" }}>easy to say it well.</em>
          </p>
          <p style={{ margin: 0, color: "var(--mist)", lineHeight: 1.9 }}>Forever blends timeless style with modern trends. Every piece is chosen for how it looks, how it feels and how long it lasts, so you can dress with confidence every day.</p>
          <div style={{ paddingLeft: 18, borderLeft: "3px solid var(--terra)" }}>
            <p style={{ margin: "0 0 6px", font: "800 .72rem var(--font-body)", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--terra)" }}>Our mission</p>
            <p style={{ margin: 0, color: "var(--bark)", lineHeight: 1.85 }}>To help people embrace their own style through high-quality, affordable clothing that looks good and feels good.</p>
          </div>
        </motion.div>
      </section>

      <motion.section {...reveal()} style={{ position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 20, padding: "2.6rem 2rem", borderRadius: "var(--radius-xl)", background: "linear-gradient(125deg,var(--espresso),var(--espresso-mid) 55%,var(--terra-deep))" }}>
        {stats.map(([v, l], i) => (
          <motion.div key={l} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }} style={{ textAlign: "center" }}>
            <p style={{ margin: 0, font: "700 clamp(1.8rem,3.4vw,2.6rem)/1 var(--font-display)", color: "var(--cream)", letterSpacing: "-.02em" }}>{v}</p>
            <p style={{ margin: "8px 0 0", font: "700 .68rem var(--font-body)", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(251,247,241,.55)" }}>{l}</p>
          </motion.div>
        ))}
      </motion.section>

      <section style={{ margin: "5rem 0 3rem" }}>
        <div style={{ marginBottom: "2rem" }}><Title text1="WHY" text2="CHOOSE US" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.2rem" }}>
          {cards.map(([n, t, d], i) => (
            <motion.div key={n} className="ab-card" {...reveal(i * 0.12)}>
              <b>{n}</b>
              <h3 style={{ margin: "0 0 10px", font: "600 1.3rem var(--font-display)", color: "var(--espresso)" }}>{t}</h3>
              <p style={{ margin: 0, color: "var(--mist)", lineHeight: 1.8, fontSize: ".9rem" }}>{d}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Newsletter />
    </>
  );
};
export default About;