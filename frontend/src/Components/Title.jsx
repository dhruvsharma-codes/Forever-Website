// import React from 'react'

// const Title = ({ text1, text2 }) => {
//     return (
//         <>
//             <style>{`
//                 .title-wrapper {
//                     display: inline-flex;
//                     align-items: center;
//                     gap: 12px;
//                     margin-bottom: 12px;
//                 }

//                 .title-text {
//                     font-size: 1.6rem;
//                     letter-spacing: 0.06em;
//                     font-family: 'Georgia', serif;
//                 }

//                 .title-text-muted {
//                     color: #A8B5A0;
//                     font-weight: 400;
//                 }

//                 .title-text-bold {
//                     color: #8B5A4A;
//                     font-weight: 700;
//                 }

//                 .title-accent {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 3px;
//                 }

//                 .title-line-1 {
//                     width: 40px;
//                     height: 2px;
//                     background: #D4755B;
//                     border-radius: 2px;
//                 }

//                 .title-line-2 {
//                     width: 24px;
//                     height: 2px;
//                     background: #A8B5A0;
//                     border-radius: 2px;
//                 }

//                 @media (min-width: 640px) {
//                     .title-line-1 { width: 52px; }
//                     .title-line-2 { width: 32px; }
//                 }
//             `}</style>

//             <div className='title-wrapper'>
//                 <p className='title-text'>
//                     <span className='title-text-muted'>{text1} </span>
//                     <span className='title-text-bold'>{text2}</span>
//                 </p>
//                 <div className='title-accent'>
//                     <span className='title-line-1'></span>
//                     <span className='title-line-2'></span>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Title;



import React from 'react'
import { motion } from 'framer-motion'

const Title = ({ text1, text2 }) => {
    return (
        <motion.div
            style={{ display:'inline-flex', alignItems:'center', gap:14, marginBottom:12 }}
            initial={{ opacity:0, x:-20 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-60px' }}
            transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
        >
            <p style={{
                fontSize:'clamp(1.3rem,3vw,1.7rem)',
                letterSpacing:'0.06em',
                fontFamily:"'Georgia',serif",
                margin:0,
            }}>
                <span style={{ color:'#98A98E', fontWeight:400 }}>{text1} </span>
                <span style={{ color:'#7A4A38', fontWeight:700 }}>{text2}</span>
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <motion.span
                    style={{ display:'block', width:46, height:2, background:'#C96A42', borderRadius:2 }}
                    initial={{ scaleX:0, originX:0 }}
                    whileInView={{ scaleX:1 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.45, delay:0.15 }}
                />
                <motion.span
                    style={{ display:'block', width:28, height:2, background:'#98A98E', borderRadius:2 }}
                    initial={{ scaleX:0, originX:0 }}
                    whileInView={{ scaleX:1 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.45, delay:0.25 }}
                />
            </div>
        </motion.div>
    )
}

export default Title;