import React, { useState, useEffect, useRef, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Groq config ──────────────────────────────────────────────────────────────
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL   = 'llama-3.3-70b-versatile'
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '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'

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

// ─── Mini product card inside chat ───────────────────────────────────────────
const ProductCard = React.memo(({ product, currency, onView, onAdd }) => {
    const { getDiscountedPrice, isOnSale } = useContext(ShopContext)
    const sale  = isOnSale(product)
    const price = getDiscountedPrice(product)

    return (
        <motion.div
            onClick={() => onView(product._id)}
            style={{ background:'#FFFDF9', border:'1.5px solid #EDD8C4', borderRadius:12, overflow:'hidden', width:136, flexShrink:0, cursor:'pointer' }}
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

    // Nav action message
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
            {/* Text bubble */}
            {msg.text && (
                <div style={{
                    maxWidth:'88%',
                    background: isUser
                        ? 'linear-gradient(135deg,#3D2318,#7A4A38)'
                        : '#F7EFE6',
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

            {/* Product cards row */}
            {msg.products && msg.products.length > 0 && (
                <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:4, maxWidth:'100%', scrollbarWidth:'none' }}>
                    {msg.products.slice(0,6).map(p => (
                        <ProductCard key={p._id} product={p} currency={currency} onView={id => { navigate(`/product/${id}`) }} onAdd={onAdd} />
                    ))}
                </div>
            )}

            {/* Nav button */}
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
    const navigate = useNavigate()
    const { products, currency, addToCart, token } = useContext(ShopContext)

    const [open,      setOpen]      = useState(false)
    const [messages,  setMessages]  = useState([])
    const [input,     setInput]     = useState('')
    const [loading,   setLoading]   = useState(false)
    const [listening, setListening] = useState(false)
    const [unread,    setUnread]    = useState(1)
    const [error,     setError]     = useState('')

    const bottomRef    = useRef(null)
    const inputRef     = useRef(null)
    const recognizerRef = useRef(null)
    const historyRef   = useRef([]) // keeps raw {role,content} history for Groq

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior:'smooth' })
    }, [messages, loading])

    // Reset unread on open
    useEffect(() => {
        if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 300) }
    }, [open])

    // Welcome message
    useEffect(() => {
        setMessages([{
            role:'assistant',
            type:'text',
            text:'👋 Hi! I\'m your **Forever** shopping assistant — powered by Groq AI.\n\nAsk me anything: find products, navigate pages, check orders, or just say **"show me something nice"**.\n\nYou can also use 🎤 voice commands!',
        }])
    }, [])

    // ── Build system prompt with live product data ────────────────────────────
    const buildSystemPrompt = useCallback(() => {
        const catalog = products.slice(0, 80).map(p => ({
            id: p._id,
            name: p.name,
            category: p.category,
            subCategory: p.subCategory,
            price: p.price,
            bestseller: p.bestseller || false,
        }))

        const categories   = [...new Set(products.map(p => p.category))]
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
  "products": ["product_id_1", "product_id_2"],  // array of product IDs to show (max 6), or []
  "navigate": "/route-here-or-null",              // page to navigate to, or null
  "navLabel": "Page Name"                         // human-readable label for nav button
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

    // ── Call Groq API ─────────────────────────────────────────────────────────
    const callGroq = async (userMessage) => {
        if (!GROQ_API_KEY) {
            return {
                text: '⚠️ Groq API key not set. Add **VITE_GROQ_API_KEY** to your frontend `.env` file.\n\nGet a free key at **console.groq.com**',
                products: [],
                navigate: null,
            }
        }

        // Add to history
        historyRef.current.push({ role:'user', content: userMessage })

        const messages = [
            { role:'system', content: buildSystemPrompt() },
            ...historyRef.current.slice(-10), // last 10 turns to stay within context
        ]

        const res = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model:       GROQ_MODEL,
                messages,
                temperature: 0.4,
                max_tokens:  600,
            }),
        })

        if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err?.error?.message || `Groq API error: ${res.status}`)
        }

        const data    = await res.json()
        const raw     = data.choices?.[0]?.message?.content?.trim() || '{}'

        // Save assistant reply to history
        historyRef.current.push({ role:'assistant', content: raw })

        // Parse JSON response
        let parsed
        try {
            // Strip accidental markdown fences
            const clean = raw.replace(/^```json\s*/i,'').replace(/^```\s*/i,'').replace(/\s*```$/i,'').trim()
            parsed = JSON.parse(clean)
        } catch {
            // Fallback: treat as plain text
            parsed = { text: raw, products: [], navigate: null }
        }

        return parsed
    }

    // ── Handle send ───────────────────────────────────────────────────────────
    const handleSend = async (text) => {
        const msg = (text || input).trim()
        if (!msg || loading) return

        setInput('')
        setError('')

        // Add user message
        setMessages(prev => [...prev, { role:'user', type:'text', text: msg }])
        setLoading(true)

        // Check for local navigation first (instant, no API needed)
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

            // Resolve product IDs → actual product objects
            const resolvedProducts = (result.products || [])
                .map(id => products.find(p => p._id === id))
                .filter(Boolean)
                .slice(0, 6)

            // Build assistant message
            const assistantMsg = {
                role:    'assistant',
                type:    'text',
                text:    result.text || '',
                products: resolvedProducts,
                ...(result.navigate && result.navigate !== 'null' ? {
                    navTo:    result.navigate,
                    navLabel: result.navLabel || 'Page',
                } : {}),
            }

            setMessages(prev => [...prev, assistantMsg])

            // Auto-navigate if AI says so (only safe routes)
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

    // ── Voice input ───────────────────────────────────────────────────────────
    const toggleVoice = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            setError('Voice not supported in this browser. Try Chrome.')
            return
        }

        if (listening) {
            recognizerRef.current?.stop()
            setListening(false)
            return
        }

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

    // ── Quick add to cart ─────────────────────────────────────────────────────
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

    return (
        <>
            <style>{`
                .sa-msgs::-webkit-scrollbar { width:4px; }
                .sa-msgs::-webkit-scrollbar-thumb { background:#EDD8C4; border-radius:4px; }
                .sa-msgs::-webkit-scrollbar-track { background:transparent; }
                .sa-chips::-webkit-scrollbar { display:none; }
                @keyframes sa-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
                @keyframes sa-ripple { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2.2);opacity:0} }
                .sa-mic-ripple { position:absolute;inset:0;border-radius:50%;background:rgba(201,106,66,0.3);animation:sa-ripple 1.1s ease-out infinite; }
            `}</style>

            {/* ── FAB button ──────────────────────────────────────────────── */}
            <motion.div
                style={{ position:'fixed', bottom:28, right:28, zIndex:1200 }}
                initial={{ scale:0, opacity:0 }}
                animate={{ scale:1, opacity:1 }}
                transition={{ delay:1.2, type:'spring', stiffness:320 }}
            >
                <motion.button
                    onClick={() => setOpen(o => !o)}
                    style={{ position:'relative', width:58, height:58, borderRadius:'50%', background:'linear-gradient(135deg,#3D2318,#C96A42)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#F7EFE6', boxShadow:'0 6px 24px rgba(61,35,24,0.35)' }}
                    whileHover={{ scale:1.08 }} whileTap={{ scale:0.94 }}
                    animate={open ? {} : { boxShadow:['0 6px 24px rgba(61,35,24,0.35)','0 6px 32px rgba(201,106,66,0.5)','0 6px 24px rgba(61,35,24,0.35)'] }}
                    transition={{ duration:2.4, repeat:Infinity }}
                >
                    <AnimatePresence mode="wait">
                        {open
                            ? <motion.span key="x" initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90, opacity:0 }} transition={{ duration:0.2 }}><Icons.X /></motion.span>
                            : <motion.span key="bot" initial={{ scale:0.6, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.6, opacity:0 }} transition={{ duration:0.2 }}><Icons.Bot /></motion.span>
                        }
                    </AnimatePresence>
                    {/* Unread badge */}
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
                        style={{ position:'fixed', bottom:100, right:28, width:'clamp(320px,90vw,420px)', height:'clamp(480px,70vh,580px)', zIndex:1100, display:'flex', flexDirection:'column', background:'#F0E8DF', border:'1.5px solid #EDD8C4', borderRadius:22, overflow:'hidden', boxShadow:'0 20px 60px rgba(61,35,24,0.22)' }}
                        initial={{ opacity:0, y:20, scale:0.95 }}
                        animate={{ opacity:1, y:0, scale:1 }}
                        exit={{ opacity:0, y:20, scale:0.95 }}
                        transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                    >
                        {/* Header */}
                        <div style={{ background:'linear-gradient(135deg,#3D2318,#7A4A38)', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
                            <div style={{ width:36, height:36, background:'rgba(247,239,230,0.15)', border:'1.5px solid rgba(247,239,230,0.25)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', color:'#F7EFE6' }}>
                                <Icons.Bot />
                            </div>
                            <div style={{ flex:1 }}>
                                <p style={{ fontSize:'0.88rem', fontWeight:700, color:'#F7EFE6', margin:0, fontFamily:"'Georgia',serif" }}>Forever Assistant</p>
                                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                                    <span style={{ width:6, height:6, borderRadius:'50%', background:'#5CB85C', display:'inline-block' }} />
                                    <span style={{ fontSize:'0.68rem', color:'rgba(247,239,230,0.7)', fontWeight:600 }}>Powered by Groq · LLaMA 3.3 70B</span>
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
                        <div className="sa-msgs" style={{ flex:1, overflowY:'auto', padding:'14px 14px 8px' }}>
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
                                    style={{ background:'#F7EFE6', border:'1.5px solid #EDD8C4', borderRadius:20, padding:'5px 12px', fontSize:'0.7rem', fontWeight:700, color:'#7A4A38', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap', flexShrink:0 }}
                                    whileHover={{ borderColor:'#C96A42', color:'#C96A42', background:'rgba(201,106,66,0.06)' }}
                                    whileTap={{ scale:0.93 }}
                                    disabled={loading}
                                >
                                    {label}
                                </motion.button>
                            ))}
                        </div>

                        {/* Input row */}
                        <div style={{ padding:'10px 14px 14px', background:'#F7EFE6', borderTop:'1px solid #EDD8C4', flexShrink:0 }}>
                            <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
                                {/* Textarea */}
                                <div style={{ flex:1, position:'relative' }}>
                                    <textarea
                                        ref={inputRef}
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                                        placeholder={listening ? '🎤 Listening…' : 'Ask me anything…'}
                                        rows={1}
                                        style={{ width:'100%', background:'#FFFDF9', border:'1.5px solid #EDD8C4', borderRadius:12, padding:'9px 12px', fontSize:'0.84rem', color:'#3D2318', outline:'none', resize:'none', fontFamily:'inherit', boxSizing:'border-box', lineHeight:1.5, maxHeight:90, overflowY:'auto', transition:'border-color 0.2s' }}
                                        onFocus={e => e.target.style.borderColor='#C96A42'}
                                        onBlur={e => e.target.style.borderColor='#EDD8C4'}
                                        disabled={loading}
                                    />
                                </div>

                                {/* Mic button */}
                                <motion.button
                                    onClick={toggleVoice}
                                    style={{ position:'relative', width:40, height:40, borderRadius:'50%', background: listening ? 'rgba(201,106,66,0.15)' : '#EDD8C4', border: listening ? '1.5px solid #C96A42' : '1.5px solid #EDD8C4', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: listening ? '#C96A42' : '#7A4A38', flexShrink:0 }}
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
                                    style={{ width:40, height:40, borderRadius:'50%', background: input.trim() && !loading ? '#C96A42' : '#EDD8C4', border:'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', color:'#F7EFE6', flexShrink:0, transition:'background 0.2s' }}
                                    whileHover={input.trim() && !loading ? { scale:1.08 } : {}}
                                    whileTap={input.trim() && !loading ? { scale:0.9 } : {}}
                                >
                                    {loading
                                        ? <motion.div style={{ width:14, height:14, border:'2px solid rgba(247,239,230,0.4)', borderTopColor:'#F7EFE6', borderRadius:'50%' }} animate={{ rotate:360 }} transition={{ duration:0.7, repeat:Infinity, ease:'linear' }} />
                                        : <Icons.Send />
                                    }
                                </motion.button>
                            </div>

                            <p style={{ fontSize:'0.62rem', color:'#98A98E', textAlign:'center', margin:'7px 0 0', letterSpacing:'0.04em' }}>
                                Press Enter to send · Shift+Enter for new line · 🎤 for voice
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ShoppingAssistant