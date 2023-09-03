import axios from "./axiosConfig";
import { API_ROUTES } from "../constants/apiRoutes"
export const fetchCategory = async () => {
    const results = await axios.get(API_ROUTES.FETCH_CATEGORIES)
    return results.data;
}