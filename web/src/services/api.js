import axios from 'axios';

import 'dotenv/config';
//const apiUrl = process.env.API_URL;

const api = axios.create({
    baseURL: 'http://localhost:4033',
});

console.log(api.baseURL);
export default api;