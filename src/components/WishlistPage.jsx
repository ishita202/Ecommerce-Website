import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "./WishlistPage.css";

function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="empty-wishlist">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-card">
              <div className="wishlist-img-container">
                <img src={product.image} alt={product.title} className="wishlist-img" />
                <button
                  className="wishlist-remove"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="wishlist-info">
                <h4 className="wishlist-name">{product.title}</h4>
                <p className="wishlist-price">₹{product.price}</p>
                <button
                  className="move-to-bag"
                  onClick={() => handleMoveToBag(product)}
                >
                  Move to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
