import React from 'react'

const Newsletter = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
        alert("Your Newsletter Is Submitted.");
    };

    return (
        <>
            <style>{`
                .newsletter-section {
                    background: linear-gradient(135deg, #8B5A4A 0%, #D4755B 50%, #8B5A4A 100%);
                    border-radius: 20px;
                    padding: 3.5rem 2rem;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    margin: 3rem 0;
                }

                .newsletter-section::before {
                    content: '';
                    position: absolute;
                    top: -60px;
                    right: -60px;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background: rgba(255, 253, 249, 0.06);
                    pointer-events: none;
                }

                .newsletter-section::after {
                    content: '';
                    position: absolute;
                    bottom: -40px;
                    left: -40px;
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    background: rgba(168, 181, 160, 0.12);
                    pointer-events: none;
                }

                .newsletter-eyebrow {
                    display: inline-block;
                    background: rgba(255, 253, 249, 0.15);
                    color: #E8D5C4;
                    font-size: 0.7rem;
                    letter-spacing: 0.2em;
                    font-weight: 700;
                    padding: 5px 18px;
                    border-radius: 50px;
                    margin-bottom: 16px;
                    text-transform: uppercase;
                    border: 1px solid rgba(255, 253, 249, 0.2);
                }

                .newsletter-title {
                    color: #FFFDF9;
                    font-family: 'Georgia', serif;
                    font-size: 1.9rem;
                    margin-bottom: 10px;
                    line-height: 1.3;
                }

                .newsletter-desc {
                    color: rgba(255, 253, 249, 0.75);
                    font-size: 0.88rem;
                    max-width: 400px;
                    margin: 0 auto 1.8rem;
                    line-height: 1.7;
                }

                .newsletter-form {
                    display: flex;
                    align-items: center;
                    gap: 0;
                    max-width: 460px;
                    margin: 0 auto;
                    background: #FFFDF9;
                    border-radius: 50px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(139, 90, 74, 0.3);
                    position: relative;
                    z-index: 1;
                }

                .newsletter-form input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    padding: 14px 20px;
                    font-size: 0.84rem;
                    color: #8B5A4A;
                    min-width: 0;
                }

                .newsletter-form input::placeholder {
                    color: #A8B5A0;
                }

                .newsletter-form button {
                    background: #8B5A4A;
                    color: #FFFDF9;
                    border: none;
                    padding: 14px 28px;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: background 0.2s;
                    border-radius: 0 50px 50px 0;
                }

                .newsletter-form button:hover {
                    background: #D4755B;
                }
            `}</style>

            <div className='newsletter-section'>
                <span className='newsletter-eyebrow'>Newsletter</span>
                <h2 className='newsletter-title'>Subscribe & Get 20% Off</h2>
                <p className='newsletter-desc'>
                    Be the first to know about special launches, trends, and member-only benefits.
                </p>
                <form onSubmit={onSubmitHandler} className='newsletter-form'>
                    <input type="email" placeholder="Enter your email address" required />
                    <button type='submit'>Subscribe</button>
                </form>
            </div>
        </>
    );
};

export default Newsletter;