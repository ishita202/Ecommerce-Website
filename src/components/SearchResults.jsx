import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../service/service";
import ProductCard from "./ProductCard";
import "./SearchResults.css";

function SearchResultsPage() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categories = ["men", "women", "kids", "sports"];
        const allResults = await Promise.all(
          categories.map((cat) => fetchProductsByCategory(cat))
        );

        const allProducts = allResults.flat();
        const q = decodeURIComponent(query).toLowerCase();

        const filtered = allProducts.filter((p) =>
          (p.title || p.name || "")
            .toLowerCase()
            .includes(q)
        );

        setResults(filtered);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search results for “{decodeURIComponent(query)}”</h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="product-section">
          {results.map((p) => (
            <ProductCard key={p.id || p.title} product={p} />
          ))}
        </div>
      ) : (
        <p>No products found for "{decodeURIComponent(query)}".</p>
      )}
    </div>
  );
}

export default SearchResultsPage;
