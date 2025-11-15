import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ added navigate
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";
import { useAuth } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // initialize navigation
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const { user } = useAuth(); // get logged-in user

  // Fetch product from API
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  const cartItem = cartItems.find((item) => item.id === product.id);

  // Handle Add to Cart with Auth Check
  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in or sign up to add items to your cart.");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  //Handle Quantity Change with Auth Check
  const handleUpdateQuantity = (newQuantity) => {
    if (!user) {
      alert("Please log in or sign up to modify your cart.");
      navigate("/login");
      return;
    }

    if (newQuantity <= 0) return; // prevent negative quantity
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="price">Price: ₹{product.price}</p>

        {cartItem ? (
          <div className="quantity-controls">
            <button onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}>-</button>
            <span>{cartItem.quantity}</span>
            <button onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}>+</button>
          </div>
        ) : (
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
