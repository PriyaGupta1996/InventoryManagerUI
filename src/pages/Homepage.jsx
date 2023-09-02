import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";
import { Filter } from "../components/Filter";
import { Table } from "../components/Table";
import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../services/fetchSearchResults";
import { fetchCategory } from "../services/fetchCategory";
import { fetchVendor } from "../services/fetchVendor";
import { fetchAvailableShelfNumber } from "../services/fetchAvailableShelfNumber";
import { Pagination } from "../components/Pagination";

export const Homepage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [filters, setFilters] = useState({});
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [shelves, setShelves] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [pageSize, setPageSize] = useState();

  const getFilteredProductData = async (
    searchTerm,
    filters,
    pageNo,
    pageSize
  ) => {
    const result = await fetchSearchResults(
      searchTerm,
      filters,
      pageNo,
      pageSize
    );
    setSearchResults(result.content);
    setTotalPage(result.totalPages);
    setPageSize(result.size);
  };
  const getCategoryData = async () => {
    const result = await fetchCategory();
    setCategory(result);
  };
  const getVendorData = async () => {
    const result = await fetchVendor();
    setVendor(result);
  };

  const fetchAvailableShelves = async () => {
    const result = await fetchAvailableShelfNumber();
    setShelves(result);
  };

  const handleMinPriceInput = (e) => {
    setMinPrice(e.target.value);
    let currentFilter = JSON.parse(JSON.stringify(filters));
    currentFilter["minPrice"] = e.target.value;
    setFilters(currentFilter);
  };

  const handleMaxPriceInput = (e) => {
    setMaxPrice(e.target.value);
    let currentFilter = JSON.parse(JSON.stringify(filters));
    currentFilter["maxPrice"] = e.target.value;
    setFilters(currentFilter);
  };

  const handlePageNoClick = async (pageIndex) => {
    setPageNo(pageIndex);
    getFilteredProductData("", filters, pageIndex, pageSize);
  };

  useEffect(() => {
    getFilteredProductData("", filters);
    getCategoryData();
    getVendorData();
    fetchAvailableShelves();
  }, []);

  return (
    <div className="App">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearchButton={getFilteredProductData}
        filters={filters}
      />
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
        searchTerm={searchTerm}
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
      {searchResults.length > 0 ? (
        <Table
          data={searchResults}
          getFilteredProductData={getFilteredProductData}
          shelves={shelves}
          vendor={vendor}
          filters={filters}
        />
      ) : (
        <div style={{ marginTop: "10rem" }}>
          No Products Found In Selected Criteria
        </div>
      )}
      <Pagination
        pageNo={pageNo}
        handlePageNoClick={handlePageNoClick}
        pageSize={pageSize}
        totalPage={totalPage}
      />
    </div>
  );
};
