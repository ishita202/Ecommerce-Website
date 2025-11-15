import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function Navbar({user}) {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isuser } = useAuth();


  <li>
    {isuser ? (
      <Link to="/profile">Profile</Link>
    ) : (
      <Link to="/signup">Sign Up</Link>
    )}

  </li>


  return (
    <nav className="navbar" >
      <Link to="/" className="logo">
      Logo
      </Link>

      <div className="nav-links">
        <Link to="/category/all" className="nav-item">All</Link>
        <Link to="/category/men" className="nav-item">Men</Link>
        <Link to="/category/women" className="nav-item">Women</Link>
        <Link to="/category/kids" className="nav-item">Kids</Link>
        <Link to="/category/sports" className="nav-item">Sports</Link>
      </div>

      <div className="search-container">
        <SearchBar />
      </div>

      <div className="nav-icons">
        <Link to="/cart" title="Cart">
          <i className="fa-solid fa-bag-shopping"></i>
          <span>Cart: {cartCount}</span>
        </Link>

        <Link to="/wishlist" title="Wishlist">
          <i className="fa-regular fa-heart"></i>
          <span>Wishlist: {wishlist?.length || 0}</span>
        </Link>


        {user ? (
          <Link to="/profile" className="nav-profile" title="Profile">
            <div className="avatar-circle">
              {user.displayName
                ? user.displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : user.email
                    .slice(0, 2)
                    .toUpperCase()}
            </div>
          </Link>
        ) : (
          <Link to="/login" title="Login">
            <i className="fa-solid fa-user"></i> Login
          </Link>
        )}


      </div>
    </nav>
  );
}

export default Navbar;
