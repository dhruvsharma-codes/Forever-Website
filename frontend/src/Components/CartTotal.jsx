// import React, { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { motion } from "framer-motion";
// import Title from "./Title";

// const CartTotal = () => {
//   const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
//   const subtotal = getCartAmount();
//   const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
//   const freeShipping = subtotal >= 999;

//   return (
//     <motion.div
//       style={{
//         background: 'var(--cream)',
//         border: '1.5px solid var(--cream-deeper)',
//         borderRadius: 'var(--radius-lg)',
//         padding: '1.75rem',
//         boxShadow: 'var(--shadow-md)',
//       }}
//       initial={{ opacity: 0, x: 24 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//     >
//       <div style={{ marginBottom: 20 }}>
//         <Title text1="ORDER" text2="SUMMARY" />
//       </div>

//       {[
//         { label: 'Subtotal', value: `${currency}${subtotal.toLocaleString()}` },
//         {
//           label: 'Shipping',
//           value: freeShipping ? 'Free ✓' : `${currency}${delivery_fee}`,
//           valueColor: freeShipping ? '#5a7a56' : 'inherit',
//         },
//       ].map(({ label, value, valueColor }) => (
//         <React.Fragment key={label}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0' }}>
//             <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--mist)', fontWeight: 400 }}>
//               {label}
//             </span>
//             <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: valueColor || 'var(--bark)', fontWeight: 600 }}>
//               {value}
//             </span>
//           </div>
//           <div className="divider" />
//         </React.Fragment>
//       ))}

//       {/* Total */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 4px' }}>
//         <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--espresso)', fontWeight: 700, letterSpacing: '0.04em' }}>
//           Total
//         </span>
//         <motion.span
//           key={total}
//           style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--terra)', letterSpacing: '-0.01em' }}
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//         >
//           {currency}{total.toLocaleString()}
//         </motion.span>
//       </div>

//       {/* Free shipping note */}
//       <div style={{
//         marginTop: 14,
//         padding: '10px 14px',
//         background: freeShipping ? 'rgba(90, 122, 86, 0.08)' : 'rgba(201, 106, 66, 0.06)',
//         border: `1px solid ${freeShipping ? 'rgba(90,122,86,0.2)' : 'rgba(201,106,66,0.15)'}`,
//         borderRadius: 'var(--radius-md)',
//         display: 'flex',
//         alignItems: 'center',
//         gap: 8,
//       }}>
//         <span style={{ fontSize: '0.9rem' }}>{freeShipping ? '✅' : '🚚'}</span>
//         <p style={{
//           fontFamily: 'var(--font-body)',
//           fontSize: '0.75rem',
//           color: freeShipping ? '#5a7a56' : 'var(--bark)',
//           margin: 0,
//           lineHeight: 1.4,
//           fontWeight: 500,
//         }}>
//           {freeShipping
//             ? 'You qualify for free shipping!'
//             : `Add ${currency}${(999 - subtotal).toLocaleString()} more for free shipping`}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default CartTotal;



























































import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import Title from "./Title";

const FREE_AT = 999;

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const free = subtotal >= FREE_AT;
  const total = subtotal === 0 ? 0 : subtotal + (free ? 0 : delivery_fee);
  const pct = Math.min(100, (subtotal / FREE_AT) * 100);

  const Row = ({ label, value, color }) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--cream-dark)" }}>
      <span style={{ fontSize: ".88rem", color: "var(--mist)" }}>{label}</span>
      <span style={{ fontSize: ".92rem", fontWeight: 600, color: color || "var(--bark)" }}>{value}</span>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: "#fff", border: "1px solid var(--cream-deeper)", borderRadius: "var(--radius-lg)", padding: "1.8rem", boxShadow: "var(--shadow-md)" }}>
      <div style={{ marginBottom: 18 }}><Title text1="ORDER" text2="SUMMARY" /></div>

      <Row label="Subtotal" value={`${currency}${subtotal.toLocaleString()}`} />
      <Row label="Shipping" value={free ? "Free" : `${currency}${delivery_fee}`} color={free ? "#4a7c59" : undefined} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "18px 0 6px" }}>
        <span style={{ fontWeight: 700, color: "var(--espresso)" }}>Total</span>
        <motion.span key={total} initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}
          style={{ font: "700 1.8rem var(--font-display)", color: "var(--terra)", letterSpacing: "-.02em" }}>
          {currency}{total.toLocaleString()}
        </motion.span>
      </div>

      {subtotal > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ height: 8, borderRadius: 8, background: "var(--cream-dark)", overflow: "hidden" }}>
            <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "100%", borderRadius: 8, background: free ? "linear-gradient(90deg,#4a7c59,#7fae8b)" : "linear-gradient(90deg,var(--terra),var(--gold))" }} />
          </div>
          <p style={{ margin: "10px 0 0", fontSize: ".78rem", color: free ? "#4a7c59" : "var(--bark)", fontWeight: 500 }}>
            {free ? "You've unlocked free shipping." : `Add ${currency}${(FREE_AT - subtotal).toLocaleString()} more for free shipping.`}
          </p>
        </div>
      )}
    </motion.div>
  );
};
export default CartTotal;