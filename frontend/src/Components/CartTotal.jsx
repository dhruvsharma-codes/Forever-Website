import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <motion.div
      style={{
        width: "100%",
        background: "#F7EFE6",
        border: "1.5px solid #EDD8C4",
        borderRadius: 18,
        padding: "1.5rem",
        boxShadow: "0 4px 18px rgba(61,35,24,0.09)",
      }}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{ marginBottom: 14 }}>
        <Title text1="CART" text2="TOTAL" />
      </div>

      {[
        { label: "Subtotal", value: `${currency}${subtotal}` },
        { label: "Shipping Fee", value: `${currency}${delivery_fee}.00` },
      ].map(({ label, value }, i) => (
        <React.Fragment key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              fontSize: "0.88rem",
            }}
          >
            <span
              style={{
                color: "#98A98E",
                fontWeight: 500,
                letterSpacing: "0.03em",
              }}
            >
              {label}
            </span>
            <span style={{ color: "#7A4A38", fontWeight: 600 }}>{value}</span>
          </div>
          <hr
            style={{
              border: "none",
              borderTop: "1px dashed #EDD8C4",
              margin: "2px 0",
            }}
          />
        </React.Fragment>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "14px 0 4px",
          fontSize: "0.95rem",
        }}
      >
        <span
          style={{ color: "#7A4A38", fontWeight: 800, letterSpacing: "0.04em" }}
        >
          Total
        </span>
        <motion.span
          key={total}
          style={{
            color: "#C96A42",
            fontWeight: 800,
            fontSize: "1.08rem",
            letterSpacing: "0.02em",
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {currency}
          {total}.00
        </motion.span>
      </div>

      <p
        style={{
          fontSize: "0.72rem",
          color: "#98A98E",
          background: "rgba(152,169,142,0.12)",
          border: "1px solid rgba(152,169,142,0.28)",
          borderRadius: 8,
          padding: "6px 12px",
          marginTop: 12,
          textAlign: "center",
          letterSpacing: "0.03em",
        }}
      >
        Free shipping on orders over {currency}999
      </p>
    </motion.div>
  );
};

export default CartTotal;
