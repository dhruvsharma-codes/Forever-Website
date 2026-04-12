import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

// ── Sparkle SVG icon ──────────────────────────────────────────────────────────
const SparkleIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
            fill="#C96A42" stroke="#C96A42" strokeWidth="0.5" strokeLinejoin="round" />
        <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z"
            fill="#EDD8C4" stroke="#EDD8C4" strokeWidth="0.3" strokeLinejoin="round" />
        <path d="M5 15L5.6 16.4L7 17L5.6 17.6L5 19L4.4 17.6L3 17L4.4 16.4L5 15Z"
            fill="#98A98E" stroke="#98A98E" strokeWidth="0.3" strokeLinejoin="round" />
    </svg>
)

// ── Stat pill ─────────────────────────────────────────────────────────────────
const StatPill = ({ label, value, delay }) => (
    <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'rgba(201,106,66,0.08)', border: '1px solid rgba(201,106,66,0.2)', borderRadius: 12, padding: '12px 20px', minWidth: 100 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
    >
        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#C96A42', letterSpacing: '-0.02em' }}>{value}</span>
        <span style={{ fontSize: '0.68rem', color: '#7A4A38', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
    </motion.div>
)

// ── Product card ───────────────────────────────────────────────────────────────
const RecoCard = ({ product, index, currency, addToCart }) => {
    const [added, setAdded] = useState(false)

    const handleQuickAdd = (e) => {
        e.preventDefault()
        // Add with first available size for quick-add
        if (product.sizes && product.sizes.length > 0) {
            addToCart(product._id, product.sizes[0])
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            style={{ position: 'relative' }}
        >
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div
                    style={{ background: '#F7EFE6', border: '1.5px solid #EDD8C4', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 10px rgba(61,35,24,0.07)' }}
                    whileHover={{ borderColor: '#C96A42', boxShadow: '0 14px 36px rgba(61,35,24,0.16)' }}
                    transition={{ duration: 0.22 }}
                >
                    {/* AI badge */}
                    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, background: '#3D2318', color: '#F7EFE6', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', padding: '3px 9px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <SparkleIcon size={9} />
                        AI Pick
                    </div>

                    {/* Image */}
                    <div style={{ overflow: 'hidden', background: '#EDD8C4', aspectRatio: '1/1.1', position: 'relative' }}>
                        <motion.img
                            src={product.image[0]} alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        />
                        {product.bestseller && (
                            <span style={{ position: 'absolute', top: 10, left: 10, background: '#98A98E', color: '#F7EFE6', fontSize: '0.6rem', letterSpacing: '0.1em', fontWeight: 700, padding: '3px 10px', borderRadius: 60, textTransform: 'uppercase' }}>
                                Bestseller
                            </span>
                        )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: '12px 14px 14px' }}>
                        <p style={{ color: '#7A4A38', fontSize: '0.82rem', fontWeight: 500, margin: '0 0 4px', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {product.name}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p style={{ color: '#C96A42', fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>
                                {currency}{product.price}
                            </p>
                            <motion.button
                                onClick={handleQuickAdd}
                                style={{ background: added ? '#5CB85C' : '#3D2318', color: '#F7EFE6', border: 'none', borderRadius: 20, padding: '4px 12px', fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.06em', transition: 'background 0.2s', fontFamily: 'inherit' }}
                                whileTap={{ scale: 0.92 }}
                            >
                                {added ? '✓ Added' : '+ Cart'}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    )
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
const Skeleton = ({ index }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: index * 0.05 }}
        style={{ background: '#F7EFE6', border: '1.5px solid #EDD8C4', borderRadius: 18, overflow: 'hidden' }}
    >
        <style>{`
            @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
            .sk { background:linear-gradient(90deg,#EDD8C4 25%,#F7EFE6 50%,#EDD8C4 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; }
        `}</style>
        <div className="sk" style={{ aspectRatio: '1/1.1' }} />
        <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="sk" style={{ height: 14, borderRadius: 6, width: '75%' }} />
            <div className="sk" style={{ height: 12, borderRadius: 6, width: '40%' }} />
        </div>
    </motion.div>
)

// ── Main page ─────────────────────────────────────────────────────────────────
const AIRecommendations = () => {
    const { backendUrl, token, currency, navigate, addToCart } = useContext(ShopContext)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    const fetchRecommendations = async (isRefresh = false) => {
        if (!token) { navigate('/login'); return }
        isRefresh ? setRefreshing(true) : setLoading(true)
        setError(null)
        try {
            const res = await axios.post(
                `${backendUrl}/api/recommendations/ai`,
                {},
                { headers: { token } }
            )
            if (res.data.success) {
                setData(res.data)
            } else {
                setError(res.data.message || 'Could not load recommendations.')
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
            console.log(err)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        if (!token) { navigate('/login'); return }
        fetchRecommendations()
    }, [token])

    return (
        <>
            <style>{`
                .ai-page {
                    min-height: 80vh;
                    background: #F0E8DF;
                    padding: 0 0 4rem;
                }
                .ai-hero {
                    background: linear-gradient(135deg, #3D2318 0%, #7A4A38 50%, #C96A42 100%);
                    padding: 3rem 2rem 2.5rem;
                    position: relative;
                    overflow: hidden;
                }
                .ai-hero::before {
                    content: '';
                    position: absolute; top: -80px; right: -80px;
                    width: 260px; height: 260px; border-radius: 50%;
                    background: rgba(247,239,230,0.06); pointer-events: none;
                }
                .ai-hero::after {
                    content: '';
                    position: absolute; bottom: -50px; left: -50px;
                    width: 180px; height: 180px; border-radius: 50%;
                    background: rgba(152,169,142,0.1); pointer-events: none;
                }
                .ai-body { padding: 2rem 2rem 0; max-width: 1200px; margin: 0 auto; }
                .reco-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 1.25rem;
                    margin-top: 1.5rem;
                }
                @media(max-width:480px){ .reco-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }
                .refresh-btn {
                    display: inline-flex; align-items: center; gap: 8px;
                    background: transparent; border: 2px solid rgba(247,239,230,0.3);
                    color: rgba(247,239,230,0.85); padding: 9px 20px; border-radius: 60px;
                    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
                    text-transform: uppercase; cursor: pointer; font-family: inherit;
                    transition: background 0.2s, border-color 0.2s;
                }
                .refresh-btn:hover { background: rgba(247,239,230,0.12); border-color: rgba(247,239,230,0.5); }
                .refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                @keyframes spin360 { to { transform: rotate(360deg); } }
                .spinning { animation: spin360 0.9s linear infinite; }
                .reason-card {
                    background: #F7EFE6; border: 1.5px solid #EDD8C4;
                    border-radius: 14px; padding: 1rem 1.25rem;
                    display: flex; align-items: flex-start; gap: 12px;
                    margin-bottom: 0.5rem;
                }
            `}</style>

            <div className="ai-page">

                {/* ── HERO BANNER ── */}
                <div className="ai-hero">
                    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <motion.div
                            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <SparkleIcon size={22} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(247,239,230,0.7)', textTransform: 'uppercase' }}>
                                Powered by Claude AI
                            </span>
                        </motion.div>

                        <motion.h1
                            style={{ fontFamily: "'Georgia',serif", fontSize: 'clamp(1.6rem,4vw,2.4rem)', color: '#F7EFE6', margin: '0 0 8px', lineHeight: 1.2 }}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.55 }}
                        >
                            Your Personal<br />
                            <em style={{ color: '#EDD8C4' }}>Style Picks</em>
                        </motion.h1>

                        <motion.p
                            style={{ color: 'rgba(247,239,230,0.72)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 480, margin: '0 0 20px' }}
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18, duration: 0.5 }}
                        >
                            AI has analyzed your entire shopping history and curated products tailored specifically to your taste, budget, and style preferences.
                        </motion.p>

                        {/* Stats row */}
                        {data && !loading && (
                            <motion.div
                                style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ delay: 0.35, duration: 0.4 }}
                            >
                                <StatPill label="Orders Analyzed" value={data.profile.totalOrders} delay={0.4} />
                                {data.profile.topCategory && (
                                    <StatPill label="Top Category" value={data.profile.topCategory} delay={0.47} />
                                )}
                                {data.profile.priceRange.avg > 0 && (
                                    <StatPill label="Avg Spend" value={`₹${data.profile.priceRange.avg}`} delay={0.54} />
                                )}
                                <StatPill label="Products Found" value={data.recommendations.length} delay={0.61} />
                            </motion.div>
                        )}

                        <motion.button
                            className="refresh-btn"
                            onClick={() => fetchRecommendations(true)}
                            disabled={refreshing || loading}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <svg
                                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                className={refreshing ? 'spinning' : ''}
                            >
                                <polyline points="23 4 23 10 17 10" />
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                            </svg>
                            {refreshing ? 'Refreshing…' : 'Refresh Picks'}
                        </motion.button>
                    </div>
                </div>

                {/* ── BODY ── */}
                <div className="ai-body">

                    {/* Loading state */}
                    {loading && (
                        <>
                            <motion.div
                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '1.5rem 0 0.5rem' }}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            >
                                <div style={{ width: 18, height: 18, border: '2.5px solid #EDD8C4', borderTopColor: '#C96A42', borderRadius: '50%' }} className="spinning" />
                                <p style={{ color: '#7A4A38', fontSize: '0.88rem', fontWeight: 600 }}>
                                    AI is analyzing your shopping history…
                                </p>
                            </motion.div>
                            <div className="reco-grid">
                                {[...Array(8)].map((_, i) => <Skeleton key={i} index={i} />)}
                            </div>
                        </>
                    )}

                    {/* Error state */}
                    {!loading && error && (
                        <motion.div
                            style={{ textAlign: 'center', padding: '4rem 2rem' }}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>◎</div>
                            <p style={{ color: '#7A4A38', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>{error}</p>
                            <motion.button
                                onClick={() => fetchRecommendations()}
                                style={{ background: '#C96A42', color: '#F7EFE6', border: 'none', borderRadius: 50, padding: '12px 28px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            >
                                Try Again
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Recommendations */}
                    {!loading && !error && data && (
                        <>
                            {/* AI Reason card */}
                            <motion.div
                                className="reason-card"
                                style={{ marginTop: '1.5rem' }}
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45 }}
                            >
                                <div style={{ flexShrink: 0, marginTop: 2 }}>
                                    <SparkleIcon size={18} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#C96A42', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                                        {data.isNewUser ? 'Welcome! Here are our top picks for you' : 'Why these products?'}
                                    </p>
                                    <p style={{ fontSize: '0.84rem', color: '#7A4A38', lineHeight: 1.65, margin: 0 }}>
                                        {data.isNewUser
                                            ? "Since you're new here, we've curated a mix of our bestsellers and most-loved products to help you discover your style."
                                            : data.reason
                                        }
                                    </p>
                                </div>
                            </motion.div>

                            {/* Section header */}
                            <motion.div
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div>
                                    <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.16em', color: '#C96A42', textTransform: 'uppercase', marginBottom: 4 }}>
                                        Curated For You
                                    </p>
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#3D2318', fontFamily: "'Georgia',serif", margin: 0 }}>
                                        {data.recommendations.length} Recommended Products
                                    </h2>
                                </div>
                                <Link
                                    to="/collection"
                                    style={{ fontSize: '0.78rem', color: '#C96A42', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid #EDAC8E' }}
                                >
                                    Browse All →
                                </Link>
                            </motion.div>

                            {/* Product grid */}
                            <AnimatePresence>
                                <div className="reco-grid">
                                    {data.recommendations.map((product, index) => (
                                        <RecoCard
                                            key={product._id}
                                            product={product}
                                            index={index}
                                            currency={currency}
                                            addToCart={addToCart}
                                        />
                                    ))}
                                </div>
                            </AnimatePresence>

                            {/* Bottom CTA */}
                            <motion.div
                                style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: '#F7EFE6', borderRadius: 16, border: '1.5px solid #EDD8C4' }}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.5 }}
                            >
                                <SparkleIcon size={28} />
                                <h3 style={{ fontFamily: "'Georgia',serif", fontSize: '1.2rem', color: '#3D2318', margin: '12px 0 6px' }}>
                                    Not finding what you love?
                                </h3>
                                <p style={{ color: '#7A4A38', fontSize: '0.84rem', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                                    Shop more to help AI understand your style better, or browse our full collection.
                                </p>
                                <Link to="/collection">
                                    <motion.button
                                        style={{ background: '#C96A42', color: '#F7EFE6', border: 'none', borderRadius: 50, padding: '12px 30px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(201,106,66,0.3)' }}
                                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                    >
                                        Explore Full Collection
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default AIRecommendations



