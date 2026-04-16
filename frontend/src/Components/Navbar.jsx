// import React, { useState, useEffect, useRef } from "react";
// import { assets } from "../assets/assets";
// import { Link, NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { motion, AnimatePresence } from "framer-motion";
// import OrderTracker from "./OrderTracker";

// const SparkleIcon = () => (
//   <svg
//     width="11"
//     height="11"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }}
//   >
//     <path
//       d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174";

// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [trackerOpen, setTrackerOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const {
//     setShowSearch,
//     getCartCount,
//     navigate,
//     token,
//     setToken,
//     setCartItems,
//   } = useContext(ShopContext);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (!token) setDropdownOpen(false);
//   }, [token]);

//   const logout = () => {
//     setDropdownOpen(false);
//     navigate("/login");
//     localStorage.removeItem("token");
//     setToken("");
//     setCartItems({});
//   };

//   const handleProfileClick = () => {
//     if (!token) navigate("/login");
//     else setDropdownOpen((prev) => !prev);
//   };

//   const openAdminPanel = () => {
//     setDropdownOpen(false);
//     window.open(ADMIN_URL, "_blank", "noopener,noreferrer");
//   };

//   const openTracker = () => {
//     setDropdownOpen(false);
//     setTrackerOpen(true);
//   };

//   const navLinks = [
//     { path: "/", label: "HOME", ai: false },
//     { path: "/collection", label: "COLLECTION", ai: false },
//     { path: "/about", label: "ABOUT", ai: false },
//     { path: "/contact", label: "CONTACT", ai: false },
//     { path: "/ai-recommendations", label: "AI PICKS", ai: true },
//   ];

//   // All dropdown items with Order Tracker included
//   const dropdownItems = [
//     {
//       label: "My Profile",
//       onClick: () => {
//         setDropdownOpen(false);
//         navigate("/profile");
//       },
//       icon: (
//         <svg
//           width="15"
//           height="15"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//           <circle cx="12" cy="7" r="4" />
//         </svg>
//       ),
//     },
//     {
//       label: "Orders",
//       onClick: () => {
//         setDropdownOpen(false);
//         navigate("/orders");
//       },
//       icon: (
//         <svg
//           width="15"
//           height="15"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//           <line x1="3" y1="6" x2="21" y2="6" />
//           <path d="M16 10a4 4 0 0 1-8 0" />
//         </svg>
//       ),
//     },
//     {
//       label: "Order Tracker",
//       onClick: openTracker,
//       isTracker: true,
//       icon: (
//         <svg
//           width="15"
//           height="15"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="12" cy="12" r="10" />
//           <polyline points="12 6 12 12 16 14" />
//         </svg>
//       ),
//     },
//     {
//       label: "AI Picks",
//       onClick: () => {
//         setDropdownOpen(false);
//         navigate("/ai-recommendations");
//       },
//       icon: (
//         <svg
//           width="15"
//           height="15"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//         </svg>
//       ),
//     },
//     {
//       label: "Admin Panel",
//       onClick: openAdminPanel,
//       isAdmin: true,
//       icon: (
//         <svg
//           width="15"
//           height="15"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="3" y="3" width="7" height="7" />
//           <rect x="14" y="3" width="7" height="7" />
//           <rect x="14" y="14" width="7" height="7" />
//           <rect x="3" y="14" width="7" height="7" />
//         </svg>
//       ),
//     },
//     {
//       label: "Logout",
//       onClick: logout,
//       isDanger: true,
//       icon: (
//         <svg
//           width="15"
//           height="15"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//           <polyline points="16 17 21 12 16 7" />
//           <line x1="21" y1="12" x2="9" y2="12" />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <>
//       <style>{`
//                 :root{--clr-cream:#F7EFE6;--clr-sand:#EDD8C4;--clr-terra:#C96A42;--clr-terra-dk:#A3512F;--clr-brown:#7A4A38;--clr-deep:#3D2318;--clr-sage:#98A98E;}
//                 .nb-root{background:var(--clr-cream);border-bottom:2px solid var(--clr-sand);padding:0 2.5rem;position:sticky;top:0;z-index:200;transition:box-shadow 0.3s,background 0.3s;}
//                 .nb-root.nb-scrolled{box-shadow:0 4px 20px rgba(61,35,24,0.12);background:rgba(247,239,230,0.97);backdrop-filter:blur(80px);}
//                 .nb-inner{display:flex;align-items:center;justify-content:space-between;padding:1rem 0;}
//                 .nb-menu{display:none;gap:1.8rem;list-style:none;margin:0;padding:0;}
//                 @media(min-width:640px){.nb-menu{display:flex;}}
//                 .nb-link{font-size:0.7rem;letter-spacing:0.12em;font-weight:700;color:var(--clr-brown);text-decoration:none;position:relative;padding-bottom:4px;transition:color 0.25s;white-space:nowrap;}
//                 .nb-link::after{content:'';position:absolute;bottom:0;left:50%;right:50%;height:2px;background:var(--clr-terra);border-radius:2px;transition:left 0.3s ease,right 0.3s ease;}
//                 .nb-link:hover,.nb-link.active{color:var(--clr-terra);}
//                 .nb-link:hover::after,.nb-link.active::after{left:0;right:0;}
//                 .nb-link-ai{font-size:0.68rem;letter-spacing:0.1em;font-weight:700;text-decoration:none;white-space:nowrap;background:linear-gradient(135deg,#3D2318,#7A4A38);color:#F7EFE6;padding:5px 12px;border-radius:20px;transition:box-shadow 0.25s,transform 0.2s;display:inline-flex;align-items:center;gap:3px;box-shadow:0 2px 10px rgba(61,35,24,0.22);}
//                 .nb-link-ai:hover{box-shadow:0 4px 18px rgba(61,35,24,0.38);transform:translateY(-1px);}
//                 .nb-link-ai.active{background:linear-gradient(135deg,#C96A42,#7A4A38);}
//                 .nb-actions{display:flex;align-items:center;gap:1.4rem;}
//                 .nb-icon-btn{background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;position:relative;}
//                 .nb-icon{width:20px;height:20px;filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%);transition:filter 0.2s,transform 0.2s;}
//                 .nb-icon-btn:hover .nb-icon,.nb-profile-btn.is-open .nb-icon{filter:invert(40%) sepia(50%) saturate(600%) hue-rotate(330deg) brightness(85%);transform:scale(1.12);}
//                 .nb-cart-wrap{position:relative;}
//                 .nb-cart-badge{position:absolute;right:-6px;bottom:-6px;width:17px;height:17px;background:var(--clr-terra);color:var(--clr-cream);font-size:8px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;}

//                 /* Dropdown */
//                 .nb-dropdown{position:absolute;right:0;top:calc(100% + 14px);background:var(--clr-cream);border:1.5px solid var(--clr-sand);box-shadow:0 16px 40px rgba(61,35,24,0.18);border-radius:16px;overflow:hidden;min-width:182px;z-index:500;}
//                 .nb-dropdown::before{content:'';position:absolute;top:-7px;right:14px;width:12px;height:12px;background:var(--clr-cream);border-left:1.5px solid var(--clr-sand);border-top:1.5px solid var(--clr-sand);transform:rotate(45deg);border-radius:2px 0 0 0;}
//                 .nb-dd-item{padding:11px 18px;font-size:0.82rem;color:var(--clr-brown);letter-spacing:0.04em;font-weight:600;cursor:pointer;border-bottom:1px solid rgba(237,216,196,0.55);transition:background 0.18s,color 0.18s,padding-left 0.2s;display:flex;align-items:center;gap:10px;}
//                 .nb-dd-item:last-child{border-bottom:none;}
//                 .nb-dd-item:hover{background:rgba(201,106,66,0.09);color:var(--clr-terra);padding-left:24px;}
//                 .nb-dd-item.is-danger{color:#C96A42;}
//                 .nb-dd-item.is-danger:hover{background:rgba(201,106,66,0.09);color:#A3512F;padding-left:24px;}
//                 .nb-dd-item.is-tracker{color:#7A4A38;}
//                 .nb-dd-item.is-tracker:hover{background:rgba(201,106,66,0.09);color:var(--clr-terra);padding-left:24px;}
//                 .nb-dd-item.is-admin{background:linear-gradient(135deg,rgba(61,35,24,0.04),rgba(122,74,56,0.06));color:var(--clr-deep);border-top:1px solid rgba(237,216,196,0.8);}
//                 .nb-dd-item.is-admin:hover{background:linear-gradient(135deg,rgba(61,35,24,0.1),rgba(201,106,66,0.1));color:var(--clr-deep);padding-left:24px;}
//                 .nb-dd-admin-badge{font-size:0.6rem;font-weight:700;letter-spacing:0.1em;background:#3D2318;color:#F7EFE6;padding:2px 7px;border-radius:10px;text-transform:uppercase;margin-left:auto;flex-shrink:0;}
//                 .nb-dd-tracker-badge{font-size:0.6rem;font-weight:700;background:rgba(201,106,66,0.15);color:#C96A42;padding:2px 7px;border-radius:10px;margin-left:auto;flex-shrink:0;border:1px solid rgba(201,106,66,0.25);}

//                 /* Sidebar */
//                 .nb-sidebar{position:fixed;top:0;right:0;height:100vh;background:var(--clr-cream);border-left:2px solid var(--clr-sand);box-shadow:-8px 0 32px rgba(61,35,24,0.15);z-index:400;display:flex;flex-direction:column;overflow:hidden;}
//                 .nb-sidebar-back{display:flex;align-items:center;gap:10px;padding:16px 20px;border-bottom:1px solid var(--clr-sand);cursor:pointer;color:var(--clr-brown);font-size:0.78rem;letter-spacing:0.1em;font-weight:700;transition:color 0.2s;background:none;border-left:none;border-right:none;border-top:none;font-family:inherit;}
//                 .nb-sidebar-back:hover{color:var(--clr-terra);}
//                 .nb-sidebar-back img{width:14px;filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%);}
//                 .nb-sidebar-link{padding:15px 24px;font-size:0.78rem;letter-spacing:0.12em;font-weight:700;color:var(--clr-brown);text-decoration:none;border-bottom:1px solid rgba(237,216,196,0.6);transition:background 0.2s,color 0.2s,padding-left 0.2s;display:flex;align-items:center;gap:8px;cursor:pointer;}
//                 .nb-sidebar-link:hover{background:rgba(201,106,66,0.08);color:var(--clr-terra);padding-left:30px;}
//                 .nb-sidebar-ai{padding:15px 24px;font-size:0.78rem;letter-spacing:0.12em;font-weight:700;color:#C96A42;text-decoration:none;display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(237,216,196,0.6);transition:background 0.2s,padding-left 0.2s;}
//                 .nb-sidebar-ai:hover{background:rgba(201,106,66,0.08);padding-left:30px;}
//                 .nb-sidebar-admin{padding:14px 24px;font-size:0.78rem;letter-spacing:0.1em;font-weight:700;color:var(--clr-deep);display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(237,216,196,0.6);cursor:pointer;background:linear-gradient(135deg,rgba(61,35,24,0.04),rgba(122,74,56,0.06));transition:background 0.2s,padding-left 0.2s;}
//                 .nb-sidebar-admin:hover{background:rgba(61,35,24,0.1);padding-left:30px;}
//                 .nb-overlay{position:fixed;inset:0;background:rgba(61,35,24,0.35);z-index:399;backdrop-filter:blur(2px);}
//                 .nb-hamburger{display:flex;}
//                 @media(min-width:640px){.nb-hamburger{display:none;}}
//             `}</style>

//       {/* Sidebar overlay */}
//       <AnimatePresence>
//         {visible && (
//           <motion.div
//             className="nb-overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setVisible(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* NAV */}
//       <motion.nav
//         className={`nb-root ${scrolled ? "nb-scrolled" : ""}`}
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//       >
//         <div className="nb-inner">
//           {/* LOGO */}
//           <Link to="/">
//             <motion.img
//               src={assets.logo}
//               alt="logo"
//               style={{ width: 140, display: "block" }}
//               whileHover={{ scale: 1.04 }}
//               transition={{ type: "spring", stiffness: 400, damping: 20 }}
//             />
//           </Link>

//           {/* DESKTOP MENU */}
//           <ul className="nb-menu">
//             {navLinks.map(({ path, label, ai }, i) => (
//               <motion.li
//                 key={path}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
//               >
//                 {ai ? (
//                   <NavLink
//                     to={path}
//                     className={({ isActive }) =>
//                       `nb-link-ai${isActive ? " active" : ""}`
//                     }
//                   >
//                     <SparkleIcon />
//                     {label}
//                   </NavLink>
//                 ) : (
//                   <NavLink
//                     to={path}
//                     className={({ isActive }) =>
//                       `nb-link${isActive ? " active" : ""}`
//                     }
//                   >
//                     {label}
//                   </NavLink>
//                 )}
//               </motion.li>
//             ))}
//           </ul>

//           {/* ACTIONS */}
//           <div className="nb-actions">
//             <motion.button
//               className="nb-icon-btn"
//               onClick={() => setShowSearch(true)}
//               whileTap={{ scale: 0.88 }}
//             >
//               <img src={assets.search_icon} alt="search" className="nb-icon" />
//             </motion.button>

//             {/* Profile + Dropdown */}
//             <div ref={dropdownRef} style={{ position: "relative" }}>
//               <motion.button
//                 className={`nb-icon-btn nb-profile-btn ${dropdownOpen ? "is-open" : ""}`}
//                 onClick={handleProfileClick}
//                 whileTap={{ scale: 0.88 }}
//                 title={token ? "My Account" : "Login"}
//               >
//                 <img
//                   src={assets.profile_icon}
//                   alt="profile"
//                   className="nb-icon"
//                 />
//               </motion.button>

//               <AnimatePresence>
//                 {token && dropdownOpen && (
//                   <motion.div
//                     className="nb-dropdown"
//                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                     transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
//                   >
//                     {dropdownItems.map(
//                       ({
//                         label,
//                         onClick,
//                         icon,
//                         isAdmin,
//                         isDanger,
//                         isTracker,
//                       }) => (
//                         <div
//                           key={label}
//                           className={`nb-dd-item${isAdmin ? " is-admin" : ""}${isDanger ? " is-danger" : ""}${isTracker ? " is-tracker" : ""}`}
//                           onClick={onClick}
//                         >
//                           {icon}
//                           {label}
//                           {isAdmin && (
//                             <span className="nb-dd-admin-badge">↗ New Tab</span>
//                           )}
//                           {isTracker && (
//                             <span className="nb-dd-tracker-badge">Live</span>
//                           )}
//                         </div>
//                       ),
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="nb-icon-btn nb-cart-wrap"
//               style={{ textDecoration: "none" }}
//             >
//               <motion.img
//                 src={assets.cart_icon}
//                 alt="cart"
//                 className="nb-icon"
//                 whileHover={{ scale: 1.12 }}
//                 whileTap={{ scale: 0.9 }}
//               />
//               <AnimatePresence>
//                 {getCartCount() > 0 && (
//                   <motion.span
//                     className="nb-cart-badge"
//                     key="badge"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     exit={{ scale: 0 }}
//                     transition={{ type: "spring", stiffness: 500 }}
//                   >
//                     {getCartCount()}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </Link>

//             {/* Hamburger */}
//             <motion.button
//               className="nb-icon-btn nb-hamburger"
//               onClick={() => setVisible(true)}
//               whileTap={{ scale: 0.88 }}
//             >
//               <img src={assets.menu_icon} alt="menu" className="nb-icon" />
//             </motion.button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* MOBILE SIDEBAR */}
//       <AnimatePresence>
//         {visible && (
//           <motion.div
//             className="nb-sidebar"
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", stiffness: 320, damping: 32 }}
//             style={{ width: 270 }}
//           >
//             <button
//               className="nb-sidebar-back"
//               onClick={() => setVisible(false)}
//             >
//               <img
//                 src={assets.dropdown_icon}
//                 alt="back"
//                 style={{ transform: "rotate(180deg)" }}
//               />
//               BACK
//             </button>

//             {navLinks
//               .filter((n) => !n.ai)
//               .map(({ path, label }, i) => (
//                 <motion.div
//                   key={path}
//                   initial={{ x: 40, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.06 * i, duration: 0.3 }}
//                 >
//                   <NavLink
//                     to={path}
//                     className="nb-sidebar-link"
//                     onClick={() => setVisible(false)}
//                   >
//                     {label}
//                   </NavLink>
//                 </motion.div>
//               ))}

//             <motion.div
//               initial={{ x: 40, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.28, duration: 0.3 }}
//             >
//               <NavLink
//                 to="/ai-recommendations"
//                 className="nb-sidebar-ai"
//                 onClick={() => setVisible(false)}
//               >
//                 <SparkleIcon />
//                 AI PICKS
//               </NavLink>
//             </motion.div>

//             {token && (
//               <motion.div
//                 initial={{ x: 40, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.34, duration: 0.3 }}
//                 style={{
//                   marginTop: "auto",
//                   borderTop: "1px solid rgba(237,216,196,0.8)",
//                 }}
//               >
//                 <div
//                   className="nb-sidebar-link"
//                   onClick={() => {
//                     setVisible(false);
//                     navigate("/profile");
//                   }}
//                 >
//                   MY PROFILE
//                 </div>
//                 <div
//                   className="nb-sidebar-link"
//                   onClick={() => {
//                     setVisible(false);
//                     navigate("/orders");
//                   }}
//                 >
//                   ORDERS
//                 </div>
//                 <div
//                   className="nb-sidebar-link"
//                   style={{ color: "#C96A42" }}
//                   onClick={() => {
//                     setVisible(false);
//                     setTrackerOpen(true);
//                   }}
//                 >
//                   <svg
//                     width="14"
//                     height="14"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <circle cx="12" cy="12" r="10" />
//                     <polyline points="12 6 12 12 16 14" />
//                   </svg>
//                   ORDER TRACKER
//                   <span
//                     style={{
//                       marginLeft: "auto",
//                       fontSize: "0.6rem",
//                       background: "rgba(201,106,66,0.15)",
//                       color: "#C96A42",
//                       padding: "2px 7px",
//                       borderRadius: 10,
//                       fontWeight: 700,
//                       border: "1px solid rgba(201,106,66,0.25)",
//                     }}
//                   >
//                     Live
//                   </span>
//                 </div>
//                 <div
//                   className="nb-sidebar-admin"
//                   onClick={() => {
//                     setVisible(false);
//                     openAdminPanel();
//                   }}
//                 >
//                   <svg
//                     width="14"
//                     height="14"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <rect x="3" y="3" width="7" height="7" />
//                     <rect x="14" y="3" width="7" height="7" />
//                     <rect x="14" y="14" width="7" height="7" />
//                     <rect x="3" y="14" width="7" height="7" />
//                   </svg>
//                   ADMIN PANEL
//                   <span
//                     style={{
//                       marginLeft: "auto",
//                       fontSize: "0.6rem",
//                       background: "#3D2318",
//                       color: "#F7EFE6",
//                       padding: "2px 7px",
//                       borderRadius: 10,
//                       fontWeight: 700,
//                     }}
//                   >
//                     ↗
//                   </span>
//                 </div>
//                 <div
//                   className="nb-sidebar-link"
//                   style={{ color: "#C96A42", borderBottom: "none" }}
//                   onClick={logout}
//                 >
//                   LOGOUT
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ORDER TRACKER SLIDE-OVER */}
//       <OrderTracker
//         isOpen={trackerOpen}
//         onClose={() => setTrackerOpen(false)}
//       />
//     </>
//   );
// };

// export default Navbar;





import React, { useState, useEffect, useRef, useCallback } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { motion, AnimatePresence } from 'framer-motion'
import OrderTracker from './OrderTracker'

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'

// ── Icons ─────────────────────────────────────────────────────────────────────
const SparkleIcon = ({ size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
    </svg>
)
const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)
const MenuIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
)
const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
)
const CartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
)
const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
)
const ChevronRight = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
)

// ── Nav links config ──────────────────────────────────────────────────────────
const NAV_LINKS = [
    { path: '/',                   label: 'Home'      },
    { path: '/collection',         label: 'Collection'},
    { path: '/about',              label: 'About'     },
    { path: '/contact',            label: 'Contact'   },
]

// ── Dropdown menu items ───────────────────────────────────────────────────────
const makeDropdownItems = ({ navigate, openTracker, openAdminPanel, logout, setDropdownOpen }) => [
    {
        label: 'My Profile', emoji: '👤',
        onClick: () => { setDropdownOpen(false); navigate('/profile') },
    },
    {
        label: 'Orders', emoji: '📦',
        onClick: () => { setDropdownOpen(false); navigate('/orders') },
    },
    {
        label: 'Order Tracker', emoji: '🕐', badge: 'Live',
        badgeColor: '#C96A42', isTracker: true,
        onClick: () => { setDropdownOpen(false); openTracker() },
    },
    {
        label: 'AI Picks', emoji: '✨',
        onClick: () => { setDropdownOpen(false); navigate('/ai-recommendations') },
    },
    {
        label: 'Admin Panel', emoji: '⚙️', badge: '↗', isAdmin: true,
        onClick: () => { setDropdownOpen(false); openAdminPanel() },
    },
    {
        label: 'Logout', emoji: '🚪', isDanger: true,
        onClick: logout,
    },
]

const Navbar = () => {
    const location = useLocation()
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const [drawerOpen,    setDrawerOpen]    = useState(false)
    const [scrolled,      setScrolled]      = useState(false)
    const [dropdownOpen,  setDropdownOpen]  = useState(false)
    const [trackerOpen,   setTrackerOpen]   = useState(false)
    const [searchOpen,    setSearchOpen]    = useState(false)
    const [searchQuery,   setSearchQuery]   = useState('')
    const dropdownRef = useRef(null)
    const searchRef   = useRef(null)

    // Close drawer on route change
    useEffect(() => { setDrawerOpen(false); setDropdownOpen(false) }, [location])

    // Scroll detection
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', fn, { passive: true })
        return () => window.removeEventListener('scroll', fn)
    }, [])

    // Click outside dropdown
    useEffect(() => {
        const fn = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
        }
        document.addEventListener('mousedown', fn)
        return () => document.removeEventListener('mousedown', fn)
    }, [])

    // Close dropdown on logout
    useEffect(() => { if (!token) setDropdownOpen(false) }, [token])

    // Prevent body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [drawerOpen])

    // Escape key handlers
    useEffect(() => {
        const fn = (e) => {
            if (e.key === 'Escape') { setDrawerOpen(false); setDropdownOpen(false); setSearchOpen(false) }
        }
        window.addEventListener('keydown', fn)
        return () => window.removeEventListener('keydown', fn)
    }, [])

    const logout = useCallback(() => {
        setDropdownOpen(false); setDrawerOpen(false)
        navigate('/login')
        localStorage.removeItem('token')
        setToken(''); setCartItems({})
    }, [navigate, setToken, setCartItems])

    const openTracker     = useCallback(() => setTrackerOpen(true), [])
    const openAdminPanel  = useCallback(() => window.open(ADMIN_URL, '_blank', 'noopener,noreferrer'), [])
    const handleProfileClick = useCallback(() => {
        if (!token) navigate('/login')
        else setDropdownOpen(p => !p)
    }, [token, navigate])

    const cartCount = getCartCount()
    const dropdownItems = makeDropdownItems({ navigate, openTracker, openAdminPanel, logout, setDropdownOpen })

    return (
        <>
            <style>{`
                /* ── Variables ──────────────────────────── */
                :root {
                    --nb-cream: #F7EFE6;
                    --nb-sand:  #EDD8C4;
                    --nb-terra: #C96A42;
                    --nb-dark:  #A3512F;
                    --nb-brown: #7A4A38;
                    --nb-deep:  #3D2318;
                    --nb-sage:  #98A98E;
                    --nb-h:     64px;
                }
                @media(max-width:480px) { :root { --nb-h: 56px; } }

                /* ── Base navbar ────────────────────────── */
                .nb {
                    position: sticky; top: 0; z-index: 500;
                    background: var(--nb-cream);
                    border-bottom: 1.5px solid var(--nb-sand);
                    height: var(--nb-h);
                    display: flex; align-items: center;
                    padding: 0 clamp(1rem, 4vw, 3rem);
                    transition: box-shadow 0.3s, background 0.3s;
                }
                .nb.nb-scrolled {
                    box-shadow: 0 4px 24px rgba(61,35,24,0.11);
                    background: rgba(247,239,230,0.96);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                .nb-inner {
                    width: 100%; display: flex;
                    align-items: center; justify-content: space-between;
                    gap: 0;
                }

                /* ── Logo ───────────────────────────────── */
                .nb-logo img {
                    height: 28px; width: auto; display: block;
                    transition: opacity 0.2s;
                }
                .nb-logo:hover img { opacity: 0.82; }

                /* ── Desktop nav links (≥ 1024px) ───────── */
                .nb-links {
                    display: none; list-style: none;
                    margin: 0; padding: 0;
                    gap: clamp(1rem, 2.5vw, 2rem);
                    align-items: center;
                    position: absolute; left: 50%; transform: translateX(-50%);
                }
                @media(min-width: 1024px) { .nb-links { display: flex; } }

                .nb-link {
                    font-size: 0.72rem; letter-spacing: 0.11em; font-weight: 700;
                    color: var(--nb-brown); text-decoration: none;
                    padding-bottom: 3px; position: relative;
                    transition: color 0.2s; white-space: nowrap;
                }
                .nb-link::after {
                    content: ''; position: absolute; bottom: 0; left: 50%; right: 50%;
                    height: 2px; background: var(--nb-terra); border-radius: 2px;
                    transition: left 0.28s ease, right 0.28s ease;
                }
                .nb-link:hover, .nb-link.active { color: var(--nb-terra); }
                .nb-link:hover::after, .nb-link.active::after { left: 0; right: 0; }

                .nb-link-ai {
                    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em;
                    text-decoration: none; white-space: nowrap;
                    background: linear-gradient(135deg, #3D2318, #7A4A38);
                    color: #F7EFE6; padding: 5px 13px; border-radius: 20px;
                    display: inline-flex; align-items: center; gap: 4px;
                    box-shadow: 0 2px 8px rgba(61,35,24,0.22);
                    transition: box-shadow 0.22s, transform 0.18s;
                }
                .nb-link-ai:hover { box-shadow: 0 4px 16px rgba(61,35,24,0.36); transform: translateY(-1px); }
                .nb-link-ai.active { background: linear-gradient(135deg, #C96A42, #7A4A38); }

                /* ── Actions area ───────────────────────── */
                .nb-actions {
                    display: flex; align-items: center;
                    gap: clamp(8px, 2vw, 20px);
                    flex-shrink: 0;
                }

                /* ── Icon buttons ───────────────────────── */
                .nb-btn {
                    background: none; border: none; cursor: pointer;
                    padding: 6px; border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    color: var(--nb-brown);
                    transition: background 0.18s, color 0.18s, transform 0.15s;
                    -webkit-tap-highlight-color: transparent;
                    position: relative;
                }
                .nb-btn:hover { background: rgba(201,106,66,0.08); color: var(--nb-terra); }
                .nb-btn:active { transform: scale(0.9); }
                .nb-btn.nb-btn-active { color: var(--nb-terra); background: rgba(201,106,66,0.1); }

                /* Cart badge */
                .nb-cart-badge {
                    position: absolute; top: 0; right: 0;
                    width: 16px; height: 16px;
                    background: var(--nb-terra); color: #F7EFE6;
                    font-size: 0.58rem; font-weight: 800;
                    border-radius: 50%; border: 1.5px solid var(--nb-cream);
                    display: flex; align-items: center; justify-content: center;
                    line-height: 1;
                }

                /* ── Hamburger (< 1024px) ───────────────── */
                .nb-hamburger { display: flex; }
                @media(min-width: 1024px) { .nb-hamburger { display: none; } }

                /* ── Profile dropdown ───────────────────── */
                .nb-dropdown-wrap { position: relative; }
                .nb-dropdown {
                    position: absolute; top: calc(100% + 12px); right: 0;
                    background: var(--nb-cream);
                    border: 1.5px solid var(--nb-sand);
                    border-radius: 16px; overflow: hidden;
                    min-width: 200px; z-index: 600;
                    box-shadow: 0 16px 48px rgba(61,35,24,0.17);
                }
                /* Caret */
                .nb-dropdown::before {
                    content: ''; position: absolute; top: -7px; right: 16px;
                    width: 12px; height: 12px;
                    background: var(--nb-cream);
                    border-left: 1.5px solid var(--nb-sand);
                    border-top: 1.5px solid var(--nb-sand);
                    transform: rotate(45deg); border-radius: 2px 0 0 0;
                }
                .nb-dd-item {
                    display: flex; align-items: center; gap: 10px;
                    padding: 11px 16px;
                    font-size: 0.82rem; font-weight: 600; color: var(--nb-brown);
                    cursor: pointer; border-bottom: 1px solid rgba(237,216,196,0.5);
                    transition: background 0.15s, color 0.15s, padding-left 0.2s;
                    -webkit-tap-highlight-color: transparent;
                }
                .nb-dd-item:last-child { border-bottom: none; }
                .nb-dd-item:hover { background: rgba(201,106,66,0.08); color: var(--nb-terra); padding-left: 20px; }
                .nb-dd-item.is-admin { background: rgba(61,35,24,0.04); color: var(--nb-deep); font-weight: 700; border-top: 1px solid var(--nb-sand); }
                .nb-dd-item.is-admin:hover { background: rgba(61,35,24,0.09); padding-left: 20px; }
                .nb-dd-item.is-danger { color: #D44; }
                .nb-dd-item.is-danger:hover { background: rgba(200,60,60,0.07); color: #B33; padding-left: 20px; }
                .nb-dd-badge {
                    margin-left: auto; flex-shrink: 0;
                    font-size: 0.6rem; font-weight: 800; letter-spacing: 0.06em;
                    padding: 2px 7px; border-radius: 10px;
                }
                .nb-dd-badge.live { background: rgba(201,106,66,0.14); color: var(--nb-terra); border: 1px solid rgba(201,106,66,0.25); }
                .nb-dd-badge.ext  { background: var(--nb-deep); color: #F7EFE6; }

                /* ── Mobile / Tablet Drawer ─────────────── */
                .nb-overlay {
                    position: fixed; inset: 0; z-index: 700;
                    background: rgba(61,35,24,0.45);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                }
                .nb-drawer {
                    position: fixed; top: 0; right: 0; bottom: 0;
                    z-index: 800;
                    background: var(--nb-cream);
                    border-left: 1.5px solid var(--nb-sand);
                    box-shadow: -12px 0 48px rgba(61,35,24,0.18);
                    display: flex; flex-direction: column;
                    overflow: hidden;
                    width: min(320px, 88vw);
                }

                /* Drawer header */
                .nb-drawer-head {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 0 20px;
                    height: var(--nb-h); flex-shrink: 0;
                    border-bottom: 1.5px solid var(--nb-sand);
                    background: linear-gradient(135deg, #3D2318, #7A4A38);
                }
                .nb-drawer-head-title {
                    font-family: 'Georgia', serif; font-size: 1rem;
                    color: #F7EFE6; font-weight: 700; letter-spacing: 0.04em;
                }
                .nb-drawer-close {
                    width: 34px; height: 34px; border-radius: 8px;
                    background: rgba(247,239,230,0.12); border: 1px solid rgba(247,239,230,0.2);
                    color: rgba(247,239,230,0.9);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: background 0.2s;
                    -webkit-tap-highlight-color: transparent;
                }
                .nb-drawer-close:hover { background: rgba(247,239,230,0.22); }

                /* Drawer scroll area */
                .nb-drawer-body { flex: 1; overflow-y: auto; }
                .nb-drawer-body::-webkit-scrollbar { width: 3px; }
                .nb-drawer-body::-webkit-scrollbar-thumb { background: var(--nb-sand); border-radius: 3px; }

                /* Section label */
                .nb-drawer-section {
                    padding: 10px 20px 4px;
                    font-size: 0.62rem; font-weight: 800; letter-spacing: 0.18em;
                    color: var(--nb-sage); text-transform: uppercase;
                }

                /* Drawer nav link */
                .nb-drawer-link {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 13px 20px;
                    font-size: 0.88rem; font-weight: 600; color: var(--nb-brown);
                    text-decoration: none; cursor: pointer;
                    border-bottom: 1px solid rgba(237,216,196,0.5);
                    transition: background 0.15s, color 0.15s, padding-left 0.2s;
                    -webkit-tap-highlight-color: transparent;
                }
                .nb-drawer-link:hover, .nb-drawer-link.active {
                    background: rgba(201,106,66,0.07);
                    color: var(--nb-terra); padding-left: 26px;
                }
                .nb-drawer-link-ai {
                    display: flex; align-items: center; gap: 8px;
                    padding: 13px 20px;
                    font-size: 0.88rem; font-weight: 700; color: var(--nb-terra);
                    cursor: pointer; border-bottom: 1px solid rgba(237,216,196,0.5);
                    text-decoration: none;
                    transition: background 0.15s, padding-left 0.2s;
                    -webkit-tap-highlight-color: transparent;
                }
                .nb-drawer-link-ai:hover { background: rgba(201,106,66,0.08); padding-left: 26px; }

                /* Drawer account section */
                .nb-drawer-account {
                    border-top: 2px solid var(--nb-sand);
                    background: rgba(237,216,196,0.15);
                }
                .nb-drawer-account-header {
                    padding: 14px 20px 6px;
                    font-size: 0.62rem; font-weight: 800; letter-spacing: 0.18em;
                    color: var(--nb-sage); text-transform: uppercase;
                }
                .nb-drawer-acct-item {
                    display: flex; align-items: center; gap: 12px;
                    padding: 12px 20px;
                    font-size: 0.85rem; font-weight: 600; color: var(--nb-brown);
                    cursor: pointer; border-bottom: 1px solid rgba(237,216,196,0.4);
                    transition: background 0.15s, color 0.15s;
                    -webkit-tap-highlight-color: transparent;
                }
                .nb-drawer-acct-item:last-child { border-bottom: none; }
                .nb-drawer-acct-item:hover { background: rgba(201,106,66,0.07); color: var(--nb-terra); }
                .nb-drawer-acct-item.is-admin { background: rgba(61,35,24,0.04); font-weight: 700; color: var(--nb-deep); }
                .nb-drawer-acct-item.is-admin:hover { background: rgba(61,35,24,0.09); }
                .nb-drawer-acct-item.is-tracker { color: var(--nb-terra); }
                .nb-drawer-acct-item.is-danger { color: #D44; }
                .nb-drawer-acct-item.is-danger:hover { background: rgba(200,60,60,0.07); color: #B33; }
                .nb-drawer-acct-badge {
                    margin-left: auto; flex-shrink: 0;
                    font-size: 0.6rem; font-weight: 800;
                    padding: 2px 8px; border-radius: 10px;
                }
                .nb-drawer-acct-badge.live { background: rgba(201,106,66,0.12); color: var(--nb-terra); border: 1px solid rgba(201,106,66,0.25); }
                .nb-drawer-acct-badge.ext  { background: var(--nb-deep); color: #F7EFE6; }

                /* Drawer login CTA */
                .nb-drawer-login-cta {
                    margin: 16px 20px;
                    background: linear-gradient(135deg, #3D2318, #C96A42);
                    border-radius: 12px; padding: 16px;
                    text-align: center; cursor: pointer;
                    transition: opacity 0.2s;
                    -webkit-tap-highlight-color: transparent;
                }
                .nb-drawer-login-cta:hover { opacity: 0.9; }

                /* ── Inline search bar ──────────────────── */
                .nb-search-bar {
                    position: absolute; top: 100%; left: 0; right: 0;
                    background: var(--nb-cream);
                    border-bottom: 1.5px solid var(--nb-sand);
                    padding: 10px clamp(1rem, 4vw, 3rem);
                    box-shadow: 0 6px 24px rgba(61,35,24,0.1);
                    z-index: 499;
                }
                .nb-search-input-wrap {
                    display: flex; align-items: center; gap: 10px;
                    background: #FFFDF9; border: 1.5px solid var(--nb-sand);
                    border-radius: 50px; padding: 8px 16px;
                    max-width: 520px; margin: 0 auto;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .nb-search-input-wrap:focus-within {
                    border-color: var(--nb-terra);
                    box-shadow: 0 0 0 3px rgba(201,106,66,0.1);
                }
                .nb-search-inp {
                    flex: 1; background: transparent; border: none; outline: none;
                    font-size: 0.88rem; color: var(--nb-deep); font-family: inherit;
                    min-width: 0;
                }
                .nb-search-inp::placeholder { color: var(--nb-sage); }

                /* ── Tablet adjustments (768–1023px) ─────── */
                @media(min-width: 768px) and (max-width: 1023px) {
                    .nb { padding: 0 clamp(1.2rem, 3vw, 2rem); }
                }

                /* ── Small mobile (< 360px) ──────────────── */
                @media(max-width: 360px) {
                    .nb { padding: 0 0.75rem; }
                    .nb-actions { gap: 6px; }
                }

                /* Active nav indicator dot for mobile  */
                .nb-active-dot {
                    width: 4px; height: 4px; border-radius: 50%;
                    background: var(--nb-terra); flex-shrink: 0;
                }
            `}</style>

            {/* ── Backdrop overlay ── */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.div className="nb-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        onClick={() => setDrawerOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* ══════════ NAVBAR ════════════════════════════════════════════════ */}
            <motion.nav
                className={`nb${scrolled ? ' nb-scrolled' : ''}`}
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'sticky' }}
            >
                <div className="nb-inner">

                    {/* Logo */}
                    <Link to="/" className="nb-logo" style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <motion.img
                            src={assets.logo} alt="Forever"
                            whileHover={{ scale: 1.04 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        />
                    </Link>

                    {/* ── Desktop nav links (≥1024px) ── */}
                    <ul className="nb-links">
                        {NAV_LINKS.map(({ path, label }, i) => (
                            <motion.li key={path} style={{ listStyle: 'none' }}
                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}>
                                <NavLink to={path}
                                    className={({ isActive }) => `nb-link${isActive ? ' active' : ''}`}>
                                    {label}
                                </NavLink>
                            </motion.li>
                        ))}
                        <motion.li style={{ listStyle: 'none' }}
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.28, duration: 0.35 }}>
                            <NavLink to="/ai-recommendations"
                                className={({ isActive }) => `nb-link-ai${isActive ? ' active' : ''}`}>
                                <SparkleIcon />AI PICKS
                            </NavLink>
                        </motion.li>
                    </ul>

                    {/* ── Right actions ── */}
                    <div className="nb-actions">

                        {/* Search */}
                        <motion.button
                            className={`nb-btn${searchOpen ? ' nb-btn-active' : ''}`}
                            onClick={() => { setSearchOpen(p => !p); setShowSearch(true) }}
                            whileTap={{ scale: 0.88 }}
                            aria-label="Search"
                        >
                            <SearchIcon />
                        </motion.button>

                        {/* Profile / Login */}
                        <div ref={dropdownRef} className="nb-dropdown-wrap">
                            <motion.button
                                className={`nb-btn${dropdownOpen ? ' nb-btn-active' : ''}`}
                                onClick={handleProfileClick}
                                whileTap={{ scale: 0.88 }}
                                aria-label={token ? 'Account menu' : 'Login'}
                            >
                                <UserIcon />
                            </motion.button>

                            <AnimatePresence>
                                {token && dropdownOpen && (
                                    <motion.div className="nb-dropdown"
                                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {dropdownItems.map(({ label, emoji, badge, isAdmin, isDanger, isTracker, onClick }) => (
                                            <motion.div
                                                key={label}
                                                className={`nb-dd-item${isAdmin ? ' is-admin' : ''}${isDanger ? ' is-danger' : ''}`}
                                                onClick={onClick}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{emoji}</span>
                                                <span>{label}</span>
                                                {badge && (
                                                    <span className={`nb-dd-badge ${isTracker ? 'live' : 'ext'}`}>
                                                        {badge}
                                                    </span>
                                                )}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Cart */}
                        <motion.div style={{ position: 'relative' }} whileTap={{ scale: 0.9 }}>
                            <Link to="/cart" className="nb-btn" aria-label={`Cart, ${cartCount} items`}
                                style={{ textDecoration: 'none' }}>
                                <CartIcon />
                                <AnimatePresence>
                                    {cartCount > 0 && (
                                        <motion.span className="nb-cart-badge"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                                        >
                                            {cartCount > 99 ? '99+' : cartCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </motion.div>

                        {/* Hamburger — hidden on ≥1024px */}
                        <motion.button
                            className="nb-btn nb-hamburger"
                            onClick={() => setDrawerOpen(true)}
                            whileTap={{ scale: 0.88 }}
                            aria-label="Open menu"
                        >
                            <MenuIcon />
                        </motion.button>
                    </div>
                </div>

                {/* ── Inline search bar ── */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div className="nb-search-bar"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div className="nb-search-input-wrap">
                                <SearchIcon />
                                <input
                                    className="nb-search-inp"
                                    autoFocus
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') { navigate('/collection'); setSearchOpen(false) } }}
                                />
                                <button onClick={() => setSearchOpen(false)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nb-sage)', display: 'flex', padding: 2 }}>
                                    <XIcon />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* ══════════ MOBILE / TABLET DRAWER ═══════════════════════════════ */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.aside
                        className="nb-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                        aria-label="Navigation menu"
                    >
                        {/* Drawer header */}
                        <div className="nb-drawer-head">
                            <span className="nb-drawer-head-title">Menu</span>
                            <button className="nb-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                                <XIcon />
                            </button>
                        </div>

                        <div className="nb-drawer-body">

                            {/* Nav links */}
                            <div className="nb-drawer-section">Navigation</div>
                            {NAV_LINKS.map(({ path, label }, i) => (
                                <motion.div key={path}
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.04 * i, duration: 0.28 }}
                                >
                                    <NavLink to={path} className={({ isActive }) =>
                                        `nb-drawer-link${isActive ? ' active' : ''}`
                                    } onClick={() => setDrawerOpen(false)}>
                                        <span>{label}</span>
                                        <ChevronRight />
                                    </NavLink>
                                </motion.div>
                            ))}

                            {/* AI Picks */}
                            <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.28 }}>
                                <NavLink to="/ai-recommendations"
                                    className={({ isActive }) => `nb-drawer-link-ai${isActive ? ' active' : ''}`}
                                    onClick={() => setDrawerOpen(false)}>
                                    <SparkleIcon size={13} />
                                    <span>AI Picks</span>
                                    <span style={{ marginLeft: 'auto', fontSize: '0.65rem', background: 'rgba(201,106,66,0.12)', color: '#C96A42', padding: '2px 8px', borderRadius: 10, fontWeight: 700, border: '1px solid rgba(201,106,66,0.22)' }}>
                                        New
                                    </span>
                                </NavLink>
                            </motion.div>

                            {/* Summer Sale shortcut */}
                            <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.24, duration: 0.28 }}>
                                <NavLink to="/summer-sale"
                                    className={({ isActive }) => `nb-drawer-link${isActive ? ' active' : ''}`}
                                    onClick={() => setDrawerOpen(false)}>
                                    <span>☀️ Summer Sale</span>
                                    <span style={{ marginLeft: 'auto', fontSize: '0.65rem', background: '#C96A42', color: '#F7EFE6', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                                        10% OFF
                                    </span>
                                </NavLink>
                            </motion.div>

                            {/* ── Account section ── */}
                            <motion.div
                                className="nb-drawer-account"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                            >
                                {token ? (
                                    <>
                                        <div className="nb-drawer-account-header">My Account</div>

                                        {/* My Profile */}
                                        <div className="nb-drawer-acct-item" onClick={() => { setDrawerOpen(false); navigate('/profile') }}>
                                            <span style={{ fontSize: '1.1rem' }}>👤</span>
                                            <span>My Profile</span>
                                            <ChevronRight />
                                        </div>

                                        {/* Orders */}
                                        <div className="nb-drawer-acct-item" onClick={() => { setDrawerOpen(false); navigate('/orders') }}>
                                            <span style={{ fontSize: '1.1rem' }}>📦</span>
                                            <span>My Orders</span>
                                            <ChevronRight />
                                        </div>

                                        {/* Order Tracker */}
                                        <div className="nb-drawer-acct-item is-tracker" onClick={() => { setDrawerOpen(false); openTracker() }}>
                                            <span style={{ fontSize: '1.1rem' }}>🕐</span>
                                            <span>Order Tracker</span>
                                            <span className="nb-drawer-acct-badge live" style={{ marginLeft: 'auto' }}>Live</span>
                                        </div>

                                        {/* Admin Panel */}
                                        <div className="nb-drawer-acct-item is-admin" onClick={() => { setDrawerOpen(false); openAdminPanel() }}>
                                            <span style={{ fontSize: '1.1rem' }}>⚙️</span>
                                            <span>Admin Panel</span>
                                            <span className="nb-drawer-acct-badge ext" style={{ marginLeft: 'auto' }}>↗</span>
                                        </div>

                                        {/* Logout */}
                                        <div className="nb-drawer-acct-item is-danger" onClick={logout}>
                                            <span style={{ fontSize: '1.1rem' }}>🚪</span>
                                            <span>Logout</span>
                                        </div>
                                    </>
                                ) : (
                                    /* Not logged in — show CTA */
                                    <div className="nb-drawer-login-cta" onClick={() => { setDrawerOpen(false); navigate('/login') }}>
                                        <p style={{ fontSize: '0.72rem', color: 'rgba(247,239,230,0.7)', margin: '0 0 6px', letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase' }}>
                                            Welcome to Forever
                                        </p>
                                        <p style={{ fontFamily: "'Georgia',serif", fontSize: '1rem', color: '#F7EFE6', margin: '0 0 12px', fontWeight: 700 }}>
                                            Sign in to your account
                                        </p>
                                        <div style={{ background: '#F7EFE6', color: '#3D2318', borderRadius: 50, padding: '9px 24px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-block', letterSpacing: '0.08em' }}>
                                            Login / Sign Up →
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Bottom padding */}
                            <div style={{ height: 24 }} />
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* ── Order Tracker slide-over ── */}
            <OrderTracker isOpen={trackerOpen} onClose={() => setTrackerOpen(false)} />
        </>
    )
}

export default Navbar