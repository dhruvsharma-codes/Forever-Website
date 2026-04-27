// import React from "react";
// import { motion } from "framer-motion";

// const reviews = [
//   {
//     name: "Priya Rawat",
//     location: "Delhi",
//     initials: "PR",
//     rating: 5,
//     avatarBg: "#FAE4D8",
//     avatarColor: "#C96A42",
//     text: '"The quality is absolutely amazing! The product looks exactly like it did in the photos. The packaging was also beautiful — perfect for gifting."',
//   },
//   {
//     name: "Sneha Mehta",
//     location: "Mumbai",
//     initials: "SM",
//     rating: 5,
//     avatarBg: "#EDD8C4",
//     avatarColor: "#7A4A38",
//     text: '"Fast delivery and top-notch packaging. Customer support also responded very quickly. I would definitely recommend it to my friends!"',
//   },
//   {
//     name: "Anjali Sharma",
//     location: "Jaipur",
//     initials: "AS",
//     rating: 4,
//     avatarBg: "#FDF0E6",
//     avatarColor: "#B05830",
//     text: '"The products feel very premium. One item was slightly delayed, but the support team kept me updated. Overall, a very good experience."',
//   },
//   {
//     name: "Ritika Gupta",
//     location: "Bangalore",
//     initials: "RG",
//     rating: 5,
//     avatarBg: "#FAE4D8",
//     avatarColor: "#C96A42",
//     text: '"I was looking for something for gifting and bought it from here — it was so beautiful that I didn\'t even feel like giving it away! Highly recommended."',
//   },
//   {
//     name: "Kavya Nair",
//     location: "Chennai",
//     initials: "KN",
//     rating: 5,
//     avatarBg: "#EDD8C4",
//     avatarColor: "#7A4A38",
//     text: '"The return process was very smooth — one item had a size issue, and they replaced it without any hassle. This is a trustworthy brand!"',
//   },
//   {
//     name: "Meera Joshi",
//     location: "Pune",
//     initials: "MJ",
//     rating: 5,
//     avatarBg: "#FDF0E6",
//     avatarColor: "#B05830",
//     text: '"It was my first order, so I was a bit nervous, but I received a completely authentic product. Now I\'ve become a regular customer. The quality is unmatched at this price."',
//   },
// ];

// const Star = ({ filled }) => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill={filled ? "#C96A42" : "#EDD8C4"}
//   >
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//   </svg>
// );

// const CustomerReviews = () => {
//   const avg = (
//     reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
//   ).toFixed(1);

//   return (
//     <section
//       style={{
//         background: "#F7EFE6",
//         padding: "4rem 2rem",
//         marginBottom: "2.5rem",
//       }}
//     >
//       <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
//         <motion.p
//           style={{
//             fontSize: "0.7rem",
//             fontWeight: 700,
//             letterSpacing: "0.18em",
//             color: "#C96A42",
//             textTransform: "uppercase",
//             marginBottom: 6,
//           }}
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.4 }}
//         >
//           What People Say
//         </motion.p>
//         <motion.h2
//           style={{
//             fontSize: "1.75rem",
//             fontWeight: 700,
//             color: "#3D2318",
//             marginBottom: 12,
//             fontFamily: "'Georgia',serif",
//           }}
//           initial={{ opacity: 0, y: 14 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.08, duration: 0.45 }}
//         >
//           Customer Reviews
//         </motion.h2>
//         <motion.div
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 8,
//             background: "#FDF0E6",
//             border: "1.5px solid #EDD8C4",
//             borderRadius: 30,
//             padding: "6px 16px",
//           }}
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.16, duration: 0.4 }}
//         >
//           <div style={{ display: "flex", gap: 3 }}>
//             {[1, 2, 3, 4, 5].map((s) => (
//               <Star key={s} filled={s <= Math.round(avg)} />
//             ))}
//           </div>
//           <span style={{ fontSize: "1rem", fontWeight: 700, color: "#3D2318" }}>
//             {avg}
//           </span>
//           <span style={{ fontSize: "0.8rem", color: "#7A4A38" }}>
//             ({reviews.length} reviews)
//           </span>
//         </motion.div>
//       </div>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
//           gap: "1.25rem",
//           maxWidth: 1100,
//           margin: "0 auto",
//         }}
//       >
//         {reviews.map((r, i) => (
//           <motion.div
//             key={i}
//             style={{
//               background: "#FEFAF6",
//               border: "1.5px solid #EDD8C4",
//               borderRadius: 16,
//               padding: "1.4rem 1.25rem",
//               display: "flex",
//               flexDirection: "column",
//               gap: 12,
//             }}
//             initial={{ opacity: 0, y: 28 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-30px" }}
//             transition={{
//               delay: i * 0.07,
//               duration: 0.5,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             whileHover={{
//               y: -5,
//               borderColor: "#C96A42",
//               boxShadow: "0 8px 28px rgba(201,106,66,0.13)",
//             }}
//           >
//             <div style={{ display: "flex", gap: 3 }}>
//               {[1, 2, 3, 4, 5].map((s) => (
//                 <Star key={s} filled={s <= r.rating} />
//               ))}
//             </div>
//             <p
//               style={{
//                 fontSize: "0.83rem",
//                 color: "#5A3028",
//                 lineHeight: 1.7,
//                 fontStyle: "italic",
//                 flex: 1,
//               }}
//             >
//               {r.text}
//             </p>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 10,
//                 borderTop: "1px solid #F0DDD0",
//                 paddingTop: 12,
//               }}
//             >
//               <div
//                 style={{
//                   width: 36,
//                   height: 36,
//                   borderRadius: "50%",
//                   background: r.avatarBg,
//                   color: r.avatarColor,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "0.75rem",
//                   fontWeight: 700,
//                   flexShrink: 0,
//                 }}
//               >
//                 {r.initials}
//               </div>
//               <div>
//                 <p
//                   style={{
//                     fontSize: "0.84rem",
//                     fontWeight: 700,
//                     color: "#3D2318",
//                     margin: 0,
//                   }}
//                 >
//                   {r.name}
//                 </p>
//                 <p style={{ fontSize: "0.75rem", color: "#7A4A38", margin: 0 }}>
//                   {r.location}
//                 </p>
//               </div>
//               <span
//                 style={{
//                   marginLeft: "auto",
//                   fontSize: "0.7rem",
//                   color: "#C96A42",
//                   fontWeight: 700,
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 ✓ Verified
//               </span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CustomerReviews;











import React from "react";
import { motion } from "framer-motion";

const reviews = [
  { name: "Priya Rawat", location: "Delhi", initials: "PR", rating: 5, avatarBg: "#FAE4D8", avatarColor: "#C96A42", text: "The quality is absolutely amazing! The product looks exactly like it did in the photos. The packaging was also beautiful — perfect for gifting." },
  { name: "Sneha Mehta", location: "Mumbai", initials: "SM", rating: 5, avatarBg: "#EDD8C4", avatarColor: "#7A4A38", text: "Fast delivery and top-notch packaging. Customer support also responded very quickly. I would definitely recommend it to my friends!" },
  { name: "Anjali Sharma", location: "Jaipur", initials: "AS", rating: 4, avatarBg: "#FDF0E6", avatarColor: "#B05830", text: "The products feel very premium. One item was slightly delayed, but the support team kept me updated. Overall, a very good experience." },
  { name: "Ritika Gupta", location: "Bangalore", initials: "RG", rating: 5, avatarBg: "#FAE4D8", avatarColor: "#C96A42", text: "I was looking for something for gifting and bought it from here — it was so beautiful that I didn't even feel like giving it away! Highly recommended." },
  { name: "Kavya Nair", location: "Chennai", initials: "KN", rating: 5, avatarBg: "#EDD8C4", avatarColor: "#7A4A38", text: "The return process was very smooth — one item had a size issue, and they replaced it without any hassle. This is a trustworthy brand!" },
  { name: "Meera Joshi", location: "Pune", initials: "MJ", rating: 5, avatarBg: "#FDF0E6", avatarColor: "#B05830", text: "It was my first order, so I was a bit nervous, but I received a completely authentic product. Now I've become a regular customer. The quality is unmatched at this price." },
];

const StarIcon = ({ filled }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#C96A42" : "#E8E0D3"}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Stars = ({ rating }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= rating} />)}
  </div>
);

const CustomerReviews = () => {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section style={{ padding: "5rem 0", margin: "2.5rem 0" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <motion.p
          style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 8 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What People Say
        </motion.p>

        <motion.h2
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, color: "var(--espresso)", marginBottom: 16, letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
        >
          Customer Reviews
        </motion.h2>

        {/* Aggregate rating pill */}
        <motion.div
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--cream)", border: "1.5px solid var(--cream-deeper)", borderRadius: "var(--radius-full)", padding: "8px 20px", boxShadow: "var(--shadow-sm)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
        >
          <Stars rating={Math.round(avg)} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--espresso)", letterSpacing: "-0.01em" }}>{avg}</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--mist)" }}>({reviews.length} reviews)</span>
        </motion.div>
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1.25rem", maxWidth: 1100, margin: "0 auto" }}>
        {reviews.map((r, i) => (
          <motion.article
            key={i}
            style={{
              background: "var(--cream)",
              border: "1.5px solid var(--cream-deeper)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, borderColor: "rgba(201,106,66,0.4)", boxShadow: "var(--shadow-lg)" }}
          >
            {/* Quote mark watermark */}
            <span style={{ position: "absolute", top: 10, right: 16, fontFamily: "var(--font-display)", fontSize: "5rem", color: "rgba(201,106,66,0.06)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
              "
            </span>

            {/* Stars */}
            <Stars rating={r.rating} />

            {/* Review text */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "var(--bark)", lineHeight: 1.75, flex: 1, margin: 0, position: "relative" }}>
              {r.text}
            </p>

            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 12, borderTop: "1px solid var(--cream-deeper)" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: r.avatarBg, color: r.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 800, flexShrink: 0, border: "2px solid rgba(255,255,255,0.8)" }}>
                {r.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", fontWeight: 700, color: "var(--espresso)", margin: 0 }}>{r.name}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.76rem", color: "var(--mist)", margin: 0 }}>{r.location}</p>
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "#4a7c59", fontWeight: 700, background: "rgba(74,124,89,0.1)", border: "1px solid rgba(74,124,89,0.2)", padding: "3px 10px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }}>
                ✓ Verified
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;