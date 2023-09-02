import React from "react";

export const SearchBar = (props) => {
  const handleSearchBarInput = (e) => {
    props.setSearchTerm(e.target.value);
  };
  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        className="search-bar"
        onChange={handleSearchBarInput}
      />
      <button
        type="button"
        className="search-button"
        onClick={() =>
          props.handleSearchButton(props.searchTerm, props.filters)
        }
      >
        Search
      </button>
    </div>
  );
};
