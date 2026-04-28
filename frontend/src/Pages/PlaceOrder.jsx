// import React, { useContext, useState } from "react";
// import Title from "../Components/Title";
// import CartTotal from "../Components/CartTotal";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../Context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const {
//     navigate,
//     backendUrl,
//     token,
//     cartItems,
//     setCartItems,
//     getCartAmount,
//     delivery_fee,
//     products,
//     currency,
//   } = useContext(ShopContext);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Order Payment",
//       description: "Order Payment",
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async (response) => {
//         try {
//           const { data } = await axios.post(
//             backendUrl + "/api/order/verifyRazorpay",
//             response,
//             { headers: { token } },
//           );
//           if (data.success) {
//             navigate("/orders");
//             setCartItems({});
//           }
//         } catch (error) {
//           toast.error(error.message);
//         }
//       },
//     };
//     new window.Razorpay(options).open();
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       toast.error("Please login to place an order.");
//       navigate("/login");
//       return;
//     }

//     const hasItems = Object.keys(cartItems).some((key) =>
//       Object.values(cartItems[key]).some((qty) => qty > 0),
//     );
//     if (!hasItems) {
//       toast.error("Your cart is empty.");
//       return;
//     }

//     const {
//       firstName,
//       lastName,
//       email,
//       street,
//       city,
//       state,
//       zipcode,
//       country,
//       phone,
//     } = formData;
//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !street ||
//       !city ||
//       !state ||
//       !zipcode ||
//       !country ||
//       !phone
//     ) {
//       toast.error("Please fill in all delivery details.");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     if (!/^\d{10,15}$/.test(phone.replace(/\D/g, ""))) {
//       toast.error("Please enter a valid phone number.");
//       return;
//     }

//     setLoading(true);
//     try {
//       let orderItems = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             const itemInfo = structuredClone(
//               products.find((p) => p._id === items),
//             );
//             if (itemInfo) {
//               itemInfo.size = item;
//               itemInfo.quantity = cartItems[items][item];
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }
//       const orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee,
//       };

//       switch (method) {
//         case "cod": {
//           const r = await axios.post(
//             backendUrl + "/api/order/place",
//             orderData,
//             { headers: { token } },
//           );
//           if (r.data.success) {
//             setCartItems({});
//             navigate("/orders");
//           } else toast.error(r.data.message);
//           break;
//         }
//         case "stripe": {
//           const r = await axios.post(
//             backendUrl + "/api/order/stripe",
//             orderData,
//             { headers: { token } },
//           );
//           if (r.data.success) window.location.replace(r.data.session_url);
//           else toast.error(r.data.message);
//           break;
//         }
//         case "razorpay": {
//           const r = await axios.post(
//             backendUrl + "/api/order/razorpay",
//             orderData,
//             { headers: { token } },
//           );
//           if (r.data.success) initPay(r.data.order);
//           break;
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           "Something went wrong",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//                 .po-page { border-top:2px solid #EDD8C4; padding-top:2.5rem; min-height:80vh; }
//                 .form-inp {
//                     width:100%; background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:10px;
//                     padding:11px 16px; font-size:0.86rem; color:#3D2318; outline:none;
//                     transition:border-color 0.25s, box-shadow 0.25s; box-sizing:border-box; font-family:inherit;
//                 }
//                 .form-inp::placeholder { color:#98A98E; }
//                 .form-inp:focus { border-color:#C96A42; box-shadow:0 0 0 3px rgba(201,106,66,0.1); }
//                 .section-label { font-size:0.72rem; color:#98A98E; letter-spacing:0.16em; font-weight:700; text-transform:uppercase; margin-bottom:14px; margin-top:6px; }
//                 .pay-opt {
//                     display:flex; align-items:center; gap:12px; padding:12px 18px;
//                     border:1.5px solid #EDD8C4; border-radius:12px; cursor:pointer;
//                     background:#F7EFE6; transition:border-color 0.25s, box-shadow 0.25s, background 0.2s;
//                     flex:1; min-width:120px;
//                 }
//                 .pay-opt:hover { border-color:#C96A42; background:#FDF5EF; }
//                 .pay-opt.sel { border-color:#C96A42; background:#FDF5EF; box-shadow:0 0 0 3px rgba(201,106,66,0.1); }
//                 .pay-radio { width:16px; height:16px; border-radius:50%; border:2px solid #EDD8C4; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.2s; }
//                 .pay-opt.sel .pay-radio { border-color:#C96A42; background:#C96A42; box-shadow:inset 0 0 0 3px #F7EFE6; }
//                 .pay-logo { height:20px; object-fit:contain; }
//                 .place-btn {
//                     background:#C96A42; color:#F7EFE6; border:none; border-radius:50px;
//                     padding:14px 40px; font-size:0.8rem; font-weight:700; letter-spacing:0.14em;
//                     text-transform:uppercase; cursor:pointer; box-shadow:0 4px 16px rgba(201,106,66,0.3);
//                     margin-top:8px; font-family:inherit; transition:background 0.2s, box-shadow 0.2s;
//                 }
//                 .place-btn:hover { background:#A3512F; box-shadow:0 8px 24px rgba(163,81,47,0.3); }
//             `}</style>

//       <form
//         onSubmit={onSubmitHandler}
//         className="po-page flex flex-col justify-between gap-8 sm:flex-row"
//       >
//         {/* LEFT: Delivery */}
//         <motion.div
//           className="flex flex-col w-full gap-4 sm:max-w-[480px]"
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <div className="my-2">
//             <Title text1="DELIVERY" text2="INFORMATION" />
//           </div>
//           <p className="section-label">Shipping details</p>

//           <div className="flex gap-3">
//             <input
//               onChange={onChangeHandler}
//               name="firstName"
//               value={formData.firstName}
//               required
//               className="form-inp"
//               type="text"
//               placeholder="First name"
//             />
//             <input
//               onChange={onChangeHandler}
//               name="lastName"
//               value={formData.lastName}
//               required
//               className="form-inp"
//               type="text"
//               placeholder="Last name"
//             />
//           </div>
//           <input
//             onChange={onChangeHandler}
//             name="email"
//             value={formData.email}
//             required
//             className="form-inp"
//             type="email"
//             placeholder="Email address"
//           />
//           <input
//             onChange={onChangeHandler}
//             name="street"
//             value={formData.street}
//             required
//             className="form-inp"
//             type="text"
//             placeholder="Street address"
//           />
//           <div className="flex gap-3">
//             <input
//               onChange={onChangeHandler}
//               name="city"
//               value={formData.city}
//               required
//               className="form-inp"
//               type="text"
//               placeholder="City"
//             />
//             <input
//               onChange={onChangeHandler}
//               name="state"
//               value={formData.state}
//               required
//               className="form-inp"
//               type="text"
//               placeholder="State"
//             />
//           </div>
//           <div className="flex gap-3">
//             <input
//               onChange={onChangeHandler}
//               name="zipcode"
//               value={formData.zipcode}
//               required
//               className="form-inp"
//               type="text"
//               placeholder="Zipcode"
//             />
//             <input
//               onChange={onChangeHandler}
//               name="country"
//               value={formData.country}
//               required
//               className="form-inp"
//               type="text"
//               placeholder="Country"
//             />
//           </div>
//           <input
//             onChange={onChangeHandler}
//             name="phone"
//             value={formData.phone}
//             required
//             className="form-inp"
//             type="tel"
//             placeholder="Phone number"
//           />
//         </motion.div>

//         {/* RIGHT: Summary + Payment */}
//         <motion.div
//           className="flex flex-col gap-8"
//           style={{ marginTop: "2rem", minWidth: 300 }}
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <CartTotal />

//           <div>
//             <div style={{ marginBottom: 16 }}>
//               <Title text1="PAYMENT" text2="METHOD" />
//             </div>

//             <div className="flex flex-col gap-3 lg:flex-row">
//               {[
//                 { key: "stripe", logo: assets.stripe_logo },
//                 { key: "razorpay", logo: assets.razorpay_logo },
//               ].map(({ key, logo }) => (
//                 <motion.div
//                   key={key}
//                   onClick={() => setMethod(key)}
//                   className={`pay-opt ${method === key ? "sel" : ""}`}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   <span className="pay-radio" />
//                   <img className="pay-logo" src={logo} alt={key} />
//                 </motion.div>
//               ))}
//               <motion.div
//                 onClick={() => setMethod("cod")}
//                 className={`pay-opt ${method === "cod" ? "sel" : ""}`}
//                 whileTap={{ scale: 0.97 }}
//               >
//                 <span className="pay-radio" />
//                 <span
//                   style={{
//                     fontSize: "0.78rem",
//                     fontWeight: 700,
//                     color: "#3D2318",
//                     letterSpacing: "0.08em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Cash on Delivery
//                 </span>
//               </motion.div>
//             </div>

//             <div className="text-right mt-6">
//               <motion.button
//                 type="submit"
//                 className="place-btn"
//                 whileHover={{ scale: loading ? 1 : 1.02 }}
//                 whileTap={{ scale: loading ? 1 : 0.97 }}
//                 disabled={loading}
//                 style={{
//                   opacity: loading ? 0.7 : 1,
//                   cursor: loading ? "not-allowed" : "pointer",
//                 }}
//               >
//                 {loading ? "Processing..." : "Place Order →"}
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </form>
//     </>
//   );
// };

// export default PlaceOrder;

















// import React, { useContext, useState } from "react";
// import Title from "../Components/Title";
// import CartTotal from "../Components/CartTotal";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../Context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, currency } = useContext(ShopContext);
//   const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: "" });
//   const [loading, setLoading] = useState(false);

//   const onChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount, currency: order.currency,
//       name: "Order Payment", description: "Order Payment",
//       order_id: order.id, receipt: order.receipt,
//       handler: async (response) => {
//         try {
//           const { data } = await axios.post(backendUrl + "/api/order/verifyRazorpay", response, { headers: { token } });
//           if (data.success) { navigate("/orders"); setCartItems({}); }
//         } catch (err) { toast.error(err.message); }
//       },
//     };
//     new window.Razorpay(options).open();
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) { toast.error("Please login to place an order."); navigate("/login"); return; }
//     const hasItems = Object.keys(cartItems).some(k => Object.values(cartItems[k]).some(q => q > 0));
//     if (!hasItems) { toast.error("Your cart is empty."); return; }
//     setLoading(true);
//     try {
//       const orderItems = [];
//       for (const id in cartItems) {
//         for (const size in cartItems[id]) {
//           if (cartItems[id][size] > 0) {
//             const info = structuredClone(products.find(p => p._id === id));
//             if (info) { info.size = size; info.quantity = cartItems[id][size]; orderItems.push(info); }
//           }
//         }
//       }
//       const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee };
//       if (method === "cod") {
//         const r = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
//         if (r.data.success) { setCartItems({}); navigate("/orders"); } else toast.error(r.data.message);
//       } else if (method === "stripe") {
//         const r = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
//         if (r.data.success) window.location.replace(r.data.session_url); else toast.error(r.data.message);
//       } else if (method === "razorpay") {
//         const r = await axios.post(backendUrl + "/api/order/razorpay", orderData, { headers: { token } });
//         if (r.data.success) initPay(r.data.order);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message || "Something went wrong");
//     } finally { setLoading(false); }
//   };

//   const inputStyle = {
//     width: '100%', background: 'white', border: '1.5px solid var(--cream-deeper)',
//     borderRadius: 'var(--radius-md)', padding: '12px 16px',
//     fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--espresso)',
//     outline: 'none', boxSizing: 'border-box',
//     transition: 'border-color 0.18s, box-shadow 0.18s',
//   };

//   const PAYMENT_METHODS = [
//     { key: 'stripe', logo: assets.stripe_logo, label: null },
//     { key: 'razorpay', logo: assets.razorpay_logo, label: null },
//     { key: 'cod', logo: null, label: 'Cash on Delivery' },
//   ];

//   return (
//     <>
//       <style>{`
//         .po-page { border-top: 2px solid var(--cream-deeper); padding-top: 2.5rem; min-height: 80vh; }
//         .po-input { }
//         .po-input:focus { border-color: var(--terra) !important; box-shadow: 0 0 0 3px rgba(201,106,66,0.1); }
//         .po-input::placeholder { color: var(--mist); }

//         .pay-card {
//           display: flex; align-items: center; gap: 12px;
//           padding: 14px 18px;
//           border: 1.5px solid var(--cream-deeper);
//           border-radius: var(--radius-lg);
//           cursor: pointer;
//           background: var(--cream);
//           flex: 1;
//           transition: all 0.2s;
//         }
//         .pay-card:hover { border-color: var(--terra); background: rgba(201,106,66,0.03); }
//         .pay-card.selected { border-color: var(--terra); background: rgba(201,106,66,0.05); box-shadow: 0 0 0 3px rgba(201,106,66,0.1); }

//         .pay-radio {
//           width: 18px; height: 18px; border-radius: 50%;
//           border: 2px solid var(--cream-deeper); flex-shrink: 0;
//           transition: all 0.2s;
//           position: relative;
//         }
//         .pay-card.selected .pay-radio {
//           border-color: var(--terra); background: var(--terra);
//         }
//         .pay-card.selected .pay-radio::after {
//           content: ''; position: absolute;
//           width: 6px; height: 6px; border-radius: 50%;
//           background: white; top: 50%; left: 50%;
//           transform: translate(-50%, -50%);
//         }

//         .po-submit {
//           background: var(--espresso); color: var(--cream); border: none;
//           border-radius: var(--radius-full); padding: 15px 44px;
//           font-family: var(--font-body); font-size: 0.82rem; font-weight: 700;
//           letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer;
//           box-shadow: 0 4px 20px rgba(44,24,16,0.22);
//           transition: all 0.22s ease;
//           display: inline-flex; align-items: center; gap: 8px;
//         }
//         .po-submit:hover:not(:disabled) {
//           background: var(--terra); box-shadow: var(--shadow-terra); transform: translateY(-1px);
//         }
//         .po-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
//       `}</style>

//       <form onSubmit={onSubmit} className="po-page flex flex-col justify-between gap-10 sm:flex-row">

//         {/* ── LEFT: Delivery ── */}
//         <motion.div
//           className="flex flex-col w-full gap-4 sm:max-w-[480px]"
//           initial={{ opacity: 0, x: -24 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//         >
//           <div style={{ marginBottom: 8 }}>
//             <Title text1="DELIVERY" text2="INFORMATION" />
//           </div>

//           {/* Form section label */}
//           <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: -8 }}>
//             Shipping Details
//           </p>

//           <div className="flex gap-3">
//             {[['firstName', 'First name'], ['lastName', 'Last name']].map(([name, placeholder]) => (
//               <input key={name} className="po-input" style={inputStyle} name={name} value={formData[name]} onChange={onChange} placeholder={placeholder} required />
//             ))}
//           </div>

//           {[
//             ['email', 'Email address', 'email'],
//             ['street', 'Street address', 'text'],
//           ].map(([name, placeholder, type]) => (
//             <input key={name} className="po-input" style={inputStyle} name={name} type={type} value={formData[name]} onChange={onChange} placeholder={placeholder} required />
//           ))}

//           <div className="flex gap-3">
//             {[['city', 'City'], ['state', 'State']].map(([name, placeholder]) => (
//               <input key={name} className="po-input" style={inputStyle} name={name} value={formData[name]} onChange={onChange} placeholder={placeholder} required />
//             ))}
//           </div>

//           <div className="flex gap-3">
//             {[['zipcode', 'Zip code'], ['country', 'Country']].map(([name, placeholder]) => (
//               <input key={name} className="po-input" style={inputStyle} name={name} value={formData[name]} onChange={onChange} placeholder={placeholder} required />
//             ))}
//           </div>

//           <input className="po-input" style={inputStyle} name="phone" type="tel" value={formData.phone} onChange={onChange} placeholder="Phone number" required />
//         </motion.div>

//         {/* ── RIGHT: Summary + Payment ── */}
//         <motion.div
//           className="flex flex-col gap-8 w-full sm:max-w-[420px]"
//           style={{ marginTop: '2rem' }}
//           initial={{ opacity: 0, x: 24 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
//         >
//           <CartTotal />

//           {/* Payment method */}
//           <div>
//             <div style={{ marginBottom: 16 }}>
//               <Title text1="PAYMENT" text2="METHOD" />
//             </div>

//             <div className="flex flex-col gap-3 lg:flex-row">
//               {PAYMENT_METHODS.map(({ key, logo, label }) => (
//                 <motion.div
//                   key={key}
//                   onClick={() => setMethod(key)}
//                   className={`pay-card${method === key ? ' selected' : ''}`}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <span className="pay-radio" />
//                   {logo ? (
//                     <img src={logo} alt={key} style={{ height: 20, objectFit: 'contain', maxWidth: 80 }} />
//                   ) : (
//                     <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--espresso)', letterSpacing: '0.04em' }}>
//                       {label}
//                     </span>
//                   )}
//                 </motion.div>
//               ))}
//             </div>

//             {/* Place order */}
//             <div style={{ marginTop: 24, textAlign: 'right' }}>
//               <motion.button
//                 type="submit"
//                 className="po-submit"
//                 disabled={loading}
//                 whileHover={!loading ? { scale: 1.01 } : {}}
//                 whileTap={!loading ? { scale: 0.97 } : {}}
//               >
//                 {loading ? (
//                   <>
//                     <span style={{ width: 14, height: 14, border: '2px solid rgba(250,247,242,0.4)', borderTopColor: 'var(--cream)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
//                     Processing…
//                   </>
//                 ) : 'Place Order →'}
//               </motion.button>
//             </div>

//             {/* Security note */}
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 }}>
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//               </svg>
//               <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--mist)' }}>
//                 SSL Encrypted · Secure Checkout
//               </span>
//             </div>
//           </div>
//         </motion.div>
//       </form>
//     </>
//   );
// };

import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

/* ── UPI app options ──────────────────────────────────────────────────────── */
const UPI_APPS = [
  { id: "gpay",    label: "Google Pay",  emoji: "🇬", color: "#4285F4" },
  { id: "phonepe", label: "PhonePe",     emoji: "💜", color: "#5F259F" },
  { id: "paytm",   label: "Paytm",       emoji: "🔵", color: "#00BAF2" },
  { id: "bhim",    label: "BHIM UPI",    emoji: "🇮🇳",color: "#138808" },
];

/* ── UPI payment modal ────────────────────────────────────────────────────── */
const UpiModal = ({ amount, currency, onSuccess, onClose }) => {
  const [upiId,       setUpiId]       = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [step,        setStep]        = useState("choose"); // choose | id | processing | done
  const [error,       setError]       = useState("");

  const handleVerify = async () => {
    if (!upiId.includes("@")) {
      setError("Please enter a valid UPI ID  (e.g. name@upi)");
      return;
    }
    setError("");
    setStep("processing");
    // Simulate UPI gateway — swap with real integration when ready
    await new Promise(r => setTimeout(r, 2400));
    setStep("done");
    setTimeout(onSuccess, 1000);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        style={{ position: "fixed", inset: 0, background: "rgba(44,24,16,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 2000 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={step !== "processing" ? onClose : undefined}
      />

      {/* Modal card */}
      <motion.div
        style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "90%", maxWidth: 420,
          background: "rgba(250,247,242,0.97)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1.5px solid rgba(212,197,176,0.7)",
          borderRadius: "var(--radius-xl)",
          padding: "2rem",
          zIndex: 2001,
          boxShadow: "0 40px 100px rgba(44,24,16,0.32)",
        }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 10 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 4 }}>
              UPI Payment
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: "var(--espresso)", margin: 0, letterSpacing: "-0.01em" }}>
              Pay {currency}{amount}
            </h2>
          </div>
          {step !== "processing" && (
            <motion.button onClick={onClose}
              style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--cream-dark)", border: "1.5px solid var(--cream-deeper)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--bark)" }}
              whileHover={{ background: "rgba(239,68,68,0.1)", borderColor: "#fca5a5", color: "#dc2626" }}
              whileTap={{ scale: 0.9 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </motion.button>
          )}
        </div>

        <AnimatePresence mode="wait">

          {/* ── Step 1: Choose app ── */}
          {step === "choose" && (
            <motion.div key="choose" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--mist)", marginBottom: 14 }}>
                Select your preferred UPI app:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {UPI_APPS.map(app => (
                  <motion.button key={app.id} type="button"
                    onClick={() => { setSelectedApp(app); setStep("id"); }}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 16px", background: "var(--cream)", border: "1.5px solid var(--cream-deeper)", borderRadius: "var(--radius-lg)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.86rem", fontWeight: 600, color: "var(--espresso)", transition: "all 0.18s" }}
                    whileHover={{ borderColor: app.color, background: `${app.color}12`, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}>
                    <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{app.emoji}</span>
                    <span>{app.label}</span>
                  </motion.button>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0" }}>
                <div style={{ flex: 1, height: 1, background: "var(--cream-deeper)" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", color: "var(--mist)", fontWeight: 500, whiteSpace: "nowrap" }}>or enter UPI ID</span>
                <div style={{ flex: 1, height: 1, background: "var(--cream-deeper)" }} />
              </div>

              <motion.button type="button"
                onClick={() => setStep("id")}
                style={{ width: "100%", background: "var(--cream-dark)", border: "1.5px solid var(--cream-deeper)", borderRadius: "var(--radius-lg)", padding: "13px", fontFamily: "var(--font-body)", fontSize: "0.86rem", fontWeight: 600, color: "var(--bark)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                whileHover={{ borderColor: "var(--terra)", color: "var(--terra)" }}
                whileTap={{ scale: 0.98 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
                Enter UPI ID manually
              </motion.button>
            </motion.div>
          )}

          {/* ── Step 2: Enter UPI ID ── */}
          {step === "id" && (
            <motion.div key="id" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {selectedApp && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, padding: "10px 14px", background: "rgba(201,106,66,0.06)", border: "1px solid rgba(201,106,66,0.18)", borderRadius: "var(--radius-md)" }}>
                  <span style={{ fontSize: "1.3rem" }}>{selectedApp.emoji}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", fontWeight: 600, color: "var(--bark)", flex: 1 }}>Paying via {selectedApp.label}</span>
                  <button type="button" onClick={() => { setSelectedApp(null); setStep("choose"); }}
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", color: "var(--terra)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "2px" }}>
                    Change
                  </button>
                </div>
              )}

              <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 6 }}>
                UPI ID
              </label>
              <div style={{ position: "relative" }}>
                <input type="text"
                  placeholder="yourname@upi  ·  9999999999@paytm"
                  value={upiId}
                  onChange={e => { setUpiId(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleVerify()}
                  style={{
                    width: "100%", background: "white",
                    border: `1.5px solid ${error ? "#fca5a5" : "var(--cream-deeper)"}`,
                    borderRadius: "var(--radius-md)", padding: "12px 40px 12px 16px",
                    fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--espresso)",
                    outline: "none", boxSizing: "border-box", transition: "border-color 0.18s, box-shadow 0.18s",
                  }}
                  onFocus={e => { if (!error) { e.target.style.borderColor = "var(--terra)"; e.target.style.boxShadow = "0 0 0 3px rgba(201,106,66,0.1)"; } }}
                  onBlur={e => { if (!error) { e.target.style.borderColor = "var(--cream-deeper)"; e.target.style.boxShadow = "none"; } }}
                />
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--mist)" }}>@</span>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.76rem", color: "#dc2626", marginTop: 6, fontWeight: 500 }}>
                    ⚠️ {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.76rem", color: "var(--mist)", marginTop: 8, lineHeight: 1.55 }}>
                Examples: <em>mobile@upi</em>, <em>name@gpay</em>, <em>name@paytm</em>, <em>name@ybl</em>
              </p>

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <motion.button type="button"
                  onClick={() => { setStep("choose"); setError(""); }}
                  className="btn-secondary"
                  style={{ flex: "0 0 auto" }}
                  whileTap={{ scale: 0.97 }}>
                  ← Back
                </motion.button>
                <motion.button type="button"
                  onClick={handleVerify}
                  disabled={!upiId.trim()}
                  className="btn-terra"
                  style={{ flex: 1, justifyContent: "center", opacity: !upiId.trim() ? 0.55 : 1 }}
                  whileHover={upiId.trim() ? { scale: 1.01 } : {}}
                  whileTap={upiId.trim() ? { scale: 0.97 } : {}}>
                  Verify & Pay →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Processing ── */}
          {step === "processing" && (
            <motion.div key="processing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ position: "relative", width: 64, height: 64, margin: "0 auto 20px" }}>
                <div style={{ width: 64, height: 64, border: "3px solid var(--cream-deeper)", borderTopColor: "var(--terra)", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                  {selectedApp?.emoji || "💳"}
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--espresso)", margin: "0 0 8px", fontWeight: 600 }}>
                Processing Payment
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--mist)", lineHeight: 1.65 }}>
                Please complete the payment{selectedApp ? ` in ${selectedApp.label}` : ""}.
                <br />Do not close or refresh this page.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 18 }}>
                {[0, 1, 2].map(i => (
                  <motion.span key={i}
                    style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--terra)", display: "block" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.22 }} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Done ── */}
          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <motion.div
                style={{ fontSize: "3.5rem", marginBottom: 14, display: "inline-block" }}
                animate={{ scale: [0.6, 1.15, 1] }}
                transition={{ duration: 0.5, ease: "easeOut" }}>
                ✅
              </motion.div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--espresso)", margin: "0 0 8px", fontWeight: 600 }}>
                Payment Successful!
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--mist)" }}>
                Redirecting to your orders…
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   Main PlaceOrder page
══════════════════════════════════════════════════════════════════════════ */
const PlaceOrder = () => {
  const [method,       setMethod]       = useState("upi");
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [loading,      setLoading]      = useState(false);

  const {
    navigate, backendUrl, token, cartItems, setCartItems,
    getCartAmount, delivery_fee, products, currency,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "",
    zipcode: "", country: "", phone: "",
  });

  const onChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const buildOrderItems = () => {
    const items = [];
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        if (cartItems[id][size] > 0) {
          const info = structuredClone(products.find(p => p._id === id));
          if (info) { info.size = size; info.quantity = cartItems[id][size]; items.push(info); }
        }
      }
    }
    return items;
  };

  const validateForm = () => {
    if (!token) { toast.error("Please login to place an order."); navigate("/login"); return false; }
    const hasItems = Object.keys(cartItems).some(k => Object.values(cartItems[k]).some(q => q > 0));
    if (!hasItems) { toast.error("Your cart is empty."); return false; }
    const { firstName, lastName, email, street, city, state, zipcode, country, phone } = formData;
    if (!firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phone) {
      toast.error("Please fill in all delivery details."); return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Please enter a valid email address."); return false; }
    if (!/^\d{10,15}$/.test(phone.replace(/\D/g, ""))) { toast.error("Please enter a valid phone number."); return false; }
    return true;
  };

  /* After UPI modal confirms success → place the order via API */
  const handleUpiSuccess = async () => {
    setShowUpiModal(false);
    setLoading(true);
    try {
      const r = await axios.post(
        backendUrl + "/api/order/place",
        { address: formData, items: buildOrderItems(), amount: getCartAmount() + delivery_fee, paymentMethod: "UPI", payment: true },
        { headers: { token } }
      );
      if (r.data.success) { setCartItems({}); navigate("/orders"); }
      else toast.error(r.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (method === "upi") { setShowUpiModal(true); return; }

    setLoading(true);
    try {
      const orderData = { address: formData, items: buildOrderItems(), amount: getCartAmount() + delivery_fee };

      if (method === "cod") {
        const r = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
        if (r.data.success) { setCartItems({}); navigate("/orders"); }
        else toast.error(r.data.message);
      } else if (method === "stripe") {
        const r = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
        if (r.data.success) window.location.replace(r.data.session_url);
        else toast.error(r.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  /* Payment method options */
  const PAYMENT_METHODS = [
    {
      key: "upi",
      label: "UPI",
      sublabel: "GPay · PhonePe · Paytm · BHIM",
      recommended: true,
      icon: (
        <div style={{ display: "flex", gap: 3 }}>
          {["🇬", "💜", "🔵", "🇮🇳"].map((e, i) => (
            <span key={i} style={{ fontSize: "1rem", lineHeight: 1 }}>{e}</span>
          ))}
        </div>
      ),
    },
    {
      key: "stripe",
      label: "Credit / Debit Card",
      sublabel: "Visa · Mastercard · Amex",
      recommended: false,
      icon: <img src={assets.stripe_logo} alt="stripe" style={{ height: 18, objectFit: "contain", maxWidth: 70 }} />,
    },
    {
      key: "cod",
      label: "Cash on Delivery",
      sublabel: "Pay when your order arrives",
      recommended: false,
      icon: <span style={{ fontSize: "1.3rem" }}>💵</span>,
    },
  ];

  const inputStyle = {
    width: "100%", background: "white",
    border: "1.5px solid var(--cream-deeper)",
    borderRadius: "var(--radius-md)", padding: "12px 16px",
    fontFamily: "var(--font-body)", fontSize: "0.88rem",
    color: "var(--espresso)", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.18s, box-shadow 0.18s",
  };
  const onIF = e => { e.target.style.borderColor = "var(--terra)"; e.target.style.boxShadow = "0 0 0 3px rgba(201,106,66,0.1)"; };
  const onIB = e => { e.target.style.borderColor = "var(--cream-deeper)"; e.target.style.boxShadow = "none"; };

  return (
    <>
      <style>{`
        .po-page { border-top:2px solid var(--cream-deeper); padding-top:2.5rem; min-height:80vh; }
        .pay-card { display:flex; align-items:center; gap:14px; padding:15px 18px; border:1.5px solid var(--cream-deeper); border-radius:var(--radius-lg); cursor:pointer; background:var(--cream); transition:all 0.2s; width:100%; text-align:left; }
        .pay-card:hover { border-color:var(--terra); background:rgba(201,106,66,0.03); }
        .pay-card.selected { border-color:var(--terra); background:rgba(201,106,66,0.05); box-shadow:0 0 0 3px rgba(201,106,66,0.1); }
        .pay-radio { width:18px; height:18px; border-radius:50%; border:2px solid var(--cream-deeper); flex-shrink:0; transition:all 0.2s; position:relative; }
        .pay-card.selected .pay-radio { border-color:var(--terra); background:var(--terra); }
        .pay-card.selected .pay-radio::after { content:""; position:absolute; width:6px; height:6px; border-radius:50%; background:white; top:50%; left:50%; transform:translate(-50%,-50%); }
        .po-submit { background:var(--espresso); color:var(--cream); border:none; border-radius:var(--radius-full); padding:15px 44px; font-family:var(--font-body); font-size:0.82rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; cursor:pointer; box-shadow:0 4px 20px rgba(44,24,16,0.22); transition:all 0.22s ease; display:inline-flex; align-items:center; gap:8px; }
        .po-submit:hover:not(:disabled) { background:var(--terra); box-shadow:var(--shadow-terra); transform:translateY(-1px); }
        .po-submit:disabled { opacity:0.65; cursor:not-allowed; transform:none; }
      `}</style>

      {/* UPI modal */}
      <AnimatePresence>
        {showUpiModal && (
          <UpiModal
            amount={getCartAmount() + delivery_fee}
            currency={currency}
            onSuccess={handleUpiSuccess}
            onClose={() => setShowUpiModal(false)}
          />
        )}
      </AnimatePresence>

      <form onSubmit={onSubmit} className="po-page flex flex-col justify-between gap-10 sm:flex-row">

        {/* ── LEFT ── */}
        <motion.div className="flex flex-col w-full gap-4 sm:max-w-[480px]"
          initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>

          <div style={{ marginBottom: 8 }}>
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--terra)", marginBottom: -8 }}>
            Shipping Details
          </p>

          <div className="flex gap-3">
            {[["firstName","First name"],["lastName","Last name"]].map(([n,ph]) => (
              <input key={n} name={n} type="text" placeholder={ph} required
                style={inputStyle} value={formData[n]} onChange={onChange}
                onFocus={onIF} onBlur={onIB} />
            ))}
          </div>

          {[["email","Email address","email"],["street","Street address","text"]].map(([n,ph,t]) => (
            <input key={n} name={n} type={t} placeholder={ph} required
              style={inputStyle} value={formData[n]} onChange={onChange}
              onFocus={onIF} onBlur={onIB} />
          ))}

          <div className="flex gap-3">
            {[["city","City"],["state","State"]].map(([n,ph]) => (
              <input key={n} name={n} type="text" placeholder={ph} required
                style={inputStyle} value={formData[n]} onChange={onChange}
                onFocus={onIF} onBlur={onIB} />
            ))}
          </div>

          <div className="flex gap-3">
            {[["zipcode","Zip code"],["country","Country"]].map(([n,ph]) => (
              <input key={n} name={n} type="text" placeholder={ph} required
                style={inputStyle} value={formData[n]} onChange={onChange}
                onFocus={onIF} onBlur={onIB} />
            ))}
          </div>

          <input name="phone" type="tel" placeholder="Phone number" required
            style={inputStyle} value={formData.phone} onChange={onChange}
            onFocus={onIF} onBlur={onIB} />
        </motion.div>

        {/* ── RIGHT ── */}
        <motion.div className="flex flex-col gap-8 w-full sm:max-w-[420px]"
          style={{ marginTop: "2rem" }}
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>

          <CartTotal />

          <div>
            <div style={{ marginBottom: 16 }}>
              <Title text1="PAYMENT" text2="METHOD" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PAYMENT_METHODS.map(({ key, label, sublabel, icon, recommended }) => (
                <motion.button
                  type="button" key={key}
                  onClick={() => setMethod(key)}
                  className={`pay-card${method === key ? " selected" : ""}`}
                  whileTap={{ scale: 0.99 }}>
                  <span className="pay-radio" />
                  <div style={{ flexShrink: 0, width: 40, display: "flex", justifyContent: "center" }}>{icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 700, color: "var(--espresso)", margin: 0 }}>{label}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", color: "var(--mist)", margin: "2px 0 0", lineHeight: 1.3 }}>{sublabel}</p>
                  </div>
                  {recommended && (
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", background: "rgba(74,124,89,0.12)", color: "#4a7c59", border: "1px solid rgba(74,124,89,0.25)", padding: "3px 8px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap", flexShrink: 0 }}>
                      Recommended
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* UPI tip */}
            <AnimatePresence>
              {method === "upi" && (
                <motion.div
                  style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 12, padding: "10px 14px", background: "rgba(201,106,66,0.06)", border: "1px solid rgba(201,106,66,0.18)", borderRadius: "var(--radius-md)" }}
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}>
                  <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>💡</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--bark)", margin: 0, lineHeight: 1.55 }}>
                    After clicking "Place Order" you'll choose your UPI app or enter your UPI ID to complete payment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <div style={{ marginTop: 24, textAlign: "right" }}>
              <motion.button type="submit" className="po-submit" disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}>
                {loading ? (
                  <>
                    <span style={{ width: 14, height: 14, border: "2px solid rgba(250,247,242,0.4)", borderTopColor: "var(--cream)", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Processing…
                  </>
                ) : (
                  <>
                    Place Order
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </motion.button>
            </div>

            {/* Lock note */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--mist)" }}>
                SSL Encrypted · 100% Secure Checkout
              </span>
            </div>
          </div>
        </motion.div>
      </form>
    </>
  );
};

export default PlaceOrder;

// export default PlaceOrder;