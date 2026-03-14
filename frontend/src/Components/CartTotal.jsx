import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    return (
        <>
            <style>{`
                .cart-total-wrapper {
                    width: 100%;
                    background: #FFFDF9;
                    border: 1px solid #E8D5C4;
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 16px rgba(139, 90, 74, 0.08);
                }

                .cart-total-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    font-size: 0.88rem;
                }

                .cart-total-label {
                    color: #A8B5A0;
                    font-weight: 500;
                    letter-spacing: 0.03em;
                }

                .cart-total-value {
                    color: #8B5A4A;
                    font-weight: 600;
                }

                .cart-total-divider {
                    border: none;
                    border-top: 1px dashed #E8D5C4;
                    margin: 4px 0;
                }

                .cart-total-final-label {
                    color: #8B5A4A;
                    font-weight: 800;
                    font-size: 0.95rem;
                    letter-spacing: 0.04em;
                }

                .cart-total-final-value {
                    color: #D4755B;
                    font-weight: 800;
                    font-size: 1.05rem;
                    letter-spacing: 0.02em;
                }

                .cart-total-shipping-note {
                    font-size: 0.72rem;
                    color: #A8B5A0;
                    background: rgba(168, 181, 160, 0.12);
                    border: 1px solid rgba(168, 181, 160, 0.3);
                    border-radius: 8px;
                    padding: 6px 12px;
                    margin-top: 10px;
                    text-align: center;
                    letter-spacing: 0.03em;
                }
            `}</style>

            <div className='cart-total-wrapper'>
                <div style={{ marginBottom: '12px' }}>
                    <Title text1={'CART'} text2={'TOTAL'} />
                </div>

                <div className='cart-total-row'>
                    <span className='cart-total-label'>Subtotal</span>
                    <span className='cart-total-value'>{currency}{getCartAmount()}</span>
                </div>

                <hr className='cart-total-divider' />

                <div className='cart-total-row'>
                    <span className='cart-total-label'>Shipping Fee</span>
                    <span className='cart-total-value'>{currency}{delivery_fee}.00</span>
                </div>

                <hr className='cart-total-divider' />

                <div className='cart-total-row' style={{ paddingTop: '14px' }}>
                    <span className='cart-total-final-label'>Total</span>
                    <span className='cart-total-final-value'>
                        {currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
                    </span>
                </div>

                <p className='cart-total-shipping-note'>Free shipping on orders over {currency}999</p>
            </div>
        </>
    );
};

export default CartTotal;