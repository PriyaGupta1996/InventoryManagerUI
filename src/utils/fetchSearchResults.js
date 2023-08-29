import axios from "axios";
export const fetchSearchResults = async (searchText, filters) => {
    const results = await axios.get(`api/products`, { params: { "product": searchText, "category": filters?.category, "vendorId": filters?.vendor } })
    return results.data;
}