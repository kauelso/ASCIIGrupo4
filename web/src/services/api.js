import axios from 'axios';

const api = axios.create({
    baseURL: "https://plantfolio.herokuapp.com"
});
// em producao colocar: baseURL: "https://plantfolio.herokuapp.com"

console.log(api.baseURL);
export default api;
