// import React from 'react'

// const Newsletter = () => {
//     const onSubmitHandler = (e) => {
//         e.preventDefault();
//         alert("Your Newsletter Is Submitted.");
//     };

//     return (
//         <>
//             <style>{`
//                 .newsletter-section {
//                     background: linear-gradient(135deg, #8B5A4A 0%, #D4755B 50%, #8B5A4A 100%);
//                     border-radius: 20px;
//                     padding: 3.5rem 2rem;
//                     text-align: center;
//                     position: relative;
//                     overflow: hidden;
//                     margin: 3rem 0;
//                 }

//                 .newsletter-section::before {
//                     content: '';
//                     position: absolute;
//                     top: -60px;
//                     right: -60px;
//                     width: 200px;
//                     height: 200px;
//                     border-radius: 50%;
//                     background: rgba(255, 253, 249, 0.06);
//                     pointer-events: none;
//                 }

//                 .newsletter-section::after {
//                     content: '';
//                     position: absolute;
//                     bottom: -40px;
//                     left: -40px;
//                     width: 140px;
//                     height: 140px;
//                     border-radius: 50%;
//                     background: rgba(168, 181, 160, 0.12);
//                     pointer-events: none;
//                 }

//                 .newsletter-eyebrow {
//                     display: inline-block;
//                     background: rgba(255, 253, 249, 0.15);
//                     color: #E8D5C4;
//                     font-size: 0.7rem;
//                     letter-spacing: 0.2em;
//                     font-weight: 700;
//                     padding: 5px 18px;
//                     border-radius: 50px;
//                     margin-bottom: 16px;
//                     text-transform: uppercase;
//                     border: 1px solid rgba(255, 253, 249, 0.2);
//                 }

//                 .newsletter-title {
//                     color: #FFFDF9;
//                     font-family: 'Georgia', serif;
//                     font-size: 1.9rem;
//                     margin-bottom: 10px;
//                     line-height: 1.3;
//                 }

//                 .newsletter-desc {
//                     color: rgba(255, 253, 249, 0.75);
//                     font-size: 0.88rem;
//                     max-width: 400px;
//                     margin: 0 auto 1.8rem;
//                     line-height: 1.7;
//                 }

//                 .newsletter-form {
//                     display: flex;
//                     align-items: center;
//                     gap: 0;
//                     max-width: 460px;
//                     margin: 0 auto;
//                     background: #FFFDF9;
//                     border-radius: 50px;
//                     overflow: hidden;
//                     box-shadow: 0 8px 32px rgba(139, 90, 74, 0.3);
//                     position: relative;
//                     z-index: 1;
//                 }

//                 .newsletter-form input {
//                     flex: 1;
//                     background: transparent;
//                     border: none;
//                     outline: none;
//                     padding: 14px 20px;
//                     font-size: 0.84rem;
//                     color: #8B5A4A;
//                     min-width: 0;
//                 }

//                 .newsletter-form input::placeholder {
//                     color: #A8B5A0;
//                 }

//                 .newsletter-form button {
//                     background: #8B5A4A;
//                     color: #FFFDF9;
//                     border: none;
//                     padding: 14px 28px;
//                     font-size: 0.72rem;
//                     font-weight: 700;
//                     letter-spacing: 0.14em;
//                     text-transform: uppercase;
//                     cursor: pointer;
//                     white-space: nowrap;
//                     transition: background 0.2s;
//                     border-radius: 0 50px 50px 0;
//                 }

//                 .newsletter-form button:hover {
//                     background: #D4755B;
//                 }
//             `}</style>

//             <div className='newsletter-section'>
//                 <span className='newsletter-eyebrow'>Newsletter</span>
//                 <h2 className='newsletter-title'>Subscribe & Get 20% Off</h2>
//                 <p className='newsletter-desc'>
//                     Be the first to know about special launches, trends, and member-only benefits.
//                 </p>
//                 <form onSubmit={onSubmitHandler} className='newsletter-form'>
//                     <input type="email" placeholder="Enter your email address" required />
//                     <button type='submit'>Subscribe</button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default Newsletter;


import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Newsletter = () => {
    const [submitted, setSubmitted] = useState(false)
    const [email, setEmail] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section style={{ margin:'3rem 0' }}>
            <style>{`
                .nl-section {
                    background: linear-gradient(135deg,#7A4A38 0%,#C96A42 50%,#7A4A38 100%);
                    border-radius:22px;
                    padding:3.5rem 2rem;
                    text-align:center;
                    position:relative; overflow:hidden;
                }
                .nl-section::before {
                    content:''; position:absolute; top:-60px; right:-60px;
                    width:210px; height:210px; border-radius:50%;
                    background:rgba(247,239,230,0.06); pointer-events:none;
                }
                .nl-section::after {
                    content:''; position:absolute; bottom:-40px; left:-40px;
                    width:150px; height:150px; border-radius:50%;
                    background:rgba(152,169,142,0.12); pointer-events:none;
                }
                .nl-form {
                    display:flex; max-width:460px; margin:0 auto;
                    background:#F7EFE6; border-radius:60px; overflow:hidden;
                    box-shadow:0 8px 32px rgba(61,35,24,0.28);
                    position:relative; z-index:1;
                }
                .nl-form input {
                    flex:1; background:transparent; border:none; outline:none;
                    padding:13px 20px; font-size:0.84rem; color:#7A4A38; min-width:0;
                }
                .nl-form input::placeholder { color:#98A98E; }
                .nl-form button {
                    background:#3D2318; color:#F7EFE6; border:none;
                    padding:13px 26px; font-size:0.72rem; font-weight:700;
                    letter-spacing:0.14em; text-transform:uppercase;
                    cursor:pointer; border-radius:0 60px 60px 0;
                    white-space:nowrap; transition:background 0.2s;
                }
                .nl-form button:hover { background:#C96A42; }
            `}</style>

            <motion.div
                className="nl-section"
                initial={{ opacity:0, y:40 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
            >
                <motion.span
                    style={{
                        display:'inline-block',
                        background:'rgba(247,239,230,0.15)', color:'#EDD8C4',
                        fontSize:'0.7rem', letterSpacing:'0.2em', fontWeight:700,
                        padding:'5px 18px', borderRadius:60, marginBottom:16,
                        textTransform:'uppercase', border:'1px solid rgba(247,239,230,0.22)',
                    }}
                    initial={{ opacity:0, scale:0.9 }}
                    whileInView={{ opacity:1, scale:1 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.15, duration:0.4 }}
                >
                    Newsletter
                </motion.span>

                <motion.h2
                    style={{
                        color:'#F7EFE6', fontFamily:"'Georgia',serif",
                        fontSize:'clamp(1.4rem,3vw,2rem)', margin:'0 0 10px', lineHeight:1.3,
                    }}
                    initial={{ opacity:0, y:16 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.22, duration:0.5 }}
                >
                    Subscribe & Get 20% Off
                </motion.h2>

                <motion.p
                    style={{ color:'rgba(247,239,230,0.75)', fontSize:'0.88rem', maxWidth:400, margin:'0 auto 1.8rem', lineHeight:1.7 }}
                    initial={{ opacity:0, y:12 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.3, duration:0.5 }}
                >
                    Be the first to know about special launches, trends, and member-only benefits.
                </motion.p>

                <motion.div
                    initial={{ opacity:0, y:16 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.4, duration:0.5 }}
                >
                    {!submitted ? (
                        <form onSubmit={onSubmit} className="nl-form">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    ) : (
                        <motion.p
                            style={{ color:'#F7EFE6', fontWeight:700, fontSize:'1rem', letterSpacing:'0.06em', margin:0 }}
                            initial={{ opacity:0, scale:0.9 }}
                            animate={{ opacity:1, scale:1 }}
                            transition={{ type:'spring', stiffness:400 }}
                        >
                            🎉 You're in! Check your inbox for the 20% off code.
                        </motion.p>
                    )}
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Newsletter