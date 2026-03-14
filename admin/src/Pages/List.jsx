
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list", { headers: { token } });
            if (response.data.success) setList(response.data.products);
            else toast.error(response.data.message || "Failed");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
            if (response.data.success) { toast.success(response.data.message); await fetchList(); }
            else toast.error(response.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => { fetchList(); }, []);

    return (
        <>
            <style>{`
                .list-page {
                    padding: 2rem;
                    width: 100%;
                }

                .list-page-title {
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

                .list-page-title::before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 20px;
                    background: #D4755B;
                    border-radius: 2px;
                }

                .list-count {
                    font-size: 0.78rem;
                    color: #A8B5A0;
                    margin-bottom: 14px;
                    letter-spacing: 0.04em;
                }

                .list-count span { color: #D4755B; font-weight: 700; }

                /* TABLE HEADER */
                .list-table-header {
                    display: none;
                    grid-template-columns: 64px 3fr 1fr 1fr 80px;
                    align-items: center;
                    padding: 10px 16px;
                    background: linear-gradient(135deg, #E8D5C4, #FFFDF9);
                    border: 1px solid #E8D5C4;
                    border-radius: 12px 12px 0 0;
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #A8B5A0;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    gap: 12px;
                }

                @media (min-width: 768px) { .list-table-header { display: grid; } }

                /* TABLE ROWS */
                .list-table-row {
                    display: grid;
                    grid-template-columns: 64px 3fr 1fr;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    background: #FFFDF9;
                    border: 1px solid #E8D5C4;
                    border-top: none;
                    transition: background 0.2s;
                }

                .list-table-row:hover { background: #FFF8F5; }

                .list-table-row:last-child { border-radius: 0 0 12px 12px; }

                @media (min-width: 768px) {
                    .list-table-row {
                        grid-template-columns: 64px 3fr 1fr 1fr 80px;
                    }
                }

                .list-product-img {
                    width: 52px;
                    height: 52px;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 1px solid #E8D5C4;
                }

                .list-product-name {
                    color: #8B5A4A;
                    font-size: 0.86rem;
                    font-weight: 600;
                    line-height: 1.4;
                }

                .list-product-category {
                    color: #A8B5A0;
                    font-size: 0.78rem;
                }

                .list-category-badge {
                    display: inline-block;
                    background: #E8D5C4;
                    color: #8B5A4A;
                    font-size: 0.7rem;
                    font-weight: 700;
                    padding: 3px 10px;
                    border-radius: 50px;
                    letter-spacing: 0.06em;
                }

                .list-product-price {
                    color: #D4755B;
                    font-size: 0.88rem;
                    font-weight: 700;
                }

                .list-delete-btn {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: #E8D5C4;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                    color: #8B5A4A;
                    transition: background 0.2s, transform 0.15s;
                    font-weight: 700;
                }

                .list-delete-btn:hover {
                    background: #D4755B;
                    color: #FFFDF9;
                    transform: scale(1.1);
                }

                .list-empty {
                    text-align: center;
                    padding: 4rem 2rem;
                    color: #A8B5A0;
                    font-size: 0.88rem;
                    background: #FFFDF9;
                    border: 1px solid #E8D5C4;
                    border-radius: 12px;
                }
            `}</style>

            <div className='list-page'>
                <h2 className='list-page-title'>All Products</h2>
                <p className='list-count'>Showing <span>{list.length}</span> products</p>

                <div>
                    <div className='list-table-header'>
                        <span>Image</span>
                        <span>Name</span>
                        <span>Category</span>
                        <span>Price</span>
                        <span style={{ textAlign: 'center' }}>Action</span>
                    </div>

                    {list.length === 0 ? (
                        <div className='list-empty'>No products found. Add some products to get started.</div>
                    ) : (
                        list.map((item, index) => (
                            <div className='list-table-row' key={index}>
                                <img className='list-product-img' src={item.image[0]} alt={item.name} />
                                <p className='list-product-name'>{item.name}</p>
                                <span className='list-category-badge hidden md:inline-block'>{item.category}</span>
                                <p className='list-product-price hidden md:block'>{currency}{item.price}</p>
                                <div className='flex md:justify-center'>
                                    <button onClick={() => removeProduct(item._id)} className='list-delete-btn' title="Remove product">✕</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default List;