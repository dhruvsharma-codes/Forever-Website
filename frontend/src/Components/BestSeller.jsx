// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { motion } from "framer-motion";
// import Title from "./Title";
// import Item from "./Item";

// const BestSeller = () => {
//   const { products } = useContext(ShopContext);
//   const [best, setBest] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       setBest(products.filter(p => p.bestseller).slice(0, 10));
//     }
//   }, [products]);

//   return (
//     <section style={{ margin: '5rem 0' }}>
//       {/* Header */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: 12 }}>
//         <div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
//             <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terra)' }}>
//               Customer Favourites
//             </span>
//             <span style={{ display: 'inline-block', background: 'var(--terra)', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
//               ⭐ Top Picks
//             </span>
//           </div>
//           <Title text1="BEST" text2="SELLERS" />
//         </div>
//       </div>

//       {/* Dark background strip */}
//       <div style={{
//         background: 'linear-gradient(180deg, var(--cream-dark) 0%, var(--cream) 100%)',
//         borderRadius: 'var(--radius-xl)',
//         padding: '2.5rem 2rem',
//         margin: '0 -1rem',
//         position: 'relative',
//         overflow: 'hidden',
//       }}>
//         {/* Subtle pattern */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           backgroundImage: 'radial-gradient(circle, rgba(201,106,66,0.04) 1px, transparent 1px)',
//           backgroundSize: '22px 22px',
//           pointerEvents: 'none',
//         }} />

//         <div className="products-grid" style={{ position: 'relative' }}>
//           {best.map((item, i) => (
//             <motion.div key={item._id}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-30px' }}
//               transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <Item id={item._id} name={item.name} image={item.image} price={item.price} />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BestSeller;
















































import React, { useContext, useMemo } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Title from "./Title";
import Item from "./Item";

const ease = [0.16, 1, 0.3, 1];

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const best = useMemo(() => products.filter(p => p.bestseller).slice(0, 10), [products]);

  return (
    <section style={{ margin: "6rem 0" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: "2.2rem" }}>
        <div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "6px 14px", borderRadius: 999,
            background: "rgba(184,146,74,.14)", color: "var(--gold)", font: "700 .7rem var(--font-body)", letterSpacing: ".12em" }}>
            ★ Most loved this month
          </span>
          <br />
          <Title text1="BEST" text2="SELLERS" />
        </div>
        <Link to="/collection" className="btn-secondary" style={{ padding: "12px 26px" }}>View all</Link>
      </div>

      <motion.div
        style={{ position: "relative", padding: "2.4rem 2rem", margin: "0 -1rem", borderRadius: "var(--radius-xl)", overflow: "hidden",
          background: "linear-gradient(180deg,var(--cream-dark),var(--cream))" }}
        initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(194,86,46,.14),transparent 70%)", pointerEvents: "none" }} />
        <div className="products-grid" style={{ position: "relative" }}>
          {best.map((item, i) => (
            <motion.div key={item._id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: (i % 5) * 0.08, duration: 0.7, ease }}>
              <Item id={item._id} name={item.name} image={item.image} price={item.price} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
export default BestSeller;