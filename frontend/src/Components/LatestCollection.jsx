import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import Title from "./Title";
import Item from "./Item";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) setLatestProducts(products.slice(0, 15));
  }, [products]);

  return (
    <section style={{ margin: "4rem 0" }}>
      <style>{`
                .lc-bg {
                    background: radial-gradient(ellipse at top center, rgba(237,216,196,0.38) 0%, transparent 70%);
                    border-radius:24px;
                    padding:2rem;
                    margin:0 -1rem;
                }
                .lc-header {
                    text-align:center;
                    padding:2rem 0 1.8rem;
                    position:relative;
                }
                .lc-header::after {
                    content:'';
                    display:block; width:56px; height:3px;
                    background:linear-gradient(90deg,#C96A42,#98A98E);
                    border-radius:2px; margin:14px auto 0;
                }
            `}</style>

      <div className="lc-bg">
        <div className="lc-header">
          <Title text1="LATEST" text2="COLLECTIONS" />
          <motion.p
            style={{
              maxWidth: 500,
              margin: "10px auto 0",
              color: "#98A98E",
              fontSize: "0.88rem",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover our latest collection, curated with fresh styles and
            trending designs just for you.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
            gap: "1rem",
          }}
        >
          {latestProducts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                delay: index * 0.055,
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
      </div>
    </section>
  );
};

export default LatestCollection;
