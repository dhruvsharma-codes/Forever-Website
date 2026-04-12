// import React from 'react';




// const reviews = [
//   {
//     name: 'Priya Rawat',
//     location: 'Delhi',
//     initials: 'PR',
//     rating: 5,
//     avatarBg: '#FAE8E0',
//     avatarColor: '#D4755B',
//     text: '"The quality is absolutely amazing! The product looks exactly like it did in the photos. The packaging was also beautiful — perfect for gifting."',
//   },
//   {
//     name: 'Sneha Mehta',
//     location: 'Mumbai',
//     initials: 'SM',
//     rating: 5,
//     avatarBg: '#E8D5C4',
//     avatarColor: '#8B5A4A',
//     text: '"Fast delivery and top-notch packaging. Customer support also responded very quickly. I would definitely recommend it to my friends!"',
//   },
//   {
//     name: 'Anjali Sharma',
//     location: 'Jaipur',
//     initials: 'AS',
//     rating: 4,
//     avatarBg: '#FDF0E8',
//     avatarColor: '#C4603E',
//     text: '"The products feel very premium. One item was slightly delayed, but the support team kept me updated. Overall, a very good experience."',
//   },
//   {
//     name: 'Ritika Gupta',
//     location: 'Bangalore',
//     initials: 'RG',
//     rating: 5,
//     avatarBg: '#FAE8E0',
//     avatarColor: '#D4755B',
//     text: '"I was looking for something for gifting and bought it from here — it was so beautiful that I didn’t even feel like giving it away! Highly recommended."',
//   },
//   {
//     name: 'Kavya Nair',
//     location: 'Chennai',
//     initials: 'KN',
//     rating: 5,
//     avatarBg: '#E8D5C4',
//     avatarColor: '#8B5A4A',
//     text: '"The return process was very smooth — one item had a size issue, and they replaced it without any hassle. This is a trustworthy brand!"',
//   },
//   {
//     name: 'Meera Joshi',
//     location: 'Pune',
//     initials: 'MJ',
//     rating: 5,
//     avatarBg: '#FDF0E8',
//     avatarColor: '#C4603E',
//     text: '"It was my first order, so I was a bit nervous, but I received a completely authentic product. Now I’ve become a regular customer. The quality is unmatched at this price."',
//   },
// ];

// const StarIcon = ({ filled }) => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#D4755B' : '#E8D5C4'}>
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//   </svg>
// );

// const CustomerReviews = () => {
//   const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

//   return (
//     <>
//       <style>{`
//         .cr-section {
//           background-color: #FFFDF9;
//           padding: 4rem 2rem;
//         }
//         .cr-header {
//           text-align: center;
//           margin-bottom: 2.5rem;
//         }
//         .cr-eyebrow {
//           font-size: 0.7rem;
//           font-weight: 600;
//           letter-spacing: 0.18em;
//           color: #D4755B;
//           text-transform: uppercase;
//           margin-bottom: 0.5rem;
//         }
//         .cr-title {
//           font-size: 1.75rem;
//           font-weight: 600;
//           color: #4A2E26;
//           margin-bottom: 0.5rem;
//         }
//         .cr-summary {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           background: #FDF5EF;
//           border: 1.5px solid #E8D5C4;
//           border-radius: 30px;
//           padding: 6px 16px;
//           margin-bottom: 2rem;
//         }
//         .cr-avg {
//           font-size: 1rem;
//           font-weight: 600;
//           color: #4A2E26;
//         }
//         .cr-count {
//           font-size: 0.8rem;
//           color: #8B5A4A;
//         }
//         .cr-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//           gap: 1.25rem;
//           max-width: 1100px;
//           margin: 0 auto;
//         }
//         .cr-card {
//           background: #FFFDF9;
//           border: 1.5px solid #E8D5C4;
//           border-radius: 14px;
//           padding: 1.4rem 1.25rem;
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//           transition: box-shadow 0.25s, border-color 0.25s, transform 0.25s;
//         }
//         .cr-card:hover {
//           border-color: #D4755B;
//           box-shadow: 0 6px 24px rgba(212, 117, 91, 0.1);
//           transform: translateY(-2px);
//         }
//         .cr-stars {
//           display: flex;
//           gap: 3px;
//         }
//         .cr-text {
//           font-size: 0.83rem;
//           color: #6B4038;
//           line-height: 1.7;
//           font-style: italic;
//           flex: 1;
//         }
//         .cr-reviewer {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           border-top: 1px solid #F0E0D4;
//           padding-top: 12px;
//           margin-top: 4px;
//         }
//         .cr-avatar {
//           width: 36px;
//           height: 36px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 0.75rem;
//           font-weight: 600;
//           flex-shrink: 0;
//         }
//         .cr-name {
//           font-size: 0.84rem;
//           font-weight: 600;
//           color: #4A2E26;
//         }
//         .cr-loc {
//           font-size: 0.75rem;
//           color: #8B5A4A;
//         }
//         .cr-verified {
//           margin-left: auto;
//           font-size: 0.7rem;
//           color: #D4755B;
//           font-weight: 600;
//           letter-spacing: 0.04em;
//           white-space: nowrap;
//         }
//       `}</style>

//       <section className="cr-section">
//         <div className="cr-header">
//           <p className="cr-eyebrow">What People Say</p>
//           <h2 className="cr-title">Customer Reviews</h2>
//           <div className="cr-summary">
//             <div className="cr-stars">
//               {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= Math.round(avgRating)} />)}
//             </div>
//             <span className="cr-avg">{avgRating}</span>
//             <span className="cr-count">({reviews.length} reviews)</span>
//           </div>
//         </div>

//         <div className="cr-grid">
//           {reviews.map((r, i) => (
//             <div className="cr-card" key={i}>
//               <div className="cr-stars">
//                 {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= r.rating} />)}
//               </div>
//               <p className="cr-text">{r.text}</p>
//               <div className="cr-reviewer">
//                 <div
//                   className="cr-avatar"
//                   style={{ background: r.avatarBg, color: r.avatarColor }}
//                 >
//                   {r.initials}
//                 </div>
//                 <div>
//                   <p className="cr-name">{r.name}</p>
//                   <p className="cr-loc">{r.location}</p>
//                 </div>
//                 <span className="cr-verified">✓ Verified</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// export default CustomerReviews;



import React from 'react'
import { motion } from 'framer-motion'

const reviews = [
    { name:'Priya Rawat',   location:'Delhi',     initials:'PR', rating:5, avatarBg:'#FAE4D8', avatarColor:'#C96A42', text:'"The quality is absolutely amazing! The product looks exactly like it did in the photos. The packaging was also beautiful — perfect for gifting."' },
    { name:'Sneha Mehta',   location:'Mumbai',    initials:'SM', rating:5, avatarBg:'#EDD8C4', avatarColor:'#7A4A38', text:'"Fast delivery and top-notch packaging. Customer support also responded very quickly. I would definitely recommend it to my friends!"' },
    { name:'Anjali Sharma', location:'Jaipur',    initials:'AS', rating:4, avatarBg:'#FDF0E6', avatarColor:'#B05830', text:'"The products feel very premium. One item was slightly delayed, but the support team kept me updated. Overall, a very good experience."' },
    { name:'Ritika Gupta',  location:'Bangalore', initials:'RG', rating:5, avatarBg:'#FAE4D8', avatarColor:'#C96A42', text:'"I was looking for something for gifting and bought it from here — it was so beautiful that I didn\'t even feel like giving it away! Highly recommended."' },
    { name:'Kavya Nair',    location:'Chennai',   initials:'KN', rating:5, avatarBg:'#EDD8C4', avatarColor:'#7A4A38', text:'"The return process was very smooth — one item had a size issue, and they replaced it without any hassle. This is a trustworthy brand!"' },
    { name:'Meera Joshi',   location:'Pune',      initials:'MJ', rating:5, avatarBg:'#FDF0E6', avatarColor:'#B05830', text:'"It was my first order, so I was a bit nervous, but I received a completely authentic product. Now I\'ve become a regular customer. The quality is unmatched at this price."' },
]

const Star = ({ filled }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#C96A42' : '#EDD8C4'}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

const CustomerReviews = () => {
    const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)

    return (
        <section style={{ background:'#F7EFE6', padding:'4rem 2rem',marginBottom:'2.5rem' }}>
            <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
                <motion.p
                    style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.18em', color:'#C96A42', textTransform:'uppercase', marginBottom:6 }}
                    initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4 }}
                >What People Say</motion.p>
                <motion.h2
                    style={{ fontSize:'1.75rem', fontWeight:700, color:'#3D2318', marginBottom:12, fontFamily:"'Georgia',serif" }}
                    initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.08, duration:0.45 }}
                >Customer Reviews</motion.h2>
                <motion.div
                    style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#FDF0E6', border:'1.5px solid #EDD8C4', borderRadius:30, padding:'6px 16px' }}
                    initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:0.16, duration:0.4 }}
                >
                    <div style={{ display:'flex', gap:3 }}>{[1,2,3,4,5].map(s => <Star key={s} filled={s <= Math.round(avg)} />)}</div>
                    <span style={{ fontSize:'1rem', fontWeight:700, color:'#3D2318' }}>{avg}</span>
                    <span style={{ fontSize:'0.8rem', color:'#7A4A38' }}>({reviews.length} reviews)</span>
                </motion.div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.25rem', maxWidth:1100, margin:'0 auto' }}>
                {reviews.map((r, i) => (
                    <motion.div
                        key={i}
                        style={{ background:'#FEFAF6', border:'1.5px solid #EDD8C4', borderRadius:16, padding:'1.4rem 1.25rem', display:'flex', flexDirection:'column', gap:12 }}
                        initial={{ opacity:0, y:28 }}
                        whileInView={{ opacity:1, y:0 }}
                        viewport={{ once:true, margin:'-30px' }}
                        transition={{ delay: i * 0.07, duration:0.5, ease:[0.22,1,0.36,1] }}
                        whileHover={{ y:-5, borderColor:'#C96A42', boxShadow:'0 8px 28px rgba(201,106,66,0.13)' }}
                    >
                        <div style={{ display:'flex', gap:3 }}>{[1,2,3,4,5].map(s => <Star key={s} filled={s <= r.rating} />)}</div>
                        <p style={{ fontSize:'0.83rem', color:'#5A3028', lineHeight:1.7, fontStyle:'italic', flex:1 }}>{r.text}</p>
                        <div style={{ display:'flex', alignItems:'center', gap:10, borderTop:'1px solid #F0DDD0', paddingTop:12 }}>
                            <div style={{ width:36, height:36, borderRadius:'50%', background:r.avatarBg, color:r.avatarColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:700, flexShrink:0 }}>
                                {r.initials}
                            </div>
                            <div>
                                <p style={{ fontSize:'0.84rem', fontWeight:700, color:'#3D2318', margin:0 }}>{r.name}</p>
                                <p style={{ fontSize:'0.75rem', color:'#7A4A38', margin:0 }}>{r.location}</p>
                            </div>
                            <span style={{ marginLeft:'auto', fontSize:'0.7rem', color:'#C96A42', fontWeight:700, whiteSpace:'nowrap' }}>✓ Verified</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default CustomerReviews