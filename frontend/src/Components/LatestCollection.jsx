import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import Item from './Item';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);

    return (
        <>
            <style>{`
                .latest-section {
                    margin: 4rem 0;
                }

                .latest-header {
                    text-align: center;
                    padding: 2.5rem 0 2rem;
                    position: relative;
                }

                .latest-header::after {
                    content: '';
                    display: block;
                    width: 60px;
                    height: 3px;
                    background: linear-gradient(90deg, #D4755B, #A8B5A0);
                    border-radius: 2px;
                    margin: 16px auto 0;
                }

                .latest-subtitle {
                    max-width: 520px;
                    margin: 12px auto 0;
                    color: #A8B5A0;
                    font-size: 0.88rem;
                    line-height: 1.7;
                    letter-spacing: 0.02em;
                }

                .section-bg-accent {
                    background: radial-gradient(ellipse at top center, rgba(232, 213, 196, 0.35) 0%, transparent 70%);
                    border-radius: 24px;
                    padding: 2rem;
                    margin: 0 -1rem;
                }
            `}</style>

            <div className='latest-section'>
                <div className='section-bg-accent'>
                    <div className='latest-header'>
                        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                        <p className='latest-subtitle'>
                            Discover our latest collection, curated with fresh styles and trending designs just for you.
                        </p>
                    </div>

                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
                        {latestProducts.map((item, index) => (
                            <Item key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LatestCollection;