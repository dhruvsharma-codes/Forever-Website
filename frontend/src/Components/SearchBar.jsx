// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { assets } from "../assets/assets";
// import { useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const SearchBar = () => {
//   const { search, setSearch, showSearch, setShowSearch } =
//     useContext(ShopContext);
//   const [visible, setVisible] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     setVisible(location.pathname.includes("collection"));
//   }, [location]);

//   return (
//     <AnimatePresence>
//       {showSearch && visible && (
//         <motion.div
//           style={{
//             background: "#F7EFE6",
//             borderTop: "1px solid #EDD8C4",
//             borderBottom: "2px solid #EDD8C4",
//             padding: "14px 20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 12,
//           }}
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <motion.div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               width: "55%",
//               maxWidth: 480,
//               background: "#F7EFE6",
//               border: "1.5px solid #EDD8C4",
//               borderRadius: 50,
//               padding: "9px 16px",
//               gap: 10,
//               boxShadow: "0 2px 8px rgba(61,35,24,0.06)",
//               transition: "border-color 0.25s, box-shadow 0.25s",
//             }}
//             whileFocusWithin={{
//               borderColor: "#C96A42",
//               boxShadow: "0 4px 16px rgba(201,106,66,0.16)",
//             }}
//           >
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               type="text"
//               placeholder="Search products..."
//               style={{
//                 flex: 1,
//                 background: "transparent",
//                 border: "none",
//                 outline: "none",
//                 fontSize: "0.85rem",
//                 color: "#3D2318",
//                 fontFamily: "inherit",
//               }}
//               autoFocus
//             />
//             <img
//               src={assets.search_icon}
//               alt="search"
//               style={{
//                 width: 16,
//                 filter:
//                   "invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%)",
//                 flexShrink: 0,
//               }}
//             />
//           </motion.div>

//           <motion.button
//             onClick={() => setShowSearch(false)}
//             style={{
//               width: 32,
//               height: 32,
//               borderRadius: "50%",
//               background: "#EDD8C4",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               border: "none",
//               flexShrink: 0,
//             }}
//             whileHover={{ background: "#C96A42", rotate: 90 }}
//             whileTap={{ scale: 0.9 }}
//             transition={{ duration: 0.2 }}
//           >
//             <img
//               src={assets.cross_icon}
//               alt="close"
//               style={{
//                 width: 10,
//                 filter:
//                   "invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%)",
//               }}
//             />
//           </motion.button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SearchBar;









import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  useEffect(() => {
    if (showSearch && visible) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showSearch, visible]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          style={{
            background: "rgba(250,247,242,0.95)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            borderBottom: "1px solid var(--cream-deeper)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            boxShadow: "0 4px 20px rgba(44,24,16,0.06)",
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          {/* Search input wrapper */}
          <motion.div
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: "55%",
              maxWidth: 500,
              background: "white",
              border: "1.5px solid var(--cream-deeper)",
              borderRadius: "var(--radius-full)",
              padding: "10px 18px",
              gap: 10,
              boxShadow: "var(--shadow-sm)",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            whileFocusWithin={{
              borderColor: "var(--terra)",
              boxShadow: "0 0 0 3px rgba(201,106,66,0.1), var(--shadow-sm)",
            }}
          >
            {/* Search icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              ref={inputRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
              placeholder="Search products, styles, categories…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-body)",
                fontSize: "0.88rem",
                color: "var(--espresso)",
                minWidth: 0,
              }}
            />

            {/* Clear */}
            <AnimatePresence>
              {search && (
                <motion.button
                  onClick={() => setSearch("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--mist)", display: "flex", padding: 2, borderRadius: "50%", flexShrink: 0 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ color: "var(--terra)", background: "rgba(201,106,66,0.1)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Close button */}
          <motion.button
            onClick={() => setShowSearch(false)}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "var(--cream-dark)",
              border: "1.5px solid var(--cream-deeper)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
              color: "var(--bark)",
            }}
            whileHover={{ background: "var(--terra)", borderColor: "var(--terra)", color: "white" }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.18 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;