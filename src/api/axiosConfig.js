import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Base URL for the API calls
    headers: {
        'Cache-Control': 'no-cache', // Add no-cache header
    },
});

export default instance;