






// import React, { useState, useEffect, useRef } from 'react'
// import { assets } from '../assets/assets'
// import { Link, NavLink } from 'react-router-dom'
// import { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import { motion, AnimatePresence } from 'framer-motion'

// // ── Icons ─────────────────────────────────────────────────────────────────────
// const SparkleIcon = () => (
//     <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"
//         style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }}>
//         <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" strokeLinejoin="round" />
//     </svg>
// )

// const Icon = ({ d, d2, extra }) => (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d={d} />{d2 && <path d={d2} />}{extra}
//     </svg>
// )

// // ── Admin URL — reads from env or defaults to port 5174 ───────────────────────
// // Set VITE_ADMIN_URL=http://localhost:5174 in your frontend .env
// const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5175'

// const Navbar = () => {
//     const [visible, setVisible] = useState(false)
//     const [scrolled, setScrolled] = useState(false)
//     const [dropdownOpen, setDropdownOpen] = useState(false)
//     const dropdownRef = useRef(null)

//     const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

//     useEffect(() => {
//         const onScroll = () => setScrolled(window.scrollY > 20)
//         window.addEventListener('scroll', onScroll)
//         return () => window.removeEventListener('scroll', onScroll)
//     }, [])

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setDropdownOpen(false)
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [])

//     useEffect(() => { if (!token) setDropdownOpen(false) }, [token])

//     const logout = () => {
//         setDropdownOpen(false)
//         navigate('/login')
//         localStorage.removeItem('token')
//         setToken('')
//         setCartItems({})
//     }

//     const handleProfileClick = () => {
//         if (!token) navigate('/login')
//         else setDropdownOpen(prev => !prev)
//     }

//     // Opens admin app in new tab — admin app handles its own authentication
//     const openAdminPanel = () => {
//         setDropdownOpen(false)
//         window.open(ADMIN_URL, '_blank', 'noopener,noreferrer')
//     }

//     const navLinks = [
//         { path: '/',                   label: 'HOME',     ai: false },
//         { path: '/collection',         label: 'COLLECTION', ai: false },
//         { path: '/about',              label: 'ABOUT',    ai: false },
//         { path: '/contact',            label: 'CONTACT',  ai: false },
//         { path: '/ai-recommendations', label: 'AI PICKS', ai: true  },
//     ]

//     // Dropdown menu items
//     const dropdownItems = [
//         {
//             label: 'My Profile',
//             onClick: () => { setDropdownOpen(false); navigate('/profile') },
//             icon: (
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//                     <circle cx="12" cy="7" r="4"/>
//                 </svg>
//             ),
//         },
//         {
//             label: 'Orders',
//             onClick: () => { setDropdownOpen(false); navigate('/orders') },
//             icon: (
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
//                     <line x1="3" y1="6" x2="21" y2="6"/>
//                     <path d="M16 10a4 4 0 0 1-8 0"/>
//                 </svg>
//             ),
//         },
//         {
//             label: 'AI Picks',
//             onClick: () => { setDropdownOpen(false); navigate('/ai-recommendations') },
//             icon: (
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//                 </svg>
//             ),
//         },
//         {
//             label: 'Admin Panel',
//             onClick: openAdminPanel,
//             isAdmin: true, // special styling — opens new tab
//             icon: (
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="3" width="7" height="7"/>
//                     <rect x="14" y="3" width="7" height="7"/>
//                     <rect x="14" y="14" width="7" height="7"/>
//                     <rect x="3" y="14" width="7" height="7"/>
//                 </svg>
//             ),
//             // external link indicator
//             badge: (
//                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', opacity: 0.5 }}>
//                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
//                     <polyline points="15 3 21 3 21 9"/>
//                     <line x1="10" y1="14" x2="21" y2="3"/>
//                 </svg>
//             ),
//         },
//         {
//             label: 'Logout',
//             onClick: logout,
//             isDanger: true,
//             icon: (
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//                     <polyline points="16 17 21 12 16 7"/>
//                     <line x1="21" y1="12" x2="9" y2="12"/>
//                 </svg>
//             ),
//         },
//     ]

//     return (
//         <>
//             <style>{`
//                 :root{
//                     --clr-cream:#F7EFE6; --clr-sand:#EDD8C4; --clr-terra:#C96A42;
//                     --clr-terra-dk:#A3512F; --clr-brown:#7A4A38; --clr-deep:#3D2318; --clr-sage:#98A98E;
//                 }
//                 .nb-root{
//                     background:var(--clr-cream); border-bottom:2px solid var(--clr-sand);
//                     padding:0 2.5rem; position:sticky; top:0; z-index:200;
//                     transition:box-shadow 0.3s, background 0.3s;
//                 }
//                 .nb-root.nb-scrolled{
//                     box-shadow:0 4px 20px rgba(61,35,24,0.12);
//                     background:rgba(247,239,230,0.97); backdrop-filter:blur(8px);
//                 }
//                 .nb-inner{ display:flex; align-items:center; justify-content:space-between; padding:1rem 0; }
//                 .nb-menu{ display:none; gap:1.8rem; list-style:none; margin:0; padding:0; }
//                 @media(min-width:640px){ .nb-menu{ display:flex; } }

//                 .nb-link{
//                     font-size:0.7rem; letter-spacing:0.12em; font-weight:700;
//                     color:var(--clr-brown); text-decoration:none; position:relative;
//                     padding-bottom:4px; transition:color 0.25s; white-space:nowrap;
//                 }
//                 .nb-link::after{
//                     content:''; position:absolute; bottom:0; left:50%; right:50%;
//                     height:2px; background:var(--clr-terra); border-radius:2px;
//                     transition:left 0.3s ease, right 0.3s ease;
//                 }
//                 .nb-link:hover,.nb-link.active{ color:var(--clr-terra); }
//                 .nb-link:hover::after,.nb-link.active::after{ left:0; right:0; }

//                 .nb-link-ai{
//                     font-size:0.68rem; letter-spacing:0.1em; font-weight:700;
//                     text-decoration:none; white-space:nowrap;
//                     background:linear-gradient(135deg,#3D2318,#7A4A38); color:#F7EFE6;
//                     padding:5px 12px; border-radius:20px;
//                     transition:box-shadow 0.25s, transform 0.2s;
//                     display:inline-flex; align-items:center; gap:3px;
//                     box-shadow:0 2px 10px rgba(61,35,24,0.22);
//                 }
//                 .nb-link-ai:hover{ box-shadow:0 4px 18px rgba(61,35,24,0.38); transform:translateY(-1px); }
//                 .nb-link-ai.active{ background:linear-gradient(135deg,#C96A42,#7A4A38); }

//                 .nb-actions{ display:flex; align-items:center; gap:1.4rem; }
//                 .nb-icon-btn{
//                     background:none; border:none; cursor:pointer; padding:0;
//                     display:flex; align-items:center; position:relative;
//                 }
//                 .nb-icon{
//                     width:20px; height:20px;
//                     filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%);
//                     transition:filter 0.2s, transform 0.2s;
//                 }
//                 .nb-icon-btn:hover .nb-icon,
//                 .nb-profile-btn.is-open .nb-icon{
//                     filter:invert(40%) sepia(50%) saturate(600%) hue-rotate(330deg) brightness(85%);
//                     transform:scale(1.12);
//                 }

//                 .nb-cart-wrap{ position:relative; }
//                 .nb-cart-badge{
//                     position:absolute; right:-6px; bottom:-6px;
//                     width:17px; height:17px;
//                     background:var(--clr-terra); color:var(--clr-cream);
//                     font-size:8px; font-weight:700; border-radius:50%;
//                     display:flex; align-items:center; justify-content:center;
//                 }

//                 /* Dropdown */
//                 .nb-dropdown{
//                     position:absolute; right:0; top:calc(100% + 14px);
//                     background:var(--clr-cream); border:1.5px solid var(--clr-sand);
//                     box-shadow:0 16px 40px rgba(61,35,24,0.18);
//                     border-radius:16px; overflow:hidden; min-width:178px; z-index:500;
//                 }
//                 .nb-dropdown::before{
//                     content:''; position:absolute; top:-7px; right:14px;
//                     width:12px; height:12px; background:var(--clr-cream);
//                     border-left:1.5px solid var(--clr-sand);
//                     border-top:1.5px solid var(--clr-sand);
//                     transform:rotate(45deg); border-radius:2px 0 0 0;
//                 }

//                 .nb-dd-item{
//                     padding:11px 18px;
//                     font-size:0.82rem; color:var(--clr-brown);
//                     letter-spacing:0.04em; font-weight:600; cursor:pointer;
//                     border-bottom:1px solid rgba(237,216,196,0.55);
//                     transition:background 0.18s, color 0.18s, padding-left 0.2s;
//                     display:flex; align-items:center; gap:10px;
//                 }
//                 .nb-dd-item:last-child{ border-bottom:none; }
//                 .nb-dd-item:hover{
//                     background:rgba(201,106,66,0.09);
//                     color:var(--clr-terra); padding-left:24px;
//                 }
//                 .nb-dd-item.is-danger{ color:#C96A42; }
//                 .nb-dd-item.is-danger:hover{ background:rgba(201,106,66,0.09); color:#A3512F; padding-left:24px; }

//                 /* Admin item — dark pill style */
//                 .nb-dd-item.is-admin{
//                     background: linear-gradient(135deg, rgba(61,35,24,0.04), rgba(122,74,56,0.06));
//                     color: var(--clr-deep);
//                     border-top: 1px solid rgba(237,216,196,0.8);
//                     margin-top: 0;
//                 }
//                 .nb-dd-item.is-admin:hover{
//                     background: linear-gradient(135deg, rgba(61,35,24,0.1), rgba(201,106,66,0.1));
//                     color: var(--clr-deep);
//                     padding-left: 24px;
//                 }
//                 .nb-dd-admin-badge{
//                     font-size:0.6rem; font-weight:700; letter-spacing:0.1em;
//                     background:#3D2318; color:#F7EFE6;
//                     padding:2px 7px; border-radius:10px;
//                     text-transform:uppercase; margin-left:auto; flex-shrink:0;
//                 }

//                 /* Sidebar */
//                 .nb-sidebar{
//                     position:fixed; top:0; right:0; height:100vh;
//                     background:var(--clr-cream); border-left:2px solid var(--clr-sand);
//                     box-shadow:-8px 0 32px rgba(61,35,24,0.15);
//                     z-index:400; display:flex; flex-direction:column; overflow:hidden;
//                 }
//                 .nb-sidebar-back{
//                     display:flex; align-items:center; gap:10px; padding:16px 20px;
//                     border-bottom:1px solid var(--clr-sand); cursor:pointer;
//                     color:var(--clr-brown); font-size:0.78rem; letter-spacing:0.1em; font-weight:700;
//                     transition:color 0.2s; background:none;
//                     border-left:none; border-right:none; border-top:none; font-family:inherit;
//                 }
//                 .nb-sidebar-back:hover{ color:var(--clr-terra); }
//                 .nb-sidebar-back img{
//                     width:14px;
//                     filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%);
//                 }
//                 .nb-sidebar-link{
//                     padding:15px 24px; font-size:0.78rem; letter-spacing:0.12em; font-weight:700;
//                     color:var(--clr-brown); text-decoration:none;
//                     border-bottom:1px solid rgba(237,216,196,0.6);
//                     transition:background 0.2s, color 0.2s, padding-left 0.2s; display:block; cursor:pointer;
//                 }
//                 .nb-sidebar-link:hover{ background:rgba(201,106,66,0.08); color:var(--clr-terra); padding-left:30px; }

//                 .nb-sidebar-ai{
//                     padding:15px 24px; font-size:0.78rem; letter-spacing:0.12em; font-weight:700;
//                     color:#C96A42; text-decoration:none; display:flex; align-items:center; gap:6px;
//                     border-bottom:1px solid rgba(237,216,196,0.6);
//                     transition:background 0.2s, padding-left 0.2s;
//                 }
//                 .nb-sidebar-ai:hover{ background:rgba(201,106,66,0.08); padding-left:30px; }

//                 .nb-sidebar-admin{
//                     padding:14px 24px; font-size:0.78rem; letter-spacing:0.1em; font-weight:700;
//                     color:var(--clr-deep); display:flex; align-items:center; gap:8px;
//                     border-bottom:1px solid rgba(237,216,196,0.6); cursor:pointer;
//                     background:linear-gradient(135deg,rgba(61,35,24,0.04),rgba(122,74,56,0.06));
//                     transition:background 0.2s, padding-left 0.2s;
//                 }
//                 .nb-sidebar-admin:hover{ background:rgba(61,35,24,0.1); padding-left:30px; }

//                 .nb-overlay{
//                     position:fixed; inset:0; background:rgba(61,35,24,0.35);
//                     z-index:399; backdrop-filter:blur(2px);
//                 }
//                 .nb-hamburger{ display:flex; }
//                 @media(min-width:640px){ .nb-hamburger{ display:none; } }
//             `}</style>

//             {/* OVERLAY */}
//             <AnimatePresence>
//                 {visible && (
//                     <motion.div className="nb-overlay"
//                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                         onClick={() => setVisible(false)} />
//                 )}
//             </AnimatePresence>

//             {/* NAVBAR */}
//             <motion.nav
//                 className={`nb-root ${scrolled ? 'nb-scrolled' : ''}`}
//                 initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//             >
//                 <div className="nb-inner">

//                     {/* LOGO */}
//                     <Link to="/">
//                         <motion.img src={assets.logo} alt="logo"
//                             style={{ width: 140, display: 'block' }}
//                             whileHover={{ scale: 1.04 }}
//                             transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//                         />
//                     </Link>

//                     {/* DESKTOP MENU */}
//                     <ul className="nb-menu">
//                         {navLinks.map(({ path, label, ai }, i) => (
//                             <motion.li key={path}
//                                 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}>
//                                 {ai ? (
//                                     <NavLink to={path} className={({ isActive }) => `nb-link-ai${isActive ? ' active' : ''}`}>
//                                         <SparkleIcon />{label}
//                                     </NavLink>
//                                 ) : (
//                                     <NavLink to={path} className={({ isActive }) => `nb-link${isActive ? ' active' : ''}`}>
//                                         {label}
//                                     </NavLink>
//                                 )}
//                             </motion.li>
//                         ))}
//                     </ul>

//                     {/* RIGHT ACTIONS */}
//                     <div className="nb-actions">

//                         {/* Search */}
//                         <motion.button className="nb-icon-btn" onClick={() => setShowSearch(true)} whileTap={{ scale: 0.88 }}>
//                             <img src={assets.search_icon} alt="search" className="nb-icon" />
//                         </motion.button>

//                         {/* Profile dropdown */}
//                         <div ref={dropdownRef} style={{ position: 'relative' }}>
//                             <motion.button
//                                 className={`nb-icon-btn nb-profile-btn ${dropdownOpen ? 'is-open' : ''}`}
//                                 onClick={handleProfileClick}
//                                 whileTap={{ scale: 0.88 }}
//                                 title={token ? 'My Account' : 'Login'}
//                             >
//                                 <img src={assets.profile_icon} alt="profile" className="nb-icon" />
//                             </motion.button>

//                             <AnimatePresence>
//                                 {token && dropdownOpen && (
//                                     <motion.div className="nb-dropdown"
//                                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                                         transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
//                                     >
//                                         {dropdownItems.map(({ label, onClick, icon, badge, isAdmin, isDanger }) => (
//                                             <div
//                                                 key={label}
//                                                 className={`nb-dd-item${isAdmin ? ' is-admin' : ''}${isDanger ? ' is-danger' : ''}`}
//                                                 onClick={onClick}
//                                             >
//                                                 {icon}
//                                                 {label}
//                                                 {/* Admin: show "NEW TAB" badge */}
//                                                 {isAdmin && (
//                                                     <span className="nb-dd-admin-badge">↗ New Tab</span>
//                                                 )}
//                                                 {/* Other badges */}
//                                                 {badge && !isAdmin && badge}
//                                             </div>
//                                         ))}
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </div>

//                         {/* Cart */}
//                         <Link to="/cart" className="nb-icon-btn nb-cart-wrap" style={{ textDecoration: 'none' }}>
//                             <motion.img src={assets.cart_icon} alt="cart" className="nb-icon"
//                                 whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }} />
//                             <AnimatePresence>
//                                 {getCartCount() > 0 && (
//                                     <motion.span className="nb-cart-badge" key="badge"
//                                         initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
//                                         transition={{ type: 'spring', stiffness: 500 }}>
//                                         {getCartCount()}
//                                     </motion.span>
//                                 )}
//                             </AnimatePresence>
//                         </Link>

//                         {/* Hamburger */}
//                         <motion.button className="nb-icon-btn nb-hamburger" onClick={() => setVisible(true)} whileTap={{ scale: 0.88 }}>
//                             <img src={assets.menu_icon} alt="menu" className="nb-icon" />
//                         </motion.button>
//                     </div>
//                 </div>
//             </motion.nav>

//             {/* MOBILE SIDEBAR */}
//             <AnimatePresence>
//                 {visible && (
//                     <motion.div className="nb-sidebar"
//                         initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
//                         transition={{ type: 'spring', stiffness: 320, damping: 32 }}
//                         style={{ width: 270 }}>

//                         <button className="nb-sidebar-back" onClick={() => setVisible(false)}>
//                             <img src={assets.dropdown_icon} alt="back" style={{ transform: 'rotate(180deg)' }} />
//                             BACK
//                         </button>

//                         {/* Main nav links */}
//                         {navLinks.filter(n => !n.ai).map(({ path, label }, i) => (
//                             <motion.div key={path}
//                                 initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
//                                 transition={{ delay: 0.06 * i, duration: 0.3 }}>
//                                 <NavLink to={path} className="nb-sidebar-link" onClick={() => setVisible(false)}>{label}</NavLink>
//                             </motion.div>
//                         ))}

//                         {/* AI Picks */}
//                         <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.28, duration: 0.3 }}>
//                             <NavLink to="/ai-recommendations" className="nb-sidebar-ai" onClick={() => setVisible(false)}>
//                                 <SparkleIcon />AI PICKS
//                             </NavLink>
//                         </motion.div>

//                         {/* Auth + Admin links at bottom */}
//                         {token && (
//                             <motion.div
//                                 initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
//                                 transition={{ delay: 0.34, duration: 0.3 }}
//                                 style={{ marginTop: 'auto', borderTop: '1px solid rgba(237,216,196,0.8)' }}>

//                                 <div className="nb-sidebar-link" onClick={() => { setVisible(false); navigate('/profile') }}>
//                                     MY PROFILE
//                                 </div>
//                                 <div className="nb-sidebar-link" onClick={() => { setVisible(false); navigate('/orders') }}>
//                                     ORDERS
//                                 </div>

//                                 {/* Admin Panel in sidebar */}
//                                 <div className="nb-sidebar-admin" onClick={() => { setVisible(false); openAdminPanel() }}>
//                                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                         <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
//                                         <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
//                                     </svg>
//                                     ADMIN PANEL
//                                     <span style={{ marginLeft: 'auto', fontSize: '0.6rem', background: '#3D2318', color: '#F7EFE6', padding: '2px 7px', borderRadius: 10, fontWeight: 700, letterSpacing: '0.08em' }}>↗</span>
//                                 </div>

//                                 <div className="nb-sidebar-link" style={{ color: '#C96A42' }} onClick={logout}>
//                                     LOGOUT
//                                 </div>
//                             </motion.div>
//                         )}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </>
//     )
// }

// export default Navbar






import React, { useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { motion, AnimatePresence } from 'framer-motion'
import OrderTracker from './OrderTracker'

const SparkleIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"
        style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }}>
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" strokeLinejoin="round" />
    </svg>
)

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [trackerOpen, setTrackerOpen] = useState(false)
    const dropdownRef = useRef(null)

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => { if (!token) setDropdownOpen(false) }, [token])

    const logout = () => {
        setDropdownOpen(false)
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const handleProfileClick = () => {
        if (!token) navigate('/login')
        else setDropdownOpen(prev => !prev)
    }

    const openAdminPanel = () => {
        setDropdownOpen(false)
        window.open(ADMIN_URL, '_blank', 'noopener,noreferrer')
    }

    const openTracker = () => {
        setDropdownOpen(false)
        setTrackerOpen(true)
    }

    const navLinks = [
        { path: '/',                   label: 'HOME',     ai: false },
        { path: '/collection',         label: 'COLLECTION', ai: false },
        { path: '/about',              label: 'ABOUT',    ai: false },
        { path: '/contact',            label: 'CONTACT',  ai: false },
        { path: '/ai-recommendations', label: 'AI PICKS', ai: true  },
    ]

    // All dropdown items with Order Tracker included
    const dropdownItems = [
        {
            label: 'My Profile',
            onClick: () => { setDropdownOpen(false); navigate('/profile') },
            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
        },
        {
            label: 'Orders',
            onClick: () => { setDropdownOpen(false); navigate('/orders') },
            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
        },
        {
            label: 'Order Tracker',
            onClick: openTracker,
            isTracker: true,
            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
        },
        {
            label: 'AI Picks',
            onClick: () => { setDropdownOpen(false); navigate('/ai-recommendations') },
            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
        },
        {
            label: 'Admin Panel',
            onClick: openAdminPanel,
            isAdmin: true,
            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
        },
        {
            label: 'Logout',
            onClick: logout,
            isDanger: true,
            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
        },
    ]

    return (
        <>
            <style>{`
                :root{--clr-cream:#F7EFE6;--clr-sand:#EDD8C4;--clr-terra:#C96A42;--clr-terra-dk:#A3512F;--clr-brown:#7A4A38;--clr-deep:#3D2318;--clr-sage:#98A98E;}
                .nb-root{background:var(--clr-cream);border-bottom:2px solid var(--clr-sand);padding:0 2.5rem;position:sticky;top:0;z-index:200;transition:box-shadow 0.3s,background 0.3s;}
                .nb-root.nb-scrolled{box-shadow:0 4px 20px rgba(61,35,24,0.12);background:rgba(247,239,230,0.97);backdrop-filter:blur(8px);}
                .nb-inner{display:flex;align-items:center;justify-content:space-between;padding:1rem 0;}
                .nb-menu{display:none;gap:1.8rem;list-style:none;margin:0;padding:0;}
                @media(min-width:640px){.nb-menu{display:flex;}}
                .nb-link{font-size:0.7rem;letter-spacing:0.12em;font-weight:700;color:var(--clr-brown);text-decoration:none;position:relative;padding-bottom:4px;transition:color 0.25s;white-space:nowrap;}
                .nb-link::after{content:'';position:absolute;bottom:0;left:50%;right:50%;height:2px;background:var(--clr-terra);border-radius:2px;transition:left 0.3s ease,right 0.3s ease;}
                .nb-link:hover,.nb-link.active{color:var(--clr-terra);}
                .nb-link:hover::after,.nb-link.active::after{left:0;right:0;}
                .nb-link-ai{font-size:0.68rem;letter-spacing:0.1em;font-weight:700;text-decoration:none;white-space:nowrap;background:linear-gradient(135deg,#3D2318,#7A4A38);color:#F7EFE6;padding:5px 12px;border-radius:20px;transition:box-shadow 0.25s,transform 0.2s;display:inline-flex;align-items:center;gap:3px;box-shadow:0 2px 10px rgba(61,35,24,0.22);}
                .nb-link-ai:hover{box-shadow:0 4px 18px rgba(61,35,24,0.38);transform:translateY(-1px);}
                .nb-link-ai.active{background:linear-gradient(135deg,#C96A42,#7A4A38);}
                .nb-actions{display:flex;align-items:center;gap:1.4rem;}
                .nb-icon-btn{background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;position:relative;}
                .nb-icon{width:20px;height:20px;filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%);transition:filter 0.2s,transform 0.2s;}
                .nb-icon-btn:hover .nb-icon,.nb-profile-btn.is-open .nb-icon{filter:invert(40%) sepia(50%) saturate(600%) hue-rotate(330deg) brightness(85%);transform:scale(1.12);}
                .nb-cart-wrap{position:relative;}
                .nb-cart-badge{position:absolute;right:-6px;bottom:-6px;width:17px;height:17px;background:var(--clr-terra);color:var(--clr-cream);font-size:8px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;}

                /* Dropdown */
                .nb-dropdown{position:absolute;right:0;top:calc(100% + 14px);background:var(--clr-cream);border:1.5px solid var(--clr-sand);box-shadow:0 16px 40px rgba(61,35,24,0.18);border-radius:16px;overflow:hidden;min-width:182px;z-index:500;}
                .nb-dropdown::before{content:'';position:absolute;top:-7px;right:14px;width:12px;height:12px;background:var(--clr-cream);border-left:1.5px solid var(--clr-sand);border-top:1.5px solid var(--clr-sand);transform:rotate(45deg);border-radius:2px 0 0 0;}
                .nb-dd-item{padding:11px 18px;font-size:0.82rem;color:var(--clr-brown);letter-spacing:0.04em;font-weight:600;cursor:pointer;border-bottom:1px solid rgba(237,216,196,0.55);transition:background 0.18s,color 0.18s,padding-left 0.2s;display:flex;align-items:center;gap:10px;}
                .nb-dd-item:last-child{border-bottom:none;}
                .nb-dd-item:hover{background:rgba(201,106,66,0.09);color:var(--clr-terra);padding-left:24px;}
                .nb-dd-item.is-danger{color:#C96A42;}
                .nb-dd-item.is-danger:hover{background:rgba(201,106,66,0.09);color:#A3512F;padding-left:24px;}
                .nb-dd-item.is-tracker{color:#7A4A38;}
                .nb-dd-item.is-tracker:hover{background:rgba(201,106,66,0.09);color:var(--clr-terra);padding-left:24px;}
                .nb-dd-item.is-admin{background:linear-gradient(135deg,rgba(61,35,24,0.04),rgba(122,74,56,0.06));color:var(--clr-deep);border-top:1px solid rgba(237,216,196,0.8);}
                .nb-dd-item.is-admin:hover{background:linear-gradient(135deg,rgba(61,35,24,0.1),rgba(201,106,66,0.1));color:var(--clr-deep);padding-left:24px;}
                .nb-dd-admin-badge{font-size:0.6rem;font-weight:700;letter-spacing:0.1em;background:#3D2318;color:#F7EFE6;padding:2px 7px;border-radius:10px;text-transform:uppercase;margin-left:auto;flex-shrink:0;}
                .nb-dd-tracker-badge{font-size:0.6rem;font-weight:700;background:rgba(201,106,66,0.15);color:#C96A42;padding:2px 7px;border-radius:10px;margin-left:auto;flex-shrink:0;border:1px solid rgba(201,106,66,0.25);}

                /* Sidebar */
                .nb-sidebar{position:fixed;top:0;right:0;height:100vh;background:var(--clr-cream);border-left:2px solid var(--clr-sand);box-shadow:-8px 0 32px rgba(61,35,24,0.15);z-index:400;display:flex;flex-direction:column;overflow:hidden;}
                .nb-sidebar-back{display:flex;align-items:center;gap:10px;padding:16px 20px;border-bottom:1px solid var(--clr-sand);cursor:pointer;color:var(--clr-brown);font-size:0.78rem;letter-spacing:0.1em;font-weight:700;transition:color 0.2s;background:none;border-left:none;border-right:none;border-top:none;font-family:inherit;}
                .nb-sidebar-back:hover{color:var(--clr-terra);}
                .nb-sidebar-back img{width:14px;filter:invert(30%) sepia(20%) saturate(900%) hue-rotate(340deg) brightness(75%);}
                .nb-sidebar-link{padding:15px 24px;font-size:0.78rem;letter-spacing:0.12em;font-weight:700;color:var(--clr-brown);text-decoration:none;border-bottom:1px solid rgba(237,216,196,0.6);transition:background 0.2s,color 0.2s,padding-left 0.2s;display:flex;align-items:center;gap:8px;cursor:pointer;}
                .nb-sidebar-link:hover{background:rgba(201,106,66,0.08);color:var(--clr-terra);padding-left:30px;}
                .nb-sidebar-ai{padding:15px 24px;font-size:0.78rem;letter-spacing:0.12em;font-weight:700;color:#C96A42;text-decoration:none;display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(237,216,196,0.6);transition:background 0.2s,padding-left 0.2s;}
                .nb-sidebar-ai:hover{background:rgba(201,106,66,0.08);padding-left:30px;}
                .nb-sidebar-admin{padding:14px 24px;font-size:0.78rem;letter-spacing:0.1em;font-weight:700;color:var(--clr-deep);display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(237,216,196,0.6);cursor:pointer;background:linear-gradient(135deg,rgba(61,35,24,0.04),rgba(122,74,56,0.06));transition:background 0.2s,padding-left 0.2s;}
                .nb-sidebar-admin:hover{background:rgba(61,35,24,0.1);padding-left:30px;}
                .nb-overlay{position:fixed;inset:0;background:rgba(61,35,24,0.35);z-index:399;backdrop-filter:blur(2px);}
                .nb-hamburger{display:flex;}
                @media(min-width:640px){.nb-hamburger{display:none;}}
            `}</style>

            {/* Sidebar overlay */}
            <AnimatePresence>
                {visible && (
                    <motion.div className="nb-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setVisible(false)} />
                )}
            </AnimatePresence>

            {/* NAV */}
            <motion.nav className={`nb-root ${scrolled ? 'nb-scrolled' : ''}`}
                initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <div className="nb-inner">

                    {/* LOGO */}
                    <Link to="/">
                        <motion.img src={assets.logo} alt="logo" style={{ width: 140, display: 'block' }}
                            whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} />
                    </Link>

                    {/* DESKTOP MENU */}
                    <ul className="nb-menu">
                        {navLinks.map(({ path, label, ai }, i) => (
                            <motion.li key={path} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}>
                                {ai ? (
                                    <NavLink to={path} className={({ isActive }) => `nb-link-ai${isActive ? ' active' : ''}`}>
                                        <SparkleIcon />{label}
                                    </NavLink>
                                ) : (
                                    <NavLink to={path} className={({ isActive }) => `nb-link${isActive ? ' active' : ''}`}>{label}</NavLink>
                                )}
                            </motion.li>
                        ))}
                    </ul>

                    {/* ACTIONS */}
                    <div className="nb-actions">
                        <motion.button className="nb-icon-btn" onClick={() => setShowSearch(true)} whileTap={{ scale: 0.88 }}>
                            <img src={assets.search_icon} alt="search" className="nb-icon" />
                        </motion.button>

                        {/* Profile + Dropdown */}
                        <div ref={dropdownRef} style={{ position: 'relative' }}>
                            <motion.button
                                className={`nb-icon-btn nb-profile-btn ${dropdownOpen ? 'is-open' : ''}`}
                                onClick={handleProfileClick} whileTap={{ scale: 0.88 }}
                                title={token ? 'My Account' : 'Login'}>
                                <img src={assets.profile_icon} alt="profile" className="nb-icon" />
                            </motion.button>

                            <AnimatePresence>
                                {token && dropdownOpen && (
                                    <motion.div className="nb-dropdown"
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                                        {dropdownItems.map(({ label, onClick, icon, isAdmin, isDanger, isTracker }) => (
                                            <div key={label}
                                                className={`nb-dd-item${isAdmin ? ' is-admin' : ''}${isDanger ? ' is-danger' : ''}${isTracker ? ' is-tracker' : ''}`}
                                                onClick={onClick}>
                                                {icon}
                                                {label}
                                                {isAdmin && <span className="nb-dd-admin-badge">↗ New Tab</span>}
                                                {isTracker && <span className="nb-dd-tracker-badge">Live</span>}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="nb-icon-btn nb-cart-wrap" style={{ textDecoration: 'none' }}>
                            <motion.img src={assets.cart_icon} alt="cart" className="nb-icon" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }} />
                            <AnimatePresence>
                                {getCartCount() > 0 && (
                                    <motion.span className="nb-cart-badge" key="badge"
                                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                        transition={{ type: 'spring', stiffness: 500 }}>
                                        {getCartCount()}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        {/* Hamburger */}
                        <motion.button className="nb-icon-btn nb-hamburger" onClick={() => setVisible(true)} whileTap={{ scale: 0.88 }}>
                            <img src={assets.menu_icon} alt="menu" className="nb-icon" />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* MOBILE SIDEBAR */}
            <AnimatePresence>
                {visible && (
                    <motion.div className="nb-sidebar"
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        style={{ width: 270 }}>
                        <button className="nb-sidebar-back" onClick={() => setVisible(false)}>
                            <img src={assets.dropdown_icon} alt="back" style={{ transform: 'rotate(180deg)' }} />
                            BACK
                        </button>

                        {navLinks.filter(n => !n.ai).map(({ path, label }, i) => (
                            <motion.div key={path} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.06 * i, duration: 0.3 }}>
                                <NavLink to={path} className="nb-sidebar-link" onClick={() => setVisible(false)}>{label}</NavLink>
                            </motion.div>
                        ))}

                        <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.28, duration: 0.3 }}>
                            <NavLink to="/ai-recommendations" className="nb-sidebar-ai" onClick={() => setVisible(false)}>
                                <SparkleIcon />AI PICKS
                            </NavLink>
                        </motion.div>

                        {token && (
                            <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.34, duration: 0.3 }}
                                style={{ marginTop: 'auto', borderTop: '1px solid rgba(237,216,196,0.8)' }}>
                                <div className="nb-sidebar-link" onClick={() => { setVisible(false); navigate('/profile') }}>MY PROFILE</div>
                                <div className="nb-sidebar-link" onClick={() => { setVisible(false); navigate('/orders') }}>ORDERS</div>
                                <div className="nb-sidebar-link" style={{ color: '#C96A42' }}
                                    onClick={() => { setVisible(false); setTrackerOpen(true) }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    ORDER TRACKER
                                    <span style={{ marginLeft: 'auto', fontSize: '0.6rem', background: 'rgba(201,106,66,0.15)', color: '#C96A42', padding: '2px 7px', borderRadius: 10, fontWeight: 700, border: '1px solid rgba(201,106,66,0.25)' }}>Live</span>
                                </div>
                                <div className="nb-sidebar-admin" onClick={() => { setVisible(false); openAdminPanel() }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                                        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                                    </svg>
                                    ADMIN PANEL
                                    <span style={{ marginLeft: 'auto', fontSize: '0.6rem', background: '#3D2318', color: '#F7EFE6', padding: '2px 7px', borderRadius: 10, fontWeight: 700 }}>↗</span>
                                </div>
                                <div className="nb-sidebar-link" style={{ color: '#C96A42', borderBottom: 'none' }} onClick={logout}>LOGOUT</div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ORDER TRACKER SLIDE-OVER */}
            <OrderTracker isOpen={trackerOpen} onClose={() => setTrackerOpen(false)} />
        </>
    )
}

export default Navbar