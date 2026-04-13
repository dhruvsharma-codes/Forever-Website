import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import Title from "./Title";
import Item from "./Item";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let copy = products.filter(
        (item) =>
          item.category === category && item.subCategory === subCategory,
      );
      setRelated(copy.slice(0, 5));
    }
  }, [products]);

  return (
    <section style={{ margin: "5rem 0", position: "relative" }}>
      {/* top divider */}
      <motion.div
        style={{
          width: "100%",
          height: 1,
          background: "linear-gradient(90deg,transparent,#EDD8C4,transparent)",
          marginBottom: "3rem",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      />

      <div style={{ textAlign: "center", paddingBottom: "1.5rem" }}>
        <motion.div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 12,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            style={{
              width: 34,
              height: 1,
              background: "#98A98E",
              display: "block",
            }}
          />
          <span
            style={{
              color: "#98A98E",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            You may also like
          </span>
          <span
            style={{
              width: 34,
              height: 1,
              background: "#98A98E",
              display: "block",
            }}
          />
        </motion.div>
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
          gap: "1rem",
        }}
      >
        {related.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Item
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
