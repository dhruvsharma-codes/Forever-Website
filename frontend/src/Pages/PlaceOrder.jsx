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

















import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, currency } = useContext(ShopContext);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const onChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount, currency: order.currency,
      name: "Order Payment", description: "Order Payment",
      order_id: order.id, receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + "/api/order/verifyRazorpay", response, { headers: { token } });
          if (data.success) { navigate("/orders"); setCartItems({}); }
        } catch (err) { toast.error(err.message); }
      },
    };
    new window.Razorpay(options).open();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) { toast.error("Please login to place an order."); navigate("/login"); return; }
    const hasItems = Object.keys(cartItems).some(k => Object.values(cartItems[k]).some(q => q > 0));
    if (!hasItems) { toast.error("Your cart is empty."); return; }
    setLoading(true);
    try {
      const orderItems = [];
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) {
            const info = structuredClone(products.find(p => p._id === id));
            if (info) { info.size = size; info.quantity = cartItems[id][size]; orderItems.push(info); }
          }
        }
      }
      const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee };
      if (method === "cod") {
        const r = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
        if (r.data.success) { setCartItems({}); navigate("/orders"); } else toast.error(r.data.message);
      } else if (method === "stripe") {
        const r = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
        if (r.data.success) window.location.replace(r.data.session_url); else toast.error(r.data.message);
      } else if (method === "razorpay") {
        const r = await axios.post(backendUrl + "/api/order/razorpay", orderData, { headers: { token } });
        if (r.data.success) initPay(r.data.order);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const inputStyle = {
    width: '100%', background: 'white', border: '1.5px solid var(--cream-deeper)',
    borderRadius: 'var(--radius-md)', padding: '12px 16px',
    fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--espresso)',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.18s, box-shadow 0.18s',
  };

  const PAYMENT_METHODS = [
    { key: 'stripe', logo: assets.stripe_logo, label: null },
    { key: 'razorpay', logo: assets.razorpay_logo, label: null },
    { key: 'cod', logo: null, label: 'Cash on Delivery' },
  ];

  return (
    <>
      <style>{`
        .po-page { border-top: 2px solid var(--cream-deeper); padding-top: 2.5rem; min-height: 80vh; }
        .po-input { }
        .po-input:focus { border-color: var(--terra) !important; box-shadow: 0 0 0 3px rgba(201,106,66,0.1); }
        .po-input::placeholder { color: var(--mist); }

        .pay-card {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px;
          border: 1.5px solid var(--cream-deeper);
          border-radius: var(--radius-lg);
          cursor: pointer;
          background: var(--cream);
          flex: 1;
          transition: all 0.2s;
        }
        .pay-card:hover { border-color: var(--terra); background: rgba(201,106,66,0.03); }
        .pay-card.selected { border-color: var(--terra); background: rgba(201,106,66,0.05); box-shadow: 0 0 0 3px rgba(201,106,66,0.1); }

        .pay-radio {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid var(--cream-deeper); flex-shrink: 0;
          transition: all 0.2s;
          position: relative;
        }
        .pay-card.selected .pay-radio {
          border-color: var(--terra); background: var(--terra);
        }
        .pay-card.selected .pay-radio::after {
          content: ''; position: absolute;
          width: 6px; height: 6px; border-radius: 50%;
          background: white; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }

        .po-submit {
          background: var(--espresso); color: var(--cream); border: none;
          border-radius: var(--radius-full); padding: 15px 44px;
          font-family: var(--font-body); font-size: 0.82rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer;
          box-shadow: 0 4px 20px rgba(44,24,16,0.22);
          transition: all 0.22s ease;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .po-submit:hover:not(:disabled) {
          background: var(--terra); box-shadow: var(--shadow-terra); transform: translateY(-1px);
        }
        .po-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
      `}</style>

      <form onSubmit={onSubmit} className="po-page flex flex-col justify-between gap-10 sm:flex-row">

        {/* ── LEFT: Delivery ── */}
        <motion.div
          className="flex flex-col w-full gap-4 sm:max-w-[480px]"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ marginBottom: 8 }}>
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          {/* Form section label */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: -8 }}>
            Shipping Details
          </p>

          <div className="flex gap-3">
            {[['firstName', 'First name'], ['lastName', 'Last name']].map(([name, placeholder]) => (
              <input key={name} className="po-input" style={inputStyle} name={name} value={formData[name]} onChange={onChange} placeholder={placeholder} required />
            ))}
          </div>

          {[
            ['email', 'Email address', 'email'],
            ['street', 'Street address', 'text'],
          ].map(([name, placeholder, type]) => (
            <input key={name} className="po-input" style={inputStyle} name={name} type={type} value={formData[name]} onChange={onChange} placeholder={placeholder} required />
          ))}

          <div className="flex gap-3">
            {[['city', 'City'], ['state', 'State']].map(([name, placeholder]) => (
              <input key={name} className="po-input" style={inputStyle} name={name} value={formData[name]} onChange={onChange} placeholder={placeholder} required />
            ))}
          </div>

          <div className="flex gap-3">
            {[['zipcode', 'Zip code'], ['country', 'Country']].map(([name, placeholder]) => (
              <input key={name} className="po-input" style={inputStyle} name={name} value={formData[name]} onChange={onChange} placeholder={placeholder} required />
            ))}
          </div>

          <input className="po-input" style={inputStyle} name="phone" type="tel" value={formData.phone} onChange={onChange} placeholder="Phone number" required />
        </motion.div>

        {/* ── RIGHT: Summary + Payment ── */}
        <motion.div
          className="flex flex-col gap-8 w-full sm:max-w-[420px]"
          style={{ marginTop: '2rem' }}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <CartTotal />

          {/* Payment method */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Title text1="PAYMENT" text2="METHOD" />
            </div>

            <div className="flex flex-col gap-3 lg:flex-row">
              {PAYMENT_METHODS.map(({ key, logo, label }) => (
                <motion.div
                  key={key}
                  onClick={() => setMethod(key)}
                  className={`pay-card${method === key ? ' selected' : ''}`}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="pay-radio" />
                  {logo ? (
                    <img src={logo} alt={key} style={{ height: 20, objectFit: 'contain', maxWidth: 80 }} />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--espresso)', letterSpacing: '0.04em' }}>
                      {label}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Place order */}
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <motion.button
                type="submit"
                className="po-submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
              >
                {loading ? (
                  <>
                    <span style={{ width: 14, height: 14, border: '2px solid rgba(250,247,242,0.4)', borderTopColor: 'var(--cream)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                    Processing…
                  </>
                ) : 'Place Order →'}
              </motion.button>
            </div>

            {/* Security note */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--mist)' }}>
                SSL Encrypted · Secure Checkout
              </span>
            </div>
          </div>
        </motion.div>
      </form>
    </>
  );
};

export default PlaceOrder;