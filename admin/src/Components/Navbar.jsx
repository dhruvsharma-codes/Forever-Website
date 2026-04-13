import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <>
      <style>{`
                .admin-navbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 5%;
                    background: #FFFDF9;
                    border-bottom: 2px solid #E8D5C4;
                    box-shadow: 0 2px 12px rgba(139, 90, 74, 0.07);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .admin-navbar-logo {
                    max-width: 110px;
                    height: auto;
                }

                .admin-nav-right {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .admin-badge {
                    background: #E8D5C4;
                    color: #8B5A4A;
                    font-size: 0.68rem;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    padding: 5px 14px;
                    border-radius: 50px;
                    border: 1px solid #D4755B22;
                }

                .admin-logout-btn {
                    background: transparent;
                    border: 1.5px solid #D4755B;
                    color: #D4755B;
                    font-size: 0.74rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 8px 20px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background 0.25s, color 0.25s, transform 0.2s;
                }

                .admin-logout-btn:hover {
                    background: #D4755B;
                    color: #FFFDF9;
                    transform: translateY(-1px);
                }
            `}</style>

      <div className="admin-navbar">
        <img className="admin-navbar-logo" src={assets.logo} alt="logo" />
        <div className="admin-nav-right">
          <span className="admin-badge">Admin</span>
          <button onClick={() => setToken("")} className="admin-logout-btn">
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
