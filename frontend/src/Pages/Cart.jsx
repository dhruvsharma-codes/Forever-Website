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





import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../Components/CartTotal'
import { motion, AnimatePresence } from 'framer-motion'

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate, getDiscountedPrice, isOnSale } = useContext(ShopContext)
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            const tempData = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({ _id: items, size: item, quantity: cartItems[items][item] })
                    }
                }
            }
            setCartData(tempData)
        }
    }, [cartItems, products])

    return (
        <>
            <style>{`
                .cart-page { border-top:2px solid #EDD8C4; padding-top:3rem; min-height:60vh; }
                .cart-row { display:grid; grid-template-columns:4fr 0.5fr 0.5fr; align-items:center; gap:16px; padding:18px 0; border-bottom:1px solid #EDD8C4; }
                .cart-row:first-of-type { border-top:1px solid #EDD8C4; }
                @media(min-width:640px){ .cart-row{ grid-template-columns:4fr 2fr 0.5fr; } }
                .cart-qty { background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:8px; padding:7px 10px; width:54px; font-size:0.84rem; color:#3D2318; font-weight:600; outline:none; text-align:center; transition:border-color 0.25s; font-family:inherit; }
                .cart-qty:focus { border-color:#C96A42; }
                @media(min-width:640px){ .cart-qty{ width:80px; } }
                .del-btn { width:32px; height:32px; border-radius:50%; background:#EDD8C4; display:flex; align-items:center; justify-content:center; cursor:pointer; border:none; flex-shrink:0; transition:background 0.2s; }
                .del-btn img { width:14px; filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%); transition:filter 0.2s; }
                .del-btn:hover { background:#C96A42; }
                .del-btn:hover img { filter:invert(100%); }
                .checkout-btn { background:#C96A42; color:#F7EFE6; border:none; border-radius:50px; padding:14px 36px; font-size:0.8rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; cursor:pointer; width:100%; margin-top:16px; box-shadow:0 4px 16px rgba(201,106,66,0.3); font-family:inherit; transition:background 0.2s, box-shadow 0.2s; }
                .checkout-btn:hover { background:#A3512F; box-shadow:0 8px 24px rgba(163,81,47,0.3); }
                .sale-tag { font-size:0.62rem; fontWeight:700; background:#C96A42; color:#F7EFE6; padding:2px 8px; border-radius:10px; letter-spacing:0.06em; margin-left:4px; }
            `}</style>

            <div className="cart-page">
                <div style={{ marginBottom: '1.5rem' }}><Title text1="YOUR" text2="CART" /></div>

                {cartData.length === 0 ? (
                    <motion.div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#98A98E' }}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>◎</div>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>Your cart is empty.<br />Start adding some beautiful pieces!</p>
                        <motion.button onClick={() => navigate('/collection')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            style={{ background: '#C96A42', color: '#F7EFE6', border: 'none', borderRadius: 50, padding: '12px 32px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
                            Browse Collection
                        </motion.button>
                    </motion.div>
                ) : (
                    <>
                        <AnimatePresence>
                            {cartData.map((item, index) => {
                                const productData = products.find(p => p._id === item._id)
                                if (!productData) return null

                                const onSale = isOnSale(productData)
                                const effectivePrice = getDiscountedPrice(productData)

                                return (
                                    <motion.div key={`${item._id}-${item.size}`} className="cart-row"
                                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20, height: 0, padding: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.35 }} layout>

                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                            <motion.img src={productData.image[0]} alt={productData.name}
                                                style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 10, border: '1.5px solid #EDD8C4', flexShrink: 0 }}
                                                whileHover={{ scale: 1.05 }} />
                                            <div>
                                                <p style={{ color: '#3D2318', fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, lineHeight: 1.4 }}>{productData.name}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                    {/* Discounted price */}
                                                    <span style={{ color: '#C96A42', fontSize: '0.88rem', fontWeight: 700 }}>
                                                        {currency}{effectivePrice.toFixed(0)}
                                                    </span>
                                                    {/* Strike-through original if on sale */}
                                                    {onSale && (
                                                        <span style={{ color: '#98A98E', fontSize: '0.78rem', textDecoration: 'line-through' }}>
                                                            {currency}{productData.price}
                                                        </span>
                                                    )}
                                                    <span style={{ background: '#EDD8C4', color: '#7A4A38', fontSize: '0.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: 50, letterSpacing: '0.06em' }}>
                                                        {item.size}
                                                    </span>
                                                    {/* Sale badge */}
                                                    {onSale && (
                                                        <span className="sale-tag">SALE</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <input className="cart-qty" type="number" min={1} defaultValue={item.quantity}
                                            onChange={e => { const val = Number(e.target.value); if (val > 0) updateQuantity(item._id, item.size, val) }} />

                                        <motion.button className="del-btn" onClick={() => updateQuantity(item._id, item.size, 0)} whileTap={{ scale: 0.88 }}>
                                            <img src={assets.bin_icon} alt="remove" />
                                        </motion.button>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4rem', marginBottom: '3rem' }}>
                            <div style={{ width: '100%', maxWidth: 450 }}>
                                <CartTotal />
                                <motion.button onClick={() => navigate('/place-order')} className="checkout-btn"
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                                    Proceed to Checkout →
                                </motion.button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Cart