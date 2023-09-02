import axios from "axios";
export const fetchSearchResults = async (searchText, filters, pageNo, pageSize) => {
    console.log("filters", filters)
    let params = {
        "productName": searchText,
        "category": filters?.category,
        "vendorId": filters?.vendor,
        "minPrice": filters?.minPrice,
        "maxPrice": filters?.maxPrice,
        "page": pageNo,
        "size": pageSize
    }
    for (let key in params) {
        if (params[key] === "")
            delete params[key]
    }
    console.log("params", params)
    const results = await axios.get(`api/products`, { params })
    return results.data;
}