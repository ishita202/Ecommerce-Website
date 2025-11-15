import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 8))) // optional featured items
      .catch(() => {
        setProducts([]);
      });
  }, []);

  return (
    <div className="home-container">
      {/* ✅ Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url('/hero.jpg')` }}
      >
        <div className="hero-content">
          <h2>Limited Time</h2>
          <p>
            Get 25% off on all Palermo collections. Free shipping on orders over ₹999.
          </p>
          <Link to="/categories">
            <button className="shop-btn">Shop Now</button>
          </Link>
        </div>
      </section>

      {/* ✅ Explore Our Universe Section */}
      <section className="explore-section">
        <h2>Explore Our Universe</h2>
        <p>From performance excellence to lifestyle innovation, discover the PUMA experience</p>

        <div className="explore-grid">
          <div className="explore-card blue">
            <h3>Sports Performance</h3>
            <p>Professional-grade gear for every sport and every athlete.</p>
            <ul>
              <li>Advanced Technology</li>
              <li>Pro Athlete Tested</li>
              <li>Performance Optimized</li>
            </ul>
            <button>Explore Collection</button>
          </div>

          <div className="explore-card pink">
            <h3>Lifestyle & Fashion</h3>
            <p>Where athletic heritage meets contemporary style.</p>
            <ul>
              <li>Fashion Forward</li>
              <li>Street Style</li>
              <li>Premium Materials</li>
            </ul>
            <button>Explore Collection</button>
          </div>

          <div className="explore-card green">
            <h3>Sustainable</h3>
            <p>Eco-conscious products without compromising performance.</p>
            <ul>
              <li>Recycled Materials</li>
              <li>Carbon Neutral</li>
              <li>Eco-Friendly</li>
            </ul>
            <button>Explore Collection</button>
          </div>

          <div className="explore-card light-blue">
            <h3>Innovation Lab</h3>
            <p>Cutting-edge technology and AR experiences.</p>
            <ul>
              <li>AR Try-On</li>
              <li>360° View</li>
              <li>Smart Technology</li>
            </ul>
            <button>Explore Collection</button>
          </div>
        </div>
      </section>

      {/* ✅ Iconic Collections Section */}
      <section className="collections-section">
        <h2>Iconic Collections</h2>
        <p>Discover the legendary collections that define sports and street culture.</p>

        <div className="collections-grid">
          <div className="collection-card orange">
            <h3>Palermo</h3>
            <p>Iconic street style meets modern comfort in the legendary Palermo collection.</p>
            <button>Shop Palermo</button>
          </div>

          <div className="collection-card blue">
            <h3>Nitro</h3>
            <p>Revolutionary foam technology for ultimate performance and comfort.</p>
            <button>Shop Nitro</button>
          </div>

          <div className="collection-card green">
            <h3>Suede</h3>
            <p>The original that started it all. Authentic style since 1968.</p>
            <button>Shop Suede</button>
          </div>

          <div className="collection-card red">
            <h3>RS-X</h3>
            <p>Bold design meets cutting-edge technology in our signature RS-X line.</p>
            <button>Shop RS-X</button>
          </div>
        </div>

        <button className="explore-all-btn">Explore All Collections</button>
      </section>

    </div>
  );
}

export default Home;
