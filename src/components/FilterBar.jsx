import React from "react";
import "./FilterBar.css";

function FilterBar({ selectedFilters, setSelectedFilters }) {
  const handleFilterChange = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  return (
    <div className="filter-bar">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={selectedFilters.includes("under500")}
            onChange={() => handleFilterChange("under500")}
          />
          Under ₹500
        </label>

        <label>
          <input
            type="checkbox"
            checked={selectedFilters.includes("500to1000")}
            onChange={() => handleFilterChange("500to1000")}
          />
          ₹500 - ₹1000
        </label>

        <label>
          <input
            type="checkbox"
            checked={selectedFilters.includes("above1000")}
            onChange={() => handleFilterChange("above1000")}
          />
          Above ₹1000
        </label>
      </div>
    </div>
  );
}

export default FilterBar;
