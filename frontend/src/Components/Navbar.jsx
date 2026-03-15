import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    return (
        <>
            <style>{`
                .navbar {
                    background-color: #FFFDF9;
                    border-bottom: 2px solid #E8D5C4;
                    padding: 0 2rem;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: 0 2px 12px rgba(139, 90, 74, 0.08);
                }

                .nav-menu a {
                    color: #8B5A4A;
                    font-size: 0.8rem;
                    letter-spacing: 0.12em;
                    font-weight: 600;
                    position: relative;
                    padding-bottom: 4px;
                    text-decoration: none;
                    transition: color 0.25s;
                }

                .nav-menu a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #D4755B;
                    transition: width 0.3s ease;
                    border-radius: 2px;
                }

                .nav-menu a:hover,
                .nav-menu a.active {
                    color: #D4755B;
                }

                .nav-menu a:hover::after,
                .nav-menu a.active::after {
                    width: 100%;
                }

                .nav-icon {
                    filter: invert(35%) sepia(20%) saturate(800%) hue-rotate(340deg) brightness(80%);
                    transition: transform 0.2s, filter 0.2s;
                }

                .nav-icon:hover {
                    filter: invert(45%) sepia(40%) saturate(600%) hue-rotate(330deg) brightness(90%);
                    transform: scale(1.1);
                }

                .cart-badge {
                    background: #D4755B;
                    color: #FFFDF9;
                }

                .dropdown-card {
                    background: #FFFDF9;
                    border: 1px solid #E8D5C4;
                    box-shadow: 0 8px 24px rgba(139, 90, 74, 0.15);
                    border-radius: 12px;
                }

                .dropdown-card p {
                    color: #8B5A4A;
                    font-size: 0.85rem;
                    letter-spacing: 0.04em;
                    transition: color 0.2s, padding-left 0.2s;
                }

                .dropdown-card p:hover {
                    color: #D4755B;
                    padding-left: 4px;
                }

                .sidebar-menu {
                    background: #FFFDF9;
                }

                .sidebar-menu a {
                    color: #8B5A4A;
                    font-size: 0.8rem;
                    letter-spacing: 0.1em;
                    font-weight: 600;
                    border-bottom: 1px solid #E8D5C4;
                    padding: 14px 24px;
                    transition: background 0.2s, color 0.2s;
                  
                }

                .sidebar-menu a:hover {
                    background: #E8D5C4;
                    color: #D4755B;
                }

          
                .back-btn {
                    color: #8B5A4A;
                    border-bottom: 1px solid #E8D5C4;
                    padding: 12px 16px;
                }

                .back-btn img {
                    filter: invert(35%) sepia(20%) saturate(800%) hue-rotate(340deg) brightness(80%);
                }
            `}</style>

            <div className='flex items-center justify-between py-4 font-medium navbar'>

                {/* NAVBAR LOGO */}
                <Link to={'/'}>
                    <img src={assets.logo} alt="assets-logo" className='w-36' />
                </Link>

                {/* NAVBAR MENU */}
                <ul className="hidden gap-8 nav-menu sm:flex">
                    <NavLink to={'/'} className="flex flex-col items-center gap-1">HOME</NavLink>
                    <NavLink to={'/collection'} className="flex flex-col items-center gap-1">COLLECTION</NavLink>
                    <NavLink to={'/about'} className="flex flex-col items-center gap-1">ABOUT</NavLink>
                    <NavLink to={'/contact'} className="flex flex-col items-center gap-1">CONTACT</NavLink>
                </ul>

                {/* NAVBAR RIGHT */}
                <div className="flex items-center gap-6">

                    {/* SEARCH */}
                    <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search" className='w-5 cursor-pointer nav-icon' />

                    {/* PROFILE */}
                    <div className="relative group">
                        <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer nav-icon' />
                        {token && (
                            <div className="absolute right-0 hidden pt-4 group-hover:block">
                                <div className='flex flex-col gap-2 px-5 py-3 dropdown-card w-36'>
                                    <p className='cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/orders')} className='cursor-pointer'>Orders</p>
                                    <p onClick={logout} className='cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CART */}
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} alt="cart" className='w-5 min-w-5 nav-icon' />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 cart-badge aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>

                    {/* HAMBURGER */}
                    <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu" className='w-5 cursor-pointer sm:hidden nav-icon' />
                </div>

                {/* SIDEBAR */}
                {/* <div className={`absolute top-0 right-0 bottom-0  sidebar-menu transition-all ${visible ? "w-full" : "w-0"}`}> */}
                <div className={`fixed top-0 right-0 h-full sidebar-menu transition-all duration-300 ${visible ? "w-64" : "w-0"} overflow-hidden`}>
                    <div className="flex flex-col">
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 cursor-pointer back-btn'>
                            <img src={assets.dropdown_icon} alt="back" className='h-4 rotate-180' />
                            <p style={{ color: '#8B5A4A', fontSize: '0.8rem', letterSpacing: '0.08em' }}>Back</p>
                        </div>
                        <NavLink onClick={() => setVisible(false)} className="sidebar-menu" to='/'>HOME</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="sidebar-menu" to='/collection'>COLLECTION</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="sidebar-menu" to='/about'>ABOUT</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="sidebar-menu" to='/contact'>CONTACT</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;