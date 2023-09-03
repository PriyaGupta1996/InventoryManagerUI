import axios from "./axiosConfig";
import { API_ROUTES } from "../constants/apiRoutes"

export const updateProduct = async (updateItem) => {
    try {
        return await axios.put(API_ROUTES.UPDATE_PRODUCT(updateItem.productId), { ...updateItem })
    } catch (e) {
        if (e.response.data.statusCode === 400 || e.response.data.statusCode === 404)
            return { error: { data: e.response.data.message } }
    }
}

export const deleteProduct = async (productId) => {
    try {
        return await axios.delete(API_ROUTES.DELETE_PRODUCT(productId))
    } catch (e) {
        if (e.response.data.statusCode === 404)
            return { error: { data: e.response.data.message } }
    }
}
export const fetchSearchResults = async (searchText, filters, pageNo, pageSize, orderBy, sortOrder) => {
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
    const results = await axios.get(API_ROUTES.FETCH_SEARCH_RESULTS, { params })
    return results.data;
}