// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../Context/ShopContext";
// import { assets } from "../assets/assets";
// import RelatedProducts from "../Components/RelatedProducts";
// import { motion, AnimatePresence } from "framer-motion";

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");
//   const [activeTab, setActiveTab] = useState("description");
//   const [addedAnim, setAddedAnim] = useState(false);

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image[0]);
//     }
//   }, [productId, products]);

//   const handleAddToCart = () => {
//     if (!size) {
//       return;
//     }
//     addToCart(productData._id, size);
//     setAddedAnim(true);
//     setTimeout(() => setAddedAnim(false), 1500);
//   };

//   if (!productData)
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "40vh",
//         }}
//       >
//         <div
//           style={{
//             width: 40,
//             height: 40,
//             border: "3px solid #EDD8C4",
//             borderTopColor: "#C96A42",
//             borderRadius: "50%",
//             animation: "spin 0.9s linear infinite",
//           }}
//         />
//         <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
//       </div>
//     );

//   return (
//     <>
//       <style>{`
//                 .product-page { padding-top:2.5rem; border-top:2px solid #EDD8C4; }
//                 .thumb { border:1.5px solid #EDD8C4; border-radius:8px; cursor:pointer; overflow:hidden; transition:border-color 0.2s; }
//                 .thumb.active, .thumb:hover { border-color:#C96A42; }
//                 .tab-row { display:flex; border-bottom:2px solid #EDD8C4; margin-top:3.5rem; }
//                 .tab-btn { padding:12px 24px; font-size:0.82rem; font-weight:700; letter-spacing:0.06em; color:#98A98E; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-2px; transition:color 0.2s, border-color 0.2s; background:none; border-left:none; border-right:none; border-top:none; font-family:inherit; }
//                 .tab-btn.active { color:#7A4A38; border-bottom-color:#C96A42; }
//                 .size-btn { padding:9px 18px; border:1.5px solid #EDD8C4; border-radius:8px; background:#F7EFE6; color:#7A4A38; font-size:0.82rem; font-weight:700; cursor:pointer; transition:all 0.2s; font-family:inherit; }
//                 .size-btn:hover { border-color:#C96A42; background:#FDF5EF; }
//                 .size-btn.sel { border-color:#C96A42; background:#C96A42; color:#F7EFE6; }
//                 .atc-btn { background:#7A4A38; color:#F7EFE6; border:none; border-radius:50px; padding:14px 36px; font-size:0.82rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; cursor:pointer; margin-top:24px; box-shadow:0 4px 16px rgba(61,35,24,0.22); font-family:inherit; transition:background 0.2s; }
//                 .atc-btn:hover { background:#C96A42; }
//                 .atc-btn:disabled { background:#EDD8C4; cursor:not-allowed; box-shadow:none; }
//             `}</style>

//       <div className="product-page">
//         <div className="flex flex-col gap-10 sm:flex-row sm:gap-12">
//           {/* IMAGES */}
//           <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
//             {/* Thumbnails */}
//             <div className="flex justify-between sm:flex-col sm:overflow-y-auto sm:justify-normal sm:w-[19%] w-full gap-2">
//               {productData.image.map((img, index) => (
//                 <motion.img
//                   key={index}
//                   onClick={() => setImage(img)}
//                   src={img}
//                   alt={index}
//                   className={`w-[23%] sm:w-full flex-shrink-0 thumb ${image === img ? "active" : ""}`}
//                   whileHover={{ scale: 1.04 }}
//                   whileTap={{ scale: 0.96 }}
//                 />
//               ))}
//             </div>

//             {/* Main image */}
//             <div
//               style={{
//                 borderRadius: 16,
//                 overflow: "hidden",
//                 border: "1.5px solid #EDD8C4",
//                 background: "#EDD8C4",
//                 width: "100%",
//               }}
//               className="sm:w-[80%]"
//             >
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={image}
//                   src={image}
//                   alt="product"
//                   style={{ width: "100%", height: "auto", display: "block" }}
//                   initial={{ opacity: 0, scale: 1.04 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* PRODUCT INFO */}
//           <motion.div
//             className="flex-1"
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <h1
//               style={{
//                 color: "#7A4A38",
//                 fontFamily: "'Georgia',serif",
//                 fontSize: "clamp(1.3rem,3vw,1.7rem)",
//                 marginBottom: 10,
//                 lineHeight: 1.3,
//               }}
//             >
//               {productData.name}
//             </h1>

//             {/* Stars */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 3,
//                 marginBottom: 16,
//               }}
//             >
//               {[...Array(4)].map((_, i) => (
//                 <img
//                   key={i}
//                   src={assets.star_icon}
//                   alt="star"
//                   style={{
//                     width: 14,
//                     filter:
//                       "invert(55%) sepia(60%) saturate(500%) hue-rotate(330deg)",
//                   }}
//                 />
//               ))}
//               <img
//                 src={assets.star_dull_icon}
//                 alt="star"
//                 style={{
//                   width: 14,
//                   opacity: 0.35,
//                   filter:
//                     "invert(55%) sepia(60%) saturate(500%) hue-rotate(330deg)",
//                 }}
//               />
//               <span
//                 style={{ color: "#98A98E", fontSize: "0.82rem", marginLeft: 6 }}
//               >
//                 (122 reviews)
//               </span>
//             </div>

//             <p
//               style={{
//                 color: "#C96A42",
//                 fontSize: "clamp(1.5rem,3vw,2rem)",
//                 fontWeight: 700,
//                 marginBottom: 14,
//               }}
//             >
//               {currency}
//               {productData.price}
//             </p>
//             <p
//               style={{
//                 color: "#98A98E",
//                 fontSize: "0.88rem",
//                 lineHeight: 1.8,
//                 marginBottom: 24,
//                 maxWidth: "85%",
//               }}
//             >
//               {productData.description}
//             </p>

//             {/* Size selector */}
//             <div>
//               <p
//                 style={{
//                   color: "#7A4A38",
//                   fontSize: "0.78rem",
//                   letterSpacing: "0.14em",
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   marginBottom: 10,
//                 }}
//               >
//                 Select Size
//               </p>
//               <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: 8,
//                   marginTop: 8,
//                 }}
//               >
//                 {productData.sizes.map((s, i) => (
//                   <motion.button
//                     key={i}
//                     onClick={() => setSize(s)}
//                     className={`size-btn ${s === size ? "sel" : ""}`}
//                     whileTap={{ scale: 0.92 }}
//                   >
//                     {s}
//                   </motion.button>
//                 ))}
//               </div>
//               {!size && (
//                 <p
//                   style={{
//                     fontSize: "0.75rem",
//                     color: "#C96A42",
//                     marginTop: 8,
//                   }}
//                 >
//                   Please select a size to continue
//                 </p>
//               )}
//             </div>

//             <motion.button
//               onClick={handleAddToCart}
//               className="atc-btn"
//               disabled={!size}
//               whileHover={size ? { scale: 1.03 } : {}}
//               whileTap={size ? { scale: 0.96 } : {}}
//               animate={addedAnim ? { scale: [1, 1.06, 1] } : {}}
//             >
//               {addedAnim ? "✓ Added to Cart!" : "Add to Cart"}
//             </motion.button>

//             <hr
//               style={{
//                 border: "none",
//                 borderTop: "1px dashed #EDD8C4",
//                 margin: "20px 0",
//               }}
//             />

//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {[
//                 "100% Original Product",
//                 "Cash on delivery available",
//                 "Easy return & exchange within 7 days",
//               ].map((t, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 8,
//                     fontSize: "0.8rem",
//                     color: "#98A98E",
//                   }}
//                 >
//                   <span
//                     style={{
//                       width: 6,
//                       height: 6,
//                       borderRadius: "50%",
//                       background: "#98A98E",
//                       flexShrink: 0,
//                     }}
//                   />
//                   {t}
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* TABS */}
//         <div className="mt-16">
//           <div className="tab-row">
//             {[
//               ["description", "Description"],
//               ["reviews", "Reviews (122)"],
//             ].map(([key, label]) => (
//               <button
//                 key={key}
//                 className={`tab-btn ${activeTab === key ? "active" : ""}`}
//                 onClick={() => setActiveTab(key)}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               style={{
//                 padding: "24px 0",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 14,
//               }}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//             >
//               {activeTab === "description" ? (
//                 <>
//                   <p
//                     style={{
//                       color: "#98A98E",
//                       fontSize: "0.87rem",
//                       lineHeight: 1.9,
//                     }}
//                   >
//                     An E-Commerce website is an online platform that facilitates
//                     the buying and selling of products. It serves as a virtual
//                     marketplace where businesses and individuals can showcase
//                     their products and conduct transactions without the need for
//                     a physical presence.
//                   </p>
//                   <p
//                     style={{
//                       color: "#98A98E",
//                       fontSize: "0.87rem",
//                       lineHeight: 1.9,
//                     }}
//                   >
//                     Every piece is thoughtfully curated to bring you quality and
//                     style that lasts. From selecting premium fabrics to ensuring
//                     precise stitching, we maintain strict quality standards
//                     throughout.
//                   </p>
//                 </>
//               ) : (
//                 <p
//                   style={{
//                     color: "#98A98E",
//                     fontSize: "0.87rem",
//                     lineHeight: 1.9,
//                   }}
//                 >
//                   Customer reviews will appear here. Be the first to leave a
//                   review!
//                 </p>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <RelatedProducts
//           category={productData.category}
//           subCategory={productData.subCategory}
//         />
//       </div>
//     </>
//   );
// };

// export default Product;






// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../Context/ShopContext'
// import { assets } from '../assets/assets'
// import RelatedProducts from '../Components/RelatedProducts'
// import { motion, AnimatePresence } from 'framer-motion'

// const Product = () => {
//     const { productId } = useParams()
//     const { products, currency, addToCart, getDiscountedPrice, isOnSale, activeSale } = useContext(ShopContext)
//     const [productData, setProductData] = useState(null)
//     const [image, setImage] = useState('')
//     const [size, setSize] = useState('')
//     const [activeTab, setActiveTab] = useState('description')
//     const [addedAnim, setAddedAnim] = useState(false)

//     useEffect(() => {
//         const found = products.find(item => item._id === productId)
//         if (found) { setProductData(found); setImage(found.image[0]) }
//     }, [productId, products])

//     const handleAddToCart = () => {
//         if (!size) return
//         addToCart(productData._id, size)
//         setAddedAnim(true)
//         setTimeout(() => setAddedAnim(false), 1500)
//     }

//     if (!productData) return (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
//             <div style={{ width: 40, height: 40, border: '3px solid #EDD8C4', borderTopColor: '#C96A42', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
//             <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
//         </div>
//     )

//     const onSale = isOnSale(productData)
//     const discountedPrice = getDiscountedPrice(productData)
//     const savings = onSale ? (productData.price - discountedPrice).toFixed(0) : 0

//     return (
//         <>
//             <style>{`
//                 .product-page { padding-top:2.5rem; border-top:2px solid #EDD8C4; }
//                 .thumb { border:1.5px solid #EDD8C4; border-radius:8px; cursor:pointer; overflow:hidden; transition:border-color 0.2s; }
//                 .thumb.active,.thumb:hover { border-color:#C96A42; }
//                 .tab-row { display:flex; border-bottom:2px solid #EDD8C4; margin-top:3.5rem; }
//                 .tab-btn { padding:12px 24px; font-size:0.82rem; font-weight:700; letter-spacing:0.06em; color:#98A98E; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-2px; transition:color 0.2s,border-color 0.2s; background:none; border-left:none; border-right:none; border-top:none; font-family:inherit; }
//                 .tab-btn.active { color:#7A4A38; border-bottom-color:#C96A42; }
//                 .size-btn { padding:9px 18px; border:1.5px solid #EDD8C4; border-radius:8px; background:#F7EFE6; color:#7A4A38; font-size:0.82rem; font-weight:700; cursor:pointer; transition:all 0.2s; font-family:inherit; }
//                 .size-btn:hover { border-color:#C96A42; background:#FDF5EF; }
//                 .size-btn.sel { border-color:#C96A42; background:#C96A42; color:#F7EFE6; }
//                 .atc-btn { background:#7A4A38; color:#F7EFE6; border:none; border-radius:50px; padding:14px 36px; font-size:0.82rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; cursor:pointer; margin-top:24px; box-shadow:0 4px 16px rgba(61,35,24,0.22); font-family:inherit; transition:background 0.2s; }
//                 .atc-btn:hover { background:#C96A42; }
//                 .atc-btn:disabled { background:#EDD8C4; cursor:not-allowed; box-shadow:none; }
//             `}</style>

//             <div className="product-page">
//                 <div className="flex flex-col gap-10 sm:flex-row sm:gap-12">

//                     {/* IMAGES */}
//                     <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
//                         <div className="flex justify-between sm:flex-col sm:overflow-y-auto sm:justify-normal sm:w-[19%] w-full gap-2">
//                             {productData.image.map((img, index) => (
//                                 <motion.img key={index} onClick={() => setImage(img)} src={img} alt={index}
//                                     className={`w-[23%] sm:w-full flex-shrink-0 thumb ${image === img ? 'active' : ''}`}
//                                     whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} />
//                             ))}
//                         </div>

//                         <div style={{ borderRadius: 16, overflow: 'hidden', border: '1.5px solid #EDD8C4', background: '#EDD8C4', width: '100%', position: 'relative' }} className="sm:w-[80%]">
//                             {/* Sale badge */}
//                             {onSale && (
//                                 <motion.div
//                                     style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, background: '#C96A42', color: '#F7EFE6', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', padding: '5px 12px', borderRadius: 20, textTransform: 'uppercase' }}
//                                     initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
//                                     transition={{ type: 'spring', stiffness: 400, delay: 0.3 }}
//                                 >
//                                     {activeSale.discountPercent}% OFF · {activeSale.label}
//                                 </motion.div>
//                             )}
//                             <AnimatePresence mode="wait">
//                                 <motion.img key={image} src={image} alt="product"
//                                     style={{ width: '100%', height: '100%', display: 'block' }}
//                                     initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
//                                     transition={{ duration: 0.3 }} />
//                             </AnimatePresence>
//                         </div>
//                     </div>

//                     {/* PRODUCT INFO */}
//                     <motion.div className="flex-1"
//                         initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

//                         <h1 style={{ color: '#7A4A38', fontFamily: "'Georgia',serif", fontSize: 'clamp(1.3rem,3vw,1.7rem)', marginBottom: 10, lineHeight: 1.3 }}>
//                             {productData.name}
//                         </h1>

//                         {/* Stars */}
//                         <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 16 }}>
//                             {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt="star" style={{ width: 14, filter: 'invert(55%) sepia(60%) saturate(500%) hue-rotate(330deg)' }} />)}
//                             <img src={assets.star_dull_icon} alt="star" style={{ width: 14, opacity: 0.35, filter: 'invert(55%) sepia(60%) saturate(500%) hue-rotate(330deg)' }} />
//                             <span style={{ color: '#98A98E', fontSize: '0.82rem', marginLeft: 6 }}>(122 reviews)</span>
//                         </div>

//                         {/* ── PRICE ── */}
//                         {onSale ? (
//                             <motion.div style={{ marginBottom: 14 }}
//                                 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
//                                 <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
//                                     <span style={{ color: '#C96A42', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700 }}>
//                                         {currency}{discountedPrice.toFixed(0)}
//                                     </span>
//                                     <span style={{ color: '#98A98E', fontSize: '1rem', textDecoration: 'line-through' }}>
//                                         {currency}{productData.price}
//                                     </span>
//                                 </div>
//                                 <motion.div
//                                     style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, background: 'rgba(201,106,66,0.1)', border: '1px solid rgba(201,106,66,0.25)', borderRadius: 8, padding: '5px 12px' }}
//                                     initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}>
//                                     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C96A42" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//                                         <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
//                                     </svg>
//                                     <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C96A42' }}>
//                                         You save {currency}{savings} · {activeSale.discountPercent}% {activeSale.label}
//                                     </span>
//                                 </motion.div>
//                             </motion.div>
//                         ) : (
//                             <p style={{ color: '#C96A42', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 14 }}>
//                                 {currency}{productData.price}
//                             </p>
//                         )}

//                         <p style={{ color: '#98A98E', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: 24, maxWidth: '85%' }}>
//                             {productData.description}
//                         </p>

//                         {/* Size selector */}
//                         <div>
//                             <p style={{ color: '#7A4A38', fontSize: '0.78rem', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>Select Size</p>
//                             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
//                                 {productData.sizes.map((s, i) => (
//                                     <motion.button key={i} onClick={() => setSize(s)}
//                                         className={`size-btn ${s === size ? 'sel' : ''}`} whileTap={{ scale: 0.92 }}>{s}</motion.button>
//                                 ))}
//                             </div>
//                             {!size && <p style={{ fontSize: '0.75rem', color: '#C96A42', marginTop: 8 }}>Please select a size to continue</p>}
//                         </div>

//                         <motion.button onClick={handleAddToCart} className="atc-btn" disabled={!size}
//                             whileHover={size ? { scale: 1.03 } : {}} whileTap={size ? { scale: 0.96 } : {}}
//                             animate={addedAnim ? { scale: [1, 1.06, 1] } : {}}>
//                             {addedAnim ? '✓ Added to Cart!' : 'Add to Cart'}
//                         </motion.button>

//                         {onSale && (
//                             <p style={{ fontSize: '0.75rem', color: '#7A4A38', marginTop: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
//                                 <span style={{ color: '#C96A42' }}>✓</span>
//                                 {activeSale.discountPercent}% discount reflected in cart total automatically
//                             </p>
//                         )}

//                         <hr style={{ border: 'none', borderTop: '1px dashed #EDD8C4', margin: '20px 0' }} />

//                         <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                             {['100% Original Product', 'Cash on delivery available', 'Easy return & exchange within 7 days'].map((t, i) => (
//                                 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#98A98E' }}>
//                                     <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#98A98E', flexShrink: 0 }} />{t}
//                                 </div>
//                             ))}
//                         </div>
//                     </motion.div>
//                 </div>

//                 {/* TABS */}
//                 <div className="mt-16">
//                     <div className="tab-row">
//                         {[['description', 'Description'], ['reviews', 'Reviews (122)']].map(([key, label]) => (
//                             <button key={key} className={`tab-btn ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
//                         ))}
//                     </div>
//                     <AnimatePresence mode="wait">
//                         <motion.div key={activeTab}
//                             style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 14 }}
//                             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
//                             transition={{ duration: 0.25 }}>
//                             {activeTab === 'description' ? (
//                                 <>
//                                     <p style={{ color: '#98A98E', fontSize: '0.87rem', lineHeight: 1.9 }}>An E-Commerce website is an online platform that facilitates the buying and selling of products. It serves as a virtual marketplace where businesses and individuals can showcase their products and conduct transactions without the need for a physical presence.</p>
//                                     <p style={{ color: '#98A98E', fontSize: '0.87rem', lineHeight: 1.9 }}>Every piece is thoughtfully curated to bring you quality and style that lasts. From selecting premium fabrics to ensuring precise stitching, we maintain strict quality standards throughout.</p>
//                                 </>
//                             ) : (
//                                 <p style={{ color: '#98A98E', fontSize: '0.87rem', lineHeight: 1.9 }}>Customer reviews will appear here. Be the first to leave a review!</p>
//                             )}
//                         </motion.div>
//                     </AnimatePresence>
//                 </div>

//                 <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//             </div>
//         </>
//     )
// }

// export default Product


















import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../Components/RelatedProducts'
import { motion, AnimatePresence } from 'framer-motion'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart, getDiscountedPrice, isOnSale, activeSale } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')
  const [addedAnim, setAddedAnim] = useState(false)
  const [imgZoom, setImgZoom] = useState(false)

  useEffect(() => {
    const found = products.find(p => p._id === productId)
    if (found) { setProductData(found); setImage(found.image[0]) }
  }, [productId, products])

  const handleAddToCart = () => {
    if (!size) return
    addToCart(productData._id, size)
    setAddedAnim(true)
    setTimeout(() => setAddedAnim(false), 2000)
  }

  if (!productData) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
      <div style={{ width: 44, height: 44, border: '3px solid var(--cream-deeper)', borderTopColor: 'var(--terra)', borderRadius: '50%', animation: 'spin 0.85s linear infinite' }} />
    </div>
  )

  const onSale = isOnSale(productData)
  const discountedPrice = getDiscountedPrice(productData)
  const savings = onSale ? (productData.price - discountedPrice).toFixed(0) : 0

  return (
    <>
      <style>{`
        .product-page { padding-top: 2.5rem; border-top: 2px solid var(--cream-deeper); }

        .thumb-btn {
          border: 2px solid transparent;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.2s;
          background: var(--cream-dark);
          aspect-ratio: 1 / 1;
          flex-shrink: 0;
        }
        .thumb-btn.active, .thumb-btn:hover { border-color: var(--terra); }
        .thumb-btn img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .tab-row {
          display: flex;
          border-bottom: 2px solid var(--cream-deeper);
          margin-top: 3.5rem;
          gap: 0;
        }
        .tab-btn {
          padding: 12px 24px;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--mist);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: color 0.2s, border-color 0.2s;
          background: none;
          border-left: none; border-right: none; border-top: none;
          text-transform: uppercase;
        }
        .tab-btn.active { color: var(--espresso); border-bottom-color: var(--terra); }
        .tab-btn:hover:not(.active) { color: var(--bark); }

        .size-btn {
          padding: 10px 20px;
          border: 1.5px solid var(--cream-deeper);
          border-radius: var(--radius-md);
          background: var(--cream);
          color: var(--bark);
          font-family: var(--font-body);
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.18s;
          letter-spacing: 0.04em;
        }
        .size-btn:hover { border-color: var(--terra); background: rgba(201,106,66,0.06); color: var(--terra); }
        .size-btn.selected { border-color: var(--terra); background: var(--terra); color: var(--cream); }

        .atc-btn {
          background: var(--espresso);
          color: var(--cream);
          border: none;
          border-radius: var(--radius-full);
          padding: 15px 36px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 24px;
          box-shadow: 0 4px 20px rgba(44,24,16,0.22);
          transition: all 0.22s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .atc-btn:hover:not(:disabled) {
          background: var(--terra);
          box-shadow: var(--shadow-terra);
          transform: translateY(-1px);
        }
        .atc-btn:disabled { background: var(--sand); cursor: not-allowed; box-shadow: none; transform: none; }
        .atc-btn.added { background: #4a7c59; box-shadow: 0 4px 16px rgba(74,124,89,0.35); }
      `}</style>

      <div className="product-page">
        <div className="flex flex-col gap-12 sm:flex-row sm:gap-14">

          {/* ── IMAGES ── */}
          <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:w-[18%]" style={{ scrollbarWidth: 'none' }}>
              {productData.image.map((img, i) => (
                <motion.button
                  key={i}
                  className={`thumb-btn ${image === img ? 'active' : ''}`}
                  onClick={() => setImage(img)}
                  style={{ minWidth: 64 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <img src={img} alt={`view ${i + 1}`} loading="lazy" />
                </motion.button>
              ))}
            </div>

            {/* Main image */}
            <div
              className="sm:w-[80%]"
              style={{
                borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                border: '1.5px solid var(--cream-deeper)',
                background: 'var(--cream-dark)',
                position: 'relative',
                cursor: imgZoom ? 'zoom-out' : 'zoom-in',
              }}
              onClick={() => setImgZoom(!imgZoom)}
            >
              {/* Sale badge */}
              {onSale && (
                <motion.div
                  style={{
                    position: 'absolute', top: 16, left: 16, zIndex: 2,
                    background: 'var(--terra)', color: 'var(--cream)',
                    fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
                    letterSpacing: '0.08em', padding: '6px 14px',
                    borderRadius: 'var(--radius-full)', textTransform: 'uppercase',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, delay: 0.3 }}
                >
                  {activeSale.discountPercent}% OFF
                </motion.div>
              )}

              {/* Zoom hint */}
              <div style={{
                position: 'absolute', bottom: 14, right: 14, zIndex: 2,
                background: 'rgba(44,24,16,0.6)', backdropFilter: 'blur(8px)',
                color: 'var(--cream)', fontFamily: 'var(--font-body)',
                fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em',
                padding: '5px 12px', borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase', opacity: imgZoom ? 0 : 1,
                transition: 'opacity 0.2s',
              }}>
                Click to zoom
              </div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={image}
                  src={image}
                  alt={productData.name}
                  style={{
                    width: '100%',
                    display: 'block',
                    transform: imgZoom ? 'scale(1.5)' : 'scale(1)',
                    transition: 'transform 0.4s ease',
                    transformOrigin: 'center center',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* ── PRODUCT INFO ── */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category breadcrumb */}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 10 }}>
              {productData.category} · {productData.subCategory}
            </p>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 600,
              color: 'var(--espresso)',
              marginBottom: 14,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
            }}>
              {productData.name}
            </h1>

            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 18 }}>
              {[...Array(4)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C96A42">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#EDD8C4">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '0.82rem', marginLeft: 4 }}>
                4.0 (122 reviews)
              </span>
            </div>

            {/* Price block */}
            <div style={{
              background: onSale ? 'rgba(201,106,66,0.05)' : 'var(--cream-dark)',
              border: `1.5px solid ${onSale ? 'rgba(201,106,66,0.2)' : 'var(--cream-deeper)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              marginBottom: 22,
            }}>
              {onSale ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontFamily: 'var(--font-display)', color: 'var(--terra)', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                      {currency}{discountedPrice.toFixed(0)}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '1rem', textDecoration: 'line-through' }}>
                      {currency}{productData.price}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="badge badge-terra" style={{ fontSize: '0.65rem' }}>
                      {activeSale.discountPercent}% OFF
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--terra)', fontWeight: 600 }}>
                      You save {currency}{savings}
                    </span>
                  </div>
                </div>
              ) : (
                <span style={{ fontFamily: 'var(--font-display)', color: 'var(--terra)', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {currency}{productData.price}
                </span>
              )}
            </div>

            <p style={{
              fontFamily: 'var(--font-body)', color: 'var(--mist)',
              fontSize: '0.88rem', lineHeight: 1.8, marginBottom: 24,
            }}>
              {productData.description}
            </p>

            {/* Size selector */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--espresso)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
                  Select Size
                </p>
                <button style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: 'var(--terra)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                  Size Guide
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {productData.sizes.map((s) => (
                  <motion.button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`size-btn${s === size ? ' selected' : ''}`}
                    whileTap={{ scale: 0.92 }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {!size && (
                  <motion.p
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: 'var(--terra)', marginTop: 8 }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    ↑ Please select a size to continue
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Add to cart */}
            <motion.button
              onClick={handleAddToCart}
              className={`atc-btn${addedAnim ? ' added' : ''}`}
              disabled={!size}
              whileHover={size ? { scale: 1.02 } : {}}
              whileTap={size ? { scale: 0.97 } : {}}
            >
              {addedAnim ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  Add to Cart
                </>
              )}
            </motion.button>

            {onSale && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: 'var(--bark)', marginTop: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: 'var(--terra)' }}>✓</span>
                {activeSale.discountPercent}% discount will be reflected automatically in your cart total
              </p>
            )}

            {/* Divider */}
            <div className="divider" style={{ margin: '22px 0' }} />

            {/* Trust points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '✓', text: '100% Original Product — Authenticity Guaranteed' },
                { icon: '📦', text: 'Cash on delivery available on this item' },
                { icon: '↩️', text: 'Easy return & exchange within 7 days of delivery' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--mist)', lineHeight: 1.4 }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── TABS ── */}
        <div style={{ marginTop: '4rem' }}>
          <div className="tab-row">
            {[['description', 'Description'], ['reviews', 'Reviews (122)'], ['shipping', 'Shipping']].map(([key, label]) => (
              <button key={key} className={`tab-btn${activeTab === key ? ' active' : ''}`} onClick={() => setActiveTab(key)}>
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              style={{ padding: '28px 0', maxWidth: 700 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {activeTab === 'description' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '0.88rem', lineHeight: 1.85 }}>
                    An E-Commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, and customers can browse and make purchases without the need for a physical presence.
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '0.88rem', lineHeight: 1.85 }}>
                    Every piece is thoughtfully curated to bring you lasting quality and style. From selecting premium fabrics to ensuring precise stitching, we maintain strict quality standards throughout every stage of production.
                  </p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '0.88rem', lineHeight: 1.85 }}>
                    Customer reviews will appear here. Be the first to leave a review for this product!
                  </p>
                  <button className="btn-secondary" style={{ width: 'fit-content' }}>Write a Review</button>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Standard Delivery', value: '3–5 business days · ₹10' },
                    { label: 'Free Shipping', value: 'On orders over ₹999' },
                    { label: 'Returns', value: 'Free within 7 days of delivery' },
                    { label: 'Cash on Delivery', value: 'Available on all orders' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--cream-deeper)' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, color: 'var(--espresso)', minWidth: 160 }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--mist)' }}>{value}</span>
                    </div>
                  ))}
                </div>
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