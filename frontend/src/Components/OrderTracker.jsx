import React, { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

/* ── Status pipeline ─────────────────────────────────────────────────────── */
const STEPS = [
  { key: "Order Placed",    label: "Order Placed",    emoji: "✓",  desc: "Your order has been received and confirmed." },
  { key: "Packing",         label: "Packing",          emoji: "📦", desc: "We're carefully packing your items." },
  { key: "Ship",            label: "Shipped",          emoji: "🚚", desc: "Your order is on its way." },
  { key: "Out for Delivery",label: "Out for Delivery", emoji: "🕐", desc: "Your order is nearby — out for delivery!" },
  { key: "Delivered",       label: "Delivered",        emoji: "🎉", desc: "Your order has been delivered. Enjoy!" },
];

const getStepIndex = (status) => {
  const idx = STEPS.findIndex(s => s.key === status);
  return idx === -1 ? 0 : idx;
};

/* ── Individual order card ───────────────────────────────────────────────── */
const OrderTrackCard = ({ order, currency }) => {
  const currentIdx = getStepIndex(order.status);
  const [expanded, setExpanded] = useState(false);
  const isDelivered = order.status === "Delivered";

  return (
    <motion.div
      style={{
        background: "var(--cream)",
        border: `1.5px solid ${expanded ? "rgba(201,106,66,0.3)" : "var(--cream-deeper)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        marginBottom: 12,
        boxShadow: expanded ? "var(--shadow-md)" : "var(--shadow-sm)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
      layout
    >
      {/* Header */}
      <div
        onClick={() => setExpanded(p => !p)}
        style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, userSelect: "none" }}
      >
        <div style={{ width: 52, height: 64, borderRadius: "var(--radius-md)", overflow: "hidden", border: "1.5px solid var(--cream-deeper)", flexShrink: 0, background: "var(--cream-dark)" }}>
          {order.items[0]?.image?.[0] && (
            <img src={order.items[0].image[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", fontWeight: 700, color: "var(--espresso)", margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {order.items.map(i => i.name).join(", ")}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", color: "var(--mist)", margin: "0 0 8px" }}>
            {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            {" · "}{order.items.length} item{order.items.length > 1 ? "s" : ""}
            {" · "}{currency}{order.amount}
          </p>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em",
            padding: "3px 10px", borderRadius: "var(--radius-full)",
            background: isDelivered ? "rgba(74,124,89,0.1)" : "rgba(201,106,66,0.1)",
            color: isDelivered ? "#4a7c59" : "var(--terra)",
            border: `1px solid ${isDelivered ? "rgba(74,124,89,0.25)" : "rgba(201,106,66,0.25)"}`,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
            {order.status}
          </span>
        </div>

        <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: 4 }}
          animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </div>

      {/* Expanded timeline */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "4px 16px 20px", borderTop: "1px solid var(--cream-deeper)" }}>
              {/* Payment info */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "12px 0 16px" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", background: "var(--cream-dark)", color: "var(--bark)", padding: "3px 12px", borderRadius: "var(--radius-full)", fontWeight: 600 }}>
                  {order.paymentMethod}
                </span>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "0.7rem", padding: "3px 12px", borderRadius: "var(--radius-full)", fontWeight: 600,
                  background: order.payment ? "rgba(74,124,89,0.1)" : "rgba(201,106,66,0.1)",
                  color: order.payment ? "#4a7c59" : "var(--terra)",
                  border: `1px solid ${order.payment ? "rgba(74,124,89,0.2)" : "rgba(201,106,66,0.2)"}`,
                }}>
                  {order.payment ? "✓ Paid" : "⏳ Pending"}
                </span>
              </div>

              {/* Step tracker */}
              <div style={{ position: "relative", paddingLeft: 32 }}>
                <div style={{ position: "absolute", left: 10, top: 10, bottom: 10, width: 2, background: "var(--cream-deeper)", borderRadius: 2 }} />
                <motion.div
                  style={{ position: "absolute", left: 10, top: 10, width: 2, background: "linear-gradient(180deg, var(--terra), var(--cream-deeper))", borderRadius: 2, transformOrigin: "top" }}
                  initial={{ height: 0 }}
                  animate={{ height: currentIdx === 0 ? 0 : `${(currentIdx / (STEPS.length - 1)) * 100}%` }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />

                {STEPS.map((step, idx) => {
                  const done = idx < currentIdx;
                  const active = idx === currentIdx;
                  return (
                    <div key={step.key} style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 14, marginBottom: idx < STEPS.length - 1 ? 22 : 0 }}>
                      <motion.div
                        style={{
                          position: "absolute", left: -32, width: 22, height: 22, borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1,
                          background: done ? "var(--terra)" : active ? "var(--cream)" : "var(--cream-dark)",
                          border: `2px solid ${done ? "var(--terra)" : active ? "var(--terra)" : "var(--cream-deeper)"}`,
                          color: done ? "var(--cream)" : active ? "var(--terra)" : "var(--mist)",
                        }}
                        initial={{ scale: 0.85 }}
                        animate={{ scale: active ? 1.18 : 1 }}
                        transition={{ duration: 0.4, delay: idx * 0.06 }}
                      >
                        {done ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: active ? "var(--terra)" : "var(--cream-deeper)", display: "block" }} />
                        )}
                      </motion.div>

                      <div style={{ paddingTop: 1 }}>
                        <p style={{
                          fontFamily: "var(--font-body)", fontSize: "0.84rem",
                          fontWeight: active ? 700 : 600,
                          color: done ? "var(--espresso)" : active ? "var(--terra)" : "var(--mist)",
                          margin: "0 0 3px", lineHeight: 1.3, display: "flex", alignItems: "center", gap: 8,
                        }}>
                          {step.label}
                          {active && (
                            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", background: "var(--terra)", color: "var(--cream)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontWeight: 700, letterSpacing: "0.06em" }}>
                              CURRENT
                            </span>
                          )}
                        </p>
                        {(done || active) && (
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.76rem", color: "var(--mist)", margin: 0, lineHeight: 1.5 }}>
                            {step.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Main slide-over panel ───────────────────────────────────────────────── */
const OrderTracker = ({ isOpen, onClose }) => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders]           = useState([]);
  const [loading, setLoading]         = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } });
      if (res.data.success) { setOrders(res.data.orders.reverse()); setLastUpdated(new Date()); }
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  }, [token, backendUrl]);

  useEffect(() => { if (isOpen) fetchOrders(); }, [isOpen, fetchOrders]);
  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(fetchOrders, 30000);
    return () => clearInterval(id);
  }, [isOpen, fetchOrders]);
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const activeOrders = orders.filter(o => o.status !== "Delivered");
  const pastOrders   = orders.filter(o => o.status === "Delivered");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            style={{ position: "fixed", inset: 0, background: "rgba(44,24,16,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", zIndex: 800 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: 460, background: "var(--cream-dark)", zIndex: 900, display: "flex", flexDirection: "column", boxShadow: "-16px 0 64px rgba(44,24,16,0.2)" }}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
          >
            {/* Header */}
            <div style={{ background: "var(--cream)", borderBottom: "1.5px solid var(--cream-deeper)", padding: "18px 20px", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, background: "rgba(201,106,66,0.1)", border: "1px solid rgba(201,106,66,0.2)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                    🕐
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--espresso)", margin: 0, fontWeight: 600, letterSpacing: "-0.01em" }}>
                      Order Tracker
                    </h2>
                    {lastUpdated && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--mist)", margin: 0 }}>
                        Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <motion.button onClick={fetchOrders} disabled={loading} title="Refresh"
                    style={{ width: 36, height: 36, background: "none", border: "1.5px solid var(--cream-deeper)", borderRadius: "var(--radius-md)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bark)" }}
                    whileTap={{ scale: 0.9 }}>
                    <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                      animate={loading ? { rotate: 360 } : { rotate: 0 }}
                      transition={loading ? { duration: 0.8, repeat: Infinity, ease: "linear" } : {}}>
                      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                    </motion.svg>
                  </motion.button>
                  <motion.button onClick={onClose}
                    style={{ width: 36, height: 36, background: "none", border: "1.5px solid var(--cream-deeper)", borderRadius: "var(--radius-md)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bark)" }}
                    whileHover={{ borderColor: "var(--terra)", color: "var(--terra)" }} whileTap={{ scale: 0.9 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Stats */}
              {!loading && orders.length > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  {[
                    { label: "Total",     value: orders.length,       bg: "var(--cream-dark)",           color: "var(--bark)"  },
                    { label: "Active",    value: activeOrders.length,  bg: "rgba(201,106,66,0.1)",        color: "var(--terra)" },
                    { label: "Delivered", value: pastOrders.length,    bg: "rgba(74,124,89,0.1)",         color: "#4a7c59"      },
                  ].map(s => (
                    <div key={s.label} style={{ flex: 1, background: s.bg, borderRadius: "var(--radius-md)", padding: "8px 10px", textAlign: "center", border: "1px solid rgba(212,197,176,0.3)" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: s.color, margin: 0, lineHeight: 1 }}>{s.value}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: s.color, margin: 0, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginTop: 3 }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", scrollbarWidth: "thin", scrollbarColor: "var(--sand) transparent" }}>
              {/* Skeleton */}
              {loading && orders.length === 0 && (
                [1, 2, 3].map(i => (
                  <div key={i} style={{ background: "var(--cream)", border: "1.5px solid var(--cream-deeper)", borderRadius: "var(--radius-lg)", padding: 14, marginBottom: 12, display: "flex", gap: 12 }}>
                    <div className="skeleton" style={{ width: 52, height: 64, flexShrink: 0, borderRadius: "var(--radius-md)" }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                      <div className="skeleton" style={{ height: 14, width: "65%", borderRadius: 6 }} />
                      <div className="skeleton" style={{ height: 12, width: "45%", borderRadius: 6 }} />
                      <div className="skeleton" style={{ height: 22, width: "32%", borderRadius: "var(--radius-full)" }} />
                    </div>
                  </div>
                ))
              )}

              {/* Empty */}
              {!loading && orders.length === 0 && (
                <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--mist)" }}>
                  <div style={{ fontSize: "3rem", marginBottom: 12, opacity: 0.35 }}>📭</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--espresso)", marginBottom: 6, fontWeight: 600 }}>No orders yet</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", lineHeight: 1.6 }}>Start shopping to track your orders here!</p>
                </div>
              )}

              {activeOrders.length > 0 && (
                <>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 10 }}>
                    Active Orders ({activeOrders.length})
                  </p>
                  {activeOrders.map((order, i) => <OrderTrackCard key={order._id || i} order={order} currency={currency} />)}
                </>
              )}

              {pastOrders.length > 0 && (
                <>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--mist)", textTransform: "uppercase", margin: "20px 0 10px" }}>
                    Delivered ({pastOrders.length})
                  </p>
                  {pastOrders.map((order, i) => <OrderTrackCard key={order._id || i} order={order} currency={currency} />)}
                </>
              )}
            </div>

            {/* Footer */}
            <div style={{ background: "var(--cream)", borderTop: "1px solid var(--cream-deeper)", padding: "12px 16px", flexShrink: 0 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--mist)", textAlign: "center", margin: 0 }}>
                Tap any order to see detailed tracking · Auto-refreshes every 30s
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderTracker;