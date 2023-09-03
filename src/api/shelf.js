import axios from "./axiosConfig";
import { API_ROUTES } from "../constants/apiRoutes"

export const fetchAvailableShelfNumber = async () => {
    const shelfList = await axios.get(API_ROUTES.FETCH_SHELVES);
    return shelfList.data
} 