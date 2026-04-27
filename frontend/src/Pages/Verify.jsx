// import { useContext, useEffect } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { useSearchParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { toast } from "react-toastify";
// const Verify = () => {
//   const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
//   const [searchParams] = useSearchParams();
//   const success = searchParams.get("success");
//   const orderId = searchParams.get("orderId");

//   const verifyPayment = async () => {
//     try {
//       if (success !== "true" || !token || !orderId) {
//         navigate("/cart");
//         return;
//       }
//       const response = await axios.post(
//         backendUrl + "/api/order/verifyStripe",
//         {
//           success,
//           orderId,
//           userId: token ? JSON.parse(atob(token.split(".")[1])).id : null,
//         },
//         { headers: { token } },
//       );
//       if (response.data.success) {
//         setCartItems({});
//         navigate("/orders");
//       } else {
//         navigate("/cart");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || error.message);
//       navigate("/cart");
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//   }, [token]);

//   return (
//     <>
//       <style>{`
//                 @keyframes spin { to { transform:rotate(360deg) } }
//                 .verify-page { min-height:70vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(160deg,#F7EFE6 60%,#EDD8C4 100%); padding:2rem; }
//                 .verify-card { background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:20px; padding:3rem 2.5rem; text-align:center; box-shadow:0 8px 40px rgba(61,35,24,0.12); max-width:360px; width:100%; }
//                 .verify-spinner { width:48px; height:48px; border:3px solid #EDD8C4; border-top-color:#C96A42; border-radius:50%; margin:0 auto 1.5rem; animation:spin 0.9s linear infinite; }
//             `}</style>
//       <div className="verify-page">
//         <motion.div
//           className="verify-card"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <div className="verify-spinner" />
//           <h2
//             style={{
//               color: "#7A4A38",
//               fontFamily: "'Georgia',serif",
//               fontSize: "1.3rem",
//               marginBottom: 8,
//             }}
//           >
//             Verifying Payment
//           </h2>
//           <p style={{ color: "#98A98E", fontSize: "0.84rem", lineHeight: 1.7 }}>
//             Please wait while we confirm your order. You'll be redirected
//             automatically.
//           </p>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Verify;











import { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (success !== "true" || !token || !orderId) { navigate("/cart"); return; }
      const res = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId, userId: token ? JSON.parse(atob(token.split(".")[1])).id : null },
        { headers: { token } }
      );
      if (res.data.success) { setCartItems({}); navigate("/orders"); }
      else navigate("/cart");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
      navigate("/cart");
    }
  };

  useEffect(() => { verifyPayment(); }, [token]);

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at 50% 40%, rgba(201,106,66,0.06) 0%, transparent 60%), var(--cream)", padding: "2rem" }}>
      <motion.div
        style={{
          background: "rgba(250,247,242,0.9)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1.5px solid rgba(212,197,176,0.6)",
          borderRadius: "var(--radius-xl)",
          padding: "3.5rem 2.5rem",
          textAlign: "center",
          boxShadow: "var(--shadow-xl)",
          maxWidth: 380,
          width: "100%",
        }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated spinner */}
        <div style={{ position: "relative", width: 60, height: 60, margin: "0 auto 1.75rem" }}>
          <div style={{ width: 60, height: 60, border: "3px solid var(--cream-deeper)", borderTopColor: "var(--terra)", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--terra)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        </div>

        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--espresso)", fontSize: "1.5rem", marginBottom: 10, fontWeight: 600, letterSpacing: "-0.01em" }}>
          Verifying Payment
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--mist)", fontSize: "0.86rem", lineHeight: 1.7, margin: 0 }}>
          Please wait while we confirm your order. You'll be redirected automatically.
        </p>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--terra)", display: "block" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.22 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Verify;