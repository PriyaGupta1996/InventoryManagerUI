import axios from "axios";
export const fetchSearchResults = async (searchText, filters) => {
    let params = { "product": searchText, "category": filters?.category, "vendorId": filters?.vendor, "minPrice": filters?.minPrice, "maxPrice": filters?.maxPrice }
    for (let key in params) {
        if (params[key] === "")
            delete params[key]
    }
    const results = await axios.get(`api/products`, { params })
    return results.data;
}