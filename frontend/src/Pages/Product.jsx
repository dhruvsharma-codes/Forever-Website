

// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../Context/ShopContext'
// import { assets } from '../assets/assets'
// import RelatedProducts from '../Components/RelatedProducts'

// const Product = () => {
//     const { productId } = useParams();
//     const { products, currency, addToCart } = useContext(ShopContext);
//     const [productData, setProductData] = useState(false);
//     const [image, setImage] = useState('');
//     const [size, setSize] = useState('');

//     const fetchProductData = async () => {
//         products.map((item) => {
//             if (item._id === productId) { setProductData(item); setImage(item.image[0]); }
//         });
//     };

//     useEffect(() => { fetchProductData(); }, [productId]);

//     return productData ? (
//         <>
//             <style>{`
//                 .product-page {
//                     padding-top: 2.5rem;
//                     border-top: 2px solid #E8D5C4;
//                 }

//                 .thumb-img {
//                     border: 1.5px solid #E8D5C4;
//                     border-radius: 8px;
//                     cursor: pointer;
//                     transition: border-color 0.2s, transform 0.2s;
//                     overflow: hidden;
//                 }

//                 .thumb-img:hover, .thumb-img.active {
//                     border-color: #D4755B;
//                     transform: scale(1.04);
//                 }

//                 .main-img-wrap {
//                     border-radius: 16px;
//                     overflow: hidden;
//                     border: 1px solid #E8D5C4;
//                     background: #E8D5C4;
//                 }

//                 .main-img-wrap img {
//                     width: 100%;
//                     height: auto;
//                     display: block;
//                 }

//                 .product-title {
//                     color: #8B5A4A;
//                     font-family: 'Georgia', serif;
//                     font-size: 1.6rem;
//                     margin-bottom: 10px;
//                     line-height: 1.3;
//                 }

//                 .star-row {
//                     display: flex;
//                     align-items: center;
//                     gap: 3px;
//                     margin-bottom: 16px;
//                 }

//                 .star-row img {
//                     width: 14px;
//                     filter: invert(65%) sepia(60%) saturate(500%) hue-rotate(340deg);
//                 }

//                 .review-count {
//                     color: #A8B5A0;
//                     font-size: 0.82rem;
//                     margin-left: 6px;
//                 }

//                 .product-price-tag {
//                     color: #D4755B;
//                     font-size: 1.9rem;
//                     font-weight: 700;
//                     margin-bottom: 14px;
//                     letter-spacing: 0.01em;
//                 }

//                 .product-desc {
//                     color: #A8B5A0;
//                     font-size: 0.88rem;
//                     line-height: 1.8;
//                     margin-bottom: 24px;
//                     max-width: 85%;
//                 }

//                 .size-label {
//                     color: #8B5A4A;
//                     font-size: 0.78rem;
//                     letter-spacing: 0.14em;
//                     font-weight: 700;
//                     text-transform: uppercase;
//                     margin-bottom: 10px;
//                 }

//                 .size-btn {
//                     padding: 9px 18px;
//                     border: 1.5px solid #E8D5C4;
//                     border-radius: 8px;
//                     background: #FFFDF9;
//                     color: #8B5A4A;
//                     font-size: 0.82rem;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: border-color 0.2s, background 0.2s, color 0.2s;
//                 }

//                 .size-btn:hover {
//                     border-color: #D4755B;
//                     background: #FFF8F5;
//                 }

//                 .size-btn.selected {
//                     border-color: #D4755B;
//                     background: #D4755B;
//                     color: #FFFDF9;
//                 }

//                 .add-to-cart-btn {
//                     background: #8B5A4A;
//                     color: #FFFDF9;
//                     border: none;
//                     border-radius: 50px;
//                     padding: 14px 36px;
//                     font-size: 0.82rem;
//                     font-weight: 700;
//                     letter-spacing: 0.14em;
//                     text-transform: uppercase;
//                     cursor: pointer;
//                     margin-top: 24px;
//                     transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
//                     box-shadow: 0 4px 16px rgba(139, 90, 74, 0.25);
//                 }

//                 .add-to-cart-btn:hover {
//                     background: #D4755B;
//                     transform: translateY(-2px);
//                     box-shadow: 0 8px 24px rgba(212, 117, 91, 0.3);
//                 }

//                 .product-info-divider {
//                     border: none;
//                     border-top: 1px dashed #E8D5C4;
//                     margin: 20px 0;
//                 }

//                 .product-trust-item {
//                     display: flex;
//                     align-items: center;
//                     gap: 8px;
//                     font-size: 0.8rem;
//                     color: #A8B5A0;
//                 }

//                 .product-trust-dot {
//                     width: 6px;
//                     height: 6px;
//                     border-radius: 50%;
//                     background: #A8B5A0;
//                     flex-shrink: 0;
//                 }

//                 .desc-tab-row {
//                     display: flex;
//                     border-bottom: 2px solid #E8D5C4;
//                     margin-top: 3.5rem;
//                 }

//                 .desc-tab {
//                     padding: 12px 24px;
//                     font-size: 0.82rem;
//                     font-weight: 600;
//                     letter-spacing: 0.06em;
//                     color: #A8B5A0;
//                     cursor: pointer;
//                     border-bottom: 2px solid transparent;
//                     margin-bottom: -2px;
//                     transition: color 0.2s, border-color 0.2s;
//                 }

//                 .desc-tab.active, .desc-tab:first-child {
//                     color: #8B5A4A;
//                     border-bottom-color: #D4755B;
//                 }

//                 .desc-content {
//                     padding: 24px 0;
//                     display: flex;
//                     flex-direction: column;
//                     gap: 14px;
//                 }

//                 .desc-content p {
//                     color: #A8B5A0;
//                     font-size: 0.87rem;
//                     line-height: 1.9;
//                 }
//             `}</style>

//             <div className='product-page'>
//                 <div className='flex flex-col gap-10 sm:flex-row sm:gap-12'>

//                     {/* IMAGES */}
//                     <div className='flex flex-col-reverse flex-1 gap-3 sm:flex-row'>
//                         <div className='flex justify-between sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[19%] w-full gap-2'>
//                             {productData.image.map((item, index) => (
//                                 <img
//                                     onClick={() => setImage(item)}
//                                     src={item} alt={index} key={index}
//                                     className={`w-[23%] sm:w-full flex-shrink-0 thumb-img ${image === item ? 'active' : ''}`}
//                                 />
//                             ))}
//                         </div>
//                         <div className='main-img-wrap w-full sm:w-[80%]'>
//                             <img src={image} alt="product" />
//                         </div>
//                     </div>

//                     {/* PRODUCT INFO */}
//                     <div className='flex-1'>
//                         <h1 className='product-title'>{productData.name}</h1>
//                         <div className='star-row'>
//                             {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt="star" />)}
//                             <img src={assets.star_dull_icon} alt="star" style={{ opacity: 0.4 }} />
//                             <span className='review-count'>(122 reviews)</span>
//                         </div>
//                         <p className='product-price-tag'>{currency}{productData.price}</p>
//                         <p className='product-desc'>{productData.description}</p>

//                         <div>
//                             <p className='size-label'>Select Size</p>
//                             <div className='flex flex-wrap gap-2 mt-2'>
//                                 {productData.sizes.map((item, index) => (
//                                     <button
//                                         onClick={() => setSize(item)}
//                                         className={`size-btn ${item === size ? 'selected' : ''}`}
//                                         key={index}
//                                     >{item}</button>
//                                 ))}
//                             </div>
//                         </div>

//                         <button onClick={() => addToCart(productData._id, size)} className='add-to-cart-btn'>
//                             Add to Cart
//                         </button>

//                         <hr className='product-info-divider' />

//                         <div className='flex flex-col gap-3'>
//                             <div className='product-trust-item'><span className='product-trust-dot'></span>100% Original Product</div>
//                             <div className='product-trust-item'><span className='product-trust-dot'></span>Cash on delivery available</div>
//                             <div className='product-trust-item'><span className='product-trust-dot'></span>Easy return & exchange within 7 days</div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* DESCRIPTION & REVIEWS */}
//                 <div className='mt-16'>
//                     <div className='desc-tab-row'>
//                         <p className='desc-tab active'>Description</p>
//                         <p className='desc-tab'>Reviews (122)</p>
//                     </div>
//                     <div className='desc-content'>
//                         <p>An E-Commerce website is an online platform that facilitates the buying and selling of products through online methods. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
//                         <p>E-Commerce websites typically display products or services along with detailed product data. Every piece is thoughtfully curated to bring you quality and style that lasts.</p>
//                     </div>
//                 </div>

//                 <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//             </div>
//         </>
//     ) : <div className='opacity-0'> </div>;
// };

// export default Product;







import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../Components/RelatedProducts'
import { motion, AnimatePresence } from 'framer-motion'

const Product = () => {
    const { productId } = useParams()
    const { products, currency, addToCart } = useContext(ShopContext)
    const [productData, setProductData] = useState(null)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')
    const [activeTab, setActiveTab] = useState('description')
    const [addedAnim, setAddedAnim] = useState(false)

    useEffect(() => {
        const found = products.find(item => item._id === productId)
        if (found) { setProductData(found); setImage(found.image[0]) }
    }, [productId, products])

    const handleAddToCart = () => {
        if (!size) { return }
        addToCart(productData._id, size)
        setAddedAnim(true)
        setTimeout(() => setAddedAnim(false), 1500)
    }

    if (!productData) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #EDD8C4', borderTopColor: '#C96A42', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
            <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
        </div>
    )

    return (
        <>
            <style>{`
                .product-page { padding-top:2.5rem; border-top:2px solid #EDD8C4; }
                .thumb { border:1.5px solid #EDD8C4; border-radius:8px; cursor:pointer; overflow:hidden; transition:border-color 0.2s; }
                .thumb.active, .thumb:hover { border-color:#C96A42; }
                .tab-row { display:flex; border-bottom:2px solid #EDD8C4; margin-top:3.5rem; }
                .tab-btn { padding:12px 24px; font-size:0.82rem; font-weight:700; letter-spacing:0.06em; color:#98A98E; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-2px; transition:color 0.2s, border-color 0.2s; background:none; border-left:none; border-right:none; border-top:none; font-family:inherit; }
                .tab-btn.active { color:#7A4A38; border-bottom-color:#C96A42; }
                .size-btn { padding:9px 18px; border:1.5px solid #EDD8C4; border-radius:8px; background:#F7EFE6; color:#7A4A38; font-size:0.82rem; font-weight:700; cursor:pointer; transition:all 0.2s; font-family:inherit; }
                .size-btn:hover { border-color:#C96A42; background:#FDF5EF; }
                .size-btn.sel { border-color:#C96A42; background:#C96A42; color:#F7EFE6; }
                .atc-btn { background:#7A4A38; color:#F7EFE6; border:none; border-radius:50px; padding:14px 36px; font-size:0.82rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; cursor:pointer; margin-top:24px; box-shadow:0 4px 16px rgba(61,35,24,0.22); font-family:inherit; transition:background 0.2s; }
                .atc-btn:hover { background:#C96A42; }
                .atc-btn:disabled { background:#EDD8C4; cursor:not-allowed; box-shadow:none; }
            `}</style>

            <div className="product-page">
                <div className="flex flex-col gap-10 sm:flex-row sm:gap-12">

                    {/* IMAGES */}
                    <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
                        {/* Thumbnails */}
                        <div className="flex justify-between sm:flex-col sm:overflow-y-auto sm:justify-normal sm:w-[19%] w-full gap-2">
                            {productData.image.map((img, index) => (
                                <motion.img
                                    key={index}
                                    onClick={() => setImage(img)}
                                    src={img} alt={index}
                                    className={`w-[23%] sm:w-full flex-shrink-0 thumb ${image === img ? 'active' : ''}`}
                                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                />
                            ))}
                        </div>

                        {/* Main image */}
                        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1.5px solid #EDD8C4', background: '#EDD8C4', width: '100%' }} className="sm:w-[80%]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={image}
                                    src={image} alt="product"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                    initial={{ opacity: 0, scale: 1.04 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* PRODUCT INFO */}
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 style={{ color: '#7A4A38', fontFamily: "'Georgia',serif", fontSize: 'clamp(1.3rem,3vw,1.7rem)', marginBottom: 10, lineHeight: 1.3 }}>
                            {productData.name}
                        </h1>

                        {/* Stars */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 16 }}>
                            {[...Array(4)].map((_, i) => (
                                <img key={i} src={assets.star_icon} alt="star" style={{ width: 14, filter: 'invert(55%) sepia(60%) saturate(500%) hue-rotate(330deg)' }} />
                            ))}
                            <img src={assets.star_dull_icon} alt="star" style={{ width: 14, opacity: 0.35, filter: 'invert(55%) sepia(60%) saturate(500%) hue-rotate(330deg)' }} />
                            <span style={{ color: '#98A98E', fontSize: '0.82rem', marginLeft: 6 }}>(122 reviews)</span>
                        </div>

                        <p style={{ color: '#C96A42', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 14 }}>
                            {currency}{productData.price}
                        </p>
                        <p style={{ color: '#98A98E', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: 24, maxWidth: '85%' }}>
                            {productData.description}
                        </p>

                        {/* Size selector */}
                        <div>
                            <p style={{ color: '#7A4A38', fontSize: '0.78rem', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
                                Select Size
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                                {productData.sizes.map((s, i) => (
                                    <motion.button
                                        key={i} onClick={() => setSize(s)}
                                        className={`size-btn ${s === size ? 'sel' : ''}`}
                                        whileTap={{ scale: 0.92 }}
                                    >{s}</motion.button>
                                ))}
                            </div>
                            {!size && <p style={{ fontSize: '0.75rem', color: '#C96A42', marginTop: 8 }}>Please select a size to continue</p>}
                        </div>

                        <motion.button
                            onClick={handleAddToCart}
                            className="atc-btn"
                            disabled={!size}
                            whileHover={size ? { scale: 1.03 } : {}}
                            whileTap={size ? { scale: 0.96 } : {}}
                            animate={addedAnim ? { scale: [1, 1.06, 1] } : {}}
                        >
                            {addedAnim ? '✓ Added to Cart!' : 'Add to Cart'}
                        </motion.button>

                        <hr style={{ border: 'none', borderTop: '1px dashed #EDD8C4', margin: '20px 0' }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {['100% Original Product', 'Cash on delivery available', 'Easy return & exchange within 7 days'].map((t, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#98A98E' }}>
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#98A98E', flexShrink: 0 }} />{t}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* TABS */}
                <div className="mt-16">
                    <div className="tab-row">
                        {[['description', 'Description'], ['reviews', 'Reviews (122)']].map(([key, label]) => (
                            <button key={key} className={`tab-btn ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 14 }}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {activeTab === 'description' ? (
                                <>
                                    <p style={{ color: '#98A98E', fontSize: '0.87rem', lineHeight: 1.9 }}>An E-Commerce website is an online platform that facilitates the buying and selling of products. It serves as a virtual marketplace where businesses and individuals can showcase their products and conduct transactions without the need for a physical presence.</p>
                                    <p style={{ color: '#98A98E', fontSize: '0.87rem', lineHeight: 1.9 }}>Every piece is thoughtfully curated to bring you quality and style that lasts. From selecting premium fabrics to ensuring precise stitching, we maintain strict quality standards throughout.</p>
                                </>
                            ) : (
                                <p style={{ color: '#98A98E', fontSize: '0.87rem', lineHeight: 1.9 }}>Customer reviews will appear here. Be the first to leave a review!</p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
            </div>
        </>
    )
}

export default Product