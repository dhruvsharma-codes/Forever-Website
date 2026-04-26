// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import Title from "../Components/Title";
// import axios from "axios";
// import { motion } from "framer-motion";

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadOrderData = async () => {
//     try {
//       if (!token) return;
//       setLoading(true);
//       const response = await axios.post(
//         backendUrl + "/api/order/userorders",
//         {},
//         { headers: { token } },
//       );
//       if (response.data.success) {
//         let allItems = [];
//         response.data.orders.forEach((order) => {
//           order.items.forEach((item) => {
//             allItems.push({
//               ...item,
//               status: order.status,
//               payment: order.payment,
//               paymentMethod: order.paymentMethod,
//               date: order.date,
//               orderId: order._id,
//             });
//           });
//         });
//         setOrderData(allItems.reverse());
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   const statusConfig = (status = "") => {
//     const s = status.toLowerCase();
//     if (s.includes("deliver"))
//       return {
//         color: "#5CB85C",
//         bg: "rgba(92,184,92,0.1)",
//         border: "rgba(92,184,92,0.25)",
//       };
//     if (s.includes("ship"))
//       return {
//         color: "#C96A42",
//         bg: "rgba(201,106,66,0.1)",
//         border: "rgba(201,106,66,0.25)",
//       };
//     if (s.includes("cancel"))
//       return {
//         color: "#E05252",
//         bg: "rgba(224,82,82,0.1)",
//         border: "rgba(224,82,82,0.25)",
//       };
//     if (s.includes("ready"))
//       return {
//         color: "#7A4A38",
//         bg: "rgba(122,74,56,0.1)",
//         border: "rgba(122,74,56,0.25)",
//       };
//     return {
//       color: "#98A98E",
//       bg: "rgba(152,169,142,0.1)",
//       border: "rgba(152,169,142,0.25)",
//     };
//   };

//   return (
//     <>
//       <style>{`
//                 .orders-page { padding-top:3rem; border-top:2px solid #EDD8C4; min-height:60vh; }
//                 .order-card { display:flex; flex-direction:column; gap:16px; padding:20px 0; border-bottom:1px solid #EDD8C4; }
//                 .order-card:first-of-type { border-top:1px solid #EDD8C4; }
//                 @media(min-width:768px){ .order-card{ flex-direction:row; align-items:center; justify-content:space-between; } }
//                 .track-btn {
//                     background:transparent; border:1.5px solid #EDD8C4; color:#7A4A38;
//                     font-size:0.75rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
//                     padding:9px 20px; border-radius:50px; cursor:pointer; white-space:nowrap;
//                     font-family:inherit; transition:background 0.25s, color 0.25s, border-color 0.25s;
//                 }
//                 .track-btn:hover { background:#C96A42; color:#F7EFE6; border-color:#C96A42; }
//                 .orders-right { display:flex; align-items:center; justify-content:space-between; gap:16px; }
//                 @media(min-width:768px){ .orders-right{ min-width:240px; justify-content:flex-end; gap:24px; } }
//                 .skeleton { background: linear-gradient(90deg,#EDD8C4 25%,#F7EFE6 50%,#EDD8C4 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:8px; }
//                 @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//             `}</style>

//       <div className="orders-page">
//         <div style={{ marginBottom: "1.5rem" }}>
//           <Title text1="MY" text2="ORDERS" />
//         </div>

//         {loading ? (
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 style={{
//                   display: "flex",
//                   gap: 16,
//                   padding: "20px 0",
//                   borderBottom: "1px solid #EDD8C4",
//                 }}
//               >
//                 <div
//                   className="skeleton"
//                   style={{ width: 72, height: 72, flexShrink: 0 }}
//                 />
//                 <div
//                   style={{
//                     flex: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 8,
//                   }}
//                 >
//                   <div
//                     className="skeleton"
//                     style={{ height: 16, width: "60%" }}
//                   />
//                   <div
//                     className="skeleton"
//                     style={{ height: 14, width: "40%" }}
//                   />
//                   <div
//                     className="skeleton"
//                     style={{ height: 14, width: "30%" }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : orderData.length === 0 ? (
//           <motion.div
//             style={{
//               textAlign: "center",
//               padding: "5rem 2rem",
//               color: "#98A98E",
//             }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>◎</div>
//             <p style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
//               No orders yet.
//               <br />
//               Start shopping to see your orders here!
//             </p>
//           </motion.div>
//         ) : (
//           <div>
//             {orderData.map((item, index) => {
//               const sc = statusConfig(item.status);
//               return (
//                 <motion.div
//                   key={index}
//                   className="order-card"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05, duration: 0.4 }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "flex-start",
//                       gap: 16,
//                     }}
//                   >
//                     <motion.img
//                       src={item.image[0]}
//                       alt={item.name}
//                       style={{
//                         width: 72,
//                         height: 72,
//                         objectFit: "cover",
//                         borderRadius: 10,
//                         border: "1.5px solid #EDD8C4",
//                         flexShrink: 0,
//                       }}
//                       whileHover={{ scale: 1.05 }}
//                     />
//                     <div>
//                       <p
//                         style={{
//                           color: "#3D2318",
//                           fontWeight: 700,
//                           fontSize: "0.92rem",
//                           marginBottom: 8,
//                           lineHeight: 1.4,
//                         }}
//                       >
//                         {item.name}
//                       </p>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexWrap: "wrap",
//                           alignItems: "center",
//                           gap: 8,
//                           fontSize: "0.82rem",
//                           marginBottom: 8,
//                         }}
//                       >
//                         <span style={{ color: "#C96A42", fontWeight: 700 }}>
//                           {currency}
//                           {item.price}
//                         </span>
//                         <span
//                           style={{
//                             background: "#EDD8C4",
//                             color: "#7A4A38",
//                             fontSize: "0.72rem",
//                             fontWeight: 700,
//                             padding: "3px 10px",
//                             borderRadius: 50,
//                             letterSpacing: "0.04em",
//                           }}
//                         >
//                           Qty: {item.quantity}
//                         </span>
//                         <span
//                           style={{
//                             background: "#EDD8C4",
//                             color: "#7A4A38",
//                             fontSize: "0.72rem",
//                             fontWeight: 700,
//                             padding: "3px 10px",
//                             borderRadius: 50,
//                             letterSpacing: "0.04em",
//                           }}
//                         >
//                           Size: {item.size}
//                         </span>
//                       </div>
//                       <p
//                         style={{
//                           fontSize: "0.78rem",
//                           color: "#98A98E",
//                           marginBottom: 4,
//                         }}
//                       >
//                         Ordered: {new Date(item.date).toDateString()}
//                       </p>
//                       <p
//                         style={{
//                           fontSize: "0.72rem",
//                           color: "#98A98E",
//                           textTransform: "uppercase",
//                           letterSpacing: "0.04em",
//                         }}
//                       >
//                         via {item.paymentMethod}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="orders-right">
//                     <span
//                       style={{
//                         display: "inline-flex",
//                         alignItems: "center",
//                         gap: 7,
//                         fontSize: "0.8rem",
//                         fontWeight: 700,
//                         background: sc.bg,
//                         border: `1px solid ${sc.border}`,
//                         borderRadius: 20,
//                         padding: "5px 12px",
//                         color: sc.color,
//                       }}
//                     >
//                       <span
//                         style={{
//                           width: 7,
//                           height: 7,
//                           borderRadius: "50%",
//                           background: sc.color,
//                           flexShrink: 0,
//                         }}
//                       />
//                       {item.status}
//                     </span>
//                     <motion.button
//                       onClick={loadOrderData}
//                       className="track-btn"
//                       whileTap={{ scale: 0.96 }}
//                     >
//                       Track Order
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Orders;






















import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const statusConfig = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("deliver")) return { color: "#4a7c59", bg: "rgba(74,124,89,0.1)", border: "rgba(74,124,89,0.25)", dot: "#4a7c59", label: "Delivered" };
  if (s.includes("out for")) return { color: "#2563eb", bg: "rgba(37,99,235,0.1)", border: "rgba(37,99,235,0.25)", dot: "#2563eb", label: status };
  if (s.includes("ship")) return { color: "var(--terra)", bg: "rgba(201,106,66,0.1)", border: "rgba(201,106,66,0.25)", dot: "var(--terra)", label: status };
  if (s.includes("pack")) return { color: "var(--bark)", bg: "rgba(122,74,56,0.1)", border: "rgba(122,74,56,0.25)", dot: "var(--bark)", label: status };
  if (s.includes("cancel")) return { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.25)", dot: "#ef4444", label: status };
  return { color: "var(--mist)", bg: "rgba(152,169,142,0.1)", border: "rgba(152,169,142,0.25)", dot: "var(--mist)", label: status };
};

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } });
      if (res.data.success) {
        const all = [];
        res.data.orders.forEach(order => {
          order.items.forEach(item => {
            all.push({ ...item, status: order.status, payment: order.payment, paymentMethod: order.paymentMethod, date: order.date, orderId: order._id });
          });
        });
        setOrderData(all.reverse());
      }
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadOrders(); }, [token]);

  return (
    <>
      <style>{`
        .orders-page { padding-top: 3rem; border-top: 2px solid var(--cream-deeper); min-height: 60vh; }

        .order-card {
          background: var(--cream);
          border: 1.5px solid var(--cream-deeper);
          border-radius: var(--radius-lg);
          padding: 20px;
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: var(--shadow-sm);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .order-card:hover { border-color: rgba(201,106,66,0.3); box-shadow: var(--shadow-md); }

        @media (min-width: 768px) {
          .order-card { flex-direction: row; align-items: center; justify-content: space-between; }
        }

        .track-btn {
          background: transparent;
          border: 1.5px solid var(--cream-deeper);
          color: var(--bark);
          font-family: var(--font-body);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 9px 20px;
          border-radius: var(--radius-full);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .track-btn:hover { background: var(--espresso); color: var(--cream); border-color: var(--espresso); }

        .skeleton-row { display: flex; gap: 16px; padding: 20px; background: var(--cream); border: 1.5px solid var(--cream-deeper); border-radius: var(--radius-lg); margin-bottom: 14px; }
      `}</style>

      <div className="orders-page">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: 12 }}>
          <Title text1="MY" text2="ORDERS" />
          {!loading && orderData.length > 0 && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--mist)' }}>
              {orderData.length} item{orderData.length !== 1 ? 's' : ''} ordered
            </p>
          )}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div>
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton-row">
                <div className="skeleton" style={{ width: 76, height: 96, flexShrink: 0, borderRadius: 'var(--radius-md)' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
                  <div className="skeleton" style={{ height: 16, width: '55%', borderRadius: 6 }} />
                  <div className="skeleton" style={{ height: 14, width: '35%', borderRadius: 6 }} />
                  <div className="skeleton" style={{ height: 12, width: '25%', borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && orderData.length === 0 && (
          <motion.div
            style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--mist)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem', opacity: 0.35 }}>📦</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--espresso)', marginBottom: 8, fontWeight: 600 }}>
              No orders yet
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.7 }}>
              Your order history will appear here once you make a purchase.
            </p>
          </motion.div>
        )}

        {/* Orders list */}
        <AnimatePresence>
          {!loading && orderData.map((item, i) => {
            const sc = statusConfig(item.status);
            return (
              <motion.div
                key={i}
                className="order-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.35), duration: 0.4 }}
              >
                {/* Left: product */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: 76, height: 96, borderRadius: 'var(--radius-md)',
                    overflow: 'hidden', border: '1.5px solid var(--cream-deeper)',
                    flexShrink: 0, background: 'var(--cream-dark)',
                  }}>
                    <img src={item.image[0]} alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--espresso)', fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, lineHeight: 1.4 }}>
                      {item.name}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontFamily: 'var(--font-display)', color: 'var(--terra)', fontSize: '1rem', fontWeight: 700 }}>
                        {currency}{item.price}
                      </span>
                      <span style={{ background: 'var(--cream-dark)', color: 'var(--bark)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                        Qty: {item.quantity}
                      </span>
                      <span style={{ background: 'var(--cream-dark)', color: 'var(--bark)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                        Size: {item.size}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: 'var(--mist)', marginBottom: 2 }}>
                      Ordered: {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--mist)' }}>
                      via {item.paymentMethod} · {item.payment ? '✓ Paid' : '⏳ Pending'}
                    </p>
                  </div>
                </div>

                {/* Right: status + action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexShrink: 0 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700,
                    background: sc.bg, border: `1px solid ${sc.border}`,
                    borderRadius: 'var(--radius-full)', padding: '6px 14px', color: sc.color,
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: sc.dot, flexShrink: 0 }} />
                    {item.status}
                  </span>
                  <motion.button
                    onClick={loadOrders}
                    className="track-btn"
                    whileTap={{ scale: 0.95 }}
                  >
                    Track
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Orders;