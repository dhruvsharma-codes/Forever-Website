// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import { useSearchParams } from 'react-router-dom'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Verify = () => {
//     const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
//     const [searchParams] = useSearchParams();
//     const success = searchParams.get('success');
//     const orderId = searchParams.get('orderId');

//     const verifyPayment = async () => {
//         try {
//             if (!token) return null;
//             const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } });
//             if (response.data.success) { setCartItems({}); navigate('/orders'); }
//             else navigate('/cart');
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     };

//     useEffect(() => { verifyPayment(); }, [token]);

//     return (
//         <>
//             <style>{`
//                 .verify-page {
//                     min-height: 70vh;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     background: linear-gradient(160deg, #FFFDF9 60%, #E8D5C4 100%);
//                 }

//                 .verify-card {
//                     background: #FFFDF9;
//                     border: 1px solid #E8D5C4;
//                     border-radius: 20px;
//                     padding: 3rem 2.5rem;
//                     text-align: center;
//                     box-shadow: 0 8px 40px rgba(139, 90, 74, 0.12);
//                     max-width: 360px;
//                     width: 100%;
//                 }

//                 .verify-spinner {
//                     width: 48px;
//                     height: 48px;
//                     border: 3px solid #E8D5C4;
//                     border-top-color: #D4755B;
//                     border-radius: 50%;
//                     margin: 0 auto 1.5rem;
//                     animation: spin 0.9s linear infinite;
//                 }

//                 @keyframes spin {
//                     to { transform: rotate(360deg); }
//                 }

//                 .verify-title {
//                     color: #8B5A4A;
//                     font-family: 'Georgia', serif;
//                     font-size: 1.3rem;
//                     margin-bottom: 8px;
//                 }

//                 .verify-desc {
//                     color: #A8B5A0;
//                     font-size: 0.84rem;
//                     line-height: 1.7;
//                 }
//             `}</style>

//             <div className='verify-page'>
//                 <div className='verify-card'>
//                     <div className='verify-spinner'></div>
//                     <h2 className='verify-title'>Verifying Payment</h2>
//                     <p className='verify-desc'>Please wait while we confirm your order. You'll be redirected automatically.</p>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Verify;






import { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import {motion} from "framer-motion"
import axios from 'axios'
import { toast } from 'react-toastify'
  const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
 
    const verifyPayment = async () => {
        try {
            if (success !== 'true' || !token || !orderId) {
                navigate('/cart');
                return;
            }
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId, userId: token ? JSON.parse(atob(token.split('.')[1])).id : null }, { headers: { token } })
            if (response.data.success) { 
                setCartItems({});
                navigate('/orders'); 
            } else {
                navigate('/cart');
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
            navigate('/cart');
        }
    }
 
    useEffect(() => { verifyPayment() }, [token])
 
    return (
        <>
            <style>{`
                @keyframes spin { to { transform:rotate(360deg) } }
                .verify-page { min-height:70vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(160deg,#F7EFE6 60%,#EDD8C4 100%); padding:2rem; }
                .verify-card { background:#F7EFE6; border:1.5px solid #EDD8C4; border-radius:20px; padding:3rem 2.5rem; text-align:center; box-shadow:0 8px 40px rgba(61,35,24,0.12); max-width:360px; width:100%; }
                .verify-spinner { width:48px; height:48px; border:3px solid #EDD8C4; border-top-color:#C96A42; border-radius:50%; margin:0 auto 1.5rem; animation:spin 0.9s linear infinite; }
            `}</style>
            <div className="verify-page">
                <motion.div className="verify-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                    <div className="verify-spinner" />
                    <h2 style={{ color: '#7A4A38', fontFamily: "'Georgia',serif", fontSize: '1.3rem', marginBottom: 8 }}>Verifying Payment</h2>
                    <p style={{ color: '#98A98E', fontSize: '0.84rem', lineHeight: 1.7 }}>Please wait while we confirm your order. You'll be redirected automatically.</p>
                </motion.div>
            </div>
        </>
    )
}

export default Verify