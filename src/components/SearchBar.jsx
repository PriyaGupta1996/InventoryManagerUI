import React, { useState } from "react";

export const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");
  const handleSearchBarInput = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div class="mb-3">
      <div class="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          placeholder="Search"
          className="search-bar"
          onChange={handleSearchBarInput}
        />
        <button
          type="button"
          className="search-button"
          onClick={() => props.handleSearchButton(searchText)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
