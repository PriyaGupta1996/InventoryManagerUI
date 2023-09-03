import React from "react";

export const SearchBar = (props) => {
  const { setSearchTerm, searchTerm, handleSearchButton, filters } = props;

  const handleSearchBarInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    handleSearchButton(searchTerm, filters);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchBarInput}
        onKeyUp={handleKeyPress}
      />
      <button type="button" className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
