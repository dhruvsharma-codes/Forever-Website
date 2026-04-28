// import React, { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Item = ({ id, image, name, price }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-40px" }}
//       transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ y: -5 }}
//     >
//       <Link
//         to={`/product/${id}`}
//         style={{ textDecoration: "none", display: "block" }}
//       >
//         <motion.div
//           style={{
//             background: "#F7EFE6",
//             border: "1.5px solid #EDD8C4",
//             borderRadius: 18,
//             overflow: "hidden",
//             boxShadow: "0 2px 10px rgba(61,35,24,0.07)",
//             transition: "border-color 0.25s, box-shadow 0.25s",
//           }}
//           whileHover={{
//             boxShadow: "0 14px 36px rgba(61,35,24,0.16)",
//             borderColor: "#C96A42",
//           }}
//           transition={{ duration: 0.25 }}
//         >
//           {/* Image */}
//           <div
//             style={{
//               overflow: "hidden",
//               background: "#EDD8C4",
//               aspectRatio: "1/1.1",
//               position: "relative",
//             }}
//           >
//             <motion.img
//               src={image[0]}
//               alt={name}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 display: "block",
//               }}
//               whileHover={{ scale: 1.08 }}
//               transition={{ duration: 0.45, ease: "easeOut" }}
//             />
//             <span
//               style={{
//                 position: "absolute",
//                 top: 10,
//                 left: 10,
//                 background: "#98A98E",
//                 color: "#F7EFE6",
//                 fontSize: "0.62rem",
//                 letterSpacing: "0.1em",
//                 fontWeight: 700,
//                 padding: "3px 11px",
//                 borderRadius: 60,
//                 textTransform: "uppercase",
//               }}
//             >
//               New
//             </span>
//           </div>

//           {/* Info */}
//           <div style={{ padding: "12px 14px 15px" }}>
//             <p
//               style={{
//                 color: "#7A4A38",
//                 fontSize: "0.82rem",
//                 fontWeight: 500,
//                 margin: "0 0 4px",
//                 lineHeight: 1.4,
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {name}
//             </p>
//             <p
//               style={{
//                 color: "#C96A42",
//                 fontSize: "0.88rem",
//                 fontWeight: 700,
//                 letterSpacing: "0.03em",
//                 margin: 0,
//               }}
//             >
//               {currency}
//               {price}
//             </p>
//           </div>
//         </motion.div>
//       </Link>
//     </motion.div>
//   );
// };

// export default Item;













import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Item = ({ id, image, name, price }) => {
  const { currency, isOnSale, getDiscountedPrice, products } = useContext(ShopContext);

  // Find full product for sale check
  const product = products?.find(p => p._id === id)
  const onSale = product ? isOnSale(product) : false
  const discountedPrice = product ? getDiscountedPrice(product) : price

  return (
    <Link to={`/product/${id}`} style={{ textDecoration: 'none', display: 'block' }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <motion.article
        className="product-card"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Image container */}
        <div className="product-card-img">
          <img src={image[0]} alt={name} loading="lazy" className="h-full" />

          {/* Badges */}
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {onSale ? (
              <span className="badge badge-terra">Sale</span>
            ) : (
              <span className="badge badge-espresso" style={{ background: 'rgba(44,24,16,0.75)', backdropFilter: 'blur(8px)' }}>
                New
              </span>
            )}
          </div>

          {/* Quick view overlay */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(44, 24, 16, 0.3)',
              backdropFilter: 'blur(2px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.22 }}
          >
            <span style={{
              background: 'rgba(250, 247, 242, 0.9)',
              backdropFilter: 'blur(10px)',
              color: 'var(--espresso)',
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
            }}>
              View Details
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div style={{ padding: '14px 16px 18px' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--bark)',
            fontSize: '0.84rem',
            fontWeight: 500,
            margin: '0 0 6px',
            lineHeight: 1.4,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {name}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="price">
              {currency}{onSale ? discountedPrice.toFixed(0) : price}
            </span>
            {onSale && (
              <span className="price-original">{currency}{price}</span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default Item;