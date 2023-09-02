import axios from "axios"

export const fetchAvailableShelfNumber = async () => {
    const shelfList = await axios.get("/api/shelves");
    return shelfList.data.content
} 