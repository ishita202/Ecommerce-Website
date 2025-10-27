import React, {useState} from "react";
import "./navbar.css"


function Navbar ({setCategory, cartCount}) {
    return (
        <nav className="navbar">
            {/*Logo */}
            <div className="logo">Logo</div>

            {/* Navigation Links*/}
            <div className="nav-links">
                <a href="#" onClick={()=> setCategory("men's clothing")}>Men</a>
                <a href="#" onClick={()=> setCategory("women's clothing")}>Women</a>
                <a href="#" onClick={()=> setCategory("kid's clothing")}>Kids</a>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input
                type="text"
                placeholder="Search for products, brands and more"
                className="search-input"
                />
            </div>

            {/*Profile / Settings icons*/}
            
            <div className="nav-icons">
                <a href="#" title="Cart">
                    <i className="fa-solid fa-bag-shopping"></i>
                    <span>
                        Cart: <strong>{cartCount}</strong>
                    </span>
                </a>

                <a href="#" title="Profile">
                    <i className="fa-solid fa-user icon"></i>
                </a>

                <a href="#" title="Settings">
                    <i className="fa-solid fa-gear icon"></i>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;