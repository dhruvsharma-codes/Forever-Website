// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import Title from './Title';
// import Item from './Item';

// const BestSeller = () => {
//     const { products } = useContext(ShopContext);
//     const [bestSeller, setBestSeller] = useState([]);

//     useEffect(() => {
//         const bestProduct = products.filter((item) => item.bestseller);
//         setBestSeller(bestProduct.slice(0, 5));
//     }, [products]);

//     return (
//         <>
//             <style>{`
//                 .bestseller-section {
//                     margin: 4rem 0;
//                     position: relative;
//                 }

//                 .bestseller-header {
//                     text-align: center;
//                     padding: 2.5rem 0 2rem;
//                     position: relative;
//                 }

//                 .bestseller-badge-row {
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     gap: 12px;
//                     margin-bottom: 14px;
//                 }

//                 .bestseller-badge {
//                     background: #D4755B;
//                     color: #FFFDF9;
//                     font-size: 0.68rem;
//                     letter-spacing: 0.18em;
//                     font-weight: 700;
//                     padding: 5px 16px;
//                     border-radius: 50px;
//                     text-transform: uppercase;
//                 }

//                 .bestseller-badge-line {
//                     flex: 0 0 40px;
//                     height: 1px;
//                     background: #E8D5C4;
//                 }

//                 .bestseller-subtitle {
//                     max-width: 420px;
//                     margin: 10px auto 0;
//                     color: #A8B5A0;
//                     font-size: 0.88rem;
//                     line-height: 1.7;
//                 }

//                 .bestseller-bg {
//                     background: linear-gradient(180deg, rgba(168,181,160,0.08) 0%, transparent 100%);
//                     border-radius: 24px;
//                     padding: 2rem;
//                     margin: 0 -1rem;
//                 }
//             `}</style>

//             <div className='bestseller-section'>
//                 <div className='bestseller-bg'>
//                     <div className='bestseller-header'>
//                         <div className='bestseller-badge-row'>
//                             <span className='bestseller-badge-line'></span>
//                             <span className='bestseller-badge'>⭐ Top Picks</span>
//                             <span className='bestseller-badge-line'></span>
//                         </div>
//                         <Title text1={'BEST'} text2={'SELLERS'} />
//                         <p className='bestseller-subtitle'>
//                             Explore our best-selling collection, trusted for quality and style.
//                         </p>
//                     </div>

//                     <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
//                         {bestSeller.map((item, index) => (
//                             <Item key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default BestSeller;



import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { motion } from 'framer-motion'
import Title from './Title'
import Item from './Item'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const best = products.filter(item => item.bestseller)
        setBestSeller(best.slice(0, 10))
    }, [products])

    return (
        <section style={{ margin:'4rem 0', position:'relative' }}>
            <style>{`
                .bs-bg {
                    background: linear-gradient(180deg, rgba(152,169,142,0.1) 0%, transparent 100%);
                    border-radius:24px;
                    padding:2rem;
                    margin:0 -1rem;
                }
                .bs-header { text-align:center; padding:2.5rem 0 2rem; }
                .bs-badge-row { display:flex; align-items:center; justify-content:center; gap:14px; margin-bottom:14px; }
                .bs-line { flex:0 0 40px; height:1px; background:#EDD8C4; }
                .bs-badge {
                    background:#C96A42; color:#F7EFE6;
                    font-size:0.68rem; letter-spacing:0.18em; font-weight:700;
                    padding:5px 18px; border-radius:60px; text-transform:uppercase;
                }
            `}</style>

            <div className="bs-bg">
                <div className="bs-header">
                    <motion.div
                        className="bs-badge-row"
                        initial={{ opacity:0, scale:0.9 }}
                        whileInView={{ opacity:1, scale:1 }}
                        viewport={{ once:true }}
                        transition={{ duration:0.4 }}
                    >
                        <span className="bs-line" />
                        <span className="bs-badge">⭐ Top Picks</span>
                        <span className="bs-line" />
                    </motion.div>
                    <Title text1="BEST" text2="SELLERS" />
                    <motion.p
                        style={{ maxWidth:400, margin:'10px auto 0', color:'#98A98E', fontSize:'0.88rem', lineHeight:1.7 }}
                        initial={{ opacity:0, y:10 }}
                        whileInView={{ opacity:1, y:0 }}
                        viewport={{ once:true }}
                        transition={{ delay:0.2, duration:0.5 }}
                    >
                        Explore our best-selling collection, trusted for quality and style.
                    </motion.p>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'1rem' }}>
                    {bestSeller.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity:0, y:28 }}
                            whileInView={{ opacity:1, y:0 }}
                            viewport={{ once:true, margin:'-30px' }}
                            transition={{ delay: index * 0.07, duration:0.5, ease:[0.22,1,0.36,1] }}
                        >
                            <Item id={item._id} name={item.name} image={item.image} price={item.price} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BestSeller