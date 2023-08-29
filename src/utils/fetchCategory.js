import axios from "axios";
export const fetchCategory = async () => {
    const results = await axios.get(`api/products/categories`)
    return results.data;
}