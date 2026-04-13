import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          style={{
            background: "#F7EFE6",
            borderTop: "1px solid #EDD8C4",
            borderBottom: "2px solid #EDD8C4",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: "55%",
              maxWidth: 480,
              background: "#F7EFE6",
              border: "1.5px solid #EDD8C4",
              borderRadius: 50,
              padding: "9px 16px",
              gap: 10,
              boxShadow: "0 2px 8px rgba(61,35,24,0.06)",
              transition: "border-color 0.25s, box-shadow 0.25s",
            }}
            whileFocusWithin={{
              borderColor: "#C96A42",
              boxShadow: "0 4px 16px rgba(201,106,66,0.16)",
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search products..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.85rem",
                color: "#3D2318",
                fontFamily: "inherit",
              }}
              autoFocus
            />
            <img
              src={assets.search_icon}
              alt="search"
              style={{
                width: 16,
                filter:
                  "invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%)",
                flexShrink: 0,
              }}
            />
          </motion.div>

          <motion.button
            onClick={() => setShowSearch(false)}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#EDD8C4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
              flexShrink: 0,
            }}
            whileHover={{ background: "#C96A42", rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={assets.cross_icon}
              alt="close"
              style={{
                width: 10,
                filter:
                  "invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%)",
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
