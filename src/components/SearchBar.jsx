import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    navigate(`/search/${encodeURIComponent(trimmed)}`);
    setQuery("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <i className="fa fa-search" style={{ marginRight: "8px", color: "#800000" }}></i>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products, brands and more"
      />
      <button type="submit" style={{ display: "none" }}></button>
    </form>
  );
}

export default SearchBar;
