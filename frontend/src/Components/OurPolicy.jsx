import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
    return (
        <>
            <style>{`
                .policy-section {
                    background: linear-gradient(135deg, #E8D5C4 0%, #FFFDF9 50%, #E8D5C4 100%);
                    border-top: 1px solid #E8D5C4;
                    border-bottom: 1px solid #E8D5C4;
                    padding: 4rem 2rem;
                    margin: 2rem 0;
                    border-radius: 20px;
                }

                .policy-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 1.5rem;
                    border-radius: 16px;
                    background: #FFFDF9;
                    border: 1px solid #E8D5C4;
                    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
                    box-shadow: 0 2px 10px rgba(139, 90, 74, 0.06);
                    flex: 1;
                    min-width: 160px;
                    max-width: 240px;
                }

                .policy-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 32px rgba(139, 90, 74, 0.14);
                    border-color: #D4755B;
                }

                .policy-icon-wrap {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #E8D5C4, #D4755B22);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                    border: 2px solid #E8D5C4;
                    transition: border-color 0.3s;
                }

                .policy-card:hover .policy-icon-wrap {
                    border-color: #D4755B;
                    background: linear-gradient(135deg, #D4755B22, #E8D5C4);
                }

                .policy-icon-wrap img {
                    width: 28px;
                    filter: invert(35%) sepia(25%) saturate(700%) hue-rotate(330deg) brightness(80%);
                    transition: filter 0.3s;
                }

                .policy-card:hover .policy-icon-wrap img {
                    filter: invert(42%) sepia(40%) saturate(550%) hue-rotate(325deg) brightness(90%);
                }

                .policy-title {
                    color: #8B5A4A;
                    font-weight: 700;
                    font-size: 0.88rem;
                    letter-spacing: 0.03em;
                    margin-bottom: 6px;
                }

                .policy-desc {
                    color: #A8B5A0;
                    font-size: 0.78rem;
                    line-height: 1.6;
                }

                .policy-cards-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                @media (min-width: 640px) {
                    .policy-cards-wrapper {
                        flex-direction: row;
                        justify-content: center;
                        gap: 2rem;
                    }
                }
            `}</style>

            <div className='policy-section'>
                <div className='policy-cards-wrapper'>
                    <div className='policy-card'>
                        <div className='policy-icon-wrap'>
                            <img src={assets.exchange_icon} alt="exchange" />
                        </div>
                        <p className='policy-title'>Easy Exchange Policy</p>
                        <p className='policy-desc'>We offer hassle free exchange policy.</p>
                    </div>

                    <div className='policy-card'>
                        <div className='policy-icon-wrap'>
                            <img src={assets.quality_icon} alt="quality" />
                        </div>
                        <p className='policy-title'>7 Days Return Policy</p>
                        <p className='policy-desc'>We provide 7 days free return policy.</p>
                    </div>

                    <div className='policy-card'>
                        <div className='policy-icon-wrap'>
                            <img src={assets.support_img} alt="support" />
                        </div>
                        <p className='policy-title'>Best Customer Support</p>
                        <p className='policy-desc'>We provide 24/7 customer support.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OurPolicy;