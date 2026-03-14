import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <>
            <style>{`
                .admin-sidebar {
                    width: 200px;
                    min-height: 100vh;
                    background: #FFFDF9;
                    border-right: 2px solid #E8D5C4;
                    padding: 1.5rem 0;
                    flex-shrink: 0;
                }

                @media (max-width: 768px) {
                    .admin-sidebar { width: 70px; }
                }

                .sidebar-label {
                    font-size: 0.64rem;
                    color: #A8B5A0;
                    letter-spacing: 0.2em;
                    font-weight: 800;
                    text-transform: uppercase;
                    padding: 0 20px;
                    margin-bottom: 12px;
                }

                .sidebar-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 0 12px;
                }

                .sidebar-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 11px 14px;
                    border-radius: 12px;
                    text-decoration: none;
                    color: #A8B5A0;
                    font-size: 0.84rem;
                    font-weight: 600;
                    transition: background 0.2s, color 0.2s;
                    letter-spacing: 0.02em;
                }

                .sidebar-link:hover {
                    background: #E8D5C4;
                    color: #8B5A4A;
                }

                .sidebar-link.active {
                    background: linear-gradient(135deg, #D4755B, #E8845A);
                    color: #FFFDF9;
                    box-shadow: 0 4px 14px rgba(212, 117, 91, 0.3);
                }

                .sidebar-link img {
                    width: 18px;
                    height: 18px;
                    flex-shrink: 0;
                    filter: invert(60%) sepia(15%) saturate(400%) hue-rotate(340deg);
                    transition: filter 0.2s;
                }

                .sidebar-link:hover img {
                    filter: invert(35%) sepia(25%) saturate(700%) hue-rotate(330deg) brightness(85%);
                }

                .sidebar-link.active img {
                    filter: invert(100%);
                }

                .sidebar-link span {
                    white-space: nowrap;
                }

                .sidebar-divider {
                    border: none;
                    border-top: 1px solid #E8D5C4;
                    margin: 14px 20px;
                }
            `}</style>

            <div className='admin-sidebar'>
                <p className='sidebar-label'>Menu</p>
                <div className='sidebar-nav'>
                    <NavLink className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} to="/add">
                        <img src={assets.add_icon} alt="add" />
                        <span className='hidden md:block'>Add Items</span>
                    </NavLink>

                    <hr className='sidebar-divider' />

                    <NavLink className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} to="/list">
                        <img src={assets.order_icon} alt="list" />
                        <span className='hidden md:block'>List Items</span>
                    </NavLink>

                    <NavLink className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} to="/orders">
                        <img src={assets.order_icon} alt="orders" />
                        <span className='hidden md:block'>Orders</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Sidebar;