import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (currentState === 'Signup') {
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) navigate('/');
    }, [token]);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    });

    return (
        <>
            <style>{`
                .login-page {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(160deg, #FFFDF9 60%, #E8D5C4 100%);
                }

                .login-card {
                    background: #FFFDF9;
                    border: 1px solid #E8D5C4;
                    border-radius: 20px;
                    padding: 2.5rem 2rem;
                    width: 100%;
                    max-width: 400px;
                    box-shadow: 0 8px 40px rgba(139, 90, 74, 0.12);
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .login-title-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                }

                .login-title {
                    font-family: 'Georgia', serif;
                    font-size: 2rem;
                    color: #8B5A4A;
                }

                .login-title-line {
                    flex: 1;
                    height: 2px;
                    background: linear-gradient(90deg, #D4755B, transparent);
                    border-radius: 2px;
                }

                .login-input {
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

                .login-input::placeholder {
                    color: #A8B5A0;
                }

                .login-input:focus {
                    border-color: #D4755B;
                    box-shadow: 0 0 0 3px rgba(212, 117, 91, 0.1);
                }

                .login-links-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    margin-top: -4px;
                }

                .login-link {
                    color: #A8B5A0;
                    cursor: pointer;
                    transition: color 0.2s;
                    text-decoration: none;
                }

                .login-link:hover {
                    color: #D4755B;
                }

                .login-btn {
                    width: 100%;
                    background: #D4755B;
                    color: #FFFDF9;
                    border: none;
                    border-radius: 50px;
                    padding: 13px;
                    font-size: 0.82rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
                    margin-top: 6px;
                    box-shadow: 0 4px 16px rgba(212, 117, 91, 0.3);
                }

                .login-btn:hover {
                    background: #8B5A4A;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(139, 90, 74, 0.3);
                }
            `}</style>

            <div className='login-page'>
                <form onSubmit={onSubmitHandler} className='login-card'>
                    <div className='login-title-row'>
                        <h1 className='login-title'>{currentState}</h1>
                        <span className='login-title-line'></span>
                    </div>

                    {currentState === 'Signup' && (
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            className='login-input'
                            placeholder='Full Name'
                            required
                        />
                    )}

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className='login-input'
                        placeholder='Email Address'
                        required
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className='login-input'
                        placeholder='Password'
                        required
                    />

                    <div className='login-links-row'>
                        <span className='login-link'>Forgot your password?</span>
                        {currentState === 'Login'
                            ? <span onClick={() => setCurrentState('Signup')} className='login-link' style={{ color: '#D4755B' }}>Create Account</span>
                            : <span onClick={() => setCurrentState('Login')} className='login-link' style={{ color: '#D4755B' }}>Already have an account?</span>
                        }
                    </div>

                    <button type='submit' className='login-btn'>
                        {currentState === 'Login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;