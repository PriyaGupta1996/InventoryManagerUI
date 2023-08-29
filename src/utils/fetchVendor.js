import axios from "axios";
export const fetchVendor = async () => {
    const results = await axios.get(`api/vendors`)
    return results.data;
}