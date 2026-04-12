// import React, { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import { Link } from 'react-router-dom';

// const Item = ({ id, image, name, price }) => {
//     const { currency } = useContext(ShopContext);

//     return (
//         <>
//             <style>{`
//                 .product-card {
//                     background: #FFFDF9;
//                     border: 1px solid #E8D5C4;
//                     border-radius: 16px;
//                     overflow: hidden;
//                     text-decoration: none;
//                     display: block;
//                     transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
//                     box-shadow: 0 2px 8px rgba(139, 90, 74, 0.07);
//                 }

//                 .product-card:hover {
//                     transform: translateY(-4px);
//                     box-shadow: 0 12px 32px rgba(139, 90, 74, 0.16);
//                     border-color: #D4755B;
//                 }

//                 .product-img-wrap {
//                     overflow: hidden;
//                     background: #E8D5C4;
//                     aspect-ratio: 1 / 1.1;
//                     position: relative;
//                 }

//                 .product-img-wrap img {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: cover;
//                     transition: transform 0.45s ease;
//                 }

//                 .product-card:hover .product-img-wrap img {
//                     transform: scale(1.08);
//                 }

//                 .product-tag {
//                     position: absolute;
//                     top: 10px;
//                     left: 10px;
//                     background: #A8B5A0;
//                     color: #FFFDF9;
//                     font-size: 0.62rem;
//                     letter-spacing: 0.1em;
//                     font-weight: 700;
//                     padding: 3px 10px;
//                     border-radius: 50px;
//                     text-transform: uppercase;
//                 }

//                 .product-info {
//                     padding: 12px 14px 14px;
//                 }

//                 .product-name {
//                     color: #8B5A4A;
//                     font-size: 0.82rem;
//                     font-weight: 500;
//                     margin-bottom: 4px;
//                     line-height: 1.4;
//                     white-space: nowrap;
//                     overflow: hidden;
//                     text-overflow: ellipsis;
//                 }

//                 .product-price {
//                     color: #D4755B;
//                     font-size: 0.85rem;
//                     font-weight: 700;
//                     letter-spacing: 0.03em;
//                 }
//             `}</style>

//             <Link className='product-card' to={`/product/${id}`}>
//                 <div className='product-img-wrap'>
//                     <img src={image[0]} alt={name} />
//                     <span className='product-tag'>New</span>
//                 </div>
//                 <div className='product-info'>
//                     <p className='product-name'>{name}</p>
//                     <p className='product-price'>{currency}{price}</p>
//                 </div>
//             </Link>
//         </>
//     );
// };

// export default Item;




import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Item = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext)

    return (
        <motion.div
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:'-40px' }}
            transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
            whileHover={{ y:-5 }}
        >
            <Link
                to={`/product/${id}`}
                style={{ textDecoration:'none', display:'block' }}
            >
                <motion.div
                    style={{
                        background:'#F7EFE6',
                        border:'1.5px solid #EDD8C4',
                        borderRadius:18,
                        overflow:'hidden',
                        boxShadow:'0 2px 10px rgba(61,35,24,0.07)',
                        transition:'border-color 0.25s, box-shadow 0.25s',
                    }}
                    whileHover={{
                        boxShadow:'0 14px 36px rgba(61,35,24,0.16)',
                        borderColor:'#C96A42',
                    }}
                    transition={{ duration:0.25 }}
                >
                    {/* Image */}
                    <div style={{ overflow:'hidden', background:'#EDD8C4', aspectRatio:'1/1.1', position:'relative' }}>
                        <motion.img
                            src={image[0]}
                            alt={name}
                            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                            whileHover={{ scale:1.08 }}
                            transition={{ duration:0.45, ease:'easeOut' }}
                        />
                        <span style={{
                            position:'absolute', top:10, left:10,
                            background:'#98A98E', color:'#F7EFE6',
                            fontSize:'0.62rem', letterSpacing:'0.1em', fontWeight:700,
                            padding:'3px 11px', borderRadius:60, textTransform:'uppercase',
                        }}>New</span>
                    </div>

                    {/* Info */}
                    <div style={{ padding:'12px 14px 15px' }}>
                        <p style={{
                            color:'#7A4A38', fontSize:'0.82rem', fontWeight:500,
                            margin:'0 0 4px', lineHeight:1.4,
                            whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                        }}>{name}</p>
                        <p style={{ color:'#C96A42', fontSize:'0.88rem', fontWeight:700, letterSpacing:'0.03em', margin:0 }}>
                            {currency}{price}
                        </p>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    )
}

export default Item