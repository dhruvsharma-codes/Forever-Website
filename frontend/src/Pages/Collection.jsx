import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import Item from "../Components/Item";
import { motion, AnimatePresence } from "framer-motion";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
    );
  };
  const toggleSubCategory = (e) => {
    const val = e.target.value;
    setSubCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
    );
  };

  const applyFilter = () => {
    let copy = products.slice();
    if (showSearch && search)
      copy = copy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    if (category.length > 0)
      copy = copy.filter((item) => category.includes(item.category));
    if (subCategory.length > 0)
      copy = copy.filter((item) => subCategory.includes(item.subCategory));
    setFilterProducts(copy);
  };

  const sortProduct = () => {
    const copy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(copy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(copy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      <style>{`
                .col-page { padding-top:2.5rem; border-top:2px solid #EDD8C4; }
                .filter-sidebar { min-width:220px; max-width:220px; }
                .filter-toggle { display:flex; align-items:center; gap:10px; cursor:pointer; color:#7A4A38; font-size:0.78rem; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:8px; user-select:none; border:none; background:none; font-family:inherit; padding:0; }
                .filter-toggle img { height:12px; filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%); transition:transform 0.3s; }
                .filter-toggle img.open { transform:rotate(90deg); }
                .filter-panel { background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:14px; padding:18px 18px 14px; margin-bottom:12px; box-shadow:0 2px 10px rgba(61,35,24,0.05); }
                .filter-title { color:#C96A42; font-size:0.68rem; letter-spacing:0.2em; font-weight:800; text-transform:uppercase; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #EDD8C4; }
                .filter-opt { display:flex; align-items:center; gap:10px; padding:7px 0; cursor:pointer; color:#7A4A38; font-size:0.84rem; font-weight:500; transition:color 0.2s; }
                .filter-opt:hover { color:#C96A42; }
                .filter-opt input[type="checkbox"] { appearance:none; -webkit-appearance:none; width:16px; height:16px; border:2px solid #EDD8C4; border-radius:4px; background:#F7EFE6; cursor:pointer; transition:border-color 0.2s, background 0.2s; flex-shrink:0; position:relative; }
                .filter-opt input[type="checkbox"]:checked { border-color:#C96A42; background:#C96A42; }
                .filter-opt input[type="checkbox"]:checked::after { content:'✓'; position:absolute; color:white; font-size:10px; top:-1px; left:2px; }
                .sort-sel { appearance:none; background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:50px; padding:9px 36px 9px 16px; font-size:0.78rem; color:#7A4A38; font-weight:600; letter-spacing:0.04em; cursor:pointer; outline:none; transition:border-color 0.25s; font-family:inherit; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C96A42' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; }
                .sort-sel:focus { border-color:#C96A42; }
                .filter-tag { background:#EDD8C4; color:#7A4A38; font-size:0.72rem; font-weight:700; padding:4px 12px; border-radius:50px; letter-spacing:0.06em; cursor:pointer; transition:background 0.2s; }
                .filter-tag:hover { background:#C96A42; color:#F7EFE6; }
            `}</style>

      <div className="col-page flex flex-col gap-1 sm:flex-row sm:gap-10">
        {/* SIDEBAR */}
        <div className="filter-sidebar">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="filter-toggle"
          >
            Filters
            <img
              src={assets.dropdown_icon}
              alt="toggle"
              className={`sm:hidden ${showFilter ? "open" : ""}`}
            />
          </button>

          <AnimatePresence>
            {(showFilter || window.innerWidth >= 640) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28 }}
                className="sm:block"
              >
                <div className="filter-panel">
                  <p className="filter-title">Category</p>
                  {["Men", "Women", "Kids"].map((cat) => (
                    <label key={cat} className="filter-opt">
                      <input
                        type="checkbox"
                        value={cat}
                        onChange={toggleCategory}
                        checked={category.includes(cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
                <div className="filter-panel">
                  <p className="filter-title">Type</p>
                  {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                    <label key={sub} className="filter-opt">
                      <input
                        type="checkbox"
                        value={sub}
                        onChange={toggleSubCategory}
                        checked={subCategory.includes(sub)}
                      />
                      {sub}
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PRODUCTS */}
        <div className="flex-1">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="sort-sel"
            >
              <option value="relevant">Sort: Relevant</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </div>

          {/* Active filter tags */}
          <AnimatePresence>
            {(category.length > 0 || subCategory.length > 0) && (
              <motion.div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 16,
                }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {[...category, ...subCategory].map((tag) => (
                  <span key={tag} className="filter-tag">
                    ✕ {tag}
                  </span>
                ))}
                <button
                  onClick={() => {
                    setCategory([]);
                    setSubCategory([]);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#C96A42",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p
            style={{
              fontSize: "0.78rem",
              color: "#98A98E",
              letterSpacing: "0.04em",
              marginBottom: 16,
            }}
          >
            Showing{" "}
            <span style={{ color: "#C96A42", fontWeight: 700 }}>
              {filterProducts.length}
            </span>{" "}
            products
          </p>

          {filterProducts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
                gap: "1rem",
              }}
            >
              {filterProducts.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Math.min(index * 0.04, 0.4),
                    duration: 0.4,
                  }}
                >
                  <Item
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "#98A98E",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>◎</div>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>
                No products match your filters.
                <br />
                Try adjusting your selection.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Collection;











