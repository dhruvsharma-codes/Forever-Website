// backend/routes/assistantRoute.js
// Setup: npm i express-rate-limit
// server.js:  import assistantRouter from './routes/assistantRoute.js'
//             app.use('/api/assistant', assistantRouter)   // NO auth middleware before this
// Env (BACKEND project on Vercel, no VITE_ prefix): GROQ_API_KEY=gsk_...
import express from 'express'
import rateLimit from 'express-rate-limit'

const router = express.Router()

const limiter = rateLimit({ windowMs: 60_000, max: 15, standardHeaders: true, legacyHeaders: false,
  message: { error: { message: 'Too many requests. Please wait a minute.' } } })

router.post('/chat', limiter, async (req, res) => {
  try {
    const { messages } = req.body || {}
    const valid = Array.isArray(messages) && messages.length > 0 && messages.length <= 12 &&
      messages.every(m => ['system', 'user', 'assistant'].includes(m?.role) && typeof m.content === 'string') &&
      messages.reduce((n, m) => n + m.content.length, 0) < 30000
    if (!valid) return res.status(400).json({ error: { message: 'Invalid request' } })
    if (!process.env.GROQ_API_KEY) return res.status(500).json({ error: { message: 'Assistant not configured' } })

    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages, temperature: 0.4, max_tokens: 600 }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) return res.status(502).json({ error: { message: 'Assistant is unavailable right now' } })
    res.json(data)
  } catch {
    res.status(500).json({ error: { message: 'Assistant is unavailable right now' } })
  }
})

export default router