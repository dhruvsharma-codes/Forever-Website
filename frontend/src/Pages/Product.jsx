

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../Components/RelatedProducts'

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) { setProductData(item); setImage(item.image[0]); }
        });
    };

    useEffect(() => { fetchProductData(); }, [productId]);

    return productData ? (
        <>
            <style>{`
                .product-page {
                    padding-top: 2.5rem;
                    border-top: 2px solid #E8D5C4;
                }

                .thumb-img {
                    border: 1.5px solid #E8D5C4;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: border-color 0.2s, transform 0.2s;
                    overflow: hidden;
                }

                .thumb-img:hover, .thumb-img.active {
                    border-color: #D4755B;
                    transform: scale(1.04);
                }

                .main-img-wrap {
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid #E8D5C4;
                    background: #E8D5C4;
                }

                .main-img-wrap img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .product-title {
                    color: #8B5A4A;
                    font-family: 'Georgia', serif;
                    font-size: 1.6rem;
                    margin-bottom: 10px;
                    line-height: 1.3;
                }

                .star-row {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    margin-bottom: 16px;
                }

                .star-row img {
                    width: 14px;
                    filter: invert(65%) sepia(60%) saturate(500%) hue-rotate(340deg);
                }

                .review-count {
                    color: #A8B5A0;
                    font-size: 0.82rem;
                    margin-left: 6px;
                }

                .product-price-tag {
                    color: #D4755B;
                    font-size: 1.9rem;
                    font-weight: 700;
                    margin-bottom: 14px;
                    letter-spacing: 0.01em;
                }

                .product-desc {
                    color: #A8B5A0;
                    font-size: 0.88rem;
                    line-height: 1.8;
                    margin-bottom: 24px;
                    max-width: 85%;
                }

                .size-label {
                    color: #8B5A4A;
                    font-size: 0.78rem;
                    letter-spacing: 0.14em;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                }

                .size-btn {
                    padding: 9px 18px;
                    border: 1.5px solid #E8D5C4;
                    border-radius: 8px;
                    background: #FFFDF9;
                    color: #8B5A4A;
                    font-size: 0.82rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s, color 0.2s;
                }

                .size-btn:hover {
                    border-color: #D4755B;
                    background: #FFF8F5;
                }

                .size-btn.selected {
                    border-color: #D4755B;
                    background: #D4755B;
                    color: #FFFDF9;
                }

                .add-to-cart-btn {
                    background: #8B5A4A;
                    color: #FFFDF9;
                    border: none;
                    border-radius: 50px;
                    padding: 14px 36px;
                    font-size: 0.82rem;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    cursor: pointer;
                    margin-top: 24px;
                    transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
                    box-shadow: 0 4px 16px rgba(139, 90, 74, 0.25);
                }

                .add-to-cart-btn:hover {
                    background: #D4755B;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(212, 117, 91, 0.3);
                }

                .product-info-divider {
                    border: none;
                    border-top: 1px dashed #E8D5C4;
                    margin: 20px 0;
                }

                .product-trust-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.8rem;
                    color: #A8B5A0;
                }

                .product-trust-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #A8B5A0;
                    flex-shrink: 0;
                }

                .desc-tab-row {
                    display: flex;
                    border-bottom: 2px solid #E8D5C4;
                    margin-top: 3.5rem;
                }

                .desc-tab {
                    padding: 12px 24px;
                    font-size: 0.82rem;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    color: #A8B5A0;
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    margin-bottom: -2px;
                    transition: color 0.2s, border-color 0.2s;
                }

                .desc-tab.active, .desc-tab:first-child {
                    color: #8B5A4A;
                    border-bottom-color: #D4755B;
                }

                .desc-content {
                    padding: 24px 0;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .desc-content p {
                    color: #A8B5A0;
                    font-size: 0.87rem;
                    line-height: 1.9;
                }
            `}</style>

            <div className='product-page'>
                <div className='flex flex-col gap-10 sm:flex-row sm:gap-12'>

                    {/* IMAGES */}
                    <div className='flex flex-col-reverse flex-1 gap-3 sm:flex-row'>
                        <div className='flex justify-between sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[19%] w-full gap-2'>
                            {productData.image.map((item, index) => (
                                <img
                                    onClick={() => setImage(item)}
                                    src={item} alt={index} key={index}
                                    className={`w-[23%] sm:w-full flex-shrink-0 thumb-img ${image === item ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                        <div className='main-img-wrap w-full sm:w-[80%]'>
                            <img src={image} alt="product" />
                        </div>
                    </div>

                    {/* PRODUCT INFO */}
                    <div className='flex-1'>
                        <h1 className='product-title'>{productData.name}</h1>
                        <div className='star-row'>
                            {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt="star" />)}
                            <img src={assets.star_dull_icon} alt="star" style={{ opacity: 0.4 }} />
                            <span className='review-count'>(122 reviews)</span>
                        </div>
                        <p className='product-price-tag'>{currency}{productData.price}</p>
                        <p className='product-desc'>{productData.description}</p>

                        <div>
                            <p className='size-label'>Select Size</p>
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {productData.sizes.map((item, index) => (
                                    <button
                                        onClick={() => setSize(item)}
                                        className={`size-btn ${item === size ? 'selected' : ''}`}
                                        key={index}
                                    >{item}</button>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => addToCart(productData._id, size)} className='add-to-cart-btn'>
                            Add to Cart
                        </button>

                        <hr className='product-info-divider' />

                        <div className='flex flex-col gap-3'>
                            <div className='product-trust-item'><span className='product-trust-dot'></span>100% Original Product</div>
                            <div className='product-trust-item'><span className='product-trust-dot'></span>Cash on delivery available</div>
                            <div className='product-trust-item'><span className='product-trust-dot'></span>Easy return & exchange within 7 days</div>
                        </div>
                    </div>
                </div>

                {/* DESCRIPTION & REVIEWS */}
                <div className='mt-16'>
                    <div className='desc-tab-row'>
                        <p className='desc-tab active'>Description</p>
                        <p className='desc-tab'>Reviews (122)</p>
                    </div>
                    <div className='desc-content'>
                        <p>An E-Commerce website is an online platform that facilitates the buying and selling of products through online methods. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
                        <p>E-Commerce websites typically display products or services along with detailed product data. Every piece is thoughtfully curated to bring you quality and style that lasts.</p>
                    </div>
                </div>

                <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
            </div>
        </>
    ) : <div className='opacity-0'> </div>;
};

export default Product;