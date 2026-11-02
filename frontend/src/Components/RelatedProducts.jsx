// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { motion } from "framer-motion";
// import Title from "./Title";
// import Item from "./Item";

// const RelatedProducts = ({ category, subCategory }) => {
//   const { products } = useContext(ShopContext);
//   const [related, setRelated] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const filtered = products.filter(
//         p => p.category === category && p.subCategory === subCategory
//       );
//       setRelated(filtered.slice(0, 5));
//     }
//   }, [products, category, subCategory]);

//   if (related.length === 0) return null;

//   return (
//     <section style={{ margin: '5rem 0 2rem' }}>
//       {/* Divider */}
//       <motion.div
//         className="divider"
//         style={{ marginBottom: '3rem' }}
//         initial={{ scaleX: 0 }}
//         whileInView={{ scaleX: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//       />

//       <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//         <motion.div
//           style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 12 }}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           <span style={{ width: 28, height: 1, background: 'var(--sand)', display: 'block' }} />
//           <span style={{ fontFamily: 'var(--font-body)', color: 'var(--mist)', fontSize: '0.68rem', letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase' }}>
//             You may also like
//           </span>
//           <span style={{ width: 28, height: 1, background: 'var(--sand)', display: 'block' }} />
//         </motion.div>
//         <Title text1="RELATED" text2="PRODUCTS" />
//       </div>

//       <div className="products-grid">
//         {related.map((item, i) => (
//           <motion.div key={item._id}
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//           >
//             <Item id={item._id} name={item.name} price={item.price} image={item.image} />
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default RelatedProducts;







































































import React, { useContext, useMemo } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import Title from "./Title";
import Item from "./Item";

const RelatedProducts = ({ category, subCategory, currentId }) => {
  const { products } = useContext(ShopContext);
  const related = useMemo(
    () => products.filter(p => p.category === category && p.subCategory === subCategory && p._id !== currentId).slice(0, 5),
    [products, category, subCategory, currentId]
  );
  if (!related.length) return null;

  return (
    <section style={{ margin: "5rem 0 2rem" }}>
      <motion.hr className="divider" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: "3rem" }} />
      <div style={{ textAlign: "center", marginBottom: "2.2rem" }}>
        <Title text1="YOU MAY" text2="ALSO LIKE" />
      </div>
      <div className="products-grid">
        {related.map((item, i) => (
          <motion.div key={item._id} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <Item id={item._id} name={item.name} price={item.price} image={item.image} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default RelatedProducts;