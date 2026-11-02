// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { motion } from "framer-motion";
// import Title from "./Title";
// import Item from "./Item";

// const LatestCollection = () => {
//   const { products } = useContext(ShopContext);
//   const [latest, setLatest] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) setLatest(products.slice(0, 15));
//   }, [products]);

//   return (
//     <section style={{ margin: '5rem 0' }}>
//       {/* Section header */}
//       <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: 12 }}>
//         <div>
//           <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 6 }}>
//             Fresh Arrivals
//           </p>
//           <Title text1="LATEST" text2="COLLECTIONS" />
//         </div>
//         <motion.p
//           style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '0.88rem', lineHeight: 1.65, maxWidth: 320, textAlign: 'right' }}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.25 }}
//         >
//           Discover our newest pieces, curated for those who appreciate quality and contemporary style.
//         </motion.p>
//       </div>

//       {/* Subtle background */}
//       <div style={{
//         background: 'radial-gradient(ellipse at 50% 0%, rgba(201,106,66,0.05) 0%, transparent 65%)',
//         borderRadius: 'var(--radius-xl)',
//         padding: '2rem',
//         margin: '0 -1rem',
//       }}>
//         <div className="products-grid">
//           {latest.map((item, i) => (
//             <motion.div key={item._id}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-30px' }}
//               transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <Item id={item._id} name={item.name} price={item.price} image={item.image} />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LatestCollection;


























































import React, { useContext, useMemo } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Title from "./Title";
import Item from "./Item";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const latest = useMemo(() => products.slice(0, 15), [products]);

  return (
    <section style={{ margin: "6rem 0" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: "2.2rem" }}>
        <Title text1="LATEST" text2="COLLECTIONS" />
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ maxWidth: 330, margin: 0, textAlign: "right", color: "var(--mist)", fontSize: ".9rem", lineHeight: 1.7 }}>
          New pieces for the season, cut from fabrics that hold their shape.
        </motion.p>
      </div>

      <div className="products-grid">
        {latest.map((item, i) => (
          <motion.div key={item._id} initial={{ opacity: 0, y: 40, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }} transition={{ delay: (i % 5) * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <Item id={item._id} name={item.name} price={item.price} image={item.image} />
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link to="/collection" className="btn-secondary">Browse everything</Link>
      </div>
    </section>
  );
};
export default LatestCollection;
