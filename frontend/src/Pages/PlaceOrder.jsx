import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, currency } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', street: '',
        city: '', state: '', zipcode: '', country: '', phone: ''
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount, currency: order.currency,
            name: 'Order Payment', description: 'Order Payment',
            order_id: order.id, receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
                    if (data.success) { navigate('/orders'); setCartItems({}); }
                } catch (error) { toast.error(error.message); }
            }
        };
        new window.Razorpay(options).open();
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(p => p._id === items));
                        if (itemInfo) { itemInfo.size = item; itemInfo.quantity = cartItems[items][item]; orderItems.push(itemInfo); }
                    }
                }
            }
            const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee };

            switch (method) {
                case 'cod': {
                    const r = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
                    if (r.data.success) { setCartItems({}); navigate('/orders'); } else toast.error(r.data.message);
                    break;
                }
                case 'stripe': {
                    const r = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
                    if (r.data.success) window.location.replace(r.data.session_url); else toast.error(r.data.message);
                    break;
                }
                case 'razorpay': {
                    const r = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
                    if (r.data.success) initPay(r.data.order);
                    break;
                }
            }
        } catch (error) { toast.error(error.message); }
    };

    return (
        <>
            <style>{`
                .place-order-page {
                    border-top: 2px solid #E8D5C4;
                    padding-top: 2.5rem;
                    min-height: 80vh;
                }

                .form-input {
                    width: 100%;
                    background: #FFFDF9;
                    border: 1.5px solid #E8D5C4;
                    border-radius: 10px;
                    padding: 11px 16px;
                    font-size: 0.86rem;
                    color: #8B5A4A;
                    outline: none;
                    transition: border-color 0.25s, box-shadow 0.25s;
                    box-sizing: border-box;
                }

                .form-input::placeholder { color: #A8B5A0; }

                .form-input:focus {
                    border-color: #D4755B;
                    box-shadow: 0 0 0 3px rgba(212, 117, 91, 0.1);
                }

                .form-section-label {
                    font-size: 0.72rem;
                    color: #A8B5A0;
                    letter-spacing: 0.16em;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 14px;
                    margin-top: 6px;
                }

                .payment-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 18px;
                    border: 1.5px solid #E8D5C4;
                    border-radius: 12px;
                    cursor: pointer;
                    background: #FFFDF9;
                    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
                    flex: 1;
                    min-width: 120px;
                }

                .payment-option:hover {
                    border-color: #D4755B;
                    background: #FFF8F5;
                }

                .payment-option.selected {
                    border-color: #D4755B;
                    background: #FFF8F5;
                    box-shadow: 0 0 0 3px rgba(212, 117, 91, 0.1);
                }

                .payment-radio {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 2px solid #E8D5C4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: border-color 0.2s;
                }

                .payment-option.selected .payment-radio {
                    border-color: #D4755B;
                    background: #D4755B;
                    box-shadow: inset 0 0 0 3px #FFFDF9;
                }

                .payment-cod-label {
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #8B5A4A;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                .payment-logo {
                    height: 20px;
                    object-fit: contain;
                }

                .place-order-btn {
                    background: #D4755B;
                    color: #FFFDF9;
                    border: none;
                    border-radius: 50px;
                    padding: 14px 40px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
                    box-shadow: 0 4px 16px rgba(212, 117, 91, 0.3);
                    margin-top: 8px;
                }

                .place-order-btn:hover {
                    background: #8B5A4A;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(139, 90, 74, 0.3);
                }

                .right-panel {
                    margin-top: 2rem;
                    min-width: 300px;
                }

                @media (min-width: 640px) {
                    .right-panel { margin-top: 0; }
                }
            `}</style>

            <form onSubmit={onSubmitHandler} className='place-order-page flex flex-col justify-between gap-8 sm:flex-row'>

                {/* LEFT: DELIVERY INFO */}
                <div className='flex flex-col w-full gap-4 sm:max-w-[480px]'>
                    <div className='my-2'>
                        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                    </div>
                    <p className='form-section-label'>Shipping details</p>

                    <div className='flex gap-3'>
                        <input onChange={onChangeHandler} name='firstName' value={formData.firstName} required className='form-input' type="text" placeholder='First name' />
                        <input onChange={onChangeHandler} name='lastName' value={formData.lastName} required className='form-input' type="text" placeholder='Last name' />
                    </div>
                    <input onChange={onChangeHandler} name='email' value={formData.email} required className='form-input' type="email" placeholder='Email address' />
                    <input onChange={onChangeHandler} name='street' value={formData.street} required className='form-input' type="text" placeholder='Street address' />
                    <div className='flex gap-3'>
                        <input onChange={onChangeHandler} name='city' value={formData.city} required className='form-input' type="text" placeholder='City' />
                        <input onChange={onChangeHandler} name='state' value={formData.state} required className='form-input' type="text" placeholder='State' />
                    </div>
                    <div className='flex gap-3'>
                        <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} required className='form-input' type="text" placeholder='Zipcode' />
                        <input onChange={onChangeHandler} name='country' value={formData.country} required className='form-input' type="text" placeholder='Country' />
                    </div>
                    <input onChange={onChangeHandler} name='phone' value={formData.phone} required className='form-input' type="tel" placeholder='Phone number' />
                </div>

                {/* RIGHT: CART TOTAL + PAYMENT */}
                <div className='right-panel flex flex-col gap-8'>
                    <CartTotal />

                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <Title text1={'PAYMENT'} text2={'METHOD'} />
                        </div>

                        <div className='flex flex-col gap-3 lg:flex-row'>
                            <div onClick={() => setMethod('stripe')} className={`payment-option ${method === 'stripe' ? 'selected' : ''}`}>
                                <span className='payment-radio'></span>
                                <img className='payment-logo' src={assets.stripe_logo} alt="stripe" />
                            </div>
                            <div onClick={() => setMethod('razorpay')} className={`payment-option ${method === 'razorpay' ? 'selected' : ''}`}>
                                <span className='payment-radio'></span>
                                <img className='payment-logo' src={assets.razorpay_logo} alt="razorpay" />
                            </div>
                            <div onClick={() => setMethod('cod')} className={`payment-option ${method === 'cod' ? 'selected' : ''}`}>
                                <span className='payment-radio'></span>
                                <span className='payment-cod-label'>Cash on Delivery</span>
                            </div>
                        </div>

                        <div className='text-right mt-6'>
                            <button type='submit' className='place-order-btn'>Place Order →</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default PlaceOrder;