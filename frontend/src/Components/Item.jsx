import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Item = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <Link
        to={`/product/${id}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <motion.div
          style={{
            background: "#F7EFE6",
            border: "1.5px solid #EDD8C4",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(61,35,24,0.07)",
            transition: "border-color 0.25s, box-shadow 0.25s",
          }}
          whileHover={{
            boxShadow: "0 14px 36px rgba(61,35,24,0.16)",
            borderColor: "#C96A42",
          }}
          transition={{ duration: 0.25 }}
        >
          {/* Image */}
          <div
            style={{
              overflow: "hidden",
              background: "#EDD8C4",
              aspectRatio: "1/1.1",
              position: "relative",
            }}
          >
            <motion.img
              src={image[0]}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
            <span
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                background: "#98A98E",
                color: "#F7EFE6",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                fontWeight: 700,
                padding: "3px 11px",
                borderRadius: 60,
                textTransform: "uppercase",
              }}
            >
              New
            </span>
          </div>

          {/* Info */}
          <div style={{ padding: "12px 14px 15px" }}>
            <p
              style={{
                color: "#7A4A38",
                fontSize: "0.82rem",
                fontWeight: 500,
                margin: "0 0 4px",
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </p>
            <p
              style={{
                color: "#C96A42",
                fontSize: "0.88rem",
                fontWeight: 700,
                letterSpacing: "0.03em",
                margin: 0,
              }}
            >
              {currency}
              {price}
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Item;
