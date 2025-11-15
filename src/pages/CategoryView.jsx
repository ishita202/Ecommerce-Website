import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../service/service";
import ProductCard from "../components/ProductCard";
import "./CategoryView.css";

function CategoryView() {
  const { type } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductsByCategory(type);
      setProducts(data);
    };
    load();
  }, [type]);

  return (
    <div className="category-page">
      <h2 className="category-title">{type.toUpperCase()} COLLECTION</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryView;
