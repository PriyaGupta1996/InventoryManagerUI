import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";
import { Filter } from "../components/Filter";
import { Table } from "../components/Table";
import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../api/product";
import { fetchCategory } from "../api/category";
import { fetchVendor } from "../api/vendor";
import { fetchAvailableShelfNumber } from "../api/shelf";
import { Pagination } from "../components/Pagination";
import { inputValidation } from "../utils/inputValidation";
import { PopUpAlert } from "../components/PopUpAlert";
import { filterEmptyValues } from "../utils/filterEmptyValues";
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
  const [sortOrder, setSortOrder] = useState("dsc");
  const [orderBy, setOrderBy] = useState("shelf.isPrime");
  const [alertInfo, setAlertInfo] = useState({});

  const getFilteredProductData = async () => {
    const result = await fetchSearchResults(
      searchTerm,
      filters,
      pageNo,
      pageSize,
      orderBy,
      sortOrder
    );
    setSearchResults(result.content);
    setTotalPage(result.totalPages);
    setPageSize(result.size);
  };
  const handleSaveChanges = async () => {
    const errorLogs = inputValidation(filterEmptyValues(filters));
    if (errorLogs.length > 0) {
      setAlertInfo({ info: errorLogs, status: "danger" });
      return;
    }
    await getFilteredProductData();
  };

  const updateDisplay = () => {
    getFilteredProductData();
    getCategoryData();
    getVendorData();
    fetchAvailableShelves();
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

  useEffect(() => {
    updateDisplay();
  }, []);

  useEffect(() => {
    getFilteredProductData();
  }, [pageNo]);

  useEffect(() => {
    getFilteredProductData();
  }, [orderBy, sortOrder]);
  useEffect(() => {}, []);

  return (
    <div className="App">
      {Object.keys(alertInfo).length > 0 && (
        <PopUpAlert value={alertInfo} onClose={setAlertInfo} />
      )}
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearchButton={handleSaveChanges}
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
      Min Price{" "}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={handleMinPriceInput}
      />{" "}
      Max Price{" "}
      <input
        type="number"
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
          setOrderBy={setOrderBy}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
          orderBy={orderBy}
        />
      ) : (
        <div style={{ marginTop: "10rem" }}>
          No Products Found In Selected Criteria
        </div>
      )}
      <Pagination
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
        totalPage={totalPage}
      />
    </div>
  );
};
