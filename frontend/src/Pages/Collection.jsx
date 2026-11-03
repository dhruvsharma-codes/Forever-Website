// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { assets } from "../assets/assets";
// import Title from "../Components/Title";
// import Item from "../Components/Item";
// import { motion, AnimatePresence } from "framer-motion";

// const Collection = () => {
//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relevant");

//   const toggleCategory = (e) => {
//     const val = e.target.value;
//     setCategory((prev) =>
//       prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
//     );
//   };
//   const toggleSubCategory = (e) => {
//     const val = e.target.value;
//     setSubCategory((prev) =>
//       prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
//     );
//   };

//   const applyFilter = () => {
//     let copy = products.slice();
//     if (showSearch && search)
//       copy = copy.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase()),
//       );
//     if (category.length > 0)
//       copy = copy.filter((item) => category.includes(item.category));
//     if (subCategory.length > 0)
//       copy = copy.filter((item) => subCategory.includes(item.subCategory));
//     setFilterProducts(copy);
//   };

//   const sortProduct = () => {
//     const copy = filterProducts.slice();
//     switch (sortType) {
//       case "low-high":
//         setFilterProducts(copy.sort((a, b) => a.price - b.price));
//         break;
//       case "high-low":
//         setFilterProducts(copy.sort((a, b) => b.price - a.price));
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, search, showSearch, products]);
//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);

//   return (
//     <>
//       <style>{`
//                 .col-page { padding-top:2.5rem; border-top:2px solid #EDD8C4; }
//                 .filter-sidebar { min-width:220px; max-width:220px; }
//                 .filter-toggle { display:flex; align-items:center; gap:10px; cursor:pointer; color:#7A4A38; font-size:0.78rem; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:8px; user-select:none; border:none; background:none; font-family:inherit; padding:0; }
//                 .filter-toggle img { height:12px; filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%); transition:transform 0.3s; }
//                 .filter-toggle img.open { transform:rotate(90deg); }
//                 .filter-panel { background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:14px; padding:18px 18px 14px; margin-bottom:12px; box-shadow:0 2px 10px rgba(61,35,24,0.05); }
//                 .filter-title { color:#C96A42; font-size:0.68rem; letter-spacing:0.2em; font-weight:800; text-transform:uppercase; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #EDD8C4; }
//                 .filter-opt { display:flex; align-items:center; gap:10px; padding:7px 0; cursor:pointer; color:#7A4A38; font-size:0.84rem; font-weight:500; transition:color 0.2s; }
//                 .filter-opt:hover { color:#C96A42; }
//                 .filter-opt input[type="checkbox"] { appearance:none; -webkit-appearance:none; width:16px; height:16px; border:2px solid #EDD8C4; border-radius:4px; background:#F7EFE6; cursor:pointer; transition:border-color 0.2s, background 0.2s; flex-shrink:0; position:relative; }
//                 .filter-opt input[type="checkbox"]:checked { border-color:#C96A42; background:#C96A42; }
//                 .filter-opt input[type="checkbox"]:checked::after { content:'✓'; position:absolute; color:white; font-size:10px; top:-1px; left:2px; }
//                 .sort-sel { appearance:none; background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:50px; padding:9px 36px 9px 16px; font-size:0.78rem; color:#7A4A38; font-weight:600; letter-spacing:0.04em; cursor:pointer; outline:none; transition:border-color 0.25s; font-family:inherit; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C96A42' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; }
//                 .sort-sel:focus { border-color:#C96A42; }
//                 .filter-tag { background:#EDD8C4; color:#7A4A38; font-size:0.72rem; font-weight:700; padding:4px 12px; border-radius:50px; letter-spacing:0.06em; cursor:pointer; transition:background 0.2s; }
//                 .filter-tag:hover { background:#C96A42; color:#F7EFE6; }
//             `}</style>

//       <div className="col-page flex flex-col gap-1 sm:flex-row sm:gap-10">
//         {/* SIDEBAR */}
//         <div className="filter-sidebar">
//           <button
//             onClick={() => setShowFilter(!showFilter)}
//             className="filter-toggle"
//           >
//             Filters
//             <img
//               src={assets.dropdown_icon}
//               alt="toggle"
//               className={`sm:hidden ${showFilter ? "open" : ""}`}
//             />
//           </button>

//           <AnimatePresence>
//             {(showFilter || window.innerWidth >= 640) && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.28 }}
//                 className="sm:block"
//               >
//                 <div className="filter-panel">
//                   <p className="filter-title">Category</p>
//                   {["Men", "Women", "Kids"].map((cat) => (
//                     <label key={cat} className="filter-opt">
//                       <input
//                         type="checkbox"
//                         value={cat}
//                         onChange={toggleCategory}
//                         checked={category.includes(cat)}
//                       />
//                       {cat}
//                     </label>
//                   ))}
//                 </div>
//                 <div className="filter-panel">
//                   <p className="filter-title">Type</p>
//                   {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
//                     <label key={sub} className="filter-opt">
//                       <input
//                         type="checkbox"
//                         value={sub}
//                         onChange={toggleSubCategory}
//                         checked={subCategory.includes(sub)}
//                       />
//                       {sub}
//                     </label>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* PRODUCTS */}
//         <div className="flex-1">
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               marginBottom: 20,
//             }}
//           >
//             <Title text1="ALL" text2="COLLECTIONS" />
//             <select
//               onChange={(e) => setSortType(e.target.value)}
//               className="sort-sel"
//             >
//               <option value="relevant">Sort: Relevant</option>
//               <option value="low-high">Price: Low → High</option>
//               <option value="high-low">Price: High → Low</option>
//             </select>
//           </div>

//           {/* Active filter tags */}
//           <AnimatePresence>
//             {(category.length > 0 || subCategory.length > 0) && (
//               <motion.div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: 8,
//                   marginBottom: 16,
//                 }}
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//               >
//                 {[...category, ...subCategory].map((tag) => (
//                   <span key={tag} className="filter-tag">
//                     ✕ {tag}
//                   </span>
//                 ))}
//                 <button
//                   onClick={() => {
//                     setCategory([]);
//                     setSubCategory([]);
//                   }}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     color: "#C96A42",
//                     fontSize: "0.72rem",
//                     fontWeight: 700,
//                     cursor: "pointer",
//                     fontFamily: "inherit",
//                   }}
//                 >
//                   Clear all
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <p
//             style={{
//               fontSize: "0.78rem",
//               color: "#98A98E",
//               letterSpacing: "0.04em",
//               marginBottom: 16,
//             }}
//           >
//             Showing{" "}
//             <span style={{ color: "#C96A42", fontWeight: 700 }}>
//               {filterProducts.length}
//             </span>{" "}
//             products
//           </p>

//           {filterProducts.length > 0 ? (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
//                 gap: "1rem",
//               }}
//             >
//               {filterProducts.map((item, index) => (
//                 <motion.div
//                   key={item._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     delay: Math.min(index * 0.04, 0.4),
//                     duration: 0.4,
//                   }}
//                 >
//                   <Item
//                     id={item._id}
//                     image={item.image}
//                     name={item.name}
//                     price={item.price}
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               style={{
//                 textAlign: "center",
//                 padding: "4rem 2rem",
//                 color: "#98A98E",
//               }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>◎</div>
//               <p style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>
//                 No products match your filters.
//                 <br />
//                 Try adjusting your selection.
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Collection;
















// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { assets } from "../assets/assets";
// import Title from "../Components/Title";
// import Item from "../Components/Item";
// import { motion, AnimatePresence } from "framer-motion";


// const Collection = () => {
//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relevant");

//   const toggleCategory = (val) =>
//     setCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);

//   const toggleSubCategory = (val) =>
//     setSubCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);

//   const applyFilter = () => {
//     let copy = [...products];
//     if (showSearch && search)
//       copy = copy.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
//     if (category.length > 0)
//       copy = copy.filter(p => category.includes(p.category));
//     if (subCategory.length > 0)
//       copy = copy.filter(p => subCategory.includes(p.subCategory));
//     setFilterProducts(copy);
//   };

//   const sortProduct = () => {
//     const copy = [...filterProducts];
//     if (sortType === "low-high") setFilterProducts(copy.sort((a, b) => a.price - b.price));
//     else if (sortType === "high-low") setFilterProducts(copy.sort((a, b) => b.price - a.price));
//     else applyFilter();
//   };

//   useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch, products]);
//   useEffect(() => { sortProduct(); }, [sortType]);

//   const clearAll = () => { setCategory([]); setSubCategory([]); };

//   return (
//     <>
//       <style>{`
//         .col-page { padding-top: 2.5rem; border-top: 2px solid var(--cream-deeper); }

//         /* Sidebar */
//         .col-sidebar { min-width: 220px; max-width: 220px; }
//         @media (max-width: 640px) { .col-sidebar { min-width: 100%; max-width: 100%; } }

//         .filter-toggle-btn {
//           display: flex; align-items: center; gap: 10px;
//           cursor: pointer; background: none; border: none;
//           font-family: var(--font-body); font-size: 0.75rem; font-weight: 700;
//           letter-spacing: 0.16em; text-transform: uppercase; color: var(--espresso);
//           padding: 0; margin-bottom: 10px;
//         }
//         .filter-toggle-btn:hover { color: var(--terra); }

//         .filter-card {
//           background: var(--cream);
//           border: 1.5px solid var(--cream-deeper);
//           border-radius: var(--radius-lg);
//           padding: 18px 20px 14px;
//           margin-bottom: 12px;
//           box-shadow: var(--shadow-sm);
//         }
//         .filter-section-title {
//           font-family: var(--font-body);
//           font-size: 0.68rem;
//           font-weight: 700;
//           letter-spacing: 0.18em;
//           text-transform: uppercase;
//           color: var(--terra);
//           margin: 0 0 14px;
//           padding-bottom: 10px;
//           border-bottom: 1px solid var(--cream-deeper);
//         }
//         .filter-opt {
//           display: flex; align-items: center; gap: 10px;
//           padding: 7px 0; cursor: pointer;
//           font-family: var(--font-body); color: var(--bark);
//           font-size: 0.86rem; font-weight: 400;
//           transition: color 0.18s;
//           user-select: none;
//         }
//         .filter-opt:hover { color: var(--terra); }

//         /* Custom checkbox */
//         .filter-checkbox {
//           appearance: none; -webkit-appearance: none;
//           width: 17px; height: 17px;
//           border: 2px solid var(--sand);
//           border-radius: 4px;
//           background: var(--cream);
//           cursor: pointer;
//           transition: all 0.18s;
//           flex-shrink: 0;
//           position: relative;
//         }
//         .filter-checkbox:checked {
//           border-color: var(--terra);
//           background: var(--terra);
//         }
//         .filter-checkbox:checked::after {
//           content: '';
//           position: absolute;
//           left: 4px; top: 2px;
//           width: 5px; height: 9px;
//           border: 2px solid white;
//           border-top: none; border-left: none;
//           transform: rotate(45deg);
//         }

//         /* Sort select */
//         .sort-select {
//           appearance: none;
//           background: var(--cream);
//           border: 1.5px solid var(--cream-deeper);
//           border-radius: var(--radius-full);
//           padding: 9px 36px 9px 16px;
//           font-family: var(--font-body);
//           font-size: 0.8rem;
//           color: var(--bark);
//           font-weight: 600;
//           cursor: pointer;
//           outline: none;
//           transition: border-color 0.18s, box-shadow 0.18s;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C96A42' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 14px center;
//         }
//         .sort-select:focus {
//           border-color: var(--terra);
//           box-shadow: 0 0 0 3px rgba(201,106,66,0.1);
//         }

//         /* Active filter tag */
//         .filter-tag {
//           display: inline-flex; align-items: center; gap: 5px;
//           background: rgba(201,106,66,0.08);
//           border: 1px solid rgba(201,106,66,0.22);
//           color: var(--terra);
//           font-family: var(--font-body);
//           font-size: 0.72rem; font-weight: 700;
//           padding: 4px 12px;
//           border-radius: var(--radius-full);
//           cursor: pointer;
//           transition: background 0.18s;
//         }
//         .filter-tag:hover { background: rgba(201,106,66,0.14); }
//       `}</style>

//       <div className="col-page flex flex-col gap-1 sm:flex-row sm:gap-10">

//         {/* ── SIDEBAR ── */}
//         <div className="col-sidebar">
//           <button
//             onClick={() => setShowFilter(!showFilter)}
//             className="filter-toggle-btn"
//           >
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
//             </svg>
//             Filters
//             <motion.svg
//               animate={{ rotate: showFilter ? 180 : 0 }}
//               transition={{ duration: 0.25 }}
//               className="sm:hidden"
//               width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
//             >
//               <polyline points="6 9 12 15 18 9"/>
//             </motion.svg>
//           </button>

//           <AnimatePresence>
//             {(showFilter || (typeof window !== 'undefined' && window.innerWidth >= 640)) && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.28 }}
//                 className="sm:block"
//               >
//                 {/* Category filter */}
//                 <div className="filter-card">
//                   <p className="filter-section-title">Category</p>
//                   {["Men", "Women", "Kids"].map(cat => (
//                     <label key={cat} className="filter-opt">
//                       <input
//                         type="checkbox"
//                         className="filter-checkbox"
//                         value={cat}
//                         checked={category.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                       />
//                       {cat}
//                     </label>
//                   ))}
//                 </div>

//                 {/* Type filter */}
//                 <div className="filter-card">
//                   <p className="filter-section-title">Type</p>
//                   {["Topwear", "Bottomwear", "Winterwear"].map(sub => (
//                     <label key={sub} className="filter-opt">
//                       <input
//                         type="checkbox"
//                         className="filter-checkbox"
//                         value={sub}
//                         checked={subCategory.includes(sub)}
//                         onChange={() => toggleSubCategory(sub)}
//                       />
//                       {sub}
//                     </label>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* ── PRODUCTS ── */}
//         <div className="flex-1 min-w-0">
//           {/* Toolbar */}
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
//             <Title text1="ALL" text2="COLLECTIONS" />
//             <select className="sort-select" value={sortType} onChange={e => setSortType(e.target.value)}>
//               <option value="relevant">Sort: Relevant</option>
//               <option value="low-high">Price: Low → High</option>
//               <option value="high-low">Price: High → Low</option>
//             </select>
//           </div>

//           {/* Active filter tags */}
//           <AnimatePresence>
//             {(category.length > 0 || subCategory.length > 0) && (
//               <motion.div
//                 style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, alignItems: 'center' }}
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//               >
//                 {[...category, ...subCategory].map(tag => (
//                   <span
//                     key={tag}
//                     className="filter-tag"
//                     onClick={() => {
//                       if (category.includes(tag)) setCategory(prev => prev.filter(i => i !== tag));
//                       else setSubCategory(prev => prev.filter(i => i !== tag));
//                     }}
//                   >
//                     ✕ {tag}
//                   </span>
//                 ))}
//                 <button onClick={clearAll} style={{
//                   fontFamily: 'var(--font-body)', background: 'none', border: 'none',
//                   color: 'var(--mist)', fontSize: '0.76rem', cursor: 'pointer', fontWeight: 600,
//                 }}>
//                   Clear all
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Count */}
//           <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--mist)', marginBottom: 18 }}>
//             Showing <span style={{ color: 'var(--terra)', fontWeight: 700 }}>{filterProducts.length}</span> products
//           </p>

//           {/* Grid */}
//           {filterProducts.length > 0 ? (
//             <div className="products-grid">
//               {filterProducts.map((item, i) => (
//                 <motion.div
//                   key={item._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: Math.min(i * 0.04, 0.36), duration: 0.4 }}
//                 >
//                   <Item id={item._id} image={item.image} name={item.name} price={item.price} />
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--mist)' }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.35 }}>🔍</div>
//               <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--espresso)', marginBottom: 8, fontWeight: 600 }}>
//                 No products found
//               </h3>
//               <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.65 }}>
//                 Try adjusting or clearing your filters.
//               </p>
//               {(category.length > 0 || subCategory.length > 0) && (
//                 <motion.button
//                   onClick={clearAll}
//                   className="btn-terra"
//                   style={{ marginTop: 20 }}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   Clear Filters
//                 </motion.button>
//               )}
//             </motion.div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// };

// export default Collection;





























































































import React, { useContext, useMemo, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import Item from "../Components/Item";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];
const CATS = ["Men", "Women", "Kids"], TYPES = ["Topwear", "Bottomwear", "Winterwear"];

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState([]);
  const [type, setType] = useState([]);
  const [sort, setSort] = useState("relevant");

  const toggle = (set, v) => set(p => (p.includes(v) ? p.filter(i => i !== v) : [...p, v]));

  // one derived list: filters and sort always apply together
  const list = useMemo(() => {
    let r = products.filter(p =>
      (!cat.length || cat.includes(p.category)) &&
      (!type.length || type.includes(p.subCategory)) &&
      (!(showSearch && search) || p.name.toLowerCase().includes(search.toLowerCase())));
    if (sort === "low-high") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high-low") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [products, cat, type, sort, search, showSearch]);

  const active = [...cat.map(v => [v, () => toggle(setCat, v)]), ...type.map(v => [v, () => toggle(setType, v)])];
  const clear = () => { setCat([]); setType([]); };

  const Group = ({ title, opts, sel, set }) => (
    <div className="cf-card">
      <p className="cf-h">{title}</p>
      {opts.map(o => (
        <label key={o} className="cf-opt">
          <input type="checkbox" checked={sel.includes(o)} onChange={() => toggle(set, o)} />
          <span className="cf-box" />{o}
        </label>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        .cf-wrap{display:grid;grid-template-columns:240px 1fr;gap:2.5rem;padding-top:2.5rem;align-items:start}
        @media(max-width:760px){.cf-wrap{grid-template-columns:1fr;gap:1rem}.cf-side{display:var(--side,none)}.cf-tog{display:flex!important}}
        .cf-tog{display:none;align-items:center;gap:8px;border:1.5px solid var(--cream-deeper);background:#fff;border-radius:999px;padding:10px 18px;font:700 .76rem var(--font-body);letter-spacing:.1em;text-transform:uppercase;color:var(--espresso);cursor:pointer;width:fit-content}
        .cf-side{position:sticky;top:96px}
        .cf-card{background:#fff;border:1px solid var(--cream-deeper);border-radius:var(--radius-lg);padding:18px 20px;margin-bottom:14px;box-shadow:var(--shadow-sm)}
        .cf-h{margin:0 0 12px;font:800 .68rem var(--font-body);letter-spacing:.18em;text-transform:uppercase;color:var(--terra)}
        .cf-opt{display:flex;align-items:center;gap:12px;padding:8px 0;cursor:pointer;color:var(--bark);font-size:.9rem;transition:color .2s}
        .cf-opt:hover{color:var(--terra)}.cf-opt input{position:absolute;opacity:0}
        .cf-box{width:19px;height:19px;border:2px solid var(--sand);border-radius:6px;display:grid;place-items:center;transition:all .25s var(--ease);flex-shrink:0}
        .cf-opt input:checked+.cf-box{background:var(--terra);border-color:var(--terra);transform:scale(1.08)}
        .cf-opt input:checked+.cf-box::after{content:'';width:5px;height:9px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg) translate(-1px,-1px)}
        .cf-opt input:focus-visible+.cf-box{outline:2px solid var(--terra);outline-offset:2px}
        .cf-sort{appearance:none;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C2562E' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 16px center;border:1.5px solid var(--cream-deeper);border-radius:999px;padding:10px 38px 10px 18px;font:600 .8rem var(--font-body);color:var(--bark);cursor:pointer;outline:0}
        .cf-sort:focus{border-color:var(--terra);box-shadow:0 0 0 4px rgba(194,86,46,.12)}
        .cf-tag{display:inline-flex;align-items:center;gap:6px;border:0;background:rgba(194,86,46,.09);color:var(--terra);font:700 .72rem var(--font-body);padding:6px 13px;border-radius:999px;cursor:pointer}
      `}</style>

      <div className="cf-wrap" style={{ borderTop: "2px solid var(--cream-deeper)", "--side": open ? "block" : "none" }}>
        <div>
          <button className="cf-tog" onClick={() => setOpen(o => !o)} aria-expanded={open}>Filters {active.length > 0 && `(${active.length})`}</button>
          <aside className="cf-side" style={{ marginTop: 0 }}>
            <Group title="Category" opts={CATS} sel={cat} set={setCat} />
            <Group title="Type" opts={TYPES} sel={type} set={setType} />
          </aside>
        </div>

        <main style={{ minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
            <Title text1="ALL" text2="COLLECTIONS" />
            <select className="cf-sort" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products">
              <option value="relevant">Sort: Relevant</option>
              <option value="low-high">Price: Low to high</option>
              <option value="high-low">Price: High to low</option>
            </select>
          </div>

          <AnimatePresence>
            {active.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14, alignItems: "center", overflow: "hidden" }}>
                {active.map(([t, off]) => <motion.button layout key={t} className="cf-tag" onClick={off} initial={{ scale: 0.7 }} animate={{ scale: 1 }}>{t} ✕</motion.button>)}
                <button onClick={clear} style={{ border: 0, background: "none", color: "var(--mist)", font: "600 .76rem var(--font-body)", cursor: "pointer" }}>Clear all</button>
              </motion.div>
            )}
          </AnimatePresence>

          <p style={{ margin: "0 0 18px", fontSize: ".8rem", color: "var(--mist)" }}>
            Showing <b style={{ color: "var(--terra)" }}>{list.length}</b> {list.length === 1 ? "product" : "products"}
          </p>

          {list.length ? (
            <motion.div layout className="products-grid">
              <AnimatePresence mode="popLayout">
                {list.map((it, i) => (
                  <motion.div layout key={it._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.55, ease }}>
                    <Item id={it._id} image={it.image} name={it.name} price={it.price} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div style={{ textAlign: "center", padding: "5rem 1rem", color: "var(--mist)" }}>
              <div className="floaty" style={{ fontSize: "3rem" }}>🔍</div>
              <h3 style={{ font: "600 1.5rem var(--font-display)", color: "var(--espresso)", margin: "10px 0 6px" }}>No matches</h3>
              <p style={{ margin: "0 0 20px", fontSize: ".9rem" }}>Try removing a filter or searching for something else.</p>
              {active.length > 0 && <button className="btn-terra" onClick={clear} style={{ border: 0 }}>Clear filters</button>}
            </div>
          )}
        </main>
      </div>
    </>
  );
};
export default Collection;