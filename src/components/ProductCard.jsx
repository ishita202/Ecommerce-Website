import React from "react";
import "./ProductCard.css";


const ProductCard = ({ product, addToCart }) => {

  return (
    <div className="card">
      <div className="img-container">
        <img src={product.image} alt={product.title} className="card-img" />
      </div>
      <div className="class-info">
        <h3 className="product-title">{product.title}</h3>
        {product.brand && <p className="brand">{product.brand}</p>}
        <p className="price">₹{product.price}</p>
      </div>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
