import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } },
      );
      if (response.data.success) setOrders(response.data.orders);
      else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } },
      );
      if (response.data.success) await fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const getStatusColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("delivered")) return { bg: "#A8B5A0", color: "#FFFDF9" };
    if (s.includes("out for")) return { bg: "#D4755B", color: "#FFFDF9" };
    if (s.includes("ship")) return { bg: "#E8845A", color: "#FFFDF9" };
    if (s.includes("packing")) return { bg: "#C8A892", color: "#FFFDF9" };
    return { bg: "#E8D5C4", color: "#8B5A4A" };
  };

  return (
    <>
      <style>{`
                .admin-orders-page {
                    padding: 2rem;
                    width: 100%;
                }

                .admin-orders-title {
                    color: #8B5A4A;
                    font-family: 'Georgia', serif;
                    font-size: 1.4rem;
                    margin-bottom: 1.5rem;
                    padding-bottom: 14px;
                    border-bottom: 2px solid #E8D5C4;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .admin-orders-title::before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 20px;
                    background: #D4755B;
                    border-radius: 2px;
                }

                .order-card {
                    display: grid;
                    grid-template-columns: 40px 1fr;
                    gap: 16px;
                    background: #FFFDF9;
                    border: 1px solid #E8D5C4;
                    border-radius: 14px;
                    padding: 18px;
                    margin-bottom: 12px;
                    transition: box-shadow 0.2s, border-color 0.2s;
                    box-shadow: 0 2px 8px rgba(139, 90, 74, 0.05);
                }

                .order-card:hover {
                    border-color: #D4755B;
                    box-shadow: 0 6px 24px rgba(139, 90, 74, 0.12);
                }

                @media (min-width: 640px) {
                    .order-card {
                        grid-template-columns: 40px 2fr 1fr 80px 180px;
                        align-items: start;
                    }
                }

                .order-parcel-icon {
                    width: 36px;
                    height: 36px;
                    background: #E8D5C4;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 7px;
                    flex-shrink: 0;
                }

                .order-parcel-icon img {
                    width: 20px;
                    filter: invert(35%) sepia(20%) saturate(800%) hue-rotate(340deg) brightness(80%);
                }

                .order-items-list {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    margin-bottom: 10px;
                }

                .order-item-text {
                    color: #8B5A4A;
                    font-size: 0.82rem;
                    font-weight: 500;
                }

                .order-item-size {
                    background: #E8D5C4;
                    color: #8B5A4A;
                    font-size: 0.68rem;
                    font-weight: 700;
                    padding: 1px 8px;
                    border-radius: 50px;
                    margin-left: 4px;
                }

                .order-customer-name {
                    color: #8B5A4A;
                    font-weight: 700;
                    font-size: 0.9rem;
                    margin-bottom: 6px;
                }

                .order-address {
                    color: #A8B5A0;
                    font-size: 0.78rem;
                    line-height: 1.7;
                }

                .order-phone {
                    color: #D4755B;
                    font-size: 0.78rem;
                    font-weight: 600;
                    margin-top: 4px;
                }

                .order-meta-item {
                    font-size: 0.78rem;
                    color: #A8B5A0;
                    margin-bottom: 4px;
                }

                .order-meta-item strong {
                    color: #8B5A4A;
                    font-weight: 600;
                }

                .payment-done {
                    color: #A8B5A0;
                    font-weight: 700;
                }

                .payment-pending {
                    color: #D4755B;
                    font-weight: 700;
                }

                .order-amount {
                    color: #D4755B;
                    font-size: 1.1rem;
                    font-weight: 800;
                    letter-spacing: 0.02em;
                }

                .status-select {
                    appearance: none;
                    background: #FFFDF9;
                    border: 1.5px solid #E8D5C4;
                    border-radius: 50px;
                    padding: 8px 32px 8px 14px;
                    font-size: 0.76rem;
                    color: #8B5A4A;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    outline: none;
                    transition: border-color 0.25s, box-shadow 0.25s;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23D4755B' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    width: 100%;
                }

                .status-select:focus {
                    border-color: #D4755B;
                    box-shadow: 0 0 0 3px rgba(212, 117, 91, 0.1);
                }

                .mobile-order-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                @media (min-width: 640px) {
                    .mobile-order-grid {
                        display: contents;
                    }
                }
            `}</style>

      <div className="admin-orders-page">
        <h2 className="admin-orders-title">Orders</h2>

        <div>
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              {/* ICON */}
              <div className="order-parcel-icon">
                <img src={assets.parcel_icon} alt="parcel" />
              </div>

              <div className="mobile-order-grid">
                {/* ITEMS + ADDRESS */}
                <div>
                  <div className="order-items-list">
                    {order.items.map((item, i) => (
                      <p className="order-item-text" key={i}>
                        {item.name} × {item.quantity}
                        <span className="order-item-size">{item.size}</span>
                        {i < order.items.length - 1 && ","}
                      </p>
                    ))}
                  </div>
                  <p className="order-customer-name">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="order-address">
                    <p>{order.address.street},</p>
                    <p>
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country} {order.address.zipcode}
                    </p>
                  </div>
                  <p className="order-phone">{order.address.phone}</p>
                </div>

                {/* META */}
                <div>
                  <p className="order-meta-item">
                    <strong>Items:</strong> {order.items.length}
                  </p>
                  <p className="order-meta-item">
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  <p className="order-meta-item">
                    <strong>Payment:</strong>{" "}
                    <span
                      className={
                        order.payment ? "payment-done" : "payment-pending"
                      }
                    >
                      {order.payment ? "✓ Done" : "⏳ Pending"}
                    </span>
                  </p>
                  <p className="order-meta-item">
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                {/* AMOUNT */}
                <p className="order-amount">
                  {currency}
                  {order.amount}
                </p>

                {/* STATUS */}
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="status-select"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Ship">Ship</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem",
                color: "#A8B5A0",
                background: "#FFFDF9",
                border: "1px solid #E8D5C4",
                borderRadius: "14px",
                fontSize: "0.88rem",
              }}
            >
              No orders found yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
