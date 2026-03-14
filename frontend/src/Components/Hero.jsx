import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <>
      <style>{`
        .hero-wrapper {
          background-color: #E8D5C4;
          border: none;
          overflow: hidden;
          position: relative;
        }

        .hero-left-section {
          background: linear-gradient(135deg, #E8D5C4 0%, #FFFDF9 60%, #A8B5A0 100%);
          position: relative;
          padding: 3rem 2rem;
        }

        .hero-left-section::before {
          content: '';
          position: absolute;
          top: -40px;
          left: -40px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(212, 117, 91, 0.12);
          pointer-events: none;
        }

        .hero-left-section::after {
          content: '';
          position: absolute;
          bottom: -30px;
          right: 20px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(168, 181, 160, 0.2);
          pointer-events: none;
        }

        .hero-divider {
          background-color: #D4755B;
          height: 2px;
          border: none;
        }

        .hero-eyebrow {
          color: #A8B5A0;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .hero-heading {
          color: #8B5A4A;
          font-family: 'Georgia', serif;
          line-height: 1.15;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #D4755B;
          color: #FFFDF9;
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
          text-transform: uppercase;
          box-shadow: 0 4px 16px rgba(212, 117, 91, 0.35);
          text-decoration: none;
        }

        .hero-cta:hover {
          background: #8B5A4A;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 90, 74, 0.35);
        }

        .hero-cta-line {
          width: 32px;
          height: 2px;
          background: rgba(255, 253, 249, 0.7);
          border-radius: 2px;
        }

        .hero-img-wrapper {
          position: relative;
          overflow: hidden;
        }

        .hero-img-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(232, 213, 196, 0.3), transparent 40%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .hero-img-wrapper:hover img {
          transform: scale(1.03);
        }

        .hero-badge {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: #FFFDF9;
          color: #D4755B;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 50px;
          border: 2px solid #D4755B;
          z-index: 2;
          text-transform: uppercase;
        }
      `}</style>

      <div className='flex flex-col hero-wrapper sm:flex-row'>

        {/* HERO LEFT */}
        <div className="flex items-center justify-center w-full hero-left-section sm:w-1/2">
          <div className="relative z-10 max-w-xs text-center sm:text-left">
            <div className='flex items-center justify-center gap-3 mb-4 sm:justify-start'>
              <div className='w-8 hero-divider md:w-12'></div>
              <p className='hero-eyebrow'>Our Bestsellers</p>
            </div>
            <h1 className='mb-6 text-4xl hero-heading sm:text-3xl lg:text-5xl'>
              Latest<br />
              <em>Arrivals</em>
            </h1>
            <a href="/collection" className='hero-cta'>
              Shop Now
              <span className='hero-cta-line'></span>
            </a>
          </div>
        </div>

        {/* HERO RIGHT */}
        <div className="relative w-full hero-img-wrapper sm:w-1/2" style={{ minHeight: '320px' }}>
          <img src={assets.hero_img} alt="hero" />
          <span className='hero-badge'>New Season</span>
        </div>
      </div>
    </>
  );
};

export default Hero;