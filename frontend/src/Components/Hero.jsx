// import React from "react";
// import { assets } from "../assets/assets";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// /* ── Stagger helpers ─────────────────────────────────────────────────────── */
// const stagger = {
//   container: { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } },
//   item: {
//     initial: { opacity: 0, y: 28 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
//   },
// }

// const Hero = () => (
//   <>
//     <style>{`
//       .hero-wrap {
//         min-height: calc(100vh - 108px);
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         overflow: hidden;
//         position: relative;
//         background: var(--cream);
//       }
//       @media (max-width: 768px) {
//         .hero-wrap {
//           grid-template-columns: 1fr;
//           min-height: auto;
//         }
//       }

//       /* ── Left panel ── */
//       .hero-left {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         padding: clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem);
//         background:
//           radial-gradient(ellipse at 30% 60%, rgba(201, 106, 66, 0.1) 0%, transparent 60%),
//           radial-gradient(ellipse at 80% 10%, rgba(143, 168, 136, 0.08) 0%, transparent 50%),
//           var(--cream);
//         position: relative;
//         overflow: hidden;
//       }

//       /* Background watermark text */
//       .hero-watermark {
//         position: absolute;
//         bottom: -20px;
//         left: -10px;
//         font-family: var(--font-display);
//         font-size: clamp(6rem, 14vw, 12rem);
//         font-weight: 700;
//         color: transparent;
//         -webkit-text-stroke: 1px rgba(201, 106, 66, 0.08);
//         pointer-events: none;
//         user-select: none;
//         line-height: 1;
//         white-space: nowrap;
//       }

//       .hero-content {
//         position: relative;
//         z-index: 1;
//         max-width: 440px;
//       }

//       /* ── Eyebrow ── */
//       .hero-eyebrow {
//         display: inline-flex;
//         align-items: center;
//         gap: 10px;
//         margin-bottom: 20px;
//       }
//       .hero-eyebrow-line {
//         width: 32px;
//         height: 2px;
//         background: var(--terra);
//         border-radius: 2px;
//         display: block;
//       }
//       .hero-eyebrow-text {
//         font-size: 0.68rem;
//         font-weight: 700;
//         letter-spacing: 0.22em;
//         text-transform: uppercase;
//         color: var(--terra);
//         font-family: var(--font-body);
//       }

//       /* ── Headline ── */
//       .hero-h1 {
//         font-family: var(--font-display);
//         font-size: clamp(3rem, 6vw, 5.5rem);
//         font-weight: 300;
//         line-height: 1.0;
//         color: var(--espresso);
//         margin: 0 0 8px;
//         letter-spacing: -0.03em;
//       }
//       .hero-h1 em {
//         font-style: italic;
//         font-weight: 600;
//         color: var(--terra);
//       }
//       .hero-h1-accent {
//         font-family: var(--font-display);
//         font-size: clamp(3rem, 6vw, 5.5rem);
//         font-weight: 700;
//         line-height: 1.0;
//         color: var(--espresso);
//         display: block;
//         letter-spacing: -0.03em;
//       }

//       /* ── Subtext ── */
//       .hero-sub {
//         font-size: 0.92rem;
//         color: var(--mist);
//         line-height: 1.75;
//         max-width: 340px;
//         margin: 16px 0 36px;
//         font-family: var(--font-body);
//         font-weight: 400;
//       }

//       /* ── CTA group ── */
//       .hero-ctas {
//         display: flex;
//         align-items: center;
//         gap: 16px;
//         flex-wrap: wrap;
//       }

//       /* ── Stats row ── */
//       .hero-stats {
//         display: flex;
//         gap: 28px;
//         margin-top: 48px;
//         padding-top: 32px;
//         border-top: 1px solid var(--cream-deeper);
//       }
//       .hero-stat-value {
//         font-family: var(--font-display);
//         font-size: 1.7rem;
//         font-weight: 700;
//         color: var(--espresso);
//         line-height: 1;
//         letter-spacing: -0.02em;
//       }
//       .hero-stat-label {
//         font-size: 0.68rem;
//         color: var(--mist);
//         font-weight: 500;
//         letter-spacing: 0.1em;
//         text-transform: uppercase;
//         margin-top: 3px;
//       }

//       /* ── Right image panel ── */
//       .hero-right {
//         position: relative;
//         overflow: hidden;
//         min-height: 480px;
//         background: var(--cream-dark);
//       }
//       @media (max-width: 768px) {
//         .hero-right { min-height: 60vw; }
//       }
//       .hero-img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         object-position: top center;
//         display: block;
//         transition: transform 8s ease;
//       }
//       .hero-right:hover .hero-img { transform: scale(1.03); }

//       /* Overlay gradient on image */
//       .hero-img-overlay {
//         position: absolute;
//         inset: 0;
//         background: linear-gradient(to right, rgba(250, 247, 242, 0.25) 0%, transparent 30%);
//         pointer-events: none;
//       }

//       /* ── Floating glass card on image ── */
//       .hero-glass-card {
//         position: absolute;
//         bottom: 32px;
//         left: 28px;
//         background: rgba(250, 247, 242, 0.82);
//         backdrop-filter: blur(20px) saturate(160%);
//         -webkit-backdrop-filter: blur(20px) saturate(160%);
//         border: 1px solid rgba(212, 197, 176, 0.5);
//         border-radius: 16px;
//         padding: 16px 20px;
//         min-width: 180px;
//         box-shadow: 0 8px 32px rgba(44, 24, 16, 0.15);
//       }
//       .hero-glass-card-title {
//         font-size: 0.68rem;
//         font-weight: 700;
//         letter-spacing: 0.14em;
//         text-transform: uppercase;
//         color: var(--mist);
//         margin: 0 0 6px;
//         font-family: var(--font-body);
//       }
//       .hero-glass-card-value {
//         font-family: var(--font-display);
//         font-size: 1.5rem;
//         font-weight: 700;
//         color: var(--terra);
//         margin: 0;
//         line-height: 1;
//       }
//       .hero-glass-card-sub {
//         font-size: 0.74rem;
//         color: var(--bark);
//         margin: 4px 0 0;
//         font-family: var(--font-body);
//       }

//       /* ── Season badge ── */
//       .hero-season-badge {
//         position: absolute;
//         top: 24px;
//         right: 24px;
//         background: var(--espresso);
//         color: var(--cream);
//         font-family: var(--font-body);
//         font-size: 0.65rem;
//         font-weight: 700;
//         letter-spacing: 0.14em;
//         text-transform: uppercase;
//         padding: 6px 16px;
//         border-radius: var(--radius-full);
//         box-shadow: var(--shadow-md);
//       }
//     `}</style>

//     <section className="hero-wrap">
//       {/* ── LEFT ── */}
//       <div className="hero-left">
//         {/* Background watermark */}
//         <span className="hero-watermark" aria-hidden="true">Forever</span>

//         <motion.div
//           className="hero-content"
//           variants={stagger.container}
//           initial="initial"
//           animate="animate"
//         >
//           {/* Eyebrow */}
//           <motion.div className="hero-eyebrow" variants={stagger.item}>
//             <span className="hero-eyebrow-line" />
//             <span className="hero-eyebrow-text">New Season · 2025</span>
//           </motion.div>

//           {/* Headline */}
//           <motion.h1 className="hero-h1" variants={stagger.item}>
//             Latest
//             <br />
//             <em>Arrivals</em>
//             <br />
//             <span className="hero-h1-accent" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: 'var(--bark)', fontWeight: 300 }}>
//               Are Here
//             </span>
//           </motion.h1>

//           {/* Subtext */}
//           <motion.p className="hero-sub" variants={stagger.item}>
//             Curated fashion that speaks to your sense of self. Premium fabrics, 
//             timeless cuts, and contemporary style—all in one place.
//           </motion.p>

//           {/* CTAs */}
//           <motion.div className="hero-ctas" variants={stagger.item}>
//             <Link to="/collection" className="btn-terra">
//               Shop Now
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
//                 <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
//               </svg>
//             </Link>
//             <Link to="/summer-sale" className="btn-secondary">
//               ☀️ Summer Sale
//             </Link>
//           </motion.div>

//           {/* Stats */}
//           <motion.div className="hero-stats" variants={stagger.item}>
//             {[
//               { value: '500+', label: 'Products' },
//               { value: '10K+', label: 'Customers' },
//               { value: '4.9★', label: 'Rating' },
//             ].map(({ value, label }) => (
//               <div key={label}>
//                 <div className="hero-stat-value">{value}</div>
//                 <div className="hero-stat-label">{label}</div>
//               </div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* ── RIGHT ── */}
//       <motion.div
//         className="hero-right"
//         initial={{ opacity: 0, scale: 1.06 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
//       >
//         <img src={assets.HeroImgNew} alt="Latest collection" className="hero-img" />

//         {/* Gradient overlay */}
//         <div className="hero-img-overlay" />

//         {/* Season badge */}
//         <motion.div
//           className="hero-season-badge"
//           initial={{ opacity: 0, y: -12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.5 }}
//         >
//           New Season ✦
//         </motion.div>

//         {/* Glass info card */}
//         <motion.div
//           className="hero-glass-card"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//         >
//           <p className="hero-glass-card-title">Summer Sale</p>
//           <p className="hero-glass-card-value">10% Off</p>
//           <p className="hero-glass-card-sub">Bottomwear & Winterwear</p>
//         </motion.div>
//       </motion.div>
//     </section>
//   </>
// );

// export default Hero;




























import React from "react";
import { assets } from "../assets/assets";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Link } from "react-router-dom";

const ease = [0.16, 1, 0.3, 1];
const word = { hidden: { y: "115%", rotate: 4 }, show: { y: 0, rotate: 0, transition: { duration: 0.9, ease } } };
const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
const MARQUEE = ["Free shipping over ₹999", "Summer Sale 10% off", "7-day easy returns", "New season arrivals", "Premium fabrics"];

const Line = ({ children, style }) => (
  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
    <motion.span variants={word} style={{ display: "block", ...style }}>{children}</motion.span>
  </span>
);

const Hero = () => {
  // mouse parallax on the image
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 }), sy = useSpring(my, { stiffness: 60, damping: 20 });
  const imgX = useTransform(sx, [-1, 1], [-18, 18]), imgY = useTransform(sy, [-1, 1], [-14, 14]);
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 600], [0, 80]);
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1); my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <>
      <style>{`
        .h-wrap{display:grid;grid-template-columns:1.05fr 1fr;min-height:calc(100vh - 108px);background:var(--cream);position:relative;overflow:hidden}
        @media(max-width:860px){.h-wrap{grid-template-columns:1fr}}
        .h-left{position:relative;display:flex;align-items:center;padding:clamp(2.5rem,6vw,6rem) clamp(1.5rem,5vw,5rem);
          background:radial-gradient(circle at 20% 80%,rgba(194,86,46,.12),transparent 55%),radial-gradient(circle at 90% 5%,rgba(184,146,74,.14),transparent 45%)}
        .h-orb{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;animation:floaty 7s ease-in-out infinite}
        .h-h1{font-family:var(--font-display);font-weight:300;font-size:clamp(3.2rem,7vw,6.2rem);line-height:.98;letter-spacing:-.035em;color:var(--espresso);margin:0}
        .h-sub{font-size:1rem;line-height:1.8;color:var(--mist);max-width:380px;margin:22px 0 38px}
        .h-stats{display:flex;gap:36px;margin-top:52px;padding-top:28px;border-top:1px solid var(--cream-deeper)}
        .h-stat b{display:block;font:700 1.8rem var(--font-display);color:var(--espresso);letter-spacing:-.02em}
        .h-stat span{font-size:.7rem;color:var(--mist);letter-spacing:.12em;text-transform:uppercase}
        .h-right{position:relative;overflow:hidden;min-height:520px;background:var(--cream-dark);border-radius:0 0 0 120px}
        @media(max-width:860px){.h-right{min-height:70vw;border-radius:60px 60px 0 0}}
        .h-img{position:absolute;inset:-30px;width:calc(100% + 60px);height:calc(100% + 60px);object-fit:cover;object-position:top center}
        .h-glass{position:absolute;bottom:34px;left:30px;padding:18px 22px;border-radius:20px;background:rgba(251,247,241,.78);
          backdrop-filter:blur(22px) saturate(170%);border:1px solid rgba(255,255,255,.6);box-shadow:var(--shadow-lg)}
        .h-ring{position:absolute;top:28px;right:28px;width:112px;height:112px}
        .h-ring svg{width:100%;height:100%;animation:spin 18s linear infinite}
        .h-ring text{font:700 9.5px var(--font-body);letter-spacing:.28em;fill:#fff;text-transform:uppercase}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      <section className="h-wrap">
        <div className="h-left">
          <div className="h-orb" style={{ width: 260, height: 260, background: "rgba(194,86,46,.25)", top: "8%", right: "-4%" }} />
          <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }} style={{ position: "relative", zIndex: 1 }}>
            <motion.p variants={fade} style={{ margin: "0 0 22px", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".18em", color: "var(--terra)", textTransform: "uppercase" }}>
              Autumn–Winter 2026 edit
            </motion.p>
            <h1 className="h-h1">
              <Line>Dress for</Line>
              <Line style={{ fontStyle: "italic", fontWeight: 600, color: "var(--terra)" }}>the life you</Line>
              <Line>actually live.</Line>
            </h1>
            <motion.p variants={fade} className="h-sub">
              Premium fabrics and timeless cuts, chosen to look sharp today and still feel right in five years.
            </motion.p>
            <motion.div variants={fade} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to="/collection" className="btn-terra">Shop the collection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
              <Link to="/summer-sale" className="btn-secondary">Sale: 10% off</Link>
            </motion.div>
            <motion.div variants={fade} className="h-stats">
              {[["500+", "Styles"], ["10K+", "Customers"], ["4.9", "Avg. rating"]].map(([v, l]) => (
                <div className="h-stat" key={l}><b>{v}</b><span>{l}</span></div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="h-right" onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}
          initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.3, ease }}>
          <motion.img src={assets.HeroImgNew} alt="Latest collection" className="h-img" style={{ x: imgX, y: imgY, translateY: scrollShift }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(36,20,16,.35))", pointerEvents: "none" }} />

          <div className="h-ring">
            <svg viewBox="0 0 120 120">
              <defs><path id="c" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
              <text><textPath href="#c">New season · New season · New season ·</textPath></text>
            </svg>
          </div>

          <motion.div className="h-glass" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease }}>
            <p style={{ margin: 0, fontSize: ".66rem", fontWeight: 700, letterSpacing: ".14em", color: "var(--mist)", textTransform: "uppercase" }}>Summer sale</p>
            <p style={{ margin: "6px 0 2px", font: "700 1.7rem var(--font-display)", color: "var(--terra)" }}>10% off</p>
            <p style={{ margin: 0, fontSize: ".76rem", color: "var(--bark)" }}>Bottomwear & Winterwear</p>
          </motion.div>
        </motion.div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </>
  );
};
export default Hero;