// import React from "react";
// import { assets } from "../assets/assets";
// import { motion } from "framer-motion";

// const Footer = () => (
//   <footer>
//     <style>{`
//             .ft-wrap {
//                 background: linear-gradient(180deg,#F7EFE6 0%,#EDD8C4 100%);
//                 border-top:2px solid #EDD8C4;
//                 margin-top:4rem;
//             }
//             .ft-inner {
//                 padding:3.5rem 2rem 0;
//                 max-width:1200px; margin:0 auto;
//             }
//             .ft-grid {
//                 display:flex; flex-direction:column; gap:2.5rem; margin-bottom:2rem;
//             }
//             @media(min-width:640px){
//                 .ft-grid{ display:grid; grid-template-columns:3fr 1fr 1fr; gap:3rem; }
//             }
//             .ft-col-title {
//                 color:#7A4A38; font-size:0.78rem; letter-spacing:0.16em;
//                 font-weight:800; text-transform:uppercase;
//                 margin-bottom:1.2rem; position:relative; padding-bottom:10px;
//             }
//             .ft-col-title::after {
//                 content:''; position:absolute; bottom:0; left:0;
//                 width:28px; height:2px; background:#C96A42; border-radius:2px;
//             }
//             .ft-links { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
//             .ft-links li {
//                 color:#98A98E; font-size:0.84rem; cursor:pointer;
//                 transition:color 0.2s, padding-left 0.2s; letter-spacing:0.02em;
//             }
//             .ft-links li:hover { color:#C96A42; padding-left:6px; }
//             .ft-divider { border:none; border-top:1px solid #EDD8C4; margin:0 2rem; }
//             .ft-copy {
//                 padding:1.2rem 2rem; text-align:center;
//                 color:#98A98E; font-size:0.78rem; letter-spacing:0.04em;
//                 max-width:1200px; margin:0 auto;
//             }
//             .ft-copy span { color:#C96A42; font-weight:600; }
//         `}</style>

//     <div className="ft-wrap">
//       <div className="ft-inner">
//         <div className="ft-grid">
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <img
//               src={assets.logo}
//               alt="logo"
//               style={{ marginBottom: "1.2rem", width: 130 }}
//             />
//             <p
//               style={{
//                 color: "#98A98E",
//                 fontSize: "0.84rem",
//                 lineHeight: 1.8,
//                 maxWidth: 300,
//               }}
//             >
//               Our goal is to make your shopping experience simple, enjoyable,
//               and completely stress-free. We work hard to bring you quality
//               products, honest pricing, and responsive customer support whenever
//               you need it.
//             </p>
//           </motion.div>

//           {[
//             {
//               title: "Company",
//               links: ["Home", "About", "Delivery", "Privacy Policy"],
//             },
//             {
//               title: "Get In Touch",
//               links: ["+91 8053103060", "forever@gmail.com"],
//             },
//           ].map((col, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{
//                 delay: 0.1 + i * 0.1,
//                 duration: 0.55,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//             >
//               <p className="ft-col-title">{col.title}</p>
//               <ul className="ft-links">
//                 {col.links.map((l) => (
//                   <motion.li
//                     key={l}
//                     whileHover={{ x: 6 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   >
//                     {l}
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <hr className="ft-divider" />
//       <p className="ft-copy">
//         Copyright 2025 © <span>forever.com</span> — All Rights Reserved.
//       </p>
//     </div>
//   </footer>
// );

// export default Footer;






















import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ marginTop: '6rem' }}>
    <style>{`
      .ft {
        background: var(--espresso);
        color: rgba(250, 247, 242, 0.65);
        position: relative;
        overflow: hidden;
      }
      /* Subtle noise on footer */
      .ft::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 0;
      }
      .ft-inner { position: relative; z-index: 1; }
      .ft-top {
        padding: 4rem 2rem 3rem;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      @media (max-width: 768px) {
        .ft-top { grid-template-columns: 1fr 1fr; gap: 2rem; }
      }
      @media (max-width: 480px) {
        .ft-top { grid-template-columns: 1fr; }
      }
      .ft-col-title {
        font-family: var(--font-body);
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(250, 247, 242, 0.4);
        margin: 0 0 16px;
      }
      .ft-link {
        display: block;
        color: rgba(250, 247, 242, 0.65);
        font-family: var(--font-body);
        font-size: 0.9rem;
        text-decoration: none;
        padding: 5px 0;
        transition: color 0.18s, padding-left 0.22s;
        cursor: pointer;
        background: none;
        border: none;
        font-weight: 400;
        text-align: left;
      }
      .ft-link:hover { color: var(--cream); padding-left: 4px; }
      .ft-divider {
        border: none;
        border-top: 1px solid rgba(250, 247, 242, 0.08);
        margin: 0 2rem;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      }
      .ft-bottom {
        padding: 1.5rem 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .ft-copy {
        font-family: var(--font-body);
        font-size: 0.78rem;
        color: rgba(250, 247, 242, 0.35);
      }
      .ft-copy span { color: var(--terra); }

      /* Brand description */
      .ft-brand-desc {
        font-family: var(--font-body);
        font-size: 0.86rem;
        line-height: 1.75;
        color: rgba(250, 247, 242, 0.55);
        margin: 12px 0 24px;
        max-width: 280px;
      }

      /* Social icons */
      .ft-social {
        display: flex;
        gap: 10px;
        margin-top: 4px;
      }
      .ft-social-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(250, 247, 242, 0.07);
        border: 1px solid rgba(250, 247, 242, 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: rgba(250, 247, 242, 0.55);
        font-size: 0.8rem;
        transition: all 0.2s;
      }
      .ft-social-btn:hover {
        background: var(--terra);
        border-color: var(--terra);
        color: white;
        transform: translateY(-2px);
      }
    `}</style>

    <motion.div
      className="ft"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="ft-inner">
        <div className="ft-top">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <img src={assets.logo} alt="Forever" style={{ height: 24, width: 'auto', marginBottom: 16, filter: 'brightness(0) invert(1) opacity(0.85)' }} />
            <p className="ft-brand-desc">
              Premium fashion curated for those who appreciate quality, 
              style, and self-expression. Free shipping on orders over ₹999.
            </p>
            <div className="ft-social">
              {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                <button key={i} className="ft-social-btn" aria-label="Social link">{icon}</button>
              ))}
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <p className="ft-col-title">Company</p>
            {[
              { label: 'Home', to: '/' },
              { label: 'Collection', to: '/collection' },
              { label: 'About Us', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to }) => (
              <Link key={label} to={to} className="ft-link">{label}</Link>
            ))}
          </motion.div>

          {/* Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <p className="ft-col-title">Help</p>
            {['Delivery Policy', 'Return Policy', 'Privacy Policy', 'FAQ'].map(l => (
              <button key={l} className="ft-link">{l}</button>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <p className="ft-col-title">Contact</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'rgba(250,247,242,0.55)', lineHeight: 1.6, margin: '0 0 8px' }}>
              YamunaNagar, Haryana, India
            </p>
            <a href="tel:+918053103060" className="ft-link">+91 8053103060</a>
            <a href="mailto:forever@gmail.com" className="ft-link">forever@gmail.com</a>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(250,247,242,0.35)', marginTop: 8 }}>
              Mon–Sat, 9am – 9pm
            </p>
          </motion.div>
        </div>

        <hr className="ft-divider" />

        <div className="ft-bottom">
          <p className="ft-copy">
            Copyright 2025 © <span>forever.com</span> · All Rights Reserved
          </p>
          <p className="ft-copy" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </motion.div>
  </footer>
);

export default Footer;