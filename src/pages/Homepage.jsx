import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";
import { Filter } from "../components/Filter";
import { Table } from "../components/Table";
import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../services/fetchSearchResults";
import { fetchCategory } from "../services/fetchCategory";
import { fetchVendor } from "../services/fetchVendor";
import { fetchAvailableShelfNumber } from "../services/fetchAvailableShelfNumber";

export const Homepage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [filters, setFilters] = useState({});
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [shelves, setShelves] = useState([]);

  const getFilteredProductData = async (searchTerm) => {
    const result = await fetchSearchResults(searchTerm, filters);
    console.log("result hre", result);
    setSearchResults(result);
  };
  const getCategoryData = async () => {
    const result = await fetchCategory();
    setCategory(result);
  };
  const getVendorData = async () => {
    const result = await fetchVendor();
    console.log("result category", result);
    setVendor(result);
  };

  const fetchAvailableShelves = async () => {
    const result = await fetchAvailableShelfNumber();
    setShelves(result);
  };

  const handleMinPriceInput = (e) => {
    setMinPrice(e.target.value);
    let currentFilter = JSON.parse(JSON.stringify(filters));
    filters["minPrice"] = e.target.value;
    setFilters(currentFilter);
  };

  const handleMaxPriceInput = (e) => {
    setMaxPrice(e.target.value);
    let currentFilter = JSON.parse(JSON.stringify(filters));
    filters["maxPrice"] = e.target.value;
    setFilters(currentFilter);
  };

  useEffect(() => {
    getFilteredProductData("");
    getCategoryData();
    getVendorData();
    fetchAvailableShelves();
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
      Vendor
      <Filter
        value="vendor"
        data={vendor}
        setFilters={setFilters}
        filters={filters}
      />
      <input
        type="text"
        placeholder="Min Price"
        value={minPrice}
        onChange={handleMinPriceInput}
      />{" "}
      &
      <input
        type="text"
        placeholder="Max Price"
        value={maxPrice}
        onChange={handleMaxPriceInput}
      />
      <Table
        data={searchResults}
        getFilteredProductData={getFilteredProductData}
        shelves={shelves}
        vendor={vendor}
      />
    </div>
  );
};
