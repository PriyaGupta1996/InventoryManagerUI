import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";
import { Filter } from "../components/Filter";
import { Table } from "../components/Table";
import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../utils/fetchSearchResults";
import { fetchCategory } from "../utils/fetchCategory";
import { fetchVendor } from "../utils/fetchVendor";
export const Homepage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [filters, setFilters] = useState({});
  const getFilteredProductData = async (searchTerm) => {
    const result = await fetchSearchResults(searchTerm, filters);
    setSearchResults(result);
  };
  const getCategoryData = async () => {
    const result = await fetchCategory();
    setCategory(result);
  };
  const getVendorData = async () => {
    const result = await fetchVendor();
    setVendor(result);
  };

  useEffect(() => {
    getFilteredProductData("");
    getCategoryData();
    getVendorData();
  }, []);

  return (
    <div className="App">
      <Header />
      <SearchBar handleSearchButton={getFilteredProductData} />
      Category
      <Filter
        value="category"
        data={category}
        setFilters={setFilters}
        filters={filters}
      />
      {/* Price
      <Filter value="price" data={[]} setFilters={setFilters} /> */}
      Vendor
      <Filter
        value="vendor"
        data={vendor}
        setFilters={setFilters}
        filters={filters}
      />
      <Table data={searchResults} />
    </div>
  );
};
