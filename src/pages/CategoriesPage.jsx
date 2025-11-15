import React from "react";
import { Link } from "react-router-dom";
import "./CategoriesPage.css";

const categories = [
  { name: "Men", image: "/men.png", path: "/category/men" },
  { name: "Women", image: "/women.png", path: "/category/women" },
  { name: "Kids", image: "/kids.png", path: "/category/kids" },
  { name: "Sports", image: "/sports.png", path: "/category/sports" },
];

function CategoriesPage() {
  return (
    <div className="categories-container">
      <h2 className="categories-title">Shop by Category</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <Link to={cat.path} key={cat.name} className="category-card">
            <img src={cat.image} alt={cat.name} className="category-image" />
            <div className="category-label">
              <h3>{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
