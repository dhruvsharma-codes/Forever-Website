// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import Title from "../Components/Title";
// import { assets } from "../assets/assets";
// import CartTotal from "../Components/CartTotal";
// import { motion, AnimatePresence } from "framer-motion";

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } =
//     useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               size: item,
//               quantity: cartItems[items][item],
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products]);

//   return (
//     <>
//       <style>{`
//                 .cart-page { border-top:2px solid #EDD8C4; padding-top:3rem; min-height:60vh; }
//                 .cart-row { display:grid; grid-template-columns:4fr 0.5fr 0.5fr; align-items:center; gap:16px; padding:18px 0; border-bottom:1px solid #EDD8C4; }
//                 .cart-row:first-of-type { border-top:1px solid #EDD8C4; }
//                 @media(min-width:640px){ .cart-row{ grid-template-columns:4fr 2fr 0.5fr; } }
//                 .cart-qty {
//                     background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:8px;
//                     padding:7px 10px; width:54px; font-size:0.84rem; color:#3D2318;
//                     font-weight:600; outline:none; text-align:center;
//                     transition:border-color 0.25s; font-family:inherit;
//                 }
//                 .cart-qty:focus { border-color:#C96A42; }
//                 @media(min-width:640px){ .cart-qty{ width:80px; } }
//                 .del-btn {
//                     width:32px; height:32px; border-radius:50%; background:#EDD8C4;
//                     display:flex; align-items:center; justify-content:center;
//                     cursor:pointer; border:none; flex-shrink:0; transition:background 0.2s;
//                 }
//                 .del-btn img { width:14px; filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%); transition:filter 0.2s; }
//                 .del-btn:hover { background:#C96A42; }
//                 .del-btn:hover img { filter:invert(100%); }
//                 .checkout-btn {
//                     background:#C96A42; color:#F7EFE6; border:none; border-radius:50px;
//                     padding:14px 36px; font-size:0.8rem; font-weight:700; letter-spacing:0.14em;
//                     text-transform:uppercase; cursor:pointer; width:100%; margin-top:16px;
//                     box-shadow:0 4px 16px rgba(201,106,66,0.3); font-family:inherit;
//                     transition:background 0.2s, box-shadow 0.2s;
//                 }
//                 .checkout-btn:hover { background:#A3512F; box-shadow:0 8px 24px rgba(163,81,47,0.3); }
//             `}</style>

//       <div className="cart-page">
//         <div style={{ marginBottom: "1.5rem" }}>
//           <Title text1="YOUR" text2="CART" />
//         </div>

//         {cartData.length === 0 ? (
//           <motion.div
//             style={{
//               textAlign: "center",
//               padding: "5rem 2rem",
//               color: "#98A98E",
//             }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>◎</div>
//             <p
//               style={{
//                 fontSize: "0.9rem",
//                 lineHeight: 1.7,
//                 marginBottom: "1.5rem",
//               }}
//             >
//               Your cart is empty.
//               <br />
//               Start adding some beautiful pieces!
//             </p>
//             <motion.button
//               onClick={() => navigate("/collection")}
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.96 }}
//               style={{
//                 background: "#C96A42",
//                 color: "#F7EFE6",
//                 border: "none",
//                 borderRadius: 50,
//                 padding: "12px 32px",
//                 fontSize: "0.8rem",
//                 fontWeight: 700,
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//                 cursor: "pointer",
//                 fontFamily: "inherit",
//               }}
//             >
//               Browse Collection
//             </motion.button>
//           </motion.div>
//         ) : (
//           <>
//             <AnimatePresence>
//               {cartData.map((item, index) => {
//                 const productData = products.find((p) => p._id === item._id);
//                 if (!productData) return null;
//                 return (
//                   <motion.div
//                     key={`${item._id}-${item.size}`}
//                     className="cart-row"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20, height: 0, padding: 0 }}
//                     transition={{ delay: index * 0.05, duration: 0.35 }}
//                     layout
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "flex-start",
//                         gap: 16,
//                       }}
//                     >
//                       <motion.img
//                         src={productData.image[0]}
//                         alt={productData.name}
//                         style={{
//                           width: 72,
//                           height: 72,
//                           objectFit: "cover",
//                           borderRadius: 10,
//                           border: "1.5px solid #EDD8C4",
//                           flexShrink: 0,
//                         }}
//                         whileHover={{ scale: 1.05 }}
//                       />
//                       <div>
//                         <p
//                           style={{
//                             color: "#3D2318",
//                             fontWeight: 700,
//                             fontSize: "0.9rem",
//                             marginBottom: 8,
//                             lineHeight: 1.4,
//                           }}
//                         >
//                           {productData.name}
//                         </p>
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 10,
//                           }}
//                         >
//                           <span
//                             style={{
//                               color: "#C96A42",
//                               fontSize: "0.88rem",
//                               fontWeight: 700,
//                             }}
//                           >
//                             {currency}
//                             {productData.price}
//                           </span>
//                           <span
//                             style={{
//                               background: "#EDD8C4",
//                               color: "#7A4A38",
//                               fontSize: "0.72rem",
//                               fontWeight: 700,
//                               padding: "3px 12px",
//                               borderRadius: 50,
//                               letterSpacing: "0.06em",
//                             }}
//                           >
//                             {item.size}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <input
//                       className="cart-qty"
//                       type="number"
//                       min={1}
//                       defaultValue={item.quantity}
//                       onChange={(e) => {
//                         const val = Number(e.target.value);
//                         if (val > 0) updateQuantity(item._id, item.size, val);
//                       }}
//                     />

//                     <motion.button
//                       className="del-btn"
//                       onClick={() => updateQuantity(item._id, item.size, 0)}
//                       whileTap={{ scale: 0.88 }}
//                     >
//                       <img src={assets.bin_icon} alt="remove" />
//                     </motion.button>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 marginTop: "4rem",
//                 marginBottom: "3rem",
//               }}
//             >
//               <div style={{ width: "100%", maxWidth: 450 }}>
//                 <CartTotal />
//                 <motion.button
//                   onClick={() => navigate("/place-order")}
//                   className="checkout-btn"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   Proceed to Checkout →
//                 </motion.button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;





// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import Title from '../Components/Title'
// import { assets } from '../assets/assets'
// import CartTotal from '../Components/CartTotal'
// import { motion, AnimatePresence } from 'framer-motion'

// const Cart = () => {
//     const { products, currency, cartItems, updateQuantity, navigate, getDiscountedPrice, isOnSale } = useContext(ShopContext)
//     const [cartData, setCartData] = useState([])

//     useEffect(() => {
//         if (products.length > 0) {
//             const tempData = []
//             for (const items in cartItems) {
//                 for (const item in cartItems[items]) {
//                     if (cartItems[items][item] > 0) {
//                         tempData.push({ _id: items, size: item, quantity: cartItems[items][item] })
//                     }
//                 }
//             }
//             setCartData(tempData)
//         }
//     }, [cartItems, products])

//     return (
//         <>
//             <style>{`
//                 .cart-page { border-top:2px solid #EDD8C4; padding-top:3rem; min-height:60vh; }
//                 .cart-row { display:grid; grid-template-columns:4fr 0.5fr 0.5fr; align-items:center; gap:16px; padding:18px 0; border-bottom:1px solid #EDD8C4; }
//                 .cart-row:first-of-type { border-top:1px solid #EDD8C4; }
//                 @media(min-width:640px){ .cart-row{ grid-template-columns:4fr 2fr 0.5fr; } }
//                 .cart-qty { background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:8px; padding:7px 10px; width:54px; font-size:0.84rem; color:#3D2318; font-weight:600; outline:none; text-align:center; transition:border-color 0.25s; font-family:inherit; }
//                 .cart-qty:focus { border-color:#C96A42; }
//                 @media(min-width:640px){ .cart-qty{ width:80px; } }
//                 .del-btn { width:32px; height:32px; border-radius:50%; background:#EDD8C4; display:flex; align-items:center; justify-content:center; cursor:pointer; border:none; flex-shrink:0; transition:background 0.2s; }
//                 .del-btn img { width:14px; filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%); transition:filter 0.2s; }
//                 .del-btn:hover { background:#C96A42; }
//                 .del-btn:hover img { filter:invert(100%); }
//                 .checkout-btn { background:#C96A42; color:#F7EFE6; border:none; border-radius:50px; padding:14px 36px; font-size:0.8rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; cursor:pointer; width:100%; margin-top:16px; box-shadow:0 4px 16px rgba(201,106,66,0.3); font-family:inherit; transition:background 0.2s, box-shadow 0.2s; }
//                 .checkout-btn:hover { background:#A3512F; box-shadow:0 8px 24px rgba(163,81,47,0.3); }
//                 .sale-tag { font-size:0.62rem; fontWeight:700; background:#C96A42; color:#F7EFE6; padding:2px 8px; border-radius:10px; letter-spacing:0.06em; margin-left:4px; }
//             `}</style>

//             <div className="cart-page">
//                 <div style={{ marginBottom: '1.5rem' }}><Title text1="YOUR" text2="CART" /></div>

//                 {cartData.length === 0 ? (
//                     <motion.div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#98A98E' }}
//                         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//                         <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>◎</div>
//                         <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>Your cart is empty.<br />Start adding some beautiful pieces!</p>
//                         <motion.button onClick={() => navigate('/collection')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
//                             style={{ background: '#C96A42', color: '#F7EFE6', border: 'none', borderRadius: 50, padding: '12px 32px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
//                             Browse Collection
//                         </motion.button>
//                     </motion.div>
//                 ) : (
//                     <>
//                         <AnimatePresence>
//                             {cartData.map((item, index) => {
//                                 const productData = products.find(p => p._id === item._id)
//                                 if (!productData) return null

//                                 const onSale = isOnSale(productData)
//                                 const effectivePrice = getDiscountedPrice(productData)

//                                 return (
//                                     <motion.div key={`${item._id}-${item.size}`} className="cart-row"
//                                         initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
//                                         exit={{ opacity: 0, x: 20, height: 0, padding: 0 }}
//                                         transition={{ delay: index * 0.05, duration: 0.35 }} layout>

//                                         <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
//                                             <motion.img src={productData.image[0]} alt={productData.name}
//                                                 style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 10, border: '1.5px solid #EDD8C4', flexShrink: 0 }}
//                                                 whileHover={{ scale: 1.05 }} />
//                                             <div>
//                                                 <p style={{ color: '#3D2318', fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, lineHeight: 1.4 }}>{productData.name}</p>
//                                                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
//                                                     {/* Discounted price */}
//                                                     <span style={{ color: '#C96A42', fontSize: '0.88rem', fontWeight: 700 }}>
//                                                         {currency}{effectivePrice.toFixed(0)}
//                                                     </span>
//                                                     {/* Strike-through original if on sale */}
//                                                     {onSale && (
//                                                         <span style={{ color: '#98A98E', fontSize: '0.78rem', textDecoration: 'line-through' }}>
//                                                             {currency}{productData.price}
//                                                         </span>
//                                                     )}
//                                                     <span style={{ background: '#EDD8C4', color: '#7A4A38', fontSize: '0.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: 50, letterSpacing: '0.06em' }}>
//                                                         {item.size}
//                                                     </span>
//                                                     {/* Sale badge */}
//                                                     {onSale && (
//                                                         <span className="sale-tag">SALE</span>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <input className="cart-qty" type="number" min={1} defaultValue={item.quantity}
//                                             onChange={e => { const val = Number(e.target.value); if (val > 0) updateQuantity(item._id, item.size, val) }} />

//                                         <motion.button className="del-btn" onClick={() => updateQuantity(item._id, item.size, 0)} whileTap={{ scale: 0.88 }}>
//                                             <img src={assets.bin_icon} alt="remove" />
//                                         </motion.button>
//                                     </motion.div>
//                                 )
//                             })}
//                         </AnimatePresence>

//                         <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4rem', marginBottom: '3rem' }}>
//                             <div style={{ width: '100%', maxWidth: 450 }}>
//                                 <CartTotal />
//                                 <motion.button onClick={() => navigate('/place-order')} className="checkout-btn"
//                                     whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
//                                     Proceed to Checkout →
//                                 </motion.button>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </>
//     )
// }

// export default Cart















// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import Title from '../Components/Title'
// import { assets } from '../assets/assets'
// import CartTotal from '../Components/CartTotal'
// import { motion, AnimatePresence } from 'framer-motion'

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate, getDiscountedPrice, isOnSale } = useContext(ShopContext)
//   const [cartData, setCartData] = useState([])

//   useEffect(() => {
//     if (products.length > 0) {
//       const temp = []
//       for (const id in cartItems) {
//         for (const size in cartItems[id]) {
//           if (cartItems[id][size] > 0) {
//             temp.push({ _id: id, size, quantity: cartItems[id][size] })
//           }
//         }
//       }
//       setCartData(temp)
//     }
//   }, [cartItems, products])

//   return (
//     <>
//       <style>{`
//         .cart-page { border-top: 2px solid var(--cream-deeper); padding-top: 3rem; min-height: 60vh; }

//         .cart-item-row {
//           display: grid;
//           grid-template-columns: 1fr auto auto;
//           align-items: center;
//           gap: 16px;
//           padding: 20px 0;
//           border-bottom: 1px solid var(--cream-deeper);
//         }
//         .cart-item-row:first-of-type { border-top: 1px solid var(--cream-deeper); }
//         @media (min-width: 640px) {
//           .cart-item-row { grid-template-columns: 1fr 140px auto; }
//         }

//         .cart-qty-wrap {
//           display: flex;
//           align-items: center;
//           gap: 0;
//           background: var(--cream);
//           border: 1.5px solid var(--cream-deeper);
//           border-radius: var(--radius-full);
//           overflow: hidden;
//           width: fit-content;
//         }
//         .cart-qty-btn {
//           width: 32px;
//           height: 32px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: var(--bark);
//           font-size: 1.1rem;
//           transition: background 0.18s, color 0.18s;
//           font-family: var(--font-body);
//           font-weight: 500;
//           flex-shrink: 0;
//         }
//         .cart-qty-btn:hover { background: rgba(201,106,66,0.1); color: var(--terra); }
//         .cart-qty-num {
//           font-family: var(--font-body);
//           font-size: 0.88rem;
//           font-weight: 700;
//           color: var(--espresso);
//           min-width: 32px;
//           text-align: center;
//           padding: 0 4px;
//         }

//         .cart-del-btn {
//           width: 36px; height: 36px;
//           border-radius: 50%;
//           background: var(--cream-dark);
//           border: 1.5px solid var(--cream-deeper);
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer;
//           transition: all 0.18s;
//           flex-shrink: 0;
//           color: var(--mist);
//         }
//         .cart-del-btn:hover { background: #fee2e2; border-color: #fca5a5; color: #ef4444; }

//         .cart-checkout-btn {
//           width: 100%;
//           background: var(--espresso);
//           color: var(--cream);
//           border: none;
//           border-radius: var(--radius-full);
//           padding: 15px 36px;
//           font-family: var(--font-body);
//           font-size: 0.82rem;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           cursor: pointer;
//           margin-top: 16px;
//           box-shadow: 0 4px 20px rgba(44,24,16,0.22);
//           transition: all 0.22s ease;
//         }
//         .cart-checkout-btn:hover {
//           background: var(--terra);
//           box-shadow: var(--shadow-terra);
//           transform: translateY(-1px);
//         }
//       `}</style>

//       <div className="cart-page">
//         <div style={{ marginBottom: '2rem' }}>
//           <Title text1="YOUR" text2="CART" />
//           {cartData.length > 0 && (
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--mist)', marginTop: 4 }}>
//               {cartData.length} item{cartData.length !== 1 ? 's' : ''} in your cart
//             </p>
//           )}
//         </div>

//         {cartData.length === 0 ? (
//           <motion.div
//             style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--mist)' }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.35 }}>🛒</div>
//             <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--espresso)', marginBottom: 8, fontWeight: 600 }}>
//               Your cart is empty
//             </h3>
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: 320, margin: '0 auto 1.75rem' }}>
//               Looks like you haven't added anything yet. Start exploring our collection!
//             </p>
//             <motion.button
//               onClick={() => navigate('/collection')}
//               className="btn-terra"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               Browse Collection →
//             </motion.button>
//           </motion.div>
//         ) : (
//           <>
//             <AnimatePresence>
//               {cartData.map((item, index) => {
//                 const product = products.find(p => p._id === item._id)
//                 if (!product) return null
//                 const onSale = isOnSale(product)
//                 const price = getDiscountedPrice(product)

//                 return (
//                   <motion.div
//                     key={`${item._id}-${item.size}`}
//                     className="cart-item-row"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20, height: 0, padding: 0, margin: 0, overflow: 'hidden' }}
//                     transition={{ delay: index * 0.05, duration: 0.35 }}
//                     layout
//                   >
//                     {/* Product info */}
//                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, minWidth: 0 }}>
//                       <motion.div
//                         style={{
//                           width: 76, height: 96, borderRadius: 'var(--radius-md)',
//                           overflow: 'hidden', border: '1.5px solid var(--cream-deeper)',
//                           flexShrink: 0, background: 'var(--cream-dark)',
//                         }}
//                         whileHover={{ scale: 1.04 }}
//                         transition={{ duration: 0.25 }}
//                       >
//                         <img src={product.image[0]} alt={product.name}
//                           style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//                         />
//                       </motion.div>

//                       <div style={{ minWidth: 0 }}>
//                         <p style={{
//                           fontFamily: 'var(--font-body)', color: 'var(--espresso)',
//                           fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, lineHeight: 1.4,
//                         }}>
//                           {product.name}
//                         </p>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
//                           {/* Price */}
//                           <span style={{ fontFamily: 'var(--font-display)', color: 'var(--terra)', fontSize: '1rem', fontWeight: 700 }}>
//                             {currency}{price.toFixed(0)}
//                           </span>
//                           {onSale && (
//                             <span style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '0.8rem', textDecoration: 'line-through' }}>
//                               {currency}{product.price}
//                             </span>
//                           )}
//                           {/* Size */}
//                           <span style={{
//                             background: 'var(--cream-dark)', color: 'var(--bark)',
//                             fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
//                             padding: '3px 12px', borderRadius: 'var(--radius-full)', letterSpacing: '0.06em',
//                           }}>
//                             {item.size}
//                           </span>
//                           {onSale && (
//                             <span className="badge badge-terra" style={{ fontSize: '0.6rem' }}>SALE</span>
//                           )}
//                         </div>

//                         {/* Mobile qty */}
//                         <div className="cart-qty-wrap" style={{ display: 'flex' }}>
//                           <button className="cart-qty-btn"
//                             onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}>
//                             −
//                           </button>
//                           <span className="cart-qty-num">{item.quantity}</span>
//                           <button className="cart-qty-btn"
//                             onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}>
//                             +
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Subtotal */}
//                     <div style={{ textAlign: 'right', display: 'none' }} className="sm-show">
//                       <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--mist)', marginBottom: 4 }}>Subtotal</p>
//                       <p style={{ fontFamily: 'var(--font-display)', color: 'var(--espresso)', fontSize: '1rem', fontWeight: 700 }}>
//                         {currency}{(price * item.quantity).toFixed(0)}
//                       </p>
//                     </div>

//                     {/* Delete */}
//                     <motion.button
//                       className="cart-del-btn"
//                       onClick={() => updateQuantity(item._id, item.size, 0)}
//                       whileTap={{ scale: 0.88 }}
//                       title="Remove item"
//                     >
//                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <polyline points="3 6 5 6 21 6" />
//                         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
//                       </svg>
//                     </motion.button>
//                   </motion.div>
//                 )
//               })}
//             </AnimatePresence>

//             {/* Continue shopping */}
//             <div style={{ marginTop: 16, marginBottom: '3rem' }}>
//               <button
//                 onClick={() => navigate('/collection')}
//                 style={{
//                   fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--terra)',
//                   fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer',
//                   display: 'inline-flex', alignItems: 'center', gap: 6,
//                   textDecoration: 'underline', textUnderlineOffset: '3px',
//                 }}
//               >
//                 ← Continue Shopping
//               </button>
//             </div>

//             {/* Summary */}
//             <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
//               <div style={{ width: '100%', maxWidth: 460 }}>
//                 <CartTotal />
//                 <motion.button
//                   onClick={() => navigate('/place-order')}
//                   className="cart-checkout-btn"
//                   whileHover={{ scale: 1.01 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   Proceed to Checkout →
//                 </motion.button>
//                 {/* Trust badges */}
//                 <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14 }}>
//                   {['🔒 Secure Checkout', '↩️ Easy Returns', '🚚 Fast Delivery'].map(b => (
//                     <span key={b} style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--mist)' }}>{b}</span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   )
// }

// export default Cart

























































































































import React, { useContext, useMemo } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, getDiscountedPrice, isOnSale } = useContext(ShopContext);

  const rows = useMemo(() => {
    if (!products.length) return [];
    const out = [];
    for (const id in cartItems) for (const size in cartItems[id])
      if (cartItems[id][size] > 0) { const p = products.find(x => x._id === id); if (p) out.push({ p, size, qty: cartItems[id][size] }); }
    return out;
  }, [cartItems, products]);

  return (
    <>
      <style>{`
        .ct-row{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center;padding:20px;margin-bottom:12px;background:#fff;border:1px solid var(--cream-deeper);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);transition:box-shadow .3s,border-color .3s}
        .ct-row:hover{box-shadow:var(--shadow-md);border-color:rgba(194,86,46,.3)}
        .ct-qty{display:inline-flex;align-items:center;background:var(--cream);border:1.5px solid var(--cream-deeper);border-radius:999px}
        .ct-qty button{width:34px;height:34px;border:0;background:none;cursor:pointer;font-size:1.1rem;color:var(--bark);border-radius:50%;transition:background .2s,color .2s}
        .ct-qty button:hover:not(:disabled){background:rgba(194,86,46,.12);color:var(--terra)}.ct-qty button:disabled{opacity:.35;cursor:not-allowed}
        .ct-qty span{min-width:30px;text-align:center;font:700 .9rem var(--font-body);color:var(--espresso)}
        .ct-del{width:38px;height:38px;border-radius:50%;border:1.5px solid var(--cream-deeper);background:var(--cream-dark);color:var(--mist);cursor:pointer;display:grid;place-items:center;transition:all .25s}
        .ct-del:hover{background:#fee2e2;border-color:#fca5a5;color:#dc2626;transform:rotate(-8deg)}
        .ct-grid{display:grid;grid-template-columns:1fr 400px;gap:2.5rem;align-items:start}
        @media(max-width:900px){.ct-grid{grid-template-columns:1fr}}
      `}</style>

      <div style={{ borderTop: "2px solid var(--cream-deeper)", paddingTop: "3rem", minHeight: "60vh" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Title text1="YOUR" text2="CART" />
          {rows.length > 0 && <p style={{ margin: "8px 0 0", fontSize: ".84rem", color: "var(--mist)" }}>{rows.length} item{rows.length !== 1 && "s"}</p>}
        </div>

        {rows.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", padding: "5rem 1rem" }}>
            <div className="floaty" style={{ fontSize: "4rem" }}>🛍️</div>
            <h3 style={{ font: "600 1.8rem var(--font-display)", color: "var(--espresso)", margin: "12px 0 8px" }}>Your cart is empty</h3>
            <p style={{ color: "var(--mist)", margin: "0 auto 26px", maxWidth: 320, lineHeight: 1.7 }}>Add something you love and it will wait for you here.</p>
            <button className="btn-terra" style={{ border: 0 }} onClick={() => navigate("/collection")}>Browse the collection</button>
          </motion.div>
        ) : (
          <div className="ct-grid">
            <div>
              <AnimatePresence initial={false}>
                {rows.map(({ p, size, qty }, i) => {
                  const sale = isOnSale(p), price = getDiscountedPrice(p);
                  return (
                    <motion.div layout key={`${p._id}-${size}`} className="ct-row" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, transition: { duration: 0.3 } }} transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                      <div style={{ display: "flex", gap: 16, minWidth: 0 }}>
                        <div style={{ width: 84, height: 104, borderRadius: 14, overflow: "hidden", flexShrink: 0, background: "var(--cream-dark)" }}>
                          <img src={p.image[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ margin: "0 0 8px", font: "700 .94rem var(--font-body)", color: "var(--espresso)", lineHeight: 1.4 }}>{p.name}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                            <span className="price" style={{ color: "var(--terra)" }}>{currency}{price.toFixed(0)}</span>
                            {sale && <span className="price-original">{currency}{p.price}</span>}
                            <span style={{ padding: "3px 11px", borderRadius: 999, background: "var(--cream-dark)", font: "700 .72rem var(--font-body)", color: "var(--bark)" }}>Size {size}</span>
                          </div>
                          <div className="ct-qty">
                            <button disabled={qty <= 1} aria-label="Decrease quantity" onClick={() => updateQuantity(p._id, size, qty - 1)}>−</button>
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span key={qty} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} transition={{ duration: 0.2 }}>{qty}</motion.span>
                            </AnimatePresence>
                            <button aria-label="Increase quantity" onClick={() => updateQuantity(p._id, size, qty + 1)}>+</button>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                        <button className="ct-del" aria-label={`Remove ${p.name}`} onClick={() => updateQuantity(p._id, size, 0)}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /></svg>
                        </button>
                        <b style={{ font: "700 1.05rem var(--font-display)", color: "var(--espresso)" }}>{currency}{(price * qty).toFixed(0)}</b>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <button onClick={() => navigate("/collection")} style={{ border: 0, background: "none", cursor: "pointer", color: "var(--terra)", font: "700 .84rem var(--font-body)", marginTop: 8 }}>← Continue shopping</button>
            </div>

            <div style={{ position: "sticky", top: 100 }}>
              <CartTotal />
              <motion.button className="btn-terra" onClick={() => navigate("/place-order")} whileTap={{ scale: 0.97 }} style={{ width: "100%", justifyContent: "center", border: 0, marginTop: 16 }}>
                Proceed to checkout →
              </motion.button>
              <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 14, flexWrap: "wrap" }}>
                {["🔒 Secure checkout", "↩️ 7-day returns", "🚚 Fast delivery"].map(b => <span key={b} style={{ fontSize: ".72rem", color: "var(--mist)" }}>{b}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Cart;