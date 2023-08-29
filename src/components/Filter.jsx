import React from "react";

export const Filter = (props) => {
  return (
    <select className="filter-dropdown">
      <option value="">All</option>
      <option value="Outdoor">Outdoor</option>
      <option value="Indoor">Indoor</option>
      <option value="Aquatics">Aquatics</option>
    </select>
  );
};
