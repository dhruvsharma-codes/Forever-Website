import React, { useState, useEffect, useRef, useCallback } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { motion, AnimatePresence } from 'framer-motion'
import OrderTracker from './OrderTracker'

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'

/* ── Icon set ────────────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)
const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const SparkleIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
  </svg>
)
const ChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

/* ── Nav config ─────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/collection', label: 'Collection' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

/* ── Announcement bar ────────────────────────────────────────────────────── */
const AnnouncementBar = () => (
  <div style={{
    background: 'var(--espresso)',
    color: 'rgba(250,247,242,0.8)',
    textAlign: 'center',
    padding: '8px 16px',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-body)',
  }}>
    ☀️ Summer Sale — 10% off Bottomwear & Winterwear · Auto-applied at checkout
  </div>
)

const Navbar = () => {
  const location = useLocation()
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const [drawerOpen, setDrawerOpen]   = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [trackerOpen, setTrackerOpen] = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => { setDrawerOpen(false); setDropdownOpen(false) }, [location])
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])
  useEffect(() => { if (!token) setDropdownOpen(false) }, [token])
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') { setDrawerOpen(false); setDropdownOpen(false); setSearchOpen(false) }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100)
  }, [searchOpen])

  const logout = useCallback(() => {
    setDropdownOpen(false); setDrawerOpen(false)
    navigate('/login')
    localStorage.removeItem('token')
    setToken(''); setCartItems({})
  }, [navigate, setToken, setCartItems])

  const openTracker = useCallback(() => setTrackerOpen(true), [])
  const openAdminPanel = useCallback(() => window.open(ADMIN_URL, '_blank', 'noopener,noreferrer'), [])
  const handleProfileClick = useCallback(() => {
    if (!token) navigate('/login')
    else setDropdownOpen(p => !p)
  }, [token, navigate])

  const cartCount = getCartCount()

  const DROPDOWN_ITEMS = [
    { label: 'My Profile', emoji: '👤', onClick: () => { setDropdownOpen(false); navigate('/profile') } },
    { label: 'Orders', emoji: '📦', onClick: () => { setDropdownOpen(false); navigate('/orders') } },
    { label: 'Order Tracker', emoji: '🕐', badge: 'Live', badgeLive: true, onClick: () => { setDropdownOpen(false); openTracker() } },
    { label: 'AI Picks', emoji: '✨', onClick: () => { setDropdownOpen(false); navigate('/ai-recommendations') } },
    { label: 'Style by Skin Tone', emoji: '🎨',
  onClick: () => { setDropdownOpen(false); navigate('/skin-tone') } },
    { label: 'Admin Panel', emoji: '⚙️', badge: '↗', isAdmin: true, onClick: () => { setDropdownOpen(false); openAdminPanel() } },
    { label: 'Logout', emoji: '🚪', isDanger: true, onClick: logout },
  ]

  return (
    <>
      <style>{`
        /* ─── Announcement ─── */
        .nb-announce { }

        /* ─── Navbar base ─── */
        .nb {
          position: sticky;
          top: 0;
          z-index: 500;
          height: 68px;
          display: flex;
          align-items: center;
          padding: 0 clamp(1rem, 4vw, 3rem);
          background: rgba(250, 247, 242, 0.85);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(212, 197, 176, 0.4);
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }
        .nb.nb-scrolled {
          box-shadow: 0 4px 32px rgba(44, 24, 16, 0.1);
          background: rgba(250, 247, 242, 0.96);
        }
        .nb-inner {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ─── Logo ─── */
        .nb-logo img { height: 26px; width: auto; display: block; opacity: 1; transition: opacity 0.2s; }
        .nb-logo:hover img { opacity: 0.75; }

        /* ─── Desktop links ─── */
        .nb-links {
          display: none;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: clamp(1.2rem, 2.5vw, 2.2rem);
          align-items: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        @media (min-width: 1024px) { .nb-links { display: flex; } }

        /* ─── Actions ─── */
        .nb-actions {
          display: flex;
          align-items: center;
          gap: clamp(4px, 1.5vw, 16px);
        }

        /* ─── Icon button ─── */
        .nb-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--bark);
          transition: all 0.18s ease;
          -webkit-tap-highlight-color: transparent;
          position: relative;
          text-decoration: none;
        }
        .nb-btn:hover {
          background: rgba(201, 106, 66, 0.1);
          color: var(--terra);
        }
        .nb-btn.active {
          background: rgba(201, 106, 66, 0.12);
          color: var(--terra);
        }
        .nb-btn:active { transform: scale(0.92); }

        /* ─── Cart badge ─── */
        .nb-cart-badge {
          position: absolute;
          top: 1px;
          right: 1px;
          width: 17px;
          height: 17px;
          background: var(--terra);
          color: var(--cream);
          font-family: var(--font-body);
          font-size: 0.6rem;
          font-weight: 700;
          border-radius: 50%;
          border: 2px solid var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        /* ─── AI pill ─── */
        .nb-link-ai {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          background: var(--espresso);
          color: var(--cream);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          transition: all 0.22s ease;
          box-shadow: 0 2px 10px rgba(44, 24, 16, 0.18);
          white-space: nowrap;
        }
        .nb-link-ai:hover {
          background: var(--terra);
          box-shadow: var(--shadow-terra);
          transform: translateY(-1px);
        }
        .nb-link-ai.active { background: var(--terra); }

        /* ─── Hamburger ─── */
        .nb-hamburger { display: flex; }
        @media (min-width: 1024px) { .nb-hamburger { display: none; } }

        /* ─── Dropdown ─── */
        .nb-dropdown-wrap { position: relative; }
        .nb-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          right: 0;
          background: var(--cream);
          border: 1px solid var(--cream-deeper);
          border-radius: var(--radius-lg);
          overflow: hidden;
          min-width: 210px;
          z-index: 600;
          box-shadow: var(--shadow-xl);
        }
        .nb-dropdown::before {
          content: '';
          position: absolute;
          top: -7px;
          right: 16px;
          width: 13px;
          height: 13px;
          background: var(--cream);
          border-left: 1px solid var(--cream-deeper);
          border-top: 1px solid var(--cream-deeper);
          transform: rotate(45deg);
          border-radius: 2px 0 0 0;
        }
        .nb-dd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          font-family: var(--font-body);
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--bark);
          cursor: pointer;
          border-bottom: 1px solid rgba(212, 197, 176, 0.4);
          transition: all 0.16s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-dd-item:last-child { border-bottom: none; }
        .nb-dd-item:hover {
          background: rgba(201, 106, 66, 0.06);
          color: var(--terra);
          padding-left: 20px;
        }
        .nb-dd-item.is-admin { background: rgba(44, 24, 16, 0.03); font-weight: 600; color: var(--espresso); }
        .nb-dd-item.is-admin:hover { background: rgba(44, 24, 16, 0.08); padding-left: 20px; }
        .nb-dd-item.is-danger { color: #c0392b; }
        .nb-dd-item.is-danger:hover { background: rgba(192, 57, 43, 0.06); color: #922b21; }
        .nb-dd-badge {
          margin-left: auto;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          flex-shrink: 0;
        }
        .nb-dd-badge-live {
          background: rgba(201, 106, 66, 0.12);
          color: var(--terra);
          border: 1px solid rgba(201, 106, 66, 0.25);
        }
        .nb-dd-badge-ext { background: var(--espresso); color: var(--cream); }

        /* ─── Overlay ─── */
        .nb-overlay {
          position: fixed;
          inset: 0;
          z-index: 700;
          background: rgba(44, 24, 16, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* ─── Drawer ─── */
        .nb-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 800;
          background: var(--cream);
          border-left: 1px solid var(--cream-deeper);
          box-shadow: -16px 0 64px rgba(44, 24, 16, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          width: min(340px, 90vw);
        }
        .nb-drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 68px;
          flex-shrink: 0;
          border-bottom: 1px solid var(--cream-deeper);
          background: linear-gradient(135deg, var(--espresso) 0%, var(--espresso-mid) 60%, var(--bark) 100%);
        }
        .nb-drawer-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--cream);
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .nb-drawer-close {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: rgba(250, 247, 242, 0.12);
          border: 1px solid rgba(250, 247, 242, 0.18);
          color: rgba(250, 247, 242, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-drawer-close:hover { background: rgba(250, 247, 242, 0.22); }
        .nb-drawer-body { flex: 1; overflow-y: auto; }
        .nb-drawer-body::-webkit-scrollbar { width: 3px; }
        .nb-drawer-body::-webkit-scrollbar-thumb { background: var(--sand); }
        .nb-drawer-section {
          padding: 14px 20px 4px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--mist);
          text-transform: uppercase;
          font-family: var(--font-body);
        }
        .nb-drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 20px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--bark);
          text-decoration: none;
          cursor: pointer;
          border-bottom: 1px solid rgba(212, 197, 176, 0.4);
          transition: all 0.16s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-drawer-link:hover, .nb-drawer-link.active {
          background: rgba(201, 106, 66, 0.06);
          color: var(--terra);
          padding-left: 26px;
        }
        .nb-drawer-link-ai {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 13px 20px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--terra);
          text-decoration: none;
          cursor: pointer;
          border-bottom: 1px solid rgba(212, 197, 176, 0.4);
          transition: all 0.16s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-drawer-link-ai:hover { background: rgba(201, 106, 66, 0.06); padding-left: 26px; }
        .nb-drawer-account { border-top: 2px solid var(--cream-deeper); background: rgba(212, 197, 176, 0.12); }
        .nb-drawer-account-header {
          padding: 14px 20px 4px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--mist);
          text-transform: uppercase;
          font-family: var(--font-body);
        }
        .nb-drawer-acct-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--bark);
          cursor: pointer;
          border-bottom: 1px solid rgba(212, 197, 176, 0.35);
          transition: all 0.16s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-drawer-acct-item:last-child { border-bottom: none; }
        .nb-drawer-acct-item:hover { background: rgba(201, 106, 66, 0.06); color: var(--terra); }
        .nb-drawer-acct-item.is-admin { background: rgba(44, 24, 16, 0.04); font-weight: 600; color: var(--espresso); }
        .nb-drawer-acct-item.is-tracker { color: var(--terra); }
        .nb-drawer-acct-item.is-danger { color: #c0392b; }
        .nb-drawer-acct-item.is-danger:hover { background: rgba(192, 57, 43, 0.06); }
        .nb-drawer-acct-badge { margin-left: auto; font-size: 0.6rem; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-full); flex-shrink: 0; }
        .nb-drawer-acct-badge.live { background: rgba(201, 106, 66, 0.12); color: var(--terra); border: 1px solid rgba(201, 106, 66, 0.25); }
        .nb-drawer-acct-badge.ext { background: var(--espresso); color: var(--cream); }
        .nb-drawer-login-cta {
          margin: 16px 20px;
          background: linear-gradient(135deg, var(--espresso), var(--terra));
          border-radius: var(--radius-lg);
          padding: 20px 18px;
          text-align: center;
          cursor: pointer;
          transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-drawer-login-cta:hover { opacity: 0.9; }

        /* ─── Search bar ─── */
        .nb-search-bar {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(250, 247, 242, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--cream-deeper);
          padding: 12px clamp(1rem, 4vw, 3rem);
          box-shadow: 0 8px 32px rgba(44, 24, 16, 0.08);
          z-index: 499;
          overflow: hidden;
        }
        .nb-search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border: 1.5px solid var(--cream-deeper);
          border-radius: var(--radius-full);
          padding: 10px 18px;
          max-width: 520px;
          margin: 0 auto;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .nb-search-wrap:focus-within {
          border-color: var(--terra);
          box-shadow: 0 0 0 3px rgba(201, 106, 66, 0.1);
        }
        .nb-search-inp {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--espresso);
          min-width: 0;
        }
        .nb-search-inp::placeholder { color: var(--mist); }
      `}</style>

      {/* Announcement bar */}
      <AnnouncementBar />

      {/* Backdrop */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div className="nb-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── NAVBAR ── */}
      <motion.nav
        className={`nb${scrolled ? ' nb-scrolled' : ''}`}
        style={{ position: 'sticky' }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nb-inner">

          {/* Logo */}
          <Link to="/" className="nb-logo" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <motion.img src={assets.logo} alt="Forever"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            />
          </Link>

          {/* Desktop nav */}
          <ul className="nb-links">
            {NAV_LINKS.map(({ path, label }, i) => (
              <motion.li key={path} style={{ listStyle: 'none' }}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05 }}>
                <NavLink to={path} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  {label}
                </NavLink>
              </motion.li>
            ))}
            <motion.li style={{ listStyle: 'none' }}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}>
              <NavLink to="/ai-recommendations"
                className={({ isActive }) => `nb-link-ai${isActive ? ' active' : ''}`}>
                <SparkleIcon />AI Picks
              </NavLink>
            </motion.li>
          </ul>

          {/* Actions */}
          <div className="nb-actions">

            {/* Search */}
            <motion.button
              className={`nb-btn${searchOpen ? ' active' : ''}`}
              onClick={() => { setSearchOpen(p => !p); setShowSearch(true) }}
              whileTap={{ scale: 0.88 }}
              aria-label="Search"
            >
              <SearchIcon />
            </motion.button>

            {/* Profile dropdown */}
            <div ref={dropdownRef} className="nb-dropdown-wrap">
              <motion.button
                className={`nb-btn${dropdownOpen ? ' active' : ''}`}
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
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {DROPDOWN_ITEMS.map(({ label, emoji, badge, badgeLive, isAdmin, isDanger, onClick }) => (
                      <motion.div
                        key={label}
                        className={`nb-dd-item${isAdmin ? ' is-admin' : ''}${isDanger ? ' is-danger' : ''}`}
                        onClick={onClick}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{emoji}</span>
                        <span>{label}</span>
                        {badge && (
                          <span className={`nb-dd-badge ${badgeLive ? 'nb-dd-badge-live' : 'nb-dd-badge-ext'}`}>
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
              <Link to="/cart" className="nb-btn" aria-label={`Cart — ${cartCount} items`}
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

            {/* Hamburger */}
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

        {/* Inline search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div className="nb-search-bar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="nb-search-wrap">
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  className="nb-search-inp"
                  placeholder="Search products, categories…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { navigate('/collection'); setSearchOpen(false) }
                  }}
                />
                <motion.button onClick={() => setSearchOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mist)', display: 'flex', padding: 2 }}
                  whileTap={{ scale: 0.9 }}>
                  <XIcon />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── DRAWER ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            className="nb-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            aria-label="Navigation menu"
          >
            <div className="nb-drawer-head">
              <span className="nb-drawer-title">Forever</span>
              <button className="nb-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                <XIcon />
              </button>
            </div>

            <div className="nb-drawer-body">
              <div className="nb-drawer-section">Navigate</div>

              {NAV_LINKS.map(({ path, label }, i) => (
                <motion.div key={path}
                  initial={{ x: 28, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i, duration: 0.28 }}>
                  <NavLink to={path}
                    className={({ isActive }) => `nb-drawer-link${isActive ? ' active' : ''}`}
                    onClick={() => setDrawerOpen(false)}>
                    <span>{label}</span>
                    <ChevronRight />
                  </NavLink>
                </motion.div>
              ))}

              {/* AI Picks */}
              <motion.div initial={{ x: 28, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.18 }}>
                <NavLink to="/ai-recommendations"
                  className={({ isActive }) => `nb-drawer-link-ai${isActive ? ' active' : ''}`}
                  onClick={() => setDrawerOpen(false)}>
                  <SparkleIcon size={13} />
                  <span>AI Picks</span>
                  <span style={{
                    marginLeft: 'auto', fontSize: '0.6rem', background: 'rgba(201,106,66,0.12)',
                    color: 'var(--terra)', padding: '2px 8px', borderRadius: 'var(--radius-full)',
                    fontWeight: 700, border: '1px solid rgba(201,106,66,0.22)'
                  }}>New</span>
                </NavLink>
              </motion.div>

              {/* Summer sale */}
              <motion.div initial={{ x: 28, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.22 }}>
                <NavLink to="/summer-sale"
                  className={({ isActive }) => `nb-drawer-link${isActive ? ' active' : ''}`}
                  onClick={() => setDrawerOpen(false)}>
                  <span>☀️ Summer Sale</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.6rem', background: 'var(--terra)', color: 'var(--cream)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>10% OFF</span>
                </NavLink>
              </motion.div>

              {/* Account section */}
              <motion.div className="nb-drawer-account"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                {token ? (
                  <>
                    <div className="nb-drawer-account-header">My Account</div>
                    {[
                      { label: 'My Profile', emoji: '👤', onClick: () => { setDrawerOpen(false); navigate('/profile') } },
                      { label: 'My Orders', emoji: '📦', onClick: () => { setDrawerOpen(false); navigate('/orders') } },
                      { label: 'Order Tracker', emoji: '🕐', badge: 'Live', badgeLive: true, isTracker: true, onClick: () => { setDrawerOpen(false); openTracker() } },
                      { label: 'Admin Panel', emoji: '⚙️', badge: '↗', isAdmin: true, onClick: () => { setDrawerOpen(false); openAdminPanel() } },
                      { label: 'Logout', emoji: '🚪', isDanger: true, onClick: logout },
                    ].map(({ label, emoji, badge, badgeLive, isAdmin, isDanger, isTracker, onClick }) => (
                      <div key={label}
                        className={`nb-drawer-acct-item${isAdmin ? ' is-admin' : ''}${isDanger ? ' is-danger' : ''}${isTracker ? ' is-tracker' : ''}`}
                        onClick={onClick}>
                        <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
                        <span>{label}</span>
                        {badge && (
                          <span className={`nb-drawer-acct-badge ${badgeLive ? 'live' : 'ext'}`} style={{ marginLeft: 'auto' }}>
                            {badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="nb-drawer-login-cta" onClick={() => { setDrawerOpen(false); navigate('/login') }}>
                    <p style={{ fontSize: '0.68rem', color: 'rgba(250,247,242,0.65)', margin: '0 0 6px', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                      Welcome to Forever
                    </p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--cream)', margin: '0 0 14px', fontWeight: 600 }}>
                      Sign in to your account
                    </p>
                    <div style={{ background: 'var(--cream)', color: 'var(--espresso)', borderRadius: 'var(--radius-full)', padding: '9px 24px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-block', letterSpacing: '0.08em', fontFamily: 'var(--font-body)' }}>
                      Login / Sign Up →
                    </div>
                  </div>
                )}
              </motion.div>

              <div style={{ height: 32 }} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Order Tracker */}
      <OrderTracker isOpen={trackerOpen} onClose={() => setTrackerOpen(false)} />
    </>
  )
}

export default Navbar