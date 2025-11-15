import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please log in or sign up to use the wishlist.");
      navigate("/login");
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please log in or sign up to add items to your cart.");
      navigate("/login");
      return;
    }

    if (isInCart(product.id)) {
      // If already in cart, go to cart page
      navigate("/cart");
    } else {
      // Otherwise add to cart
      addToCart(product);
    }
  };

  const alreadyInCart = isInCart(product.id);

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Wishlist Icon */}
      <div className="wishlist-icon" onClick={toggleWishlist}>
        {isInWishlist(product.id) ? (
          <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
        )}
      </div>

      {/* Product Image */}
      <div className="img-container">
        <img src={product.image} alt={product.title} className="card-img" />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        {product.brand && <p className="brand">{product.brand}</p>}
        <p className="price">₹{product.price}</p>
      </div>

      {/* Add / Added Button */}
      <button
        className={`add-btn ${alreadyInCart ? "added" : ""}`}
        onClick={handleAddToCart}
      >
        {alreadyInCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
