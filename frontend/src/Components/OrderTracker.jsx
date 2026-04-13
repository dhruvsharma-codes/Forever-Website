import React, { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// ── Status pipeline — must match admin's select options exactly ───────────────
const STEPS = [
  {
    key: "Order Placed",
    label: "Order Placed",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    desc: "Your order has been received and confirmed.",
  },
  {
    key: "Packing",
    label: "Packing",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    desc: "We're carefully packing your items.",
  },
  {
    key: "Ship",
    label: "Shipped",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    desc: "Your order is on its way.",
  },
  {
    key: "Out for Delivery",
    label: "Out for Delivery",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    desc: "Your order is nearby — out for delivery!",
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    desc: "Your order has been delivered. Enjoy!",
  },
];

const getStepIndex = (status) => {
  const idx = STEPS.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
};

// ── Single order tracker card ─────────────────────────────────────────────────
const OrderTrackCard = ({ order, currency }) => {
  const currentIdx = getStepIndex(order.status);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      style={{
        background: "#F7EFE6",
        border: "1.5px solid #EDD8C4",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 14,
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Order header */}
      <div
        onClick={() => setExpanded((p) => !p)}
        style={{
          padding: "14px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        {/* Product image */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid #EDD8C4",
            flexShrink: 0,
            background: "#EDD8C4",
          }}
        >
          {order.items[0]?.image?.[0] && (
            <img
              src={order.items[0].image[0]}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Item names */}
          <p
            style={{
              fontSize: "0.84rem",
              fontWeight: 700,
              color: "#3D2318",
              margin: "0 0 3px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {order.items.map((i) => i.name).join(", ")}
          </p>
          <p
            style={{ fontSize: "0.75rem", color: "#98A98E", margin: "0 0 6px" }}
          >
            {new Date(order.date).toDateString()} · {order.items.length} item
            {order.items.length > 1 ? "s" : ""} · {currency}
            {order.amount}
          </p>

          {/* Status pill */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "3px 10px",
              borderRadius: 20,
              background:
                order.status === "Delivered"
                  ? "rgba(92,184,92,0.12)"
                  : "rgba(201,106,66,0.1)",
              color: order.status === "Delivered" ? "#3a8a3a" : "#C96A42",
              border: `1px solid ${order.status === "Delivered" ? "rgba(92,184,92,0.3)" : "rgba(201,106,66,0.25)"}`,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "currentColor",
                flexShrink: 0,
              }}
            />
            {order.status}
          </span>
        </div>

        {/* Chevron */}
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#98A98E"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: 4 }}
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </div>

      {/* Progress timeline */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "4px 16px 20px",
                borderTop: "1px solid #EDD8C4",
              }}
            >
              {/* Payment badge */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  padding: "10px 0 16px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    background: "#EDD8C4",
                    color: "#7A4A38",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontWeight: 600,
                  }}
                >
                  {order.paymentMethod}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontWeight: 600,
                    background: order.payment
                      ? "rgba(92,184,92,0.1)"
                      : "rgba(201,106,66,0.1)",
                    color: order.payment ? "#3a8a3a" : "#C96A42",
                  }}
                >
                  {order.payment ? "✓ Paid" : "⏳ Payment Pending"}
                </span>
              </div>

              {/* Steps */}
              <div style={{ position: "relative", paddingLeft: 28 }}>
                {/* Vertical line */}
                <div
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 10,
                    bottom: 10,
                    width: 2,
                    background: "#EDD8C4",
                    borderRadius: 2,
                  }}
                />

                {/* Filled progress line */}
                <motion.div
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 10,
                    width: 2,
                    background: "linear-gradient(180deg, #C96A42, #EDD8C4)",
                    borderRadius: 2,
                    transformOrigin: "top",
                  }}
                  initial={{ height: 0 }}
                  animate={{
                    height:
                      currentIdx === 0
                        ? 0
                        : `${(currentIdx / (STEPS.length - 1)) * 100}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {STEPS.map((step, idx) => {
                  const done = idx < currentIdx;
                  const active = idx === currentIdx;
                  const future = idx > currentIdx;

                  return (
                    <div
                      key={step.key}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        marginBottom: idx < STEPS.length - 1 ? 20 : 0,
                      }}
                    >
                      {/* Step dot */}
                      <motion.div
                        style={{
                          position: "absolute",
                          left: -28,
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          background: done
                            ? "#C96A42"
                            : active
                              ? "#F7EFE6"
                              : "#F7EFE6",
                          border: `2px solid ${done ? "#C96A42" : active ? "#C96A42" : "#EDD8C4"}`,
                          zIndex: 1,
                          color: done
                            ? "#F7EFE6"
                            : active
                              ? "#C96A42"
                              : "#EDD8C4",
                        }}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: active ? 1.15 : 1 }}
                        transition={{ duration: 0.4, delay: idx * 0.06 }}
                      >
                        {done ? (
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <div
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: active ? "#C96A42" : "#EDD8C4",
                            }}
                          />
                        )}
                      </motion.div>

                      {/* Step content */}
                      <div style={{ paddingTop: 1 }}>
                        <p
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: active ? 700 : 600,
                            color: done
                              ? "#3D2318"
                              : active
                                ? "#C96A42"
                                : "#98A98E",
                            margin: "0 0 2px",
                            lineHeight: 1.3,
                          }}
                        >
                          {step.label}
                          {active && (
                            <span
                              style={{
                                marginLeft: 6,
                                fontSize: "0.62rem",
                                background: "#C96A42",
                                color: "#F7EFE6",
                                padding: "1px 7px",
                                borderRadius: 10,
                                fontWeight: 700,
                                verticalAlign: "middle",
                              }}
                            >
                              CURRENT
                            </span>
                          )}
                        </p>
                        {(done || active) && (
                          <p
                            style={{
                              fontSize: "0.75rem",
                              color: "#7A4A38",
                              margin: 0,
                              lineHeight: 1.5,
                            }}
                          >
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

// ── Main OrderTracker slide-over ──────────────────────────────────────────────
const OrderTracker = ({ isOpen, onClose }) => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );
      if (res.data.success) {
        setOrders(res.data.orders.reverse()); // newest first
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token, backendUrl]);

  // Fetch on open
  useEffect(() => {
    if (isOpen) fetchOrders();
  }, [isOpen, fetchOrders]);

  // Auto-refresh every 30 seconds while open
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [isOpen, fetchOrders]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const activeOrders = orders.filter((o) => o.status !== "Delivered");
  const pastOrders = orders.filter((o) => o.status === "Delivered");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(61,35,24,0.35)",
              zIndex: 800,
              backdropFilter: "blur(3px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-over panel */}
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 440,
              background: "#F0E8DF",
              zIndex: 900,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-12px 0 48px rgba(61,35,24,0.2)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            {/* Header */}
            <div
              style={{
                background: "#F7EFE6",
                borderBottom: "1.5px solid #EDD8C4",
                padding: "18px 20px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "#EDD8C4",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C96A42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Georgia',serif",
                        fontSize: "1.1rem",
                        color: "#3D2318",
                        margin: 0,
                        fontWeight: 700,
                      }}
                    >
                      Order Tracker
                    </h2>
                    {lastUpdated && (
                      <p
                        style={{
                          fontSize: "0.68rem",
                          color: "#98A98E",
                          margin: 0,
                        }}
                      >
                        Updated{" "}
                        {lastUpdated.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* Refresh button */}
                  <motion.button
                    onClick={fetchOrders}
                    disabled={loading}
                    style={{
                      background: "none",
                      border: "1.5px solid #EDD8C4",
                      borderRadius: 8,
                      padding: "6px 8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "#7A4A38",
                    }}
                    whileTap={{ scale: 0.9 }}
                    title="Refresh"
                  >
                    <motion.svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={loading ? { rotate: 360 } : { rotate: 0 }}
                      transition={
                        loading
                          ? { duration: 0.8, repeat: Infinity, ease: "linear" }
                          : {}
                      }
                    >
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </motion.svg>
                  </motion.button>
                  {/* Close button */}
                  <motion.button
                    onClick={onClose}
                    style={{
                      background: "none",
                      border: "1.5px solid #EDD8C4",
                      borderRadius: 8,
                      padding: "6px 8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "#7A4A38",
                    }}
                    whileHover={{ borderColor: "#C96A42", color: "#C96A42" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Stats row */}
              {!loading && orders.length > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  {[
                    {
                      label: "Total",
                      value: orders.length,
                      color: "#7A4A38",
                      bg: "#EDD8C4",
                    },
                    {
                      label: "Active",
                      value: activeOrders.length,
                      color: "#C96A42",
                      bg: "rgba(201,106,66,0.12)",
                    },
                    {
                      label: "Delivered",
                      value: pastOrders.length,
                      color: "#3a8a3a",
                      bg: "rgba(92,184,92,0.12)",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        flex: 1,
                        background: s.bg,
                        borderRadius: 8,
                        padding: "6px 10px",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1rem",
                          fontWeight: 800,
                          color: s.color,
                          margin: 0,
                        }}
                      >
                        {s.value}
                      </p>
                      <p
                        style={{
                          fontSize: "0.65rem",
                          color: s.color,
                          margin: 0,
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          opacity: 0.8,
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Scrollable body */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                scrollbarWidth: "thin",
                scrollbarColor: "#EDD8C4 transparent",
              }}
            >
              {/* Loading skeleton */}
              {loading && orders.length === 0 && (
                <>
                  <style>{`@keyframes ot-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}.ot-sk{background:linear-gradient(90deg,#EDD8C4 25%,#F7EFE6 50%,#EDD8C4 75%);background-size:200% 100%;animation:ot-shimmer 1.4s infinite;border-radius:8px;}`}</style>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        background: "#F7EFE6",
                        border: "1.5px solid #EDD8C4",
                        borderRadius: 16,
                        padding: 14,
                        marginBottom: 12,
                        display: "flex",
                        gap: 12,
                      }}
                    >
                      <div
                        className="ot-sk"
                        style={{ width: 52, height: 52, flexShrink: 0 }}
                      />
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        <div
                          className="ot-sk"
                          style={{ height: 14, width: "70%" }}
                        />
                        <div
                          className="ot-sk"
                          style={{ height: 12, width: "45%" }}
                        />
                        <div
                          className="ot-sk"
                          style={{ height: 22, width: "35%", borderRadius: 20 }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Empty state */}
              {!loading && orders.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "4rem 1rem",
                    color: "#98A98E",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: 12 }}>◎</div>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                    No orders yet.
                    <br />
                    Start shopping to track your orders here!
                  </p>
                </div>
              )}

              {/* Active orders */}
              {activeOrders.length > 0 && (
                <>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: "#C96A42",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Active Orders ({activeOrders.length})
                  </p>
                  {activeOrders.map((order, i) => (
                    <OrderTrackCard
                      key={order._id || i}
                      order={order}
                      currency={currency}
                    />
                  ))}
                </>
              )}

              {/* Delivered orders */}
              {pastOrders.length > 0 && (
                <>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: "#98A98E",
                      textTransform: "uppercase",
                      margin: "20px 0 10px",
                    }}
                  >
                    Delivered ({pastOrders.length})
                  </p>
                  {pastOrders.map((order, i) => (
                    <OrderTrackCard
                      key={order._id || i}
                      order={order}
                      currency={currency}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Footer hint */}
            <div
              style={{
                background: "#F7EFE6",
                borderTop: "1px solid #EDD8C4",
                padding: "10px 16px",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#98A98E",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Tap any order to see detailed tracking · Auto-refreshes every
                30s
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderTracker;
