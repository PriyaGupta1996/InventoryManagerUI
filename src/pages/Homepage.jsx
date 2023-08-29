import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";
import { Filter } from "../components/Filter";
import { Table } from "../components/Table";
import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../utils/fetchSearchResults";
export const Homepage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const getFilteredProductData = async (searchTerm) => {
    const result = await fetchSearchResults(searchTerm);
    setSearchResults(result);
  };

  useEffect(() => {
    getFilteredProductData("");
  }, []);

  return (
    <div className="App">
      <Header />
      <SearchBar handleSearchButton={getFilteredProductData} />
      Category
      <Filter value="category" />
      Price
      <Filter value="price" />
      Vendor
      <Filter value="vendor" />
      <Table data={searchResults} />
    </div>
  );
};
