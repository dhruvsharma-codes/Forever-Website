import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom';

const Item = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <>
            <style>{`
                .product-card {
                    background: #FFFDF9;
                    border: 1px solid #E8D5C4;
                    border-radius: 16px;
                    overflow: hidden;
                    text-decoration: none;
                    display: block;
                    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
                    box-shadow: 0 2px 8px rgba(139, 90, 74, 0.07);
                }

                .product-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 32px rgba(139, 90, 74, 0.16);
                    border-color: #D4755B;
                }

                .product-img-wrap {
                    overflow: hidden;
                    background: #E8D5C4;
                    aspect-ratio: 1 / 1.1;
                    position: relative;
                }

                .product-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.45s ease;
                }

                .product-card:hover .product-img-wrap img {
                    transform: scale(1.08);
                }

                .product-tag {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: #A8B5A0;
                    color: #FFFDF9;
                    font-size: 0.62rem;
                    letter-spacing: 0.1em;
                    font-weight: 700;
                    padding: 3px 10px;
                    border-radius: 50px;
                    text-transform: uppercase;
                }

                .product-info {
                    padding: 12px 14px 14px;
                }

                .product-name {
                    color: #8B5A4A;
                    font-size: 0.82rem;
                    font-weight: 500;
                    margin-bottom: 4px;
                    line-height: 1.4;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .product-price {
                    color: #D4755B;
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                }
            `}</style>

            <Link className='product-card' to={`/product/${id}`}>
                <div className='product-img-wrap'>
                    <img src={image[0]} alt={name} />
                    <span className='product-tag'>New</span>
                </div>
                <div className='product-info'>
                    <p className='product-name'>{name}</p>
                    <p className='product-price'>{currency}{price}</p>
                </div>
            </Link>
        </>
    );
};

export default Item;