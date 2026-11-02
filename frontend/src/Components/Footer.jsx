// import React from "react";
// import { assets } from "../assets/assets";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const Footer = () => (
//   <footer style={{ marginTop: '6rem' }}>
//     <style>{`
//       .ft {
//         background: var(--espresso);
//         color: rgba(250, 247, 242, 0.65);
//         position: relative;
//         overflow: hidden;
//       }
//       /* Subtle noise on footer */
//       .ft::before {
//         content: '';
//         position: absolute;
//         inset: 0;
//         background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
//         pointer-events: none;
//         z-index: 0;
//       }
//       .ft-inner { position: relative; z-index: 1; }
//       .ft-top {
//         padding: 4rem 2rem 3rem;
//         display: grid;
//         grid-template-columns: 2fr 1fr 1fr 1fr;
//         gap: 3rem;
//         max-width: 1200px;
//         margin: 0 auto;
//       }
//       @media (max-width: 768px) {
//         .ft-top { grid-template-columns: 1fr 1fr; gap: 2rem; }
//       }
//       @media (max-width: 480px) {
//         .ft-top { grid-template-columns: 1fr; }
//       }
//       .ft-col-title {
//         font-family: var(--font-body);
//         font-size: 0.68rem;
//         font-weight: 700;
//         letter-spacing: 0.2em;
//         text-transform: uppercase;
//         color: rgba(250, 247, 242, 0.4);
//         margin: 0 0 16px;
//       }
//       .ft-link {
//         display: block;
//         color: rgba(250, 247, 242, 0.65);
//         font-family: var(--font-body);
//         font-size: 0.9rem;
//         text-decoration: none;
//         padding: 5px 0;
//         transition: color 0.18s, padding-left 0.22s;
//         cursor: pointer;
//         background: none;
//         border: none;
//         font-weight: 400;
//         text-align: left;
//       }
//       .ft-link:hover { color: var(--cream); padding-left: 4px; }
//       .ft-divider {
//         border: none;
//         border-top: 1px solid rgba(250, 247, 242, 0.08);
//         margin: 0 2rem;
//         max-width: 1200px;
//         margin-left: auto;
//         margin-right: auto;
//       }
//       .ft-bottom {
//         padding: 1.5rem 2rem;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         flex-wrap: wrap;
//         gap: 12px;
//         max-width: 1200px;
//         margin: 0 auto;
//       }
//       .ft-copy {
//         font-family: var(--font-body);
//         font-size: 0.78rem;
//         color: rgba(250, 247, 242, 0.35);
//       }
//       .ft-copy span { color: var(--terra); }

//       /* Brand description */
//       .ft-brand-desc {
//         font-family: var(--font-body);
//         font-size: 0.86rem;
//         line-height: 1.75;
//         color: rgba(250, 247, 242, 0.55);
//         margin: 12px 0 24px;
//         max-width: 280px;
//       }

//       /* Social icons */
//       .ft-social {
//         display: flex;
//         gap: 10px;
//         margin-top: 4px;
//       }
//       .ft-social-btn {
//         width: 36px;
//         height: 36px;
//         border-radius: 50%;
//         background: rgba(250, 247, 242, 0.07);
//         border: 1px solid rgba(250, 247, 242, 0.12);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         cursor: pointer;
//         color: rgba(250, 247, 242, 0.55);
//         font-size: 0.8rem;
//         transition: all 0.2s;
//       }
//       .ft-social-btn:hover {
//         background: var(--terra);
//         border-color: var(--terra);
//         color: white;
//         transform: translateY(-2px);
//       }
//     `}</style>

//     <motion.div
//       className="ft"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true, margin: '-80px' }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="ft-inner">
//         <div className="ft-top">
//           {/* Brand */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.55 }}
//           >
//             <img src={assets.logo} alt="Forever" style={{ height: 24, width: 'auto', marginBottom: 16, filter: 'brightness(0) invert(1) opacity(0.85)' }} />
//             <p className="ft-brand-desc">
//               Premium fashion curated for those who appreciate quality, 
//               style, and self-expression. Free shipping on orders over ₹999.
//             </p>
//             <div className="ft-social">
//               {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
//                 <button key={i} className="ft-social-btn" aria-label="Social link">{icon}</button>
//               ))}
//             </div>
//           </motion.div>

//           {/* Company */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.55, delay: 0.1 }}
//           >
//             <p className="ft-col-title">Company</p>
//             {[
//               { label: 'Home', to: '/' },
//               { label: 'Collection', to: '/collection' },
//               { label: 'About Us', to: '/about' },
//               { label: 'Contact', to: '/contact' },
//             ].map(({ label, to }) => (
//               <Link key={label} to={to} className="ft-link">{label}</Link>
//             ))}
//           </motion.div>

//           {/* Help */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.55, delay: 0.15 }}
//           >
//             <p className="ft-col-title">Help</p>
//             {['Delivery Policy', 'Return Policy', 'Privacy Policy', 'FAQ'].map(l => (
//               <button key={l} className="ft-link">{l}</button>
//             ))}
//           </motion.div>

//           {/* Contact */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.55, delay: 0.2 }}
//           >
//             <p className="ft-col-title">Contact</p>
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'rgba(250,247,242,0.55)', lineHeight: 1.6, margin: '0 0 8px' }}>
//               YamunaNagar, Haryana, India
//             </p>
//             <a href="tel:+918053103060" className="ft-link">+91 8053103060</a>
//             <a href="mailto:forever@gmail.com" className="ft-link">forever@gmail.com</a>
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(250,247,242,0.35)', marginTop: 8 }}>
//               Mon–Sat, 9am – 9pm
//             </p>
//           </motion.div>
//         </div>

//         <hr className="ft-divider" />

//         <div className="ft-bottom">
//           <p className="ft-copy">
//             Copyright 2025 © <span>forever.com</span> · All Rights Reserved
//           </p>
//           <p className="ft-copy" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//             Made with ❤️ in India
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   </footer>
// );

// export default Footer;

























































import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ease = [0.16, 1, 0.3, 1];
const cols = [
  ["Company", [["Home", "/"], ["Collection", "/collection"], ["About us", "/about"], ["Contact", "/contact"]]],
  ["Help", [["Delivery policy", "/contact"], ["Return policy", "/contact"], ["Privacy policy", "/contact"], ["FAQ", "/"]]],
];

const Footer = () => (
  <footer style={{ marginTop: "6rem" }}>
    <style>{`
      .ft{position:relative;overflow:hidden;background:var(--espresso);color:rgba(251,247,241,.65);border-radius:var(--radius-xl) var(--radius-xl) 0 0}
      .ft-word{position:absolute;left:50%;bottom:-.22em;transform:translateX(-50%);font:700 clamp(6rem,24vw,22rem)/1 var(--font-display);
        letter-spacing:-.04em;color:transparent;-webkit-text-stroke:1px rgba(251,247,241,.07);pointer-events:none;user-select:none;white-space:nowrap}
      .ft-in{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:4.5rem 2rem 2rem}
      .ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.4fr;gap:3rem}
      @media(max-width:820px){.ft-grid{grid-template-columns:1fr 1fr}}@media(max-width:480px){.ft-grid{grid-template-columns:1fr}}
      .ft h4{margin:0 0 18px;font:700 .72rem var(--font-body);letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
      .ft-l{display:block;width:fit-content;padding:6px 0;color:rgba(251,247,241,.65);text-decoration:none;font-size:.9rem;position:relative;transition:color .25s,transform .3s var(--ease)}
      .ft-l::after{content:'';position:absolute;left:0;bottom:2px;height:1px;width:100%;background:var(--gold);transform:scaleX(0);transform-origin:right;transition:transform .4s var(--ease)}
      .ft-l:hover{color:var(--cream);transform:translateX(4px)}.ft-l:hover::after{transform:scaleX(1);transform-origin:left}
      .ft-soc{display:flex;gap:10px;margin-top:6px}
      .ft-soc a{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(251,247,241,.16);color:rgba(251,247,241,.7);text-decoration:none;
        transition:background .3s,transform .4s var(--ease),border-color .3s}
      .ft-soc a:hover{background:var(--terra);border-color:var(--terra);color:#fff;transform:translateY(-4px) rotate(8deg)}
      .ft-bar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;margin-top:3.5rem;padding:1.4rem 0 7rem;border-top:1px solid rgba(251,247,241,.1);font-size:.78rem;color:rgba(251,247,241,.45)}
      .ft-top{display:inline-flex;align-items:center;gap:8px;background:none;border:1px solid rgba(251,247,241,.2);color:var(--cream);padding:9px 18px;border-radius:999px;cursor:pointer;font:600 .74rem var(--font-body);transition:background .3s}
      .ft-top:hover{background:var(--terra);border-color:var(--terra)}
    `}</style>

    <motion.div className="ft" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease }}>
      <div className="ft-word" aria-hidden="true">Forever</div>
      <div className="ft-in">
        <div className="ft-grid">
          <div>
            <img src={assets.logo} alt="Forever" style={{ height: 26, marginBottom: 18, filter: "brightness(0) invert(1)", opacity: 0.9 }} />
            <p style={{ maxWidth: 290, lineHeight: 1.8, fontSize: ".9rem", margin: "0 0 22px" }}>
              Premium fashion for people who care about quality and self-expression. Free shipping on orders over ₹999.
            </p>
            <div className="ft-soc">
              {[["Instagram", "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm5.5-.5h.01"],
                ["Facebook", "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"],
                ["YouTube", "M22 8s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16 4.5 12 4.5 12 4.5s-4 0-6.8.2c-.4.1-1.4.1-2.300 1C2.2 6.4 2 8 2 8s-.2 1.9-.2 3.8v1.4C1.8 15.1 2 17 2 17s.2 1.600.9 2.300c.9.9 2 .9 2.500 1 1.8.2 6.600.2 6.600.2s4 0 6.8-.2c.4-.1 1.4-.1 2.300-1 .7-.7.9-2.300.9-2.300s.2-1.9.2-3.8v-1.4C22.2 9.9 22 8 22 8zM10 15V9l5 3z"]].map(([n, d]) => (
                <a key={n} href="#" aria-label={n}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg></a>
              ))}
            </div>
          </div>

          {cols.map(([title, links], ci) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + ci * 0.08, duration: 0.7, ease }}>
              <h4>{title}</h4>
              {links.map(([l, to]) => <Link key={l} to={to} className="ft-l">{l}</Link>)}
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7, ease }}>
            <h4>Visit or call</h4>
            <p style={{ margin: "0 0 8px", fontSize: ".9rem", lineHeight: 1.6 }}>Yamunanagar, Haryana, India</p>
            <a href="tel:+918053103060" className="ft-l">+91 80531 03060</a>
            <a href="mailto:forever@gmail.com" className="ft-l">forever@gmail.com</a>
            <p style={{ margin: "8px 0 0", fontSize: ".78rem", color: "rgba(251,247,241,.4)" }}>Mon–Sat, 9 am – 9 pm</p>
          </motion.div>
        </div>

        <div className="ft-bar">
          <span>© 2026 Forever. All rights reserved.</span>
          <button className="ft-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
          </button>
        </div>
      </div>
    </motion.div>
  </footer>
);
export default Footer;