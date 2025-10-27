import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import "./App.css";
import FilterBar from "./components/FilterBar";

const formatCategory = (category) => encodeURIComponent(category);

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("women's clothing");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [cart, setCart] = useState([]);
  
  const addToCart = (products) => {
    setCart((prevCart) => [...prevCart, products]);
  };

 
  useEffect(() => {
    Promise.all([
      fetch("https://fakestoreapi.com/products/category/men's clothing").then((r) => r.json()),
      fetch("https://fakestoreapi.com/products/category/women's clothing").then((r) => r.json()),
    ])
      .then(([men, women]) => {
        const all = [...men, ...women].map((p) => ({
          ...p,
          price: Math.floor(Math.random() * 2000) + 100, // random prices for testing
        }));
        setProducts(all);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  // Filter by category + price
  useEffect(() => {
    let result = products.filter((p) => p.category === category);

    if (selectedFilters.length > 0) {
      result = result.filter((p) => {
        if (selectedFilters.includes("under500") && p.price < 500) return true;
        if (selectedFilters.includes("500to1000") && p.price >= 500 && p.price <= 1000) return true;
        if (selectedFilters.includes("above1000") && p.price > 1000) return true;
        return false;
      });
    }

    setFilteredProducts(result);
  }, [selectedFilters, products, category]);

  return (
    <div>
      <Navbar setCategory={setCategory}
      cartCount={cart.length} />
      <div className="main-content">
        <FilterBar
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />

        <div className="product-section">
          {filteredProducts.length > 0 ? (
            <div className="grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart}/>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              No products found
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
