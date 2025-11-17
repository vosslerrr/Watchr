import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import './navBar.css';

function NavBar(){
    const username = localStorage.getItem("username");
    const [isOpen, setIsOpen] = useState(false);
    const profRef = useRef(null);
    useEffect(() => {
            const handleClickOutside = (e) => {
                if (profRef.current && !profRef.current.contains(e.target)){
                    setIsOpen(false);
                }
            };
            document.addEventListener("click",handleClickOutside);
            return () => document.removeEventListener("click",handleClickOutside);
        }, []);

    return (
        <div className="navBar">
            <div className="left">
                <div id="navLogo">
                    <a href="/"><img src="/Watchr_LOGO.png" alt="Watchr Logo" /></a> 
                </div>

                <div id="menu">
                    <button id="dropbtn">
                        <img src="/hamburger-icon.png" alt="" />
                        <span> Menu</span>
                    </button>
                    <div id="dropdown-content">
                        <a href="/">Home</a>
                        <a href="/movies">Movies</a>
                        <a href="/watchlist" id="watchlistOption">
                        Watchlist
                        </a>
                    </div>
                </div>
            </div>

            <div className="middle">
                <div id="searchBar" method="get" action="/movie.html">
                    <input
                        type="search"
                        placeholder="Search Movies"
                        id="search-input"
                        name="q"
                        
                    />
                </div>
            </div>

            <div className="right">
                <div id="log">
                <button id="logBtn">
                    <span>LOG </span>
                    <img src="/log-icon.png" alt="" />
                </button>
                </div>

            <div id="profile" ref={profRef}>
                <button
                    id="profBtn"
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen((prev) => !prev)
                    }}
                >
                    <img src="/user-default.png" alt="Profile" />
                </button>

                {isOpen && (
                    <div id="profile-menu">
                        <div id="profile-header">
                            <div id="avatar-small"></div>
                            <div id="profile-name">{username}</div>
                        </div>
                        <Link to={`/${username}`}>Profile</Link>
                        <a href="/settings">Settings</a>
                        <a onClick={(e) => {
                            localStorage.removeItem("token");
                            window.location.href='/';
                        }} id="logoutButton">Sign Out</a>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}
export default NavBar;