import axios from "axios";
export const fetchSearchResults = async (searchText, filters, pageNo, pageSize, orderBy, sortOrder) => {
    console.log("filters", pageNo, pageSize);
    let params = {
        "productName": searchText,
        "category": filters?.category,
        "vendorId": filters?.vendor,
        "minPrice": filters?.minPrice,
        "maxPrice": filters?.maxPrice,
        "page": pageNo,
        "size": pageSize,
        "orderBy": orderBy,
        "sortOrder": sortOrder === true ? "dsc" : "asc"
    }
    for (let key in params) {
        if (params[key] === "")
            delete params[key]
    }
    console.log("params", params)
    const results = await axios.get(`api/products`, { params })
    return results.data;
}