
import React, { useState, useEffect, useRef, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Groq config ──────────────────────────────────────────────────────────────
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
// const GROQ_MODEL   = 'llama-3.3-70b-versatile'
const GROQ_MODEL   = 'llama-3.1-8b-instant'
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY 
console.log("groq key loaded:", !!import.meta.env.VITE_GROQ_API_KEY);
// ─── Safe page routes (NEVER admin) ──────────────────────────────────────────
const PAGE_ROUTES = {
    home:         '/',
    collection:   '/collection',
    cart:         '/cart',
    orders:       '/orders',
    profile:      '/profile',
    contact:      '/contact',
    about:        '/about',
    login:        '/login',
    'summer sale': '/summer-sale',
    sale:         '/summer-sale',
    'ai picks':   '/ai-recommendations',
    recommendations: '/ai-recommendations',
}

// ─── Quick action chips shown below input ─────────────────────────────────────
const QUICK_ACTIONS = [
    { label: '👗 Women', query: "show women's products" },
    { label: '👔 Men',   query: "show men's products"   },
    { label: '👧 Kids',  query: "show kids products"    },
    { label: '🏷️ Sale',  query: 'show sale products'    },
    { label: '⭐ Best',  query: 'show best sellers'     },
    { label: '🛒 Cart',  query: 'go to cart'            },
]

// ─── Small icons ─────────────────────────────────────────────────────────────
const Icons = {
    Bot: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2"/>
            <path d="M12 11V7"/><circle cx="12" cy="5" r="2"/>
            <line x1="8" y1="15" x2="8" y2="17"/><line x1="12" y1="15" x2="12" y2="17"/><line x1="16" y1="15" x2="16" y2="17"/>
        </svg>
    ),
    Send: () => (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
    ),
    Mic: ({ on }) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill={on ? '#C96A42' : 'none'} stroke={on ? '#C96A42' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
    ),
    X: () => (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    ),
    Minus: () => (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
    ),
    Cart: () => (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
    ),
    Sparkle: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/>
        </svg>
    ),
}

// ─── Hook: detect mobile ──────────────────────────────────────────────────────
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 640)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])
    return isMobile
}

// ─── Mini product card inside chat ───────────────────────────────────────────
const ProductCard = React.memo(({ product, currency, onView, onAdd }) => {
    const { getDiscountedPrice, isOnSale } = useContext(ShopContext)
    const sale  = isOnSale(product)
    const price = getDiscountedPrice(product)

    return (
        <motion.div
            onClick={() => onView(product._id)}
            style={{ background:'#FFFDF9', border:'1.5px solid #EDD8C4', borderRadius:12, overflow:'hidden', width:130, flexShrink:0, cursor:'pointer' }}
            whileHover={{ y:-3, borderColor:'#C96A42', boxShadow:'0 8px 22px rgba(61,35,24,0.13)' }}
            transition={{ duration:0.2 }}
        >
            <div style={{ position:'relative', aspectRatio:'1/1', background:'#EDD8C4', overflow:'hidden' }}>
                <img src={product.image[0]} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                {sale && (
                    <span style={{ position:'absolute', top:6, left:6, background:'#C96A42', color:'#F7EFE6', fontSize:'0.55rem', fontWeight:800, padding:'2px 8px', borderRadius:8, letterSpacing:'0.06em' }}>
                        SALE
                    </span>
                )}
            </div>
            <div style={{ padding:'8px 9px 10px' }}>
                <p style={{ fontSize:'0.7rem', color:'#3D2318', fontWeight:600, margin:'0 0 5px', lineHeight:1.35, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                    {product.name}
                </p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:4 }}>
                    <div>
                        <span style={{ fontSize:'0.74rem', fontWeight:800, color:'#C96A42' }}>{currency}{price.toFixed(0)}</span>
                        {sale && <span style={{ fontSize:'0.62rem', color:'#98A98E', textDecoration:'line-through', marginLeft:4 }}>{currency}{product.price}</span>}
                    </div>
                    <motion.button
                        onClick={e => { e.stopPropagation(); onAdd(product) }}
                        style={{ background:'#3D2318', color:'#F7EFE6', border:'none', borderRadius:6, padding:'3px 7px', fontSize:'0.58rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:3, whiteSpace:'nowrap' }}
                        whileTap={{ scale:0.88 }}
                    >
                        <Icons.Cart /> Add
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
})

// ─── Typing dots ──────────────────────────────────────────────────────────────
const TypingDots = () => (
    <div style={{ display:'flex', gap:5, padding:'14px 16px', alignItems:'center' }}>
        {[0,1,2].map(i => (
            <motion.span key={i}
                style={{ display:'block', width:7, height:7, borderRadius:'50%', background:'#C96A42' }}
                animate={{ y:[0,-6,0] }}
                transition={{ duration:0.55, repeat:Infinity, delay:i*0.14 }}
            />
        ))}
    </div>
)

// ─── Parse bold markdown **text** ────────────────────────────────────────────
const ParsedText = ({ text }) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return (
        <span>
            {parts.map((p, i) =>
                p.startsWith('**') && p.endsWith('**')
                    ? <strong key={i} style={{ color:'#3D2318', fontWeight:700 }}>{p.slice(2,-2)}</strong>
                    : <span key={i}>{p}</span>
            )}
        </span>
    )
}

// ─── Message bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({ msg, currency, products, onView, onAdd, navigate }) => {
    const isUser = msg.role === 'user'

    if (msg.type === 'nav') {
        return (
            <motion.div
                style={{ display:'flex', justifyContent:'center', margin:'6px 0' }}
                initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
            >
                <span style={{ background:'rgba(201,106,66,0.1)', border:'1px solid rgba(201,106,66,0.22)', color:'#C96A42', fontSize:'0.72rem', fontWeight:700, padding:'5px 14px', borderRadius:20, display:'flex', alignItems:'center', gap:6 }}>
                    <Icons.Sparkle /> Navigated to {msg.page}
                </span>
            </motion.div>
        )
    }

    return (
        <motion.div
            style={{ display:'flex', flexDirection:'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap:6, margin:'4px 0' }}
            initial={{ opacity:0, y:10, scale:0.97 }}
            animate={{ opacity:1, y:0, scale:1 }}
            transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
        >
            {msg.text && (
                <div style={{
                    maxWidth:'88%',
                    background: isUser ? 'linear-gradient(135deg,#3D2318,#7A4A38)' : '#F7EFE6',
                    color: isUser ? '#F7EFE6' : '#3D2318',
                    border: isUser ? 'none' : '1.5px solid #EDD8C4',
                    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    padding:'10px 14px',
                    fontSize:'0.83rem',
                    lineHeight:1.65,
                    boxShadow: isUser ? '0 2px 12px rgba(61,35,24,0.18)' : '0 1px 6px rgba(61,35,24,0.06)',
                    whiteSpace:'pre-wrap',
                    wordBreak:'break-word',
                }}>
                    {isUser ? msg.text : <ParsedText text={msg.text} />}
                </div>
            )}

            {msg.products && msg.products.length > 0 && (
                <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:4, maxWidth:'100%', scrollbarWidth:'none', WebkitOverflowScrolling:'touch' }}>
                    {msg.products.slice(0,6).map(p => (
                        <ProductCard key={p._id} product={p} currency={currency} onView={id => { navigate(`/product/${id}`) }} onAdd={onAdd} />
                    ))}
                </div>
            )}

            {msg.navTo && (
                <motion.button
                    onClick={() => navigate(msg.navTo)}
                    style={{ background:'#C96A42', color:'#F7EFE6', border:'none', borderRadius:20, padding:'6px 16px', fontSize:'0.74rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:6, boxShadow:'0 2px 10px rgba(201,106,66,0.28)' }}
                    whileHover={{ scale:1.04 }} whileTap={{ scale:0.95 }}
                >
                    <Icons.Sparkle /> Go to {msg.navLabel} →
                </motion.button>
            )}
        </motion.div>
    )
}

// ─── Main ShoppingAssistant ───────────────────────────────────────────────────
const ShoppingAssistant = () => {
    const navigate  = useNavigate()
    const isMobile  = useIsMobile()
    const { products, currency, addToCart, token } = useContext(ShopContext)

    const [open,      setOpen]      = useState(false)
    const [messages,  setMessages]  = useState([])
    const [input,     setInput]     = useState('')
    const [loading,   setLoading]   = useState(false)
    const [listening, setListening] = useState(false)
    const [unread,    setUnread]    = useState(1)
    const [error,     setError]     = useState('')

    const bottomRef     = useRef(null)
    const inputRef      = useRef(null)
    const recognizerRef = useRef(null)
    const historyRef    = useRef([])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior:'smooth' })
    }, [messages, loading])

    useEffect(() => {
        if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 300) }
    }, [open])

    useEffect(() => {
        setMessages([{
            role:'assistant', type:'text',
            text:'👋 Hi! I\'m your **Forever** shopping assistant — powered by Groq AI.\n\nAsk me anything: find products, navigate pages, check orders, or just say **"show me something nice"**.\n\nYou can also use 🎤 voice commands!',
        }])
    }, [])

    // Prevent body scroll on mobile when chat is open
    useEffect(() => {
        if (isMobile) {
            document.body.style.overflow = open ? 'hidden' : ''
        }
        return () => { document.body.style.overflow = '' }
    }, [open, isMobile])

    const buildSystemPrompt = useCallback(() => {
        const catalog = products.slice(0, 80).map(p => ({
            id: p._id, name: p.name, category: p.category,
            subCategory: p.subCategory, price: p.price, bestseller: p.bestseller || false,
        }))
        const categories    = [...new Set(products.map(p => p.category))]
        const subCategories = [...new Set(products.map(p => p.subCategory))]

        return `You are a smart, friendly shopping assistant for "Forever" — a fashion e-commerce store.
You have access to real-time product data and can help users find products, navigate pages, and answer questions.

## AVAILABLE PRODUCTS (${products.length} total):
${JSON.stringify(catalog)}

## CATEGORIES: ${categories.join(', ')}
## SUB-CATEGORIES: ${subCategories.join(', ')}

## AVAILABLE PAGES (navigation):
- Home → /
- Collection (all products) → /collection
- Cart → /cart
- Orders → /orders
- My Profile → /profile
- Contact → /contact
- About → /about
- Summer Sale (10% off on Bottomwear & Winterwear) → /summer-sale
- AI Picks (AI recommendations) → /ai-recommendations
- Login → /login

## RESPONSE FORMAT (ALWAYS respond with valid JSON):
{
  "text": "Your conversational reply here (use **bold** for highlights)",
  "products": ["product_id_1", "product_id_2"],
  "navigate": "/route-here-or-null",
  "navLabel": "Page Name"
}

## RULES:
1. NEVER navigate to /admin or expose admin routes under any circumstances.
2. When user asks for products by category/type, return matching product IDs in "products" array.
3. When user wants to go somewhere, set "navigate" to the correct route.
4. Keep "text" short, helpful, and friendly (2-4 sentences max).
5. For vague queries like "show me something nice", pick 4-6 varied bestsellers.
6. For sale/discount queries, show Bottomwear & Winterwear products.
7. Prices are in INR (₹). Bottomwear & Winterwear have 10% summer discount.
8. If user is not logged in and asks for orders/profile, suggest they login first.
9. Always return valid JSON — no markdown code fences, no extra text outside JSON.`
    }, [products])

    const callGroq = async (userMessage) => {
        if (!GROQ_API_KEY) {
            return {
                text: '⚠️ Groq API key not set. Add **VITE_GROQ_API_KEY** to your frontend `.env` file.\n\nGet a free key at **console.groq.com**',
                products: [], navigate: null,
            }
        }

        historyRef.current.push({ role:'user', content: userMessage })

        const msgs = [
            { role:'system', content: buildSystemPrompt() },
            ...historyRef.current.slice(-10),
        ]

        const res = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${GROQ_API_KEY}` },
            body: JSON.stringify({ model:GROQ_MODEL, messages:msgs, temperature:0.4, max_tokens:600 }),
        })

        if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err?.error?.message || `Groq API error: ${res.status}`)
        }

        const data = await res.json()
        const raw  = data.choices?.[0]?.message?.content?.trim() || '{}'
        historyRef.current.push({ role:'assistant', content: raw })

        let parsed
        try {
            const clean = raw.replace(/^```json\s*/i,'').replace(/^```\s*/i,'').replace(/\s*```$/i,'').trim()
            parsed = JSON.parse(clean)
        } catch {
            parsed = { text: raw, products: [], navigate: null }
        }
        return parsed
    }

    const handleSend = async (text) => {
        const msg = (text || input).trim()
        if (!msg || loading) return

        setInput('')
        setError('')
        setMessages(prev => [...prev, { role:'user', type:'text', text: msg }])
        setLoading(true)

        const lower = msg.toLowerCase()
        for (const [keyword, route] of Object.entries(PAGE_ROUTES)) {
            if (lower.includes(keyword)) {
                const isNavOnly = /^(go to|open|navigate|take me|show|visit)\s/i.test(msg)
                if (isNavOnly) {
                    navigate(route)
                    setMessages(prev => [...prev, {
                        role:'assistant', type:'nav',
                        page: keyword.charAt(0).toUpperCase() + keyword.slice(1),
                    }])
                    setLoading(false)
                    return
                }
                break
            }
        }

        try {
            const result = await callGroq(msg)
            const resolvedProducts = (result.products || [])
                .map(id => products.find(p => p._id === id))
                .filter(Boolean).slice(0, 6)

            const assistantMsg = {
                role:'assistant', type:'text',
                text: result.text || '',
                products: resolvedProducts,
                ...(result.navigate && result.navigate !== 'null' ? {
                    navTo: result.navigate,
                    navLabel: result.navLabel || 'Page',
                } : {}),
            }

            setMessages(prev => [...prev, assistantMsg])

            if (result.navigate && result.navigate !== 'null' && !result.navigate.includes('admin')) {
                setTimeout(() => navigate(result.navigate), 800)
            }
        } catch (err) {
            console.error('Groq error:', err)
            setError(err.message)
            setMessages(prev => [...prev, {
                role:'assistant', type:'text',
                text:`❌ Sorry, something went wrong. ${err.message?.includes('API key') ? 'Check your VITE_GROQ_API_KEY.' : 'Please try again.'}`,
            }])
        } finally {
            setLoading(false)
        }
    }

    const toggleVoice = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) { setError('Voice not supported in this browser. Try Chrome.'); return }

        if (listening) { recognizerRef.current?.stop(); setListening(false); return }

        const rec = new SpeechRecognition()
        rec.lang = 'en-IN'
        rec.continuous = false
        rec.interimResults = false
        rec.onstart  = () => setListening(true)
        rec.onend    = () => setListening(false)
        rec.onerror  = () => { setListening(false); setError('Voice error. Please try again.') }
        rec.onresult = (e) => {
            const transcript = e.results[0][0].transcript
            setInput(transcript)
            setTimeout(() => handleSend(transcript), 200)
        }
        recognizerRef.current = rec
        rec.start()
    }

    const handleQuickAdd = (product) => {
        if (product.sizes?.length > 0) {
            addToCart(product._id, product.sizes[0])
            setMessages(prev => [...prev, {
                role:'assistant', type:'text',
                text:`✅ **${product.name}** added to cart (size ${product.sizes[0]})!\n\nWant to checkout? I can take you to the cart.`,
                navTo: '/cart', navLabel: 'Cart',
            }])
        } else {
            setMessages(prev => [...prev, {
                role:'assistant', type:'text',
                text:`Please visit the product page to select a size for **${product.name}**.`,
                navTo: `/product/${product._id}`, navLabel: 'Product Page',
            }])
        }
    }

    // ── Responsive dimensions ────────────────────────────────────────────────
    const chatStyle = isMobile
        ? {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '92dvh',           // full-height sheet on mobile
            borderRadius: '20px 20px 0 0',
            zIndex: 1100,
        }
        : {
            position: 'fixed',
            bottom: 100,
            right: 28,
            width: 'clamp(320px,90vw,420px)',
            height: 'clamp(480px,70vh,580px)',
            borderRadius: 22,
            zIndex: 1100,
        }

    const fabStyle = isMobile
        ? { position:'fixed', bottom:20, right:20, zIndex:1200 }
        : { position:'fixed', bottom:28, right:28, zIndex:1200 }

    return (
        <>
            <style>{`
                .sa-msgs::-webkit-scrollbar { width:4px; }
                .sa-msgs::-webkit-scrollbar-thumb { background:#EDD8C4; border-radius:4px; }
                .sa-msgs::-webkit-scrollbar-track { background:transparent; }
                .sa-chips::-webkit-scrollbar { display:none; }
                @keyframes sa-ripple { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2.2);opacity:0} }
                .sa-mic-ripple { position:absolute;inset:0;border-radius:50%;background:rgba(201,106,66,0.3);animation:sa-ripple 1.1s ease-out infinite; }
                /* Mobile backdrop */
                .sa-backdrop { position:fixed;inset:0;background:rgba(61,35,24,0.4);z-index:1099;backdrop-filter:blur(2px); }
                /* Prevent textarea zoom on iOS */
                .sa-textarea { font-size:16px !important; }
                @media (min-width:640px) { .sa-textarea { font-size:0.84rem !important; } }
            `}</style>

            {/* ── Mobile backdrop ──────────────────────────────────────────── */}
            <AnimatePresence>
                {open && isMobile && (
                    <motion.div
                        className="sa-backdrop"
                        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* ── FAB button ──────────────────────────────────────────────── */}
            <motion.div
                style={fabStyle}
                initial={{ scale:0, opacity:0 }}
                animate={{ scale:1, opacity:1 }}
                transition={{ delay:1.2, type:'spring', stiffness:320 }}
            >
                <motion.button
                    onClick={() => setOpen(o => !o)}
                    style={{ position:'relative', width:isMobile?54:58, height:isMobile?54:58, borderRadius:'50%', background:'linear-gradient(135deg,#3D2318,#C96A42)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#F7EFE6', boxShadow:'0 6px 24px rgba(61,35,24,0.35)' }}
                    whileHover={{ scale:1.08 }} whileTap={{ scale:0.94 }}
                    animate={open ? {} : { boxShadow:['0 6px 24px rgba(61,35,24,0.35)','0 6px 32px rgba(201,106,66,0.5)','0 6px 24px rgba(61,35,24,0.35)'] }}
                    transition={{ duration:2.4, repeat:Infinity }}
                >
                    <AnimatePresence mode="wait">
                        {open
                            ? <motion.span key="x" initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:0.2 }}><Icons.X /></motion.span>
                            : <motion.span key="bot" initial={{ scale:0.6,opacity:0 }} animate={{ scale:1,opacity:1 }} exit={{ scale:0.6,opacity:0 }} transition={{ duration:0.2 }}><Icons.Bot /></motion.span>
                        }
                    </AnimatePresence>
                    {!open && unread > 0 && (
                        <motion.span
                            style={{ position:'absolute', top:0, right:0, width:18, height:18, background:'#C96A42', border:'2px solid #F7EFE6', borderRadius:'50%', fontSize:'0.6rem', fontWeight:900, color:'#F7EFE6', display:'flex', alignItems:'center', justifyContent:'center' }}
                            initial={{ scale:0 }} animate={{ scale:1 }}
                            transition={{ type:'spring', stiffness:400 }}
                        >
                            {unread}
                        </motion.span>
                    )}
                </motion.button>
            </motion.div>

            {/* ── Chat window ──────────────────────────────────────────────── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        style={{
                            ...chatStyle,
                            display:'flex', flexDirection:'column',
                            background:'#F0E8DF',
                            border:'1.5px solid #EDD8C4',
                            overflow:'hidden',
                            boxShadow:'0 20px 60px rgba(61,35,24,0.22)',
                        }}
                        initial={isMobile ? { y:'100%', opacity:1 } : { opacity:0, y:20, scale:0.95 }}
                        animate={isMobile ? { y:0 } : { opacity:1, y:0, scale:1 }}
                        exit={isMobile ? { y:'100%' } : { opacity:0, y:20, scale:0.95 }}
                        transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
                    >
                        {/* Mobile drag handle */}
                        {isMobile && (
                            <div style={{ display:'flex', justifyContent:'center', paddingTop:10, paddingBottom:4, background:'linear-gradient(135deg,#3D2318,#7A4A38)', flexShrink:0 }}>
                                <div style={{ width:40, height:4, background:'rgba(247,239,230,0.35)', borderRadius:4 }} />
                            </div>
                        )}

                        {/* Header */}
                        <div style={{ background:'linear-gradient(135deg,#3D2318,#7A4A38)', padding: isMobile ? '10px 16px 14px' : '14px 18px', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
                            <div style={{ width:36, height:36, background:'rgba(247,239,230,0.15)', border:'1.5px solid rgba(247,239,230,0.25)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', color:'#F7EFE6' }}>
                                <Icons.Bot />
                            </div>
                            <div style={{ flex:1 }}>
                                <p style={{ fontSize:'0.88rem', fontWeight:700, color:'#F7EFE6', margin:0, fontFamily:"'Georgia',serif" }}>Forever Assistant</p>
                                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                                    <span style={{ width:6, height:6, borderRadius:'50%', background:'#5CB85C', display:'inline-block' }} />
                                    <span style={{ fontSize:'0.65rem', color:'rgba(247,239,230,0.7)', fontWeight:600 }}>Powered by Groq · LLaMA 3.3 70B</span>
                                </div>
                            </div>
                            <div style={{ display:'flex', gap:6 }}>
                                <motion.button onClick={() => { setMessages([]); historyRef.current=[]; setTimeout(()=>setMessages([{role:'assistant',type:'text',text:'Chat cleared! How can I help you?'}]),50) }}
                                    style={{ background:'rgba(247,239,230,0.12)', border:'1px solid rgba(247,239,230,0.2)', borderRadius:7, padding:'5px 8px', cursor:'pointer', color:'rgba(247,239,230,0.7)', fontSize:'0.6rem', fontWeight:700, fontFamily:'inherit', letterSpacing:'0.06em' }}
                                    whileTap={{ scale:0.9 }}>
                                    Clear
                                </motion.button>
                                <motion.button onClick={() => setOpen(false)}
                                    style={{ background:'rgba(247,239,230,0.12)', border:'1px solid rgba(247,239,230,0.2)', borderRadius:7, padding:'5px 7px', cursor:'pointer', color:'rgba(247,239,230,0.8)', display:'flex', alignItems:'center' }}
                                    whileTap={{ scale:0.9 }}><Icons.Minus /></motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="sa-msgs" style={{ flex:1, overflowY:'auto', padding:'14px 14px 8px', WebkitOverflowScrolling:'touch' }}>
                            {messages.map((msg, i) => (
                                <MessageBubble
                                    key={i} msg={msg}
                                    currency={currency}
                                    products={products}
                                    onView={id => navigate(`/product/${id}`)}
                                    onAdd={handleQuickAdd}
                                    navigate={navigate}
                                />
                            ))}
                            {loading && (
                                <motion.div style={{ display:'flex', alignItems:'flex-start' }}
                                    initial={{ opacity:0 }} animate={{ opacity:1 }}>
                                    <div style={{ background:'#F7EFE6', border:'1.5px solid #EDD8C4', borderRadius:'18px 18px 18px 4px' }}>
                                        <TypingDots />
                                    </div>
                                </motion.div>
                            )}
                            {error && (
                                <p style={{ fontSize:'0.72rem', color:'#E05252', textAlign:'center', margin:'6px 0', background:'rgba(224,82,82,0.07)', borderRadius:8, padding:'5px 10px' }}>
                                    {error}
                                </p>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Quick action chips */}
                        <div className="sa-chips" style={{ display:'flex', gap:7, padding:'6px 14px', overflowX:'auto', flexShrink:0 }}>
                            {QUICK_ACTIONS.map(({ label, query }) => (
                                <motion.button
                                    key={label}
                                    onClick={() => handleSend(query)}
                                    style={{ background:'#F7EFE6', border:'1.5px solid #EDD8C4', borderRadius:20, padding:'5px 12px', fontSize:'0.7rem', fontWeight:700, color:'#7A4A38', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', flexShrink:0, minHeight:34 }}
                                    whileHover={{ borderColor:'#C96A42', color:'#C96A42', background:'rgba(201,106,66,0.06)' }}
                                    whileTap={{ scale:0.93 }}
                                    disabled={loading}
                                >
                                    {label}
                                </motion.button>
                            ))}
                        </div>

                        {/* Input row */}
                        <div style={{ padding: isMobile ? '10px 14px 20px' : '10px 14px 14px', background:'#F7EFE6', borderTop:'1px solid #EDD8C4', flexShrink:0 }}>
                            <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
                                <div style={{ flex:1, position:'relative' }}>
                                    <textarea
                                        ref={inputRef}
                                        className="sa-textarea"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                                        placeholder={listening ? '🎤 Listening…' : 'Ask me anything…'}
                                        rows={1}
                                        style={{ width:'100%', background:'#FFFDF9', border:'1.5px solid #EDD8C4', borderRadius:12, padding:'9px 12px', color:'#3D2318', outline:'none', resize:'none', fontFamily:'inherit', boxSizing:'border-box', lineHeight:1.5, maxHeight:90, overflowY:'auto', transition:'border-color 0.2s' }}
                                        onFocus={e => e.target.style.borderColor='#C96A42'}
                                        onBlur={e => e.target.style.borderColor='#EDD8C4'}
                                        disabled={loading}
                                    />
                                </div>

                                {/* Mic button */}
                                <motion.button
                                    onClick={toggleVoice}
                                    style={{ position:'relative', width:isMobile?44:40, height:isMobile?44:40, borderRadius:'50%', background: listening ? 'rgba(201,106,66,0.15)' : '#EDD8C4', border: listening ? '1.5px solid #C96A42' : '1.5px solid #EDD8C4', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: listening ? '#C96A42' : '#7A4A38', flexShrink:0 }}
                                    whileHover={{ background:'rgba(201,106,66,0.1)', borderColor:'#C96A42' }}
                                    whileTap={{ scale:0.9 }}
                                >
                                    {listening && <span className="sa-mic-ripple" />}
                                    <Icons.Mic on={listening} />
                                </motion.button>

                                {/* Send button */}
                                <motion.button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || loading}
                                    style={{ width:isMobile?44:40, height:isMobile?44:40, borderRadius:'50%', background: input.trim() && !loading ? '#C96A42' : '#EDD8C4', border:'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', color:'#F7EFE6', flexShrink:0, transition:'background 0.2s' }}
                                    whileHover={input.trim() && !loading ? { scale:1.08 } : {}}
                                    whileTap={input.trim() && !loading ? { scale:0.9 } : {}}
                                >
                                    {loading
                                        ? <motion.div style={{ width:14, height:14, border:'2px solid rgba(247,239,230,0.4)', borderTopColor:'#F7EFE6', borderRadius:'50%' }} animate={{ rotate:360 }} transition={{ duration:0.7, repeat:Infinity, ease:'linear' }} />
                                        : <Icons.Send />
                                    }
                                </motion.button>
                            </div>

                            {!isMobile && (
                                <p style={{ fontSize:'0.62rem', color:'#98A98E', textAlign:'center', margin:'7px 0 0', letterSpacing:'0.04em' }}>
                                    Press Enter to send · Shift+Enter for new line · 🎤 for voice
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ShoppingAssistant































































































































// import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShopContext } from "../Context/ShopContext";
// import { motion, AnimatePresence } from "framer-motion";

// const ease = [0.16, 1, 0.3, 1];
// const ROUTES = {
//   home: "/", collection: "/collection", cart: "/cart", orders: "/orders", profile: "/profile", contact: "/contact",
//   about: "/about", login: "/login", "summer sale": "/summer-sale", sale: "/summer-sale", "ai picks": "/ai-recommendations", recommendations: "/ai-recommendations",
// };
// const ALLOWED = new Set([...Object.values(ROUTES), "/skin-tone"]);
// const CHIPS = [
//   ["👗 Women", "show women's products"], ["👔 Men", "show men's products"], ["👧 Kids", "show kids products"],
//   ["🏷️ Sale", "show sale products"], ["⭐ Best", "show best sellers"], ["🛒 Cart", "go to cart"],
// ];
// const WELCOME = { role: "assistant", type: "text", text: "Hi, I'm your **Forever** stylist. Ask me to find something, compare pieces, or take you to any page.\n\nTry **\"show me something for winter\"** or tap the 🎤 to talk." };

// const useIsMobile = () => {
//   const [m, setM] = useState(() => window.innerWidth < 640);
//   useEffect(() => { const f = () => setM(window.innerWidth < 640); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f); }, []);
//   return m;
// };

// const Bold = ({ text }) => text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
//   p.startsWith("**") && p.endsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <React.Fragment key={i}>{p}</React.Fragment>);

// const Card = React.memo(({ p, currency, onAdd, onOpen }) => {
//   const { getDiscountedPrice, isOnSale } = useContext(ShopContext);
//   const sale = isOnSale(p), price = getDiscountedPrice(p);
//   return (
//     <motion.div className="sa-card" onClick={() => onOpen(p._id)} whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
//       <div className="sa-card-img"><img src={p.image[0]} alt={p.name} loading="lazy" />{sale && <span>SALE</span>}</div>
//       <div style={{ padding: "9px 10px 11px" }}>
//         <p>{p.name}</p>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
//           <b>{currency}{price.toFixed(0)}{sale && <s>{currency}{p.price}</s>}</b>
//           <button onClick={e => { e.stopPropagation(); onAdd(p); }} aria-label={`Add ${p.name} to cart`}>+ Add</button>
//         </div>
//       </div>
//     </motion.div>
//   );
// });

// const Bubble = ({ m, currency, onAdd, navigate }) => {
//   const user = m.role === "user";
//   if (m.type === "nav") return <div className="sa-nav">✦ Opened {m.page}</div>;
//   return (
//     <motion.div initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, ease }}
//       style={{ display: "flex", flexDirection: "column", alignItems: user ? "flex-end" : "flex-start", gap: 8, margin: "6px 0" }}>
//       {m.text && <div className={user ? "sa-b sa-user" : "sa-b sa-bot"}>{user ? m.text : <Bold text={m.text} />}</div>}
//       {m.products?.length > 0 && (
//         <div className="sa-rail">{m.products.slice(0, 6).map(p => <Card key={p._id} p={p} currency={currency} onAdd={onAdd} onOpen={id => navigate(`/product/${id}`)} />)}</div>
//       )}
//       {m.navTo && <motion.button className="sa-go" onClick={() => navigate(m.navTo)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Go to {m.navLabel} →</motion.button>}
//     </motion.div>
//   );
// };

// const ShoppingAssistant = () => {
//   const navigate = useNavigate();
//   const mobile = useIsMobile();
//   const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([WELCOME]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);
//   const [unread, setUnread] = useState(1);
//   const [error, setError] = useState("");
//   const bottom = useRef(null), inputEl = useRef(null), rec = useRef(null), history = useRef([]);

//   useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
//   useEffect(() => { if (open) { setUnread(0); setTimeout(() => inputEl.current?.focus(), 350); } }, [open]);
//   useEffect(() => { if (!mobile) return; document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open, mobile]);
//   useEffect(() => { const f = e => e.key === "Escape" && setOpen(false); window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f); }, []);

//   const systemPrompt = useCallback(() => {
//     const catalog = products.slice(0, 80).map(p => ({ id: p._id, name: p.name, category: p.category, subCategory: p.subCategory, price: p.price, bestseller: !!p.bestseller }));
//     return `You are a friendly shopping assistant for "Forever", a fashion store. Prices are in INR. Bottomwear and Winterwear have a 10% summer discount.
// PRODUCTS (${products.length} total, first 80 shown): ${JSON.stringify(catalog)}
// CATEGORIES: ${[...new Set(products.map(p => p.category))].join(", ")}
// SUB-CATEGORIES: ${[...new Set(products.map(p => p.subCategory))].join(", ")}
// PAGES: Home /, Collection /collection, Cart /cart, Orders /orders, Profile /profile, Contact /contact, About /about, Summer Sale /summer-sale, AI Picks /ai-recommendations, Login /login
// Reply ONLY with JSON: {"text":"2-4 short friendly sentences, **bold** for highlights","products":["id1","id2"],"navigate":"/route or null","navLabel":"Page name"}
// Rules: never mention or link to admin pages; only use product ids from the list; for vague requests pick 4-6 varied bestsellers; for sale queries show Bottomwear and Winterwear; if the user isn't logged in and asks about orders or profile, suggest logging in.`;
//   }, [products]);

//   const ask = async text => {
//     history.current.push({ role: "user", content: text });
//     try {
//       const res = await fetch(`${backendUrl}/api/assistant/chat`, {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: [{ role: "system", content: systemPrompt() }, ...history.current.slice(-10)] }),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error?.message || `Assistant error (${res.status})`);
//       const raw = data.choices?.[0]?.message?.content?.trim() || "{}";
//       history.current.push({ role: "assistant", content: raw });
//       try { return JSON.parse(raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "")); }
//       catch { return { text: raw, products: [], navigate: null }; }
//     } catch (e) { history.current.pop(); throw e; }
//   };

//   const send = async txt => {
//     const msg = (txt ?? input).trim();
//     if (!msg || loading) return;
//     setInput(""); setError("");
//     setMessages(p => [...p, { role: "user", type: "text", text: msg }]);

//     // direct navigation only for short, explicit commands
//     const lower = msg.toLowerCase();
//     if (/^(go to|open|navigate to|take me to|visit)\s/.test(lower) && lower.split(/\s+/).length <= 5) {
//       const hit = Object.entries(ROUTES).find(([k]) => lower.includes(k));
//       if (hit) { navigate(hit[1]); setMessages(p => [...p, { role: "assistant", type: "nav", page: hit[0].replace(/\b\w/g, c => c.toUpperCase()) }]); return; }
//     }

//     setLoading(true);
//     try {
//       const r = await ask(msg);
//       const found = (Array.isArray(r.products) ? r.products : []).map(id => products.find(p => p._id === id)).filter(Boolean).slice(0, 6);
//       const nav = typeof r.navigate === "string" && ALLOWED.has(r.navigate) ? r.navigate : null;
//       setMessages(p => [...p, { role: "assistant", type: "text", text: r.text || "Here's what I found.", products: found, ...(nav ? { navTo: nav, navLabel: r.navLabel || "page" } : {}) }]);
//     } catch (e) {
//       setError(e.message);
//       setMessages(p => [...p, { role: "assistant", type: "text", text: "Sorry, I couldn't reach the assistant just now. Please try again in a moment." }]);
//     } finally { setLoading(false); }
//   };

//   const voice = () => {
//     const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SR) return setError("Voice input isn't supported in this browser. Try Chrome.");
//     if (listening) { rec.current?.stop(); return; }
//     const r = new SR(); r.lang = "en-IN"; r.interimResults = false;
//     r.onstart = () => setListening(true); r.onend = () => setListening(false);
//     r.onerror = () => { setListening(false); setError("Voice input failed. Please try again."); };
//     r.onresult = e => send(e.results[0][0].transcript);
//     rec.current = r; r.start();
//   };

//   const quickAdd = p => {
//     if (p.sizes?.length) {
//       addToCart(p._id, p.sizes[0]);
//       setMessages(m => [...m, { role: "assistant", type: "text", text: `Added **${p.name}** to your cart in size ${p.sizes[0]}.`, navTo: "/cart", navLabel: "Cart" }]);
//     } else setMessages(m => [...m, { role: "assistant", type: "text", text: `Pick a size for **${p.name}** on its product page.`, navTo: `/product/${p._id}`, navLabel: "Product" }]);
//   };

//   const panel = mobile
//     ? { inset: "auto 0 0 0", height: "92dvh", borderRadius: "26px 26px 0 0" }
//     : { right: 28, bottom: 104, width: "clamp(330px,90vw,420px)", height: "clamp(500px,72vh,620px)", borderRadius: 26 };

//   return (
//     <>
//       <style>{`
//         .sa-win{position:fixed;z-index:1100;display:flex;flex-direction:column;overflow:hidden;background:var(--cream);border:1px solid var(--cream-deeper);box-shadow:var(--shadow-xl)}
//         .sa-head{display:flex;align-items:center;gap:12px;padding:16px 18px;color:var(--cream);background:linear-gradient(135deg,var(--espresso),var(--espresso-mid) 60%,var(--terra-deep))}
//         .sa-av{width:40px;height:40px;border-radius:14px;display:grid;place-items:center;font-size:1.2rem;background:rgba(251,247,241,.14);border:1px solid rgba(251,247,241,.25)}
//         .sa-hb{border:1px solid rgba(251,247,241,.25);background:rgba(251,247,241,.1);color:var(--cream);border-radius:10px;padding:6px 11px;cursor:pointer;font:700 .66rem var(--font-body);letter-spacing:.06em}
//         .sa-body{flex:1;overflow-y:auto;padding:16px 14px 8px;background:radial-gradient(circle at 100% 0,rgba(194,86,46,.07),transparent 50%)}
//         .sa-b{max-width:88%;padding:11px 15px;font-size:.86rem;line-height:1.65;white-space:pre-wrap;word-break:break-word}
//         .sa-user{color:var(--cream);background:linear-gradient(135deg,var(--espresso),var(--bark));border-radius:20px 20px 5px 20px;box-shadow:0 4px 14px rgba(36,20,16,.2)}
//         .sa-bot{color:var(--espresso);background:#fff;border:1px solid var(--cream-deeper);border-radius:20px 20px 20px 5px}
//         .sa-bot strong{color:var(--terra-deep)}
//         .sa-rail{display:flex;gap:10px;overflow-x:auto;max-width:100%;padding:2px 2px 8px;scroll-snap-type:x mandatory;scrollbar-width:none}
//         .sa-card{width:138px;flex-shrink:0;scroll-snap-align:start;cursor:pointer;background:#fff;border:1px solid var(--cream-deeper);border-radius:16px;overflow:hidden;box-shadow:var(--shadow-sm)}
//         .sa-card-img{position:relative;aspect-ratio:1;background:var(--cream-dark)}.sa-card-img img{width:100%;height:100%;object-fit:cover}
//         .sa-card-img span{position:absolute;top:7px;left:7px;padding:3px 8px;border-radius:999px;background:var(--terra);color:#fff;font:800 .54rem var(--font-body);letter-spacing:.08em}
//         .sa-card p{margin:0 0 6px;font:600 .72rem/1.35 var(--font-body);color:var(--espresso);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
//         .sa-card b{font:700 .8rem var(--font-display);color:var(--terra)}.sa-card s{margin-left:4px;font:400 .64rem var(--font-body);color:var(--mist)}
//         .sa-card button{border:0;border-radius:999px;padding:5px 9px;background:var(--espresso);color:#fff;font:700 .6rem var(--font-body);cursor:pointer}
//         .sa-go{border:0;border-radius:999px;padding:8px 18px;background:var(--terra);color:#fff;font:700 .76rem var(--font-body);cursor:pointer;box-shadow:var(--shadow-terra)}
//         .sa-nav{margin:8px auto;width:fit-content;padding:5px 14px;border-radius:999px;background:rgba(194,86,46,.1);color:var(--terra);font:700 .72rem var(--font-body)}
//         .sa-chips{display:flex;gap:8px;padding:8px 14px;overflow-x:auto;scrollbar-width:none}
//         .sa-chip{flex-shrink:0;border:1px solid var(--cream-deeper);background:#fff;color:var(--bark);border-radius:999px;padding:8px 14px;cursor:pointer;font:700 .72rem var(--font-body);transition:all .25s}
//         .sa-chip:hover:not(:disabled){border-color:var(--terra);color:var(--terra);transform:translateY(-2px)}
//         .sa-foot{padding:10px 14px 14px;background:#fff;border-top:1px solid var(--cream-deeper)}
//         .sa-in{flex:1;resize:none;max-height:90px;padding:11px 15px;border-radius:18px;border:1.5px solid var(--cream-deeper);background:var(--cream);color:var(--espresso);outline:0;font:400 16px/1.5 var(--font-body);transition:border-color .25s,box-shadow .25s}
//         @media(min-width:640px){.sa-in{font-size:.88rem}}
//         .sa-in:focus{border-color:var(--terra);box-shadow:0 0 0 4px rgba(194,86,46,.12)}
//         .sa-rb{width:44px;height:44px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;flex-shrink:0;transition:background .25s}
//         .sa-dot{width:7px;height:7px;border-radius:50%;background:var(--terra)}
//       `}</style>

//       <AnimatePresence>
//         {open && mobile && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 1099, background: "rgba(36,20,16,.5)", backdropFilter: "blur(3px)" }} />}
//       </AnimatePresence>

//       <motion.button onClick={() => setOpen(o => !o)} aria-label={open ? "Close assistant" : "Open shopping assistant"}
//         initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring", stiffness: 300 }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
//         style={{ position: "fixed", right: mobile ? 18 : 28, bottom: mobile ? 18 : 28, zIndex: 1200, width: 60, height: 60, borderRadius: "50%", border: 0, cursor: "pointer", color: "#fff", fontSize: "1.4rem",
//           background: "linear-gradient(135deg,var(--espresso),var(--terra))", boxShadow: "0 10px 30px rgba(194,86,46,.45)" }}>
//         {!open && <motion.span animate={{ scale: [1, 1.6], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--terra)", zIndex: -1 }} />}
//         {open ? "✕" : "✦"}
//         {!open && unread > 0 && <span style={{ position: "absolute", top: -2, right: -2, width: 20, height: 20, borderRadius: "50%", background: "#fff", color: "var(--terra)", font: "800 .66rem/20px var(--font-body)", boxShadow: "var(--shadow-sm)" }}>{unread}</span>}
//       </motion.button>

//       <AnimatePresence>
//         {open && (
//           <motion.section className="sa-win" style={panel} role="dialog" aria-label="Shopping assistant"
//             initial={mobile ? { y: "100%" } : { opacity: 0, y: 24, scale: 0.94 }} animate={mobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
//             exit={mobile ? { y: "100%" } : { opacity: 0, y: 24, scale: 0.94 }} transition={{ duration: 0.45, ease }}>
//             <header className="sa-head">
//               <div className="sa-av">✦</div>
//               <div style={{ flex: 1 }}>
//                 <p style={{ margin: 0, font: "600 1.05rem var(--font-display)" }}>Forever stylist</p>
//                 <p style={{ margin: "2px 0 0", fontSize: ".68rem", color: "rgba(251,247,241,.7)", display: "flex", alignItems: "center", gap: 6 }}>
//                   <i style={{ width: 6, height: 6, borderRadius: "50%", background: "#6fd08c" }} /> Online · AI assistant
//                 </p>
//               </div>
//               <button className="sa-hb" onClick={() => { history.current = []; setMessages([{ ...WELCOME, text: "Chat cleared. What are you looking for?" }]); setError(""); }}>Clear</button>
//               <button className="sa-hb" onClick={() => setOpen(false)} aria-label="Minimise">—</button>
//             </header>

//             <div className="sa-body">
//               {messages.map((m, i) => <Bubble key={i} m={m} currency={currency} onAdd={quickAdd} navigate={navigate} />)}
//               {loading && <div className="sa-b sa-bot" style={{ display: "flex", gap: 5, width: "fit-content" }}>
//                 {[0, 1, 2].map(i => <motion.span key={i} className="sa-dot" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />)}</div>}
//               {error && <p role="alert" style={{ margin: "8px 0", padding: "6px 10px", borderRadius: 10, textAlign: "center", fontSize: ".72rem", color: "#b3372a", background: "rgba(179,55,42,.08)" }}>{error}</p>}
//               <div ref={bottom} />
//             </div>

//             <div className="sa-chips">{CHIPS.map(([l, q]) => <button key={l} className="sa-chip" disabled={loading} onClick={() => send(q)}>{l}</button>)}</div>

//             <div className="sa-foot" style={{ paddingBottom: mobile ? 22 : 14 }}>
//               <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
//                 <textarea ref={inputEl} className="sa-in" rows={1} value={input} disabled={loading} aria-label="Message"
//                   placeholder={listening ? "Listening…" : "Ask about styles, sizes, offers…"}
//                   onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
//                 <motion.button className="sa-rb" onClick={voice} whileTap={{ scale: 0.9 }} aria-label="Voice input"
//                   style={{ background: listening ? "var(--terra)" : "var(--cream-dark)", color: listening ? "#fff" : "var(--bark)" }}>🎤</motion.button>
//                 <motion.button className="sa-rb" onClick={() => send()} disabled={!input.trim() || loading} whileTap={{ scale: 0.9 }} aria-label="Send"
//                   style={{ background: input.trim() && !loading ? "var(--terra)" : "var(--cream-deeper)", color: "#fff", cursor: input.trim() && !loading ? "pointer" : "not-allowed" }}>➤</motion.button>
//               </div>
//             </div>
//           </motion.section>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };
// export default ShoppingAssistant;