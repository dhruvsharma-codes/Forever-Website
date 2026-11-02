import React, { useContext, useState, useMemo } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Skin tone data ───────────────────────────────────────────────────────────
const SKIN_TONES = [
    {
        id: 'fair',
        label: 'Fair',
        hindiLabel: 'गोरी',
        emoji: '🌸',
        swatch: '#FDDBB4',
        swatchDark: '#F5C09A',
        description: 'Light, often with pink or peachy undertones',
        bestColors: {
            topwear: ['Navy Blue', 'Deep Burgundy', 'Forest Green', 'Soft Lavender', 'Dusty Rose', 'Teal', 'Royal Blue'],
            bottomwear: ['Dark Navy', 'Charcoal Grey', 'Deep Olive', 'Rich Brown', 'Black', 'Dark Burgundy'],
            winterwear: ['Deep Plum', 'Forest Green', 'Navy', 'Cream', 'Camel', 'Rust'],
            womens: ['Blush Pink', 'Sage Green', 'Dusty Mauve', 'Soft Lavender', 'Ivory', 'Navy', 'Berry'],
        },
        avoidColors: ['Neon Yellow', 'Orange', 'Very Pale Beige', 'Washed Out White', 'Nude close to skin'],
        colorHexBest: ['#1a237e', '#6d1b34', '#1b5e20', '#b39ddb', '#f48fb1', '#00695c', '#1565c0'],
        colorHexAvoid: ['#ffff00', '#ff6600', '#f5f5dc', '#fffde7', '#f0d9b5'],
        tip: 'Deep and jewel tones make your complexion glow. Avoid colors too close to your skin tone as they can wash you out.',
    },
    {
        id: 'light',
        label: 'Light',
        hindiLabel: 'हल्की',
        emoji: '🌼',
        swatch: '#F2C589',
        swatchDark: '#E8A96A',
        description: 'Light-medium, warm golden or neutral undertones',
        bestColors: {
            topwear: ['Olive Green', 'Warm Rust', 'Coral', 'Earthy Brown', 'Mustard', 'Terracotta', 'Sky Blue'],
            bottomwear: ['Medium Blue Denim', 'Khaki', 'Olive', 'Caramel Brown', 'Dark Grey', 'Warm Beige'],
            winterwear: ['Camel', 'Burgundy', 'Burnt Orange', 'Warm Olive', 'Chocolate Brown', 'Amber'],
            womens: ['Coral', 'Peach', 'Warm Yellow', 'Terracotta', 'Sage Green', 'Off-white', 'Rust'],
        },
        avoidColors: ['Pale Yellow', 'Light Beige', 'Washed Pastels', 'Very Pale Grey'],
        colorHexBest: ['#558b2f', '#bf360c', '#ff7043', '#5d4037', '#f9a825', '#bf6020', '#0288d1'],
        colorHexAvoid: ['#fff9c4', '#f5f5dc', '#e8eaf6', '#f9f9f9'],
        tip: 'Earthy and warm tones complement your natural warmth beautifully. Rich autumnal colors are your best friends.',
    },
    {
        id: 'medium',
        label: 'Medium / Wheatish',
        hindiLabel: 'गेहुंआ',
        emoji: '🌻',
        swatch: '#D4925A',
        swatchDark: '#C07840',
        description: 'Medium brown, warm or neutral undertones — most common in India',
        bestColors: {
            topwear: ['White', 'Bright Red', 'Royal Blue', 'Emerald Green', 'Hot Pink', 'Bright Yellow', 'Purple'],
            bottomwear: ['White', 'Classic Blue Denim', 'Dark Brown', 'Black', 'Khaki', 'Navy'],
            winterwear: ['Rich Red', 'Cobalt Blue', 'Bright Purple', 'Forest Green', 'Mustard Yellow', 'Orange'],
            womens: ['Bright Coral', 'Hot Pink', 'Vibrant Red', 'Emerald', 'Royal Blue', 'Golden Yellow', 'Turquoise'],
        },
        avoidColors: ['Very Dark Shades only', 'Dull Brown too close to skin', 'Muddy Khaki'],
        colorHexBest: ['#ffffff', '#c62828', '#1565c0', '#1b5e20', '#ec407a', '#f9a825', '#6a1b9a'],
        colorHexAvoid: ['#3e2723', '#795548', '#8d6e63', '#a1887f'],
        tip: 'You can pull off bold brights and vibrant colors effortlessly! Jewel tones and whites look stunning on you.',
    },
    {
        id: 'tan',
        label: 'Tan / Olive',
        hindiLabel: 'सांवली',
        emoji: '🌴',
        swatch: '#B07040',
        swatchDark: '#8D5A30',
        description: 'Tan or olive, warm medium-dark undertones',
        bestColors: {
            topwear: ['Gold', 'Bright Orange', 'Fuchsia', 'Lime Green', 'Cobalt Blue', 'Bright Red', 'Turquoise'],
            bottomwear: ['White', 'Cream', 'Light Denim', 'Beige', 'Khaki', 'Olive Green'],
            winterwear: ['Golden Yellow', 'Burnt Orange', 'Olive Green', 'Warm Red', 'Teal', 'Camel'],
            womens: ['Gold', 'Fuchsia', 'Bright Orange', 'Coral', 'Lime Green', 'Turquoise', 'Ivory'],
        },
        avoidColors: ['Dark Brown', 'Very Dark Navy', 'Dull Grey', 'Muddy colours'],
        colorHexBest: ['#ffd700', '#e65100', '#e91e63', '#cddc39', '#1565c0', '#d32f2f', '#00838f'],
        colorHexAvoid: ['#3e2723', '#1a237e', '#424242', '#795548'],
        tip: 'Warm, bright, and tropical colors make your skin radiate. Gold and warm tones are especially magical on you.',
    },
    {
        id: 'dark',
        label: 'Dark / Deep',
        hindiLabel: 'डार्क',
        emoji: '✨',
        swatch: '#7A4828',
        swatchDark: '#5C3218',
        description: 'Deep brown or rich dark complexion',
        bestColors: {
            topwear: ['Bright White', 'Electric Blue', 'Neon Green', 'Hot Pink', 'Golden Yellow', 'Bright Purple', 'Orange'],
            bottomwear: ['Bright White', 'Off-white', 'Light Denim', 'Cream', 'Bright Navy', 'Teal'],
            winterwear: ['Cobalt Blue', 'Bright Red', 'Electric Purple', 'Emerald', 'Golden Yellow', 'Hot Pink'],
            womens: ['Brilliant White', 'Electric Blue', 'Fuchsia', 'Neon Yellow', 'Gold', 'Coral Red', 'Cobalt'],
        },
        avoidColors: ['Very Dark Brown', 'Dark Maroon', 'Dull Grey', 'Dark Forest Green alone'],
        colorHexBest: ['#ffffff', '#1565c0', '#00e676', '#e91e63', '#ffd700', '#aa00ff', '#ff6d00'],
        colorHexAvoid: ['#3e2723', '#880e4f', '#424242', '#1b5e20'],
        tip: 'You look absolutely stunning in bright, bold, and high-contrast colors! White, electric blues and yellows make you glow.',
    },
    {
        id: 'deep',
        label: 'Very Deep / Ebony',
        hindiLabel: 'एबनी',
        emoji: '💫',
        swatch: '#4A2810',
        swatchDark: '#321A08',
        description: 'Rich ebony and very deep complexion',
        bestColors: {
            topwear: ['Pure White', 'Neon Colours', 'Bright Yellow', 'Electric Blue', 'Hot Pink', 'Red', 'Gold'],
            bottomwear: ['White', 'Cream', 'Bright Blue', 'Light Grey', 'Beige', 'Pastels'],
            winterwear: ['Brilliant White', 'Cobalt', 'Vivid Red', 'Neon Green', 'Golden Yellow', 'Electric Purple'],
            womens: ['Pure White', 'Neon Pink', 'Gold', 'Royal Blue', 'Bright Red', 'Vivid Yellow', 'Turquoise'],
        },
        avoidColors: ['Black', 'Very Dark Brown', 'Dark Navy', 'Deep Maroon'],
        colorHexBest: ['#ffffff', '#ff6f00', '#fdd835', '#1565c0', '#e91e63', '#d32f2f', '#ffc400'],
        colorHexAvoid: ['#000000', '#3e2723', '#1a237e', '#880e4f'],
        tip: 'High-contrast and vivid colors make you absolutely radiate! Avoid very dark shades and embrace the brightest hues.',
    },
]

// ─── Color keyword matching ───────────────────────────────────────────────────
const COLOR_KEYWORDS = {
    white: ['white', 'cream', 'ivory', 'off-white', 'snow'],
    black: ['black', 'noir', 'onyx', 'charcoal', 'ebony'],
    blue: ['blue', 'navy', 'cobalt', 'royal blue', 'sky blue', 'denim', 'indigo', 'teal'],
    red: ['red', 'crimson', 'maroon', 'ruby', 'scarlet', 'wine', 'burgundy'],
    green: ['green', 'olive', 'forest', 'emerald', 'sage', 'mint', 'lime'],
    yellow: ['yellow', 'mustard', 'gold', 'golden', 'amber', 'lemon'],
    pink: ['pink', 'rose', 'blush', 'fuchsia', 'magenta', 'coral', 'peach', 'mauve'],
    orange: ['orange', 'rust', 'terracotta', 'burnt', 'tangerine'],
    purple: ['purple', 'lavender', 'violet', 'plum', 'berry', 'lilac'],
    brown: ['brown', 'camel', 'tan', 'beige', 'khaki', 'mocha', 'chocolate'],
    grey: ['grey', 'gray', 'slate', 'silver', 'ash'],
}

const getProductColorMatch = (product, toneColors) => {
    const text = (product.name + ' ' + (product.description || '')).toLowerCase()
    let score = 0
    toneColors.forEach(colorPhrase => {
        const lower = colorPhrase.toLowerCase()
        // Direct match
        if (text.includes(lower)) { score += 3; return }
        // Match by color family
        for (const [family, keywords] of Object.entries(COLOR_KEYWORDS)) {
            if (keywords.some(k => lower.includes(k) || k.includes(lower.split(' ')[0]))) {
                if (keywords.some(k => text.includes(k))) { score += 2; return }
            }
        }
    })
    return score
}

// ─── Product mini card ────────────────────────────────────────────────────────
const ProductCard = ({ product, currency, discountedPrice, onSale, score }) => (
    <motion.div
        whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(61,35,24,0.14)' }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: 'relative' }}
    >
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="st-card">
                {score > 3 && (
                    <span className="st-card-match">✦ Great Match</span>
                )}
                {onSale && <span className="st-card-sale">SALE</span>}
                <div className="st-card-img">
                    <img src={product.image[0]} alt={product.name} loading="lazy" />
                </div>
                <div className="st-card-body">
                    <p className="st-card-name">{product.name}</p>
                    <div className="st-card-price-row">
                        <span className="st-card-price">{currency}{discountedPrice.toFixed(0)}</span>
                        {onSale && <span className="st-card-orig">{currency}{product.price}</span>}
                    </div>
                    <span className="st-card-sub">{product.subCategory}</span>
                </div>
            </div>
        </Link>
    </motion.div>
)

// ─── Color swatch row ─────────────────────────────────────────────────────────
const ColorSwatches = ({ colors, hexes, label, avoid = false }) => (
    <div className={`st-swatch-block ${avoid ? 'avoid' : 'best'}`}>
        <p className="st-swatch-label">{avoid ? '✕ Avoid' : '✓ Best'} — {label}</p>
        <div className="st-swatch-row">
            {colors.slice(0, 7).map((c, i) => (
                <div key={i} className="st-swatch-item">
                    <div className="st-swatch-circle"
                        style={{ background: hexes?.[i] || (avoid ? '#ccc' : '#888'), opacity: avoid ? 0.6 : 1 }} />
                    <span className="st-swatch-name">{c}</span>
                </div>
            ))}
        </div>
    </div>
)

// ─── Main Page ────────────────────────────────────────────────────────────────
const SkinToneAdvisor = () => {
    const { products, currency, getDiscountedPrice, isOnSale } = useContext(ShopContext)
    const [selectedTone, setSelectedTone] = useState(null)
    const [activeTab, setActiveTab] = useState('topwear')

    const TAB_SUBCATS = {
        topwear:   { label: '👕 Tops & Shirts',  subCats: ['Topwear'] },
        bottomwear:{ label: '👖 Jeans & Pants',  subCats: ['Bottomwear'] },
        winterwear:{ label: '🧥 Winter Wear',    subCats: ['Winterwear'] },
        womens:    { label: '👗 Women\'s Wear',   cat: 'Women' },
        mens:      { label: '👔 Men\'s Wear',     cat: 'Men' },
        kids:      { label: '🧒 Kids',            cat: 'Kids' },
    }

    const tone = selectedTone ? SKIN_TONES.find(t => t.id === selectedTone) : null

    // ─── Filtered + scored products ─────────────────────────────────────────
    const filteredProducts = useMemo(() => {
        if (!tone || !products.length) return []

        const tabConf = TAB_SUBCATS[activeTab]
        let base = products.filter(p => {
            if (tabConf.subCats) return tabConf.subCats.includes(p.subCategory)
            if (tabConf.cat) return p.category === tabConf.cat
            return true
        })

        const toneColors = tone.bestColors[activeTab === 'mens' ? 'topwear' : activeTab === 'kids' ? 'topwear' : activeTab] || tone.bestColors.topwear

        // Score and sort
        const scored = base.map(p => ({ product: p, score: getProductColorMatch(p, toneColors) }))
        scored.sort((a, b) => b.score - a.score)
        return scored
    }, [tone, products, activeTab])

    return (
        <>
            <style>{`
                :root {
                    --st-cream: #F7EFE6; --st-sand: #EDD8C4;
                    --st-terra: #C96A42; --st-dark: #A3512F;
                    --st-brown: #7A4A38; --st-deep: #3D2318; --st-sage: #98A98E;
                }

                /* ── Hero ──────────────────────────────────── */
                .st-hero {
                    background: linear-gradient(135deg,#3D2318 0%,#7A4A38 60%,#C96A42 100%);
                    padding: clamp(2.5rem,6vw,4rem) clamp(1.5rem,5vw,4rem);
                    position: relative; overflow: hidden; text-align: center;
                }
                .st-hero::before {
                    content:''; position:absolute; top:-80px; right:-80px;
                    width:280px; height:280px; border-radius:50%;
                    background:rgba(247,239,230,0.06); pointer-events:none;
                }
                .st-hero::after {
                    content:''; position:absolute; bottom:-50px; left:-50px;
                    width:200px; height:200px; border-radius:50%;
                    background:rgba(152,169,142,0.1); pointer-events:none;
                }
                .st-hero-eyebrow {
                    display:inline-flex; align-items:center; gap:6px;
                    font-size:0.68rem; font-weight:700; letter-spacing:0.2em;
                    color:rgba(247,239,230,0.7); text-transform:uppercase;
                    background:rgba(247,239,230,0.1); border:1px solid rgba(247,239,230,0.18);
                    border-radius:60px; padding:5px 14px; margin-bottom:14px;
                }
                .st-hero-title {
                    font-family:'Georgia',serif;
                    font-size:clamp(1.8rem,5vw,3rem);
                    color:#F7EFE6; margin:0 0 10px; line-height:1.2;
                }
                .st-hero-sub {
                    font-size:clamp(0.82rem,2.5vw,0.95rem);
                    color:rgba(247,239,230,0.72); line-height:1.7;
                    max-width:520px; margin:0 auto;
                }

                /* ── Tone picker ───────────────────────────── */
                .st-picker-wrap {
                    background:#F7EFE6; border-bottom:1.5px solid var(--st-sand);
                    padding:clamp(1.5rem,4vw,2.5rem) clamp(1rem,4vw,2.5rem);
                    text-align:center;
                }
                .st-picker-title {
                    font-size:0.72rem; font-weight:800; letter-spacing:0.16em;
                    text-transform:uppercase; color:var(--st-terra); margin:0 0 20px;
                }
                .st-tones-grid {
                    display:flex; flex-wrap:wrap; justify-content:center;
                    gap:clamp(8px,2vw,16px);
                }
                .st-tone-btn {
                    display:flex; flex-direction:column; align-items:center; gap:8px;
                    padding:clamp(12px,2vw,16px) clamp(12px,2vw,20px);
                    background:var(--st-cream); border:2px solid var(--st-sand);
                    border-radius:16px; cursor:pointer; font-family:inherit;
                    transition:all 0.22s; min-width:clamp(80px,12vw,100px);
                    -webkit-tap-highlight-color:transparent;
                }
                .st-tone-btn:hover { border-color:var(--st-terra); transform:translateY(-3px); box-shadow:0 8px 20px rgba(61,35,24,0.12); }
                .st-tone-btn.active { border-color:var(--st-terra); background:rgba(201,106,66,0.07); box-shadow:0 4px 16px rgba(201,106,66,0.22); transform:translateY(-3px); }
                .st-tone-circle {
                    width:clamp(40px,7vw,52px); height:clamp(40px,7vw,52px);
                    border-radius:50%; flex-shrink:0; position:relative;
                    box-shadow:0 3px 10px rgba(61,35,24,0.25);
                    transition:transform 0.2s;
                }
                .st-tone-btn.active .st-tone-circle { transform:scale(1.12); }
                .st-tone-btn.active .st-tone-circle::after {
                    content:'✓'; position:absolute; inset:0;
                    display:flex; align-items:center; justify-content:center;
                    font-size:1.1rem; color:#fff; font-weight:700;
                    background:rgba(0,0,0,0.18); border-radius:50%;
                }
                .st-tone-label { font-size:0.74rem; font-weight:700; color:var(--st-brown); text-align:center; line-height:1.3; }
                .st-tone-hindi { font-size:0.65rem; color:var(--st-sage); }

                /* ── Page body ─────────────────────────────── */
                .st-body { max-width:1200px; margin:0 auto; padding:clamp(1.5rem,4vw,2.5rem) clamp(1rem,4vw,2rem); }

                /* ── Selected tone panel ───────────────────── */
                .st-tone-panel {
                    background:var(--st-cream); border:1.5px solid var(--st-sand);
                    border-radius:20px; padding:clamp(1.2rem,3vw,2rem);
                    margin-bottom:2rem; overflow:hidden;
                }
                .st-tone-panel-header {
                    display:flex; align-items:center; gap:16px;
                    margin-bottom:1.5rem; flex-wrap:wrap;
                }
                .st-tone-panel-circle {
                    width:60px; height:60px; border-radius:50%;
                    box-shadow:0 4px 14px rgba(61,35,24,0.22); flex-shrink:0;
                }
                .st-tone-panel-name {
                    font-family:'Georgia',serif; font-size:clamp(1.2rem,3vw,1.5rem);
                    color:var(--st-deep); margin:0 0 4px; font-weight:700;
                }
                .st-tone-panel-desc { font-size:0.84rem; color:var(--st-brown); margin:0; line-height:1.5; }
                .st-tip-box {
                    background:rgba(201,106,66,0.07); border:1px solid rgba(201,106,66,0.22);
                    border-radius:12px; padding:12px 16px; margin-bottom:1.5rem;
                    display:flex; gap:10px; align-items:flex-start;
                }
                .st-tip-icon { font-size:1.2rem; flex-shrink:0; margin-top:1px; }
                .st-tip-text { font-size:0.84rem; color:var(--st-brown); line-height:1.65; margin:0; }

                /* ── Swatch blocks ─────────────────────────── */
                .st-color-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
                @media(max-width:640px){ .st-color-grid { grid-template-columns:1fr; } }

                .st-swatch-block { border-radius:12px; padding:14px; }
                .st-swatch-block.best { background:rgba(27,94,32,0.05); border:1px solid rgba(27,94,32,0.15); }
                .st-swatch-block.avoid { background:rgba(211,47,47,0.05); border:1px solid rgba(211,47,47,0.15); }
                .st-swatch-label {
                    font-size:0.7rem; font-weight:800; letter-spacing:0.12em;
                    text-transform:uppercase; margin:0 0 10px;
                }
                .st-swatch-block.best .st-swatch-label { color:#1b5e20; }
                .st-swatch-block.avoid .st-swatch-label { color:#c62828; }
                .st-swatch-row { display:flex; flex-wrap:wrap; gap:8px; }
                .st-swatch-item { display:flex; flex-direction:column; align-items:center; gap:4px; }
                .st-swatch-circle { width:28px; height:28px; border-radius:50%; border:2px solid rgba(61,35,24,0.1); flex-shrink:0; }
                .st-swatch-name { font-size:0.6rem; color:var(--st-brown); text-align:center; max-width:52px; line-height:1.2; font-weight:500; }

                /* ── Tabs ──────────────────────────────────── */
                .st-tabs-wrap { margin-bottom:1.5rem; }
                .st-tabs {
                    display:flex; gap:6px; overflow-x:auto;
                    scrollbar-width:none; padding-bottom:2px;
                }
                .st-tabs::-webkit-scrollbar { display:none; }
                .st-tab {
                    display:inline-flex; align-items:center; gap:5px;
                    padding:8px 16px; border-radius:50px;
                    font-size:0.76rem; font-weight:700; white-space:nowrap;
                    border:1.5px solid var(--st-sand); background:var(--st-cream);
                    cursor:pointer; font-family:inherit; color:var(--st-brown);
                    transition:all 0.18s; -webkit-tap-highlight-color:transparent;
                    flex-shrink:0;
                }
                .st-tab:hover { border-color:var(--st-terra); color:var(--st-terra); }
                .st-tab.active { background:var(--st-terra); color:#F7EFE6; border-color:var(--st-terra); }

                /* ── Color advice inline banner ─────────────── */
                .st-color-advice {
                    background:linear-gradient(135deg,#F7EFE6,rgba(201,106,66,0.06));
                    border:1.5px solid var(--st-sand); border-radius:14px;
                    padding:14px 16px; margin-bottom:16px;
                }
                .st-advice-row { display:flex; gap:10px; align-items:flex-start; flex-wrap:wrap; margin-bottom:8px; }
                .st-advice-label { font-size:0.68rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; margin:0 0 6px; }
                .st-advice-pills { display:flex; flex-wrap:wrap; gap:6px; }
                .st-advice-pill {
                    display:inline-flex; align-items:center; gap:5px;
                    font-size:0.72rem; font-weight:700; padding:4px 10px; border-radius:16px;
                }
                .st-advice-pill.best { background:rgba(27,94,32,0.09); color:#1b5e20; border:1px solid rgba(27,94,32,0.2); }
                .st-advice-pill.avoid { background:rgba(211,47,47,0.08); color:#c62828; border:1px solid rgba(211,47,47,0.18); text-decoration:line-through; opacity:0.8; }
                .st-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }

                /* ── Product grid ──────────────────────────── */
                .st-products-section { }
                .st-products-header {
                    display:flex; align-items:center; justify-content:space-between;
                    margin-bottom:14px; flex-wrap:wrap; gap:8px;
                }
                .st-products-title { font-size:0.72rem; font-weight:800; letter-spacing:0.14em; text-transform:uppercase; color:var(--st-terra); margin:0; }
                .st-products-count { font-size:0.78rem; color:var(--st-sage); }
                .st-products-grid {
                    display:grid; gap:1rem;
                    grid-template-columns:repeat(auto-fill,minmax(clamp(140px,22vw,190px),1fr));
                }

                /* ── Card ──────────────────────────────────── */
                .st-card {
                    background:var(--st-cream); border:1.5px solid var(--st-sand);
                    border-radius:16px; overflow:hidden;
                    box-shadow:0 2px 8px rgba(61,35,24,0.06);
                    transition:border-color 0.2s;
                    position:relative;
                }
                .st-card:hover { border-color:var(--st-terra); }
                .st-card-match {
                    position:absolute; top:8px; left:8px; z-index:2;
                    background:linear-gradient(135deg,#1b5e20,#388e3c);
                    color:#fff; font-size:0.58rem; font-weight:800;
                    padding:3px 9px; border-radius:10px; letter-spacing:0.06em;
                }
                .st-card-sale {
                    position:absolute; top:8px; right:8px; z-index:2;
                    background:var(--st-terra); color:#F7EFE6;
                    font-size:0.58rem; font-weight:800; padding:3px 9px; border-radius:10px;
                }
                .st-card-img { aspect-ratio:1/1.1; background:var(--st-sand); overflow:hidden; }
                .st-card-img img { width:100%; height:100%; object-fit:cover; display:block; }
                .st-card-body { padding:10px 12px 12px; }
                .st-card-name { font-size:0.78rem; font-weight:600; color:var(--st-deep); margin:0 0 5px; line-height:1.35; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
                .st-card-price-row { display:flex; align-items:center; gap:6px; margin-bottom:4px; }
                .st-card-price { font-size:0.82rem; font-weight:800; color:var(--st-terra); }
                .st-card-orig { font-size:0.7rem; color:var(--st-sage); text-decoration:line-through; }
                .st-card-sub { font-size:0.64rem; font-weight:600; color:var(--st-sage); letter-spacing:0.06em; text-transform:uppercase; }

                /* ── Empty / prompt state ──────────────────── */
                .st-empty { text-align:center; padding:3rem 1rem; }
                .st-empty-icon { font-size:3rem; margin-bottom:12px; }
                .st-empty-title { font-family:'Georgia',serif; font-size:1.2rem; color:var(--st-deep); margin:0 0 8px; }
                .st-empty-sub { font-size:0.86rem; color:var(--st-brown); line-height:1.6; margin:0; }

                /* ── Divider ───────────────────────────────── */
                .st-divider { height:1.5px; background:linear-gradient(90deg,transparent,var(--st-sand),transparent); margin:1.5rem 0; }
            `}</style>

            {/* ── Hero ── */}
            <div className="st-hero">
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div className="st-hero-eyebrow"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}>
                        🎨 Style Intelligence
                    </motion.div>
                    <motion.h1 className="st-hero-title"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}>
                        Dress for Your <em style={{ fontStyle: 'italic', color: '#EDD8C4' }}>Skin Tone</em>
                    </motion.h1>
                    <motion.p className="st-hero-sub"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}>
                        Select your skin tone below and discover which colors and outfits flatter you the most — from shirts and jeans to dresses and winter wear.
                    </motion.p>
                </div>
            </div>

            {/* ── Tone Picker ── */}
            <div className="st-picker-wrap">
                <p className="st-picker-title">Select Your Skin Tone</p>
                <div className="st-tones-grid">
                    {SKIN_TONES.map((tone, i) => (
                        <motion.button
                            key={tone.id}
                            className={`st-tone-btn ${selectedTone === tone.id ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedTone(tone.id)
                                setActiveTab('topwear')
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.4 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="st-tone-circle"
                                style={{ background: `linear-gradient(135deg, ${tone.swatch}, ${tone.swatchDark})` }} />
                            <div>
                                <div className="st-tone-label">{tone.label}</div>
                                <div className="st-tone-hindi">{tone.hindiLabel}</div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* ── Main body ── */}
            <div className="st-body">
                <AnimatePresence mode="wait">
                    {!selectedTone ? (
                        <motion.div key="prompt" className="st-empty"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="st-empty-icon">🎨</div>
                            <h2 className="st-empty-title">Choose Your Skin Tone</h2>
                            <p className="st-empty-sub">
                                Select a skin tone above to see personalized color advice<br />
                                and matching products from our collection.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div key={selectedTone}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>

                            {/* ── Tone info panel ── */}
                            <div className="st-tone-panel">
                                {/* Header */}
                                <div className="st-tone-panel-header">
                                    <div className="st-tone-panel-circle"
                                        style={{ background: `linear-gradient(135deg, ${tone.swatch}, ${tone.swatchDark})` }} />
                                    <div>
                                        <p className="st-tone-panel-name">{tone.emoji} {tone.label} Skin Tone</p>
                                        <p className="st-tone-panel-desc">{tone.description}</p>
                                    </div>
                                </div>

                                {/* Tip */}
                                <div className="st-tip-box">
                                    <span className="st-tip-icon">💡</span>
                                    <p className="st-tip-text"><strong>Style Tip:</strong> {tone.tip}</p>
                                </div>

                                {/* Color swatches */}
                                <div className="st-color-grid">
                                    <ColorSwatches
                                        label="Colors for you"
                                        colors={tone.bestColors.topwear}
                                        hexes={tone.colorHexBest}
                                        avoid={false}
                                    />
                                    <ColorSwatches
                                        label="Colors to avoid"
                                        colors={tone.avoidColors}
                                        hexes={tone.colorHexAvoid}
                                        avoid={true}
                                    />
                                </div>
                            </div>

                            {/* ── Category tabs ── */}
                            <div className="st-tabs-wrap">
                                <div className="st-tabs">
                                    {Object.entries(TAB_SUBCATS).map(([key, conf]) => (
                                        <button key={key}
                                            className={`st-tab ${activeTab === key ? 'active' : ''}`}
                                            onClick={() => setActiveTab(key)}>
                                            {conf.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* ── Per-category color advice ── */}
                            <div className="st-color-advice">
                                <div style={{ marginBottom: 10 }}>
                                    <p className="st-advice-label" style={{ color: '#1b5e20' }}>
                                        ✓ Best colors for {TAB_SUBCATS[activeTab]?.label}
                                    </p>
                                    <div className="st-advice-pills">
                                        {(tone.bestColors[activeTab === 'mens' || activeTab === 'kids' ? 'topwear' : activeTab] || tone.bestColors.topwear).map(c => (
                                            <span key={c} className="st-advice-pill best">
                                                <span className="st-dot" style={{ background: tone.colorHexBest[0] || '#1b5e20' }} />
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="st-advice-label" style={{ color: '#c62828' }}>
                                        ✕ Colors to avoid
                                    </p>
                                    <div className="st-advice-pills">
                                        {tone.avoidColors.map(c => (
                                            <span key={c} className="st-advice-pill avoid">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ── Products ── */}
                            <div className="st-products-section">
                                <div className="st-products-header">
                                    <p className="st-products-title">
                                        Matching Products
                                    </p>
                                    <p className="st-products-count">
                                        <strong style={{ color: '#C96A42' }}>{filteredProducts.length}</strong> products found
                                    </p>
                                </div>

                                {filteredProducts.length === 0 ? (
                                    <div className="st-empty">
                                        <div className="st-empty-icon">◎</div>
                                        <p className="st-empty-sub">No products in this category yet.<br />Try another category.</p>
                                    </div>
                                ) : (
                                    <div className="st-products-grid">
                                        {filteredProducts.map(({ product, score }) => {
                                            const discountedPrice = getDiscountedPrice(product)
                                            const onSale = isOnSale(product)
                                            return (
                                                <ProductCard
                                                    key={product._id}
                                                    product={product}
                                                    currency={currency}
                                                    discountedPrice={discountedPrice}
                                                    onSale={onSale}
                                                    score={score}
                                                />
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default SkinToneAdvisor