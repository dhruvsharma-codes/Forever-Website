import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <>
            <style>{`
                .footer-wrapper {
                    background: linear-gradient(180deg, #FFFDF9 0%, #E8D5C4 100%);
                    border-top: 2px solid #E8D5C4;
                    margin-top: 4rem;
                }

                .footer-inner {
                    padding: 3.5rem 2rem 0;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .footer-brand-desc {
                    color: #A8B5A0;
                    font-size: 0.84rem;
                    line-height: 1.8;
                    max-width: 300px;
                }

                .footer-col-title {
                    color: #8B5A4A;
                    font-size: 0.78rem;
                    letter-spacing: 0.16em;
                    font-weight: 800;
                    text-transform: uppercase;
                    margin-bottom: 1.2rem;
                    position: relative;
                    padding-bottom: 10px;
                }

                .footer-col-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 28px;
                    height: 2px;
                    background: #D4755B;
                    border-radius: 2px;
                }

                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .footer-links li {
                    color: #A8B5A0;
                    font-size: 0.84rem;
                    cursor: pointer;
                    transition: color 0.2s, padding-left 0.2s;
                    letter-spacing: 0.02em;
                }

                .footer-links li:hover {
                    color: #D4755B;
                    padding-left: 6px;
                }

                .footer-divider {
                    border: none;
                    border-top: 1px solid #E8D5C4;
                    margin: 2rem 2rem 0;
                }

                .footer-copyright {
                    padding: 1.2rem 2rem;
                    text-align: center;
                    color: #A8B5A0;
                    font-size: 0.78rem;
                    letter-spacing: 0.04em;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .footer-copyright span {
                    color: #D4755B;
                    font-weight: 600;
                }

                .footer-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                    margin-bottom: 2rem;
                }

                @media (min-width: 640px) {
                    .footer-grid {
                        display: grid;
                        grid-template-columns: 3fr 1fr 1fr;
                        gap: 3rem;
                    }
                }
            `}</style>

            <div className='footer-wrapper'>
                <div className='footer-inner'>
                    <div className='footer-grid'>

                        {/* Brand col */}
                        <div>
                            <img src={assets.logo} alt="logo" style={{ marginBottom: '1.2rem', width: '130px' }} />
                            <p className='footer-brand-desc'>
                                Our goal is to make your shopping experience simple, enjoyable, and completely stress-free. We work hard to bring you quality products, honest pricing, and responsive customer support whenever you need it.
                            </p>
                        </div>

                        {/* Company col */}
                        <div>
                            <p className='footer-col-title'>Company</p>
                            <ul className='footer-links'>
                                <li>Home</li>
                                <li>About</li>
                                <li>Delivery</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>

                        {/* Contact col */}
                        <div>
                            <p className='footer-col-title'>Get In Touch</p>
                            <ul className='footer-links'>
                                <li>+91 8053103060</li>
                                <li>forever@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className='footer-divider' />
                <p className='footer-copyright'>
                    Copyright 2025 © <span>forever.com</span> — All Rights Reserved.
                </p>
            </div>
        </>
    );
};

export default Footer;