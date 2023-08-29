import axios from "axios";
export const fetchSearchResults = async (searchText) => {
    const results = await axios.get(`api/products?product=${searchText}`)
    return results.data;
}