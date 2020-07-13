import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:4033"
});
// em producao colocar: baseURL: "https://plantfolio-ascii.herokuapp.com"

console.log(api.baseURL);
export default api;