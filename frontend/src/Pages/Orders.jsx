

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import axios from 'axios'

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) return null;
            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
            if (response.data.success) {
                let allOrdersItem = [];
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { loadOrderData(); }, [token]);

    const getStatusColor = (status) => {
        const s = (status || '').toLowerCase();
        if (s.includes('deliver')) return '#A8B5A0';
        if (s.includes('ship')) return '#D4755B';
        if (s.includes('cancel')) return '#E8A090';
        return '#D4755B';
    };

    return (
        <>
            <style>{`
                .orders-page {
                    padding-top: 3rem;
                    border-top: 2px solid #E8D5C4;
                    min-height: 60vh;
                }

                .order-card {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    padding: 20px 0;
                    border-bottom: 1px solid #E8D5C4;
                    transition: background 0.2s;
                }

                .order-card:first-of-type {
                    border-top: 1px solid #E8D5C4;
                }

                .order-img {
                    width: 72px;
                    height: 72px;
                    object-fit: cover;
                    border-radius: 10px;
                    border: 1px solid #E8D5C4;
                    flex-shrink: 0;
                }

                .order-name {
                    color: #8B5A4A;
                    font-weight: 700;
                    font-size: 0.92rem;
                    margin-bottom: 6px;
                }

                .order-meta {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.82rem;
                }

                .order-price {
                    color: #D4755B;
                    font-weight: 700;
                }

                .order-pill {
                    background: #E8D5C4;
                    color: #8B5A4A;
                    font-size: 0.72rem;
                    font-weight: 600;
                    padding: 3px 10px;
                    border-radius: 50px;
                    letter-spacing: 0.04em;
                }

                .order-date {
                    font-size: 0.78rem;
                    color: #A8B5A0;
                    margin-top: 6px;
                }

                .order-payment-badge {
                    font-size: 0.72rem;
                    color: #A8B5A0;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }

                .order-status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                }

                .order-status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .track-btn {
                    background: transparent;
                    border: 1.5px solid #E8D5C4;
                    color: #8B5A4A;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    padding: 9px 20px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.2s;
                    white-space: nowrap;
                }

                .track-btn:hover {
                    background: #D4755B;
                    color: #FFFDF9;
                    border-color: #D4755B;
                    transform: translateY(-1px);
                }

                .orders-right {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                }

                @media (min-width: 768px) {
                    .order-card {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .orders-right {
                        min-width: 240px;
                        justify-content: flex-end;
                        gap: 24px;
                    }
                }
            `}</style>

            <div className='orders-page'>
                <div style={{ marginBottom: '1.5rem' }}>
                    <Title text1={'MY'} text2={'ORDERS'} />
                </div>

                <div>
                    {orderData.map((item, index) => (
                        <div key={index} className='order-card'>
                            <div className='flex items-start gap-5'>
                                <img src={item.image[0]} alt={item.name} className='order-img' />
                                <div>
                                    <p className='order-name'>{item.name}</p>
                                    <div className='order-meta'>
                                        <span className='order-price'>{currency}{item.price}</span>
                                        <span className='order-pill'>Qty: {item.quantity}</span>
                                        <span className='order-pill'>Size: {item.size}</span>
                                    </div>
                                    <p className='order-date'>
                                        Ordered: {new Date(item.date).toDateString()}
                                    </p>
                                    <p className='order-payment-badge'>via {item.paymentMethod}</p>
                                </div>
                            </div>

                            <div className='orders-right'>
                                <div className='order-status-badge'>
                                    <span className='order-status-dot' style={{ background: getStatusColor(item.status) }}></span>
                                    <span style={{ color: getStatusColor(item.status) }}>{item.status}</span>
                                </div>
                                <button onClick={loadOrderData} className='track-btn'>Track Order</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Orders;