import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import Item from './Item';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products]);

    return (
        <>
            <style>{`
                .related-section {
                    margin: 5rem 0;
                    position: relative;
                }

                .related-section::before {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #E8D5C4, transparent);
                    margin-bottom: 3rem;
                }

                .related-header {
                    text-align: center;
                    padding-bottom: 1.5rem;
                }

                .related-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                }

                .related-label-line {
                    width: 32px;
                    height: 1px;
                    background: #A8B5A0;
                }

                .related-label-text {
                    color: #A8B5A0;
                    font-size: 0.72rem;
                    letter-spacing: 0.2em;
                    font-weight: 700;
                    text-transform: uppercase;
                }
            `}</style>

            <div className='related-section'>
                <div className='related-header'>
                    <div className='related-label'>
                        <span className='related-label-line'></span>
                        <span className='related-label-text'>You may also like</span>
                        <span className='related-label-line'></span>
                    </div>
                    <Title text1={'RELATED'} text2={'PRODUCTS'} />
                </div>

                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
                    {related.map((item, index) => (
                        <Item key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default RelatedProducts;