// import React from 'react'
// import Title from '../Components/Title'
// import { assets } from '../assets/assets'
// import Newsletter from '../Components/Newsletter'

// const About = () => {
//     return (
//         <>
//             <style>{`
//                 .about-hero-img {
//                     border-radius: 16px;
//                     object-fit: cover;
//                     box-shadow: 0 12px 40px rgba(139, 90, 74, 0.18);
//                 }

//                 .about-body-text {
//                     color: #A8B5A0;
//                     font-size: 0.9rem;
//                     line-height: 1.9;
//                 }

//                 .about-mission-label {
//                     color: #D4755B;
//                     font-weight: 700;
//                     font-size: 0.78rem;
//                     letter-spacing: 0.16em;
//                     text-transform: uppercase;
//                     border-left: 3px solid #D4755B;
//                     padding-left: 10px;
//                 }

//                 .about-section-divider {
//                     width: 100%;
//                     height: 1px;
//                     background: linear-gradient(90deg, transparent, #E8D5C4, transparent);
//                     margin: 2.5rem 0;
//                 }

//                 .why-card {
//                     flex: 1;
//                     padding: 2.5rem 2rem;
//                     background: #FFFDF9;
//                     border: 1px solid #E8D5C4;
//                     border-radius: 16px;
//                     display: flex;
//                     flex-direction: column;
//                     gap: 14px;
//                     transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
//                     box-shadow: 0 2px 10px rgba(139, 90, 74, 0.06);
//                 }

//                 .why-card:hover {
//                     transform: translateY(-5px);
//                     box-shadow: 0 14px 36px rgba(139, 90, 74, 0.14);
//                     border-color: #D4755B;
//                 }

//                 .why-card-icon {
//                     font-size: 1.8rem;
//                     margin-bottom: 4px;
//                 }

//                 .why-card-title {
//                     color: #8B5A4A;
//                     font-size: 0.9rem;
//                     font-weight: 700;
//                     letter-spacing: 0.04em;
//                 }

//                 .why-card-desc {
//                     color: #A8B5A0;
//                     font-size: 0.84rem;
//                     line-height: 1.8;
//                 }

//                 .about-page {
//                     padding-bottom: 2rem;
//                 }

//                 .about-header {
//                     padding-top: 2rem;
//                     padding-bottom: 1rem;
//                     border-top: 2px solid #E8D5C4;
//                     text-align: center;
//                 }
//             `}</style>

//             <div className='about-page'>
//                 <div className='about-header'>
//                     <Title text1={'ABOUT'} text2={'US'} />
//                 </div>

//                 <div className='flex flex-col gap-16 my-10 md:flex-row items-center'>
//                     <img className='w-full md:max-w-[440px] about-hero-img' src={assets.about_img} alt="about" />
//                     <div className='flex flex-col justify-center gap-5 md:w-1/2'>
//                         <p className='about-body-text'>At Forever, we believe fashion is more than just clothing – it's a way to express who you are. Our collection blends timeless style with modern trends, offering high-quality pieces that make you feel confident and comfortable.</p>
//                         <p className='about-body-text'>We're more than just a clothing store – we're a community built on style, self-expression, and confidence. Every piece in our collection is thoughtfully designed and carefully crafted to bring you comfort, quality, and a touch of individuality.</p>
//                         <div>
//                             <p className='about-mission-label'>Our Mission</p>
//                             <p className='about-body-text mt-3'>Our mission is to empower individuals to embrace their unique style through high-quality, affordable fashion. We're committed to clothing that not only looks good but feels good, while promoting confidence and a sustainable future for fashion.</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='about-section-divider'></div>

//                 <div className='py-4 text-2xl'>
//                     <Title text1={'WHY'} text2={'CHOOSE US'} />
//                 </div>

//                 <div className='flex flex-col gap-4 mb-10 md:flex-row'>
//                     <div className='why-card'>
//                         <span className='why-card-icon'>✦</span>
//                         <p className='why-card-title'>Quality Assurance</p>
//                         <p className='why-card-desc'>From selecting premium fabrics to ensuring precise stitching and finishing, every piece undergoes strict quality checks. We deliver clothing that meets and exceeds your expectations in comfort, durability, and style.</p>
//                     </div>
//                     <div className='why-card'>
//                         <span className='why-card-icon'>⟡</span>
//                         <p className='why-card-title'>Convenience</p>
//                         <p className='why-card-desc'>We make shopping simple, fast, and stress-free. With an easy-to-navigate store, secure payments, and quick delivery, find your perfect outfit from home. Hassle-free returns ensure you shop with total confidence.</p>
//                     </div>
//                     <div className='why-card'>
//                         <span className='why-card-icon'>◈</span>
//                         <p className='why-card-title'>Exceptional Customer Service</p>
//                         <p className='why-card-desc'>Our customers are at the heart of everything we do. From browsing to delivery, our friendly support team is always ready to assist, answer questions, and ensure you feel valued every step of the way.</p>
//                     </div>
//                 </div>

//                 <Newsletter />
//             </div>
//         </>
//     );
// };

// export default About;





import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets.js'
import Newsletter from '../Components/Newsletter'
import { motion } from 'framer-motion'
 
const About = () => {
    const cards = [
        { icon: '✦', title: 'Quality Assurance', desc: 'From selecting premium fabrics to ensuring precise stitching and finishing, every piece undergoes strict quality checks. We deliver clothing that meets and exceeds your expectations.' },
        { icon: '⟡', title: 'Convenience', desc: 'We make shopping simple, fast, and stress-free. With an easy-to-navigate store, secure payments, and quick delivery, find your perfect outfit from home.' },
        { icon: '◈', title: 'Exceptional Service', desc: 'Our customers are at the heart of everything we do. From browsing to delivery, our friendly support team is always ready to assist you every step of the way.' },
    ]
 
    return (
        <>
            <style>{`
                .about-page { padding-bottom:2rem; }
                .about-header { padding-top:2rem; padding-bottom:1rem; border-top:2px solid #EDD8C4; text-align:center; }
                .about-img { border-radius:16px; object-fit:cover; box-shadow:0 12px 40px rgba(61,35,24,0.15); }
                .about-text { color:#98A98E; font-size:0.9rem; line-height:1.9; }
                .about-mission { color:#C96A42; font-weight:700; font-size:0.78rem; letter-spacing:0.16em; text-transform:uppercase; border-left:3px solid #C96A42; padding-left:10px; }
                .about-divider { width:100%; height:1px; background:linear-gradient(90deg,transparent,#EDD8C4,transparent); margin:2.5rem 0; }
                .why-card { flex:1; padding:2.5rem 2rem; background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:16px; display:flex; flex-direction:column; gap:14px; box-shadow:0 2px 10px rgba(61,35,24,0.06); }
                .why-icon { font-size:1.8rem; margin-bottom:4px; }
                .why-title { color:#7A4A38; font-size:0.9rem; font-weight:700; letter-spacing:0.04em; }
                .why-desc { color:#98A98E; font-size:0.84rem; line-height:1.8; }
            `}</style>
 
            <div className="about-page">
                <div className="about-header"><Title text1="ABOUT" text2="US" /></div>
 
                <div className="flex flex-col gap-16 my-10 md:flex-row items-center">
                    <motion.img
                        className="w-full md:max-w-110 about-img"
                        src={assets.about_img} alt="about"
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                    />
                    <motion.div
                        className="flex flex-col justify-center gap-5 md:w-1/2"
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <p className="about-text">At Forever, we believe fashion is more than just clothing — it's a way to express who you are. Our collection blends timeless style with modern trends, offering high-quality pieces that make you feel confident and comfortable.</p>
                        <p className="about-text">We're more than just a clothing store — we're a community built on style, self-expression, and confidence. Every piece is thoughtfully designed and carefully crafted to bring you comfort, quality, and individuality.</p>
                        <div>
                            <p className="about-mission">Our Mission</p>
                            <p className="about-text mt-3">To empower individuals to embrace their unique style through high-quality, affordable fashion. We're committed to clothing that not only looks good but feels good, while promoting confidence and a sustainable future for fashion.</p>
                        </div>
                    </motion.div>
                </div>
 
                <div className="about-divider" />
 
                <div className="py-4 text-2xl"><Title text1="WHY" text2="CHOOSE US" /></div>
 
                <div className="flex flex-col gap-4 mb-10 md:flex-row">
                    {cards.map((c, i) => (
                        <motion.div key={i} className="why-card"
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5, borderColor: '#C96A42', boxShadow: '0 14px 36px rgba(61,35,24,0.14)' }}
                        >
                            <span className="why-icon">{c.icon}</span>
                            <p className="why-title">{c.title}</p>
                            <p className="why-desc">{c.desc}</p>
                        </motion.div>
                    ))}
                </div>
 
                <Newsletter />
            </div>
        </>
    )
}

export default About