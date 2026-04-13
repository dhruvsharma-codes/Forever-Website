

import React, { useState } from 'react'
import axios from "axios"
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            

            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <style>{`
                .admin-login-page {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    min-height: 100vh;
                    background: linear-gradient(160deg, #FFFDF9 50%, #E8D5C4 100%);
                }

                .admin-login-card {
                    background: #FFFDF9;
                    border: 1px solid #E8D5C4;
                    border-radius: 20px;
                    padding: 2.5rem 2rem;
                    width: 100%;
                    max-width: 400px;
                    box-shadow: 0 12px 48px rgba(139, 90, 74, 0.14);
                }

                .admin-login-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .admin-login-badge {
                    display: inline-block;
                    background: #E8D5C4;
                    color: #D4755B;
                    font-size: 0.68rem;
                    letter-spacing: 0.18em;
                    font-weight: 800;
                    padding: 5px 16px;
                    border-radius: 50px;
                    text-transform: uppercase;
                    margin-bottom: 12px;
                }

                .admin-login-title {
                    font-family: 'Georgia', serif;
                    color: #8B5A4A;
                    font-size: 1.6rem;
                }

                .admin-login-subtitle {
                    color: #A8B5A0;
                    font-size: 0.82rem;
                    margin-top: 4px;
                }

                .admin-input-group {
                    margin-bottom: 16px;
                }

                .admin-input-label {
                    display: block;
                    font-size: 0.72rem;
                    color: #A8B5A0;
                    letter-spacing: 0.14em;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                }

                .admin-input {
                    width: 100%;
                    background: #FFFDF9;
                    border: 1.5px solid #E8D5C4;
                    border-radius: 10px;
                    padding: 11px 16px;
                    font-size: 0.88rem;
                    color: #8B5A4A;
                    outline: none;
                    transition: border-color 0.25s, box-shadow 0.25s;
                    box-sizing: border-box;
                }

                .admin-input::placeholder { color: #A8B5A0; }

                .admin-input:focus {
                    border-color: #D4755B;
                    box-shadow: 0 0 0 3px rgba(212, 117, 91, 0.1);
                }

                .admin-login-btn {
                    width: 100%;
                    background: #D4755B;
                    color: #FFFDF9;
                    border: none;
                    border-radius: 50px;
                    padding: 13px;
                    font-size: 0.82rem;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
                    box-shadow: 0 4px 16px rgba(212, 117, 91, 0.3);
                    margin-top: 10px;
                }

                .admin-login-btn:hover {
                    background: #8B5A4A;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(139, 90, 74, 0.3);
                }

                .admin-divider {
                    border: none;
                    border-top: 1px solid #E8D5C4;
                    margin: 20px 0;
                }
            `}</style>

            <div className='admin-login-page'>
                <div className='admin-login-card'>
                    <div className='admin-login-header'>
                        <span className='admin-login-badge'>Admin Access</span>
                        <h1 className='admin-login-title'>Welcome Back</h1>
                        <p className='admin-login-subtitle'>Sign in to manage your store</p>
                    </div>

                    <hr className='admin-divider' />

                    <form onSubmit={onSubmitHandler}>
                        <div className='admin-input-group'>
                            <label className='admin-input-label'>Email Address</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='admin-input' type="email" placeholder='your@email.com' required />
                        </div>
                        <div className='admin-input-group'>
                            <label className='admin-input-label'>Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='admin-input' type="password" placeholder='Enter your password' required />
                        </div>
                        <button className='admin-login-btn' type='submit'>Sign In →</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;