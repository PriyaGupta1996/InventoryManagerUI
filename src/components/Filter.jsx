import React from "react";

export const Filter = (props) => {
  const handleOnFilterChange = (e) => {
    let filters = JSON.parse(JSON.stringify(props.filters));
    filters[props.value] = e.target.value;
    props.setFilters(filters);
  };
  return (
    <select className="filter-dropdown" onChange={handleOnFilterChange}>
      <option value="">--None--</option>
      {props.data.map((item) => (
        <option value={item.id || item}>{item.name || item}</option>
      ))}
    </select>
  );
};
