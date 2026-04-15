import twilio from 'twilio';

// ─── Twilio client ────────────────────────────────────────────────────────────
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Sandbox number (testing) → replace with your approved WA Business number in production
const FROM_NUMBER = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;

// Your deployed frontend URL — used to build the tracking link
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

/**
 * Format a phone number to E.164 with country code.
 * Indian numbers: 10 digits → prefix +91
 * Already has + → use as-is
 */
const formatPhone = (phone) => {
    if (!phone) return null;
    const digits = String(phone).replace(/\D/g, '');     // strip non-digits
    if (String(phone).startsWith('+')) return String(phone); // already E.164
    if (digits.length === 10) return `+91${digits}`;      // Indian mobile
    if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`; // 91XXXXXXXXXX
    return `+${digits}`;
};

/**
 * Build a clean WhatsApp message body for an order confirmation.
 * Twilio WhatsApp supports plain text; keep it readable.
 */
const buildOrderMessage = (order) => {
    const orderId   = order._id?.toString() || 'N/A';
    const shortId   = orderId.slice(-8).toUpperCase();   // last 8 chars — easier to read
    const trackingUrl = `${FRONTEND_URL}/orders`;        // opens Orders page with tracker

    // Product list
    const itemLines = (order.items || [])
        .map(item => `  • ${item.name} × ${item.quantity} (Size: ${item.size || 'N/A'})`)
        .join('\n');

    // Payment method label
    const payMap = { COD: 'Cash on Delivery', Stripe: 'Stripe (Card)', Razorpay: 'Razorpay (UPI/Card)' };
    const payLabel = payMap[order.paymentMethod] || order.paymentMethod;

    const message = `
🛍️ *Order Confirmed — Forever*

Hello${order.address?.firstName ? ` ${order.address.firstName}` : ''}! Your order has been placed successfully. 🎉

─────────────────────
📦 *Order ID:* #${shortId}
─────────────────────

*Items Ordered:*
${itemLines}

─────────────────────
💰 *Total Amount:* ₹${order.amount}
💳 *Payment:* ${payLabel}
📍 *Delivery To:* ${order.address?.city || ''}, ${order.address?.state || ''}
─────────────────────

📱 *Track your order:*
${trackingUrl}

Thank you for shopping with *Forever*! ✨
We'll notify you when your order ships.
    `.trim();

    return message;
};

/**
 * Send WhatsApp order confirmation to the customer.
 * @param {Object} order  - Mongoose order document (with address.phone)
 * @returns {Object}      - { success, sid } or { success: false, error }
 */
export const sendOrderWhatsApp = async (order) => {
    try {
        const rawPhone = order.address?.phone;
        const toPhone  = formatPhone(rawPhone);

        if (!toPhone) {
            console.log('WhatsApp: No phone number found on order, skipping.');
            return { success: false, error: 'No phone number' };
        }

        // Guard: don't crash the order flow if Twilio creds are missing
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            console.warn('WhatsApp: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set. Skipping.');
            return { success: false, error: 'Twilio credentials missing' };
        }

        const body = buildOrderMessage(order);

        const result = await client.messages.create({
            from: FROM_NUMBER,
            to:   `whatsapp:${toPhone}`,
            body,
        });

        console.log(`✅ WhatsApp sent to ${toPhone} — SID: ${result.sid}`);
        return { success: true, sid: result.sid };

    } catch (err) {
        // Log but NEVER crash the order
        console.error(`❌ WhatsApp send failed: ${err.message}`);
        return { success: false, error: err.message };
    }
};