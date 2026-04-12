// import React from 'react'
// import { assets } from '../assets/assets'

// const OurPolicy = () => {
//     return (
//         <>
//             <style>{`
//                 .policy-section {
//                     background: linear-gradient(135deg, #E8D5C4 0%, #FFFDF9 50%, #E8D5C4 100%);
//                     border-top: 1px solid #E8D5C4;
//                     border-bottom: 1px solid #E8D5C4;
//                     padding: 4rem 2rem;
//                     margin: 2rem 0;
//                     border-radius: 20px;
//                 }

//                 .policy-card {
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                     text-align: center;
//                     padding: 1.5rem;
//                     border-radius: 16px;
//                     background: #FFFDF9;
//                     border: 1px solid #E8D5C4;
//                     transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
//                     box-shadow: 0 2px 10px rgba(139, 90, 74, 0.06);
//                     flex: 1;
//                     min-width: 160px;
//                     max-width: 240px;
//                 }

//                 .policy-card:hover {
//                     transform: translateY(-5px);
//                     box-shadow: 0 12px 32px rgba(139, 90, 74, 0.14);
//                     border-color: #D4755B;
//                 }

//                 .policy-icon-wrap {
//                     width: 60px;
//                     height: 60px;
//                     border-radius: 50%;
//                     background: linear-gradient(135deg, #E8D5C4, #D4755B22);
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     margin-bottom: 1rem;
//                     border: 2px solid #E8D5C4;
//                     transition: border-color 0.3s;
//                 }

//                 .policy-card:hover .policy-icon-wrap {
//                     border-color: #D4755B;
//                     background: linear-gradient(135deg, #D4755B22, #E8D5C4);
//                 }

//                 .policy-icon-wrap img {
//                     width: 28px;
//                     filter: invert(35%) sepia(25%) saturate(700%) hue-rotate(330deg) brightness(80%);
//                     transition: filter 0.3s;
//                 }

//                 .policy-card:hover .policy-icon-wrap img {
//                     filter: invert(42%) sepia(40%) saturate(550%) hue-rotate(325deg) brightness(90%);
//                 }

//                 .policy-title {
//                     color: #8B5A4A;
//                     font-weight: 700;
//                     font-size: 0.88rem;
//                     letter-spacing: 0.03em;
//                     margin-bottom: 6px;
//                 }

//                 .policy-desc {
//                     color: #A8B5A0;
//                     font-size: 0.78rem;
//                     line-height: 1.6;
//                 }

//                 .policy-cards-wrapper {
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                     gap: 1.5rem;
//                 }

//                 @media (min-width: 640px) {
//                     .policy-cards-wrapper {
//                         flex-direction: row;
//                         justify-content: center;
//                         gap: 2rem;
//                     }
//                 }
//             `}</style>

//             <div className='policy-section'>
//                 <div className='policy-cards-wrapper'>
//                     <div className='policy-card'>
//                         <div className='policy-icon-wrap'>
//                             <img src={assets.exchange_icon} alt="exchange" />
//                         </div>
//                         <p className='policy-title'>Easy Exchange Policy</p>
//                         <p className='policy-desc'>We offer hassle free exchange policy.</p>
//                     </div>

//                     <div className='policy-card'>
//                         <div className='policy-icon-wrap'>
//                             <img src={assets.quality_icon} alt="quality" />
//                         </div>
//                         <p className='policy-title'>7 Days Return Policy</p>
//                         <p className='policy-desc'>We provide 7 days free return policy.</p>
//                     </div>

//                     <div className='policy-card'>
//                         <div className='policy-icon-wrap'>
//                             <img src={assets.support_img} alt="support" />
//                         </div>
//                         <p className='policy-title'>Best Customer Support</p>
//                         <p className='policy-desc'>We provide 24/7 customer support.</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default OurPolicy;



import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const policies = [
    { icon: assets.exchange_icon, title: 'Easy Exchange Policy', desc: 'We offer hassle-free exchange policy.' },
    { icon: assets.quality_icon,  title: '7 Days Return Policy', desc: 'We provide 7 days free return policy.' },
    { icon: assets.support_img,   title: 'Best Customer Support', desc: 'We provide 24/7 customer support.' },
]

const OurPolicy = () => (
    <section style={{ margin:'2rem 0' }}>
        <style>{`
            .policy-section {
                background: linear-gradient(135deg,#EDD8C4 0%,#F7EFE6 50%,#EDD8C4 100%);
                border-top:1px solid #EDD8C4;
                border-bottom:1px solid #EDD8C4;
                padding:4rem 2rem;
                border-radius:20px;
            }
            .policy-cards { display:flex; flex-direction:column; align-items:center; gap:1.5rem; }
            @media(min-width:640px){ .policy-cards{ flex-direction:row; justify-content:center; gap:2rem; } }
        `}</style>

        <div className="policy-section">
            <div className="policy-cards">
                {policies.map((p, i) => (
                    <motion.div
                        key={i}
                        style={{
                            display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
                            padding:'1.5rem', borderRadius:16,
                            background:'#F7EFE6', border:'1.5px solid #EDD8C4',
                            boxShadow:'0 2px 10px rgba(61,35,24,0.06)',
                            flex:1, minWidth:160, maxWidth:240,
                            cursor:'default',
                        }}
                        initial={{ opacity:0, y:32 }}
                        whileInView={{ opacity:1, y:0 }}
                        viewport={{ once:true, margin:'-40px' }}
                        transition={{ delay: i * 0.12, duration:0.55, ease:[0.22,1,0.36,1] }}
                        whileHover={{ y:-6, boxShadow:'0 14px 36px rgba(61,35,24,0.14)', borderColor:'#C96A42' }}
                    >
                        <motion.div
                            style={{
                                width:62, height:62, borderRadius:'50%',
                                background:'linear-gradient(135deg,#EDD8C4,rgba(201,106,66,0.15))',
                                display:'flex', alignItems:'center', justifyContent:'center',
                                marginBottom:'1rem',
                                border:'2px solid #EDD8C4',
                            }}
                            whileHover={{ borderColor:'#C96A42', rotate:6 }}
                            transition={{ duration:0.3 }}
                        >
                            <img
                                src={p.icon}
                                alt={p.title}
                                style={{ width:28, filter:'invert(30%) sepia(25%) saturate(700%) hue-rotate(330deg) brightness(80%)' }}
                            />
                        </motion.div>
                        <p style={{ color:'#7A4A38', fontWeight:700, fontSize:'0.88rem', letterSpacing:'0.03em', marginBottom:6 }}>
                            {p.title}
                        </p>
                        <p style={{ color:'#98A98E', fontSize:'0.78rem', lineHeight:1.6 }}>{p.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
)

export default OurPolicy