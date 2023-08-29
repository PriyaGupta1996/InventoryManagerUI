import React, { useState } from "react";

export const SearchBar = () => {
  return (
    <div class="mb-3">
      <div class="relative mb-4 flex w-full flex-wrap items-stretch">
        <input type="search" placeholder="Search" className="search-bar" />
        <button type="button" className="search-button">
          Search
        </button>
      </div>
    </div>
  );
};
