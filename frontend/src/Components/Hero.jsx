import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <>
      <style>{`
                .hero-wrap {
                    display:flex; flex-direction:column;
                    background: #F0E4D7;
                    overflow:hidden;
                    min-height: 480px;
                }
                @media(min-width:640px){ .hero-wrap{ flex-direction:row; } }

                .hero-left {
                    flex:1;
                    background: linear-gradient(130deg, #EDD8C4 0%, #F7EFE6 55%, #C2CDB8 100%);
                    display:flex; align-items:center; justify-content:center;
                    padding: 3.5rem 2rem;
                    position:relative; overflow:hidden;
                }
                .hero-left::before {
                    content:'';
                    position:absolute; top:-60px; left:-60px;
                    width:220px; height:220px; border-radius:50%;
                    background:rgba(201,106,66,0.1);
                    pointer-events:none;
                }
                .hero-left::after {
                    content:'';
                    position:absolute; bottom:-40px; right:10px;
                    width:130px; height:130px; border-radius:50%;
                    background:rgba(152,169,142,0.18);
                    pointer-events:none;
                }

                .hero-eyebrow {
                    font-size:0.72rem; letter-spacing:0.22em; font-weight:700;
                    color: #98A98E; text-transform:uppercase; margin:0;
                }
                .hero-divider-line {
                    width:36px; height:2px;
                    background: #C96A42; border-radius:2px;
                }
                .hero-h1 {
                    font-size: clamp(2rem, 5vw, 3.4rem);
                    line-height:1.12;
                    color: #7A4A38;
                    font-family:'Georgia',serif;
                    margin: 16px 0 28px;
                }
                .hero-h1 em { color:#C96A42; font-style:italic; }

                .hero-cta {
                    display:inline-flex; align-items:center; gap:14px;
                    background: #C96A42; color:#F7EFE6;
                    padding:13px 30px; border-radius:60px;
                    font-size:0.75rem; letter-spacing:0.16em; font-weight:700;
                    text-transform:uppercase; text-decoration:none;
                    box-shadow:0 6px 20px rgba(201,106,66,0.38);
                    transition: background 0.25s, box-shadow 0.25s;
                }
                .hero-cta:hover {
                    background: #A3512F;
                    box-shadow:0 10px 28px rgba(163,81,47,0.38);
                }
                .hero-cta-line {
                    width:28px; height:2px;
                    background:rgba(247,239,230,0.65); border-radius:2px;
                }

                .hero-right {
                    flex:1; position:relative; overflow:hidden;
                    min-height:320px; max-height:600px;
                }
                .hero-right::before {
                    content:''; position:absolute; inset:0;
                    background: linear-gradient(to right, rgba(237,216,196,0.28), transparent 40%);
                    z-index:1; pointer-events:none;
                }
                .hero-right img {
                    width:100%; height:100%; object-fit:cover; display:block;
                }
                .hero-badge {
                    position:absolute; bottom:22px; left:22px;
                    background:#F7EFE6; color:#C96A42;
                    font-size:0.68rem; letter-spacing:0.14em; font-weight:700;
                    padding:7px 18px; border-radius:60px;
                    border:2px solid #C96A42;
                    z-index:2; text-transform:uppercase;
                }
            `}</style>

      <div className="hero-wrap">
        {/* LEFT */}
        <div className="hero-left">
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 320,
              textAlign: "left",
            }}
          >
            <motion.div
              {...fadeUp(0.1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <span className="hero-divider-line" />
              <p className="hero-eyebrow">Our Bestsellers</p>
            </motion.div>

            <motion.h1 {...fadeUp(0.22)} className="hero-h1">
              Latest
              <br />
              <em>Arrivals</em>
            </motion.h1>

            <motion.div {...fadeUp(0.36)}>
              <Link to="/collection" className="hero-cta">
                Shop Now
                <span className="hero-cta-line" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* RIGHT */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={assets.HeroImgNew}
            alt="hero"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            New Season
          </motion.span>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
