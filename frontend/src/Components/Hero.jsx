// import React from "react";
// import { assets } from "../assets/assets";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const Hero = () => {
//   const fadeUp = (delay = 0) => ({
//     initial: { opacity: 0, y: 32 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
//   });

//   return (
//     <>
//       <style>{`
//                 .hero-wrap {
//                     display:flex; flex-direction:column;
//                     background: #F0E4D7;
//                     overflow:hidden;
//                     min-height: 480px;
//                 }
//                 @media(min-width:640px){ .hero-wrap{ flex-direction:row; } }

//                 .hero-left {
//                     flex:1;
//                     background: linear-gradient(130deg, #EDD8C4 0%, #F7EFE6 55%, #C2CDB8 100%);
//                     display:flex; align-items:center; justify-content:center;
//                     padding: 3.5rem 2rem;
//                     position:relative; overflow:hidden;
//                 }
//                 .hero-left::before {
//                     content:'';
//                     position:absolute; top:-60px; left:-60px;
//                     width:220px; height:220px; border-radius:50%;
//                     background:rgba(201,106,66,0.1);
//                     pointer-events:none;
//                 }
//                 .hero-left::after {
//                     content:'';
//                     position:absolute; bottom:-40px; right:10px;
//                     width:130px; height:130px; border-radius:50%;
//                     background:rgba(152,169,142,0.18);
//                     pointer-events:none;
//                 }

//                 .hero-eyebrow {
//                     font-size:0.72rem; letter-spacing:0.22em; font-weight:700;
//                     color: #98A98E; text-transform:uppercase; margin:0;
//                 }
//                 .hero-divider-line {
//                     width:36px; height:2px;
//                     background: #C96A42; border-radius:2px;
//                 }
//                 .hero-h1 {
//                     font-size: clamp(2rem, 5vw, 3.4rem);
//                     line-height:1.12;
//                     color: #7A4A38;
//                     font-family:'Georgia',serif;
//                     margin: 16px 0 28px;
//                 }
//                 .hero-h1 em { color:#C96A42; font-style:italic; }

//                 .hero-cta {
//                     display:inline-flex; align-items:center; gap:14px;
//                     background: #C96A42; color:#F7EFE6;
//                     padding:13px 30px; border-radius:60px;
//                     font-size:0.75rem; letter-spacing:0.16em; font-weight:700;
//                     text-transform:uppercase; text-decoration:none;
//                     box-shadow:0 6px 20px rgba(201,106,66,0.38);
//                     transition: background 0.25s, box-shadow 0.25s;
//                 }
//                 .hero-cta:hover {
//                     background: #A3512F;
//                     box-shadow:0 10px 28px rgba(163,81,47,0.38);
//                 }
//                 .hero-cta-line {
//                     width:28px; height:2px;
//                     background:rgba(247,239,230,0.65); border-radius:2px;
//                 }

//                 .hero-right {
//                     flex:1; position:relative; overflow:hidden;
//                     min-height:320px; max-height:600px;
//                 }
//                 .hero-right::before {
//                     content:''; position:absolute; inset:0;
//                     background: linear-gradient(to right, rgba(237,216,196,0.28), transparent 40%);
//                     z-index:1; pointer-events:none;
//                 }
//                 .hero-right img {
//                     width:100%; height:100%; object-fit:cover; display:block;
//                 }
//                 .hero-badge {
//                     position:absolute; bottom:22px; left:22px;
//                     background:#F7EFE6; color:#C96A42;
//                     font-size:0.68rem; letter-spacing:0.14em; font-weight:700;
//                     padding:7px 18px; border-radius:60px;
//                     border:2px solid #C96A42;
//                     z-index:2; text-transform:uppercase;
//                 }
//             `}</style>

//       <div className="hero-wrap">
//         {/* LEFT */}
//         <div className="hero-left">
//           <div
//             style={{
//               position: "relative",
//               zIndex: 1,
//               maxWidth: 320,
//               textAlign: "left",
//             }}
//           >
//             <motion.div
//               {...fadeUp(0.1)}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 marginBottom: 16,
//               }}
//             >
//               <span className="hero-divider-line" />
//               <p className="hero-eyebrow">Our Bestsellers</p>
//             </motion.div>

//             <motion.h1 {...fadeUp(0.22)} className="hero-h1">
//               Latest
//               <br />
//               <em>Arrivals</em>
//             </motion.h1>

//             <motion.div {...fadeUp(0.36)}>
//               <Link to="/collection" className="hero-cta">
//                 Shop Now
//                 <span className="hero-cta-line" />
//               </Link>
//             </motion.div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <motion.div
//           className="hero-right"
//           initial={{ opacity: 0, scale: 1.06 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <motion.img
//             src={assets.HeroImgNew}
//             alt="hero"
//             whileHover={{ scale: 1.04 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           />
//           <motion.span
//             className="hero-badge"
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//           >
//             New Season
//           </motion.span>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Hero;































import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ── Stagger helpers ─────────────────────────────────────────────────────── */
const stagger = {
  container: { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } },
  item: {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  },
}

const Hero = () => (
  <>
    <style>{`
      .hero-wrap {
        min-height: calc(100vh - 108px);
        display: grid;
        grid-template-columns: 1fr 1fr;
        overflow: hidden;
        position: relative;
        background: var(--cream);
      }
      @media (max-width: 768px) {
        .hero-wrap {
          grid-template-columns: 1fr;
          min-height: auto;
        }
      }

      /* ── Left panel ── */
      .hero-left {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem);
        background:
          radial-gradient(ellipse at 30% 60%, rgba(201, 106, 66, 0.1) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 10%, rgba(143, 168, 136, 0.08) 0%, transparent 50%),
          var(--cream);
        position: relative;
        overflow: hidden;
      }

      /* Background watermark text */
      .hero-watermark {
        position: absolute;
        bottom: -20px;
        left: -10px;
        font-family: var(--font-display);
        font-size: clamp(6rem, 14vw, 12rem);
        font-weight: 700;
        color: transparent;
        -webkit-text-stroke: 1px rgba(201, 106, 66, 0.08);
        pointer-events: none;
        user-select: none;
        line-height: 1;
        white-space: nowrap;
      }

      .hero-content {
        position: relative;
        z-index: 1;
        max-width: 440px;
      }

      /* ── Eyebrow ── */
      .hero-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
      }
      .hero-eyebrow-line {
        width: 32px;
        height: 2px;
        background: var(--terra);
        border-radius: 2px;
        display: block;
      }
      .hero-eyebrow-text {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--terra);
        font-family: var(--font-body);
      }

      /* ── Headline ── */
      .hero-h1 {
        font-family: var(--font-display);
        font-size: clamp(3rem, 6vw, 5.5rem);
        font-weight: 300;
        line-height: 1.0;
        color: var(--espresso);
        margin: 0 0 8px;
        letter-spacing: -0.03em;
      }
      .hero-h1 em {
        font-style: italic;
        font-weight: 600;
        color: var(--terra);
      }
      .hero-h1-accent {
        font-family: var(--font-display);
        font-size: clamp(3rem, 6vw, 5.5rem);
        font-weight: 700;
        line-height: 1.0;
        color: var(--espresso);
        display: block;
        letter-spacing: -0.03em;
      }

      /* ── Subtext ── */
      .hero-sub {
        font-size: 0.92rem;
        color: var(--mist);
        line-height: 1.75;
        max-width: 340px;
        margin: 16px 0 36px;
        font-family: var(--font-body);
        font-weight: 400;
      }

      /* ── CTA group ── */
      .hero-ctas {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
      }

      /* ── Stats row ── */
      .hero-stats {
        display: flex;
        gap: 28px;
        margin-top: 48px;
        padding-top: 32px;
        border-top: 1px solid var(--cream-deeper);
      }
      .hero-stat-value {
        font-family: var(--font-display);
        font-size: 1.7rem;
        font-weight: 700;
        color: var(--espresso);
        line-height: 1;
        letter-spacing: -0.02em;
      }
      .hero-stat-label {
        font-size: 0.68rem;
        color: var(--mist);
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-top: 3px;
      }

      /* ── Right image panel ── */
      .hero-right {
        position: relative;
        overflow: hidden;
        min-height: 480px;
        background: var(--cream-dark);
      }
      @media (max-width: 768px) {
        .hero-right { min-height: 60vw; }
      }
      .hero-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
        transition: transform 8s ease;
      }
      .hero-right:hover .hero-img { transform: scale(1.03); }

      /* Overlay gradient on image */
      .hero-img-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, rgba(250, 247, 242, 0.25) 0%, transparent 30%);
        pointer-events: none;
      }

      /* ── Floating glass card on image ── */
      .hero-glass-card {
        position: absolute;
        bottom: 32px;
        left: 28px;
        background: rgba(250, 247, 242, 0.82);
        backdrop-filter: blur(20px) saturate(160%);
        -webkit-backdrop-filter: blur(20px) saturate(160%);
        border: 1px solid rgba(212, 197, 176, 0.5);
        border-radius: 16px;
        padding: 16px 20px;
        min-width: 180px;
        box-shadow: 0 8px 32px rgba(44, 24, 16, 0.15);
      }
      .hero-glass-card-title {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--mist);
        margin: 0 0 6px;
        font-family: var(--font-body);
      }
      .hero-glass-card-value {
        font-family: var(--font-display);
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--terra);
        margin: 0;
        line-height: 1;
      }
      .hero-glass-card-sub {
        font-size: 0.74rem;
        color: var(--bark);
        margin: 4px 0 0;
        font-family: var(--font-body);
      }

      /* ── Season badge ── */
      .hero-season-badge {
        position: absolute;
        top: 24px;
        right: 24px;
        background: var(--espresso);
        color: var(--cream);
        font-family: var(--font-body);
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        padding: 6px 16px;
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-md);
      }
    `}</style>

    <section className="hero-wrap">
      {/* ── LEFT ── */}
      <div className="hero-left">
        {/* Background watermark */}
        <span className="hero-watermark" aria-hidden="true">Forever</span>

        <motion.div
          className="hero-content"
          variants={stagger.container}
          initial="initial"
          animate="animate"
        >
          {/* Eyebrow */}
          <motion.div className="hero-eyebrow" variants={stagger.item}>
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">New Season · 2025</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 className="hero-h1" variants={stagger.item}>
            Latest
            <br />
            <em>Arrivals</em>
            <br />
            <span className="hero-h1-accent" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: 'var(--bark)', fontWeight: 300 }}>
              Are Here
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p className="hero-sub" variants={stagger.item}>
            Curated fashion that speaks to your sense of self. Premium fabrics, 
            timeless cuts, and contemporary style—all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-ctas" variants={stagger.item}>
            <Link to="/collection" className="btn-terra">
              Shop Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/summer-sale" className="btn-secondary">
              ☀️ Summer Sale
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div className="hero-stats" variants={stagger.item}>
            {[
              { value: '500+', label: 'Products' },
              { value: '10K+', label: 'Customers' },
              { value: '4.9★', label: 'Rating' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="hero-stat-value">{value}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── RIGHT ── */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={assets.HeroImgNew} alt="Latest collection" className="hero-img" />

        {/* Gradient overlay */}
        <div className="hero-img-overlay" />

        {/* Season badge */}
        <motion.div
          className="hero-season-badge"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          New Season ✦
        </motion.div>

        {/* Glass info card */}
        <motion.div
          className="hero-glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero-glass-card-title">Summer Sale</p>
          <p className="hero-glass-card-value">10% Off</p>
          <p className="hero-glass-card-sub">Bottomwear & Winterwear</p>
        </motion.div>
      </motion.div>
    </section>
  </>
);

export default Hero;