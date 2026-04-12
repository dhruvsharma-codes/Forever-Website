// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import Title from '../Components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../Components/CartTotal';

// const Cart = () => {
//     const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//     const [cartData, setCartData] = useState([]);

//     useEffect(() => {
//         if (products.length > 0) {
//             const tempData = [];
//             for (const items in cartItems) {
//                 for (const item in cartItems[items]) {
//                     if (cartItems[items][item] > 0) {
//                         tempData.push({ _id: items, size: item, quantity: cartItems[items][item] });
//                     }
//                 }
//             }
//             setCartData(tempData);
//         }
//     }, [cartItems, products]);

//     return (
//         <>
//             <style>{`
//                 .cart-page {
//                     border-top: 2px solid #E8D5C4;
//                     padding-top: 3rem;
//                     min-height: 60vh;
//                 }

//                 .cart-item-row {
//                     display: grid;
//                     grid-template-columns: 4fr 0.5fr 0.5fr;
//                     align-items: center;
//                     gap: 16px;
//                     padding: 18px 0;
//                     border-bottom: 1px solid #E8D5C4;
//                     transition: background 0.2s;
//                 }

//                 .cart-item-row:first-of-type {
//                     border-top: 1px solid #E8D5C4;
//                 }

//                 @media (min-width: 640px) {
//                     .cart-item-row {
//                         grid-template-columns: 4fr 2fr 0.5fr;
//                     }
//                 }

//                 .cart-product-img {
//                     width: 70px;
//                     height: 70px;
//                     object-fit: cover;
//                     border-radius: 10px;
//                     border: 1px solid #E8D5C4;
//                     flex-shrink: 0;
//                 }

//                 @media (min-width: 640px) {
//                     .cart-product-img { width: 84px; height: 84px; }
//                 }

//                 .cart-product-name {
//                     color: #8B5A4A;
//                     font-weight: 700;
//                     font-size: 0.9rem;
//                     margin-bottom: 8px;
//                     line-height: 1.4;
//                 }

//                 @media (min-width: 640px) {
//                     .cart-product-name { font-size: 1rem; }
//                 }

//                 .cart-product-meta {
//                     display: flex;
//                     align-items: center;
//                     gap: 10px;
//                 }

//                 .cart-product-price {
//                     color: #D4755B;
//                     font-size: 0.88rem;
//                     font-weight: 700;
//                 }

//                 .cart-size-badge {
//                     background: #E8D5C4;
//                     color: #8B5A4A;
//                     font-size: 0.72rem;
//                     font-weight: 700;
//                     padding: 4px 12px;
//                     border-radius: 50px;
//                     letter-spacing: 0.06em;
//                 }

//                 .cart-qty-input {
//                     background: #FFFDF9;
//                     border: 1.5px solid #E8D5C4;
//                     border-radius: 8px;
//                     padding: 7px 10px;
//                     width: 54px;
//                     font-size: 0.84rem;
//                     color: #8B5A4A;
//                     font-weight: 600;
//                     outline: none;
//                     text-align: center;
//                     transition: border-color 0.25s;
//                 }

//                 .cart-qty-input:focus {
//                     border-color: #D4755B;
//                 }

//                 @media (min-width: 640px) {
//                     .cart-qty-input { width: 80px; }
//                 }

//                 .cart-delete-btn {
//                     width: 32px;
//                     height: 32px;
//                     border-radius: 50%;
//                     background: #E8D5C4;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     cursor: pointer;
//                     transition: background 0.2s, transform 0.2s;
//                     margin-right: 8px;
//                     border: none;
//                     flex-shrink: 0;
//                 }

//                 .cart-delete-btn:hover {
//                     background: #D4755B;
//                     transform: scale(1.1);
//                 }

//                 .cart-delete-btn img {
//                     width: 14px;
//                     filter: invert(35%) sepia(20%) saturate(800%) hue-rotate(340deg) brightness(80%);
//                     transition: filter 0.2s;
//                 }

//                 .cart-delete-btn:hover img {
//                     filter: invert(100%);
//                 }

//                 .cart-empty {
//                     text-align: center;
//                     padding: 5rem 2rem;
//                     color: #A8B5A0;
//                 }

//                 .cart-empty-icon {
//                     font-size: 3.5rem;
//                     margin-bottom: 1rem;
//                 }

//                 .cart-empty-text {
//                     font-size: 0.9rem;
//                     line-height: 1.7;
//                     margin-bottom: 1.5rem;
//                 }

//                 .cart-empty-btn {
//                     display: inline-block;
//                     background: #D4755B;
//                     color: #FFFDF9;
//                     border: none;
//                     border-radius: 50px;
//                     padding: 12px 32px;
//                     font-size: 0.8rem;
//                     font-weight: 700;
//                     letter-spacing: 0.12em;
//                     text-transform: uppercase;
//                     cursor: pointer;
//                     transition: background 0.3s;
//                     text-decoration: none;
//                 }

//                 .cart-empty-btn:hover { background: #8B5A4A; }

//                 .checkout-btn {
//                     background: #D4755B;
//                     color: #FFFDF9;
//                     border: none;
//                     border-radius: 50px;
//                     padding: 14px 36px;
//                     font-size: 0.8rem;
//                     font-weight: 700;
//                     letter-spacing: 0.14em;
//                     text-transform: uppercase;
//                     cursor: pointer;
//                     width: 100%;
//                     margin-top: 16px;
//                     transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
//                     box-shadow: 0 4px 16px rgba(212, 117, 91, 0.3);
//                 }

//                 .checkout-btn:hover {
//                     background: #8B5A4A;
//                     transform: translateY(-2px);
//                     box-shadow: 0 8px 24px rgba(139, 90, 74, 0.3);
//                 }

//                 .cart-total-container {
//                     display: flex;
//                     justify-content: flex-end;
//                     margin-top: 4rem;
//                     margin-bottom: 3rem;
//                 }
//             `}</style>

//             <div className='cart-page'>
//                 <div style={{ marginBottom: '1.5rem' }}>
//                     <Title text1={'YOUR'} text2={'CART'} />
//                 </div>

//                 {cartData.length === 0 ? (
//                     <div className='cart-empty'>
//                         <div className='cart-empty-icon'>◎</div>
//                         <p className='cart-empty-text'>Your cart is empty.<br />Start adding some beautiful pieces!</p>
//                         <button onClick={() => navigate('/collection')} className='cart-empty-btn'>Browse Collection</button>
//                     </div>
//                 ) : (
//                     <>
//                         <div>
//                             {cartData.map((item, index) => {
//                                 const productData = products.find(p => p._id === item._id);
//                                 return (
//                                     <div key={index} className='cart-item-row'>
//                                         <div className='flex items-start gap-5'>
//                                             <img src={productData.image[0]} alt={productData.name} className='cart-product-img' />
//                                             <div>
//                                                 <p className='cart-product-name'>{productData.name}</p>
//                                                 <div className='cart-product-meta'>
//                                                     <span className='cart-product-price'>{currency}{productData.price}</span>
//                                                     <span className='cart-size-badge'>{item.size}</span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <input
//                                             onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
//                                             className='cart-qty-input'
//                                             type="number"
//                                             min={1}
//                                             defaultValue={item.quantity}
//                                         />

//                                         <button
//                                             onClick={() => updateQuantity(item._id, item.size, 0)}
//                                             className='cart-delete-btn'
//                                         >
//                                             <img src={assets.bin_icon} alt="remove" />
//                                         </button>
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                         <div className='cart-total-container'>
//                             <div className='w-full sm:w-[450px]'>
//                                 <CartTotal />
//                                 <button onClick={() => navigate('/place-order')} className='checkout-btn'>
//                                     Proceed to Checkout →
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Cart;







import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../Components/CartTotal'
import { motion, AnimatePresence } from 'framer-motion'

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
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
                .cart-qty {
                    background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:8px;
                    padding:7px 10px; width:54px; font-size:0.84rem; color:#3D2318;
                    font-weight:600; outline:none; text-align:center;
                    transition:border-color 0.25s; font-family:inherit;
                }
                .cart-qty:focus { border-color:#C96A42; }
                @media(min-width:640px){ .cart-qty{ width:80px; } }
                .del-btn {
                    width:32px; height:32px; border-radius:50%; background:#EDD8C4;
                    display:flex; align-items:center; justify-content:center;
                    cursor:pointer; border:none; flex-shrink:0; transition:background 0.2s;
                }
                .del-btn img { width:14px; filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%); transition:filter 0.2s; }
                .del-btn:hover { background:#C96A42; }
                .del-btn:hover img { filter:invert(100%); }
                .checkout-btn {
                    background:#C96A42; color:#F7EFE6; border:none; border-radius:50px;
                    padding:14px 36px; font-size:0.8rem; font-weight:700; letter-spacing:0.14em;
                    text-transform:uppercase; cursor:pointer; width:100%; margin-top:16px;
                    box-shadow:0 4px 16px rgba(201,106,66,0.3); font-family:inherit;
                    transition:background 0.2s, box-shadow 0.2s;
                }
                .checkout-btn:hover { background:#A3512F; box-shadow:0 8px 24px rgba(163,81,47,0.3); }
            `}</style>

            <div className="cart-page">
                <div style={{ marginBottom: '1.5rem' }}>
                    <Title text1="YOUR" text2="CART" />
                </div>

                {cartData.length === 0 ? (
                    <motion.div
                        style={{ textAlign: 'center', padding: '5rem 2rem', color: '#98A98E' }}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    >
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
                                return (
                                    <motion.div
                                        key={`${item._id}-${item.size}`}
                                        className="cart-row"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20, height: 0, padding: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.35 }}
                                        layout
                                    >
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                            <motion.img
                                                src={productData.image[0]} alt={productData.name}
                                                style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 10, border: '1.5px solid #EDD8C4', flexShrink: 0 }}
                                                whileHover={{ scale: 1.05 }}
                                            />
                                            <div>
                                                <p style={{ color: '#3D2318', fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, lineHeight: 1.4 }}>{productData.name}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <span style={{ color: '#C96A42', fontSize: '0.88rem', fontWeight: 700 }}>{currency}{productData.price}</span>
                                                    <span style={{ background: '#EDD8C4', color: '#7A4A38', fontSize: '0.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: 50, letterSpacing: '0.06em' }}>{item.size}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <input
                                            className="cart-qty"
                                            type="number" min={1} defaultValue={item.quantity}
                                            onChange={e => {
                                                const val = Number(e.target.value)
                                                if (val > 0) updateQuantity(item._id, item.size, val)
                                            }}
                                        />

                                        <motion.button
                                            className="del-btn"
                                            onClick={() => updateQuantity(item._id, item.size, 0)}
                                            whileTap={{ scale: 0.88 }}
                                        >
                                            <img src={assets.bin_icon} alt="remove" />
                                        </motion.button>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4rem', marginBottom: '3rem' }}>
                            <div style={{ width: '100%', maxWidth: 450 }}>
                                <CartTotal />
                                <motion.button
                                    onClick={() => navigate('/place-order')}
                                    className="checkout-btn"
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                >
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