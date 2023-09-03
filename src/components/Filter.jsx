import React from "react";

export const Filter = (props) => {
  const { filters, value, setFilters, data } = props;

  const handleOnFilterChange = (e) => {
    const newValue = e.target.value;
    setFilters({ ...filters, [value]: newValue });
  };

  return (
    <select className="filter-dropdown" onChange={handleOnFilterChange}>
      <option value="">--None--</option>
      {data.map((item) => (
        <option key={item.id || item} value={item.id || item}>
          {item.name || item}
        </option>
      ))}
    </select>
  );
};
