// import React, { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { motion } from "framer-motion";
// import Title from "./Title";

// const CartTotal = () => {
//   const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
//   const subtotal = getCartAmount();
//   const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

//   return (
//     <motion.div
//       style={{
//         width: "100%",
//         background: "#F7EFE6",
//         border: "1.5px solid #EDD8C4",
//         borderRadius: 18,
//         padding: "1.5rem",
//         boxShadow: "0 4px 18px rgba(61,35,24,0.09)",
//       }}
//       initial={{ opacity: 0, x: 30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//     >
//       <div style={{ marginBottom: 14 }}>
//         <Title text1="CART" text2="TOTAL" />
//       </div>

//       {[
//         { label: "Subtotal", value: `${currency}${subtotal}` },
//         { label: "Shipping Fee", value: `${currency}${delivery_fee}.00` },
//       ].map(({ label, value }, i) => (
//         <React.Fragment key={i}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: "10px 0",
//               fontSize: "0.88rem",
//             }}
//           >
//             <span
//               style={{
//                 color: "#98A98E",
//                 fontWeight: 500,
//                 letterSpacing: "0.03em",
//               }}
//             >
//               {label}
//             </span>
//             <span style={{ color: "#7A4A38", fontWeight: 600 }}>{value}</span>
//           </div>
//           <hr
//             style={{
//               border: "none",
//               borderTop: "1px dashed #EDD8C4",
//               margin: "2px 0",
//             }}
//           />
//         </React.Fragment>
//       ))}

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "14px 0 4px",
//           fontSize: "0.95rem",
//         }}
//       >
//         <span
//           style={{ color: "#7A4A38", fontWeight: 800, letterSpacing: "0.04em" }}
//         >
//           Total
//         </span>
//         <motion.span
//           key={total}
//           style={{
//             color: "#C96A42",
//             fontWeight: 800,
//             fontSize: "1.08rem",
//             letterSpacing: "0.02em",
//           }}
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ type: "spring", stiffness: 400 }}
//         >
//           {currency}
//           {total}.00
//         </motion.span>
//       </div>

//       <p
//         style={{
//           fontSize: "0.72rem",
//           color: "#98A98E",
//           background: "rgba(152,169,142,0.12)",
//           border: "1px solid rgba(152,169,142,0.28)",
//           borderRadius: 8,
//           padding: "6px 12px",
//           marginTop: 12,
//           textAlign: "center",
//           letterSpacing: "0.03em",
//         }}
//       >
//         Free shipping on orders over {currency}999
//       </p>
//     </motion.div>
//   );
// };

// export default CartTotal;

















import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  const freeShipping = subtotal >= 999;

  return (
    <motion.div
      style={{
        background: 'var(--cream)',
        border: '1.5px solid var(--cream-deeper)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-md)',
      }}
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ marginBottom: 20 }}>
        <Title text1="ORDER" text2="SUMMARY" />
      </div>

      {[
        { label: 'Subtotal', value: `${currency}${subtotal.toLocaleString()}` },
        {
          label: 'Shipping',
          value: freeShipping ? 'Free ✓' : `${currency}${delivery_fee}`,
          valueColor: freeShipping ? '#5a7a56' : 'inherit',
        },
      ].map(({ label, value, valueColor }) => (
        <React.Fragment key={label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--mist)', fontWeight: 400 }}>
              {label}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: valueColor || 'var(--bark)', fontWeight: 600 }}>
              {value}
            </span>
          </div>
          <div className="divider" />
        </React.Fragment>
      ))}

      {/* Total */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 4px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--espresso)', fontWeight: 700, letterSpacing: '0.04em' }}>
          Total
        </span>
        <motion.span
          key={total}
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--terra)', letterSpacing: '-0.01em' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {currency}{total.toLocaleString()}
        </motion.span>
      </div>

      {/* Free shipping note */}
      <div style={{
        marginTop: 14,
        padding: '10px 14px',
        background: freeShipping ? 'rgba(90, 122, 86, 0.08)' : 'rgba(201, 106, 66, 0.06)',
        border: `1px solid ${freeShipping ? 'rgba(90,122,86,0.2)' : 'rgba(201,106,66,0.15)'}`,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: '0.9rem' }}>{freeShipping ? '✅' : '🚚'}</span>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: freeShipping ? '#5a7a56' : 'var(--bark)',
          margin: 0,
          lineHeight: 1.4,
          fontWeight: 500,
        }}>
          {freeShipping
            ? 'You qualify for free shipping!'
            : `Add ${currency}${(999 - subtotal).toLocaleString()} more for free shipping`}
        </p>
      </div>
    </motion.div>
  );
};

export default CartTotal;