import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    return showSearch && visible ? (
        <>
            <style>{`
                .searchbar-wrapper {
                    background: #FFFDF9;
                    border-top: 1px solid #E8D5C4;
                    border-bottom: 2px solid #E8D5C4;
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .search-input-wrap {
                    display: inline-flex;
                    align-items: center;
                    width: 55%;
                    max-width: 480px;
                    background: #FFFDF9;
                    border: 1.5px solid #E8D5C4;
                    border-radius: 50px;
                    padding: 10px 18px;
                    gap: 10px;
                    transition: border-color 0.3s, box-shadow 0.3s;
                    box-shadow: 0 2px 8px rgba(139, 90, 74, 0.06);
                }

                .search-input-wrap:focus-within {
                    border-color: #D4755B;
                    box-shadow: 0 4px 16px rgba(212, 117, 91, 0.16);
                }

                .search-input-wrap input {
                    flex: 1;
                    font-size: 0.85rem;
                    color: #8B5A4A;
                    background: transparent;
                    outline: none;
                    letter-spacing: 0.03em;
                }

                .search-input-wrap input::placeholder {
                    color: #A8B5A0;
                }

                .search-input-wrap img {
                    width: 16px;
                    filter: invert(35%) sepia(20%) saturate(800%) hue-rotate(340deg) brightness(80%);
                    flex-shrink: 0;
                }

                .search-close-btn {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: #E8D5C4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.2s;
                    flex-shrink: 0;
                }

                .search-close-btn:hover {
                    background: #D4755B;
                    transform: rotate(90deg);
                }

                .search-close-btn img {
                    width: 10px;
                    filter: invert(35%) sepia(20%) saturate(800%) hue-rotate(340deg) brightness(80%);
                    transition: filter 0.2s;
                }

                .search-close-btn:hover img {
                    filter: invert(100%);
                }
            `}</style>

            <div className='searchbar-wrapper'>
                <div className='search-input-wrap'>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder='Search products...'
                    />
                    <img src={assets.search_icon} alt="search" />
                </div>
                <div className='search-close-btn' onClick={() => setShowSearch(false)}>
                    <img src={assets.cross_icon} alt="close" />
                </div>
            </div>
        </>
    ) : null;
};

export default SearchBar;