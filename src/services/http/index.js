import axios from "axios";
const API_URL = "https://api.punkapi.com/v2/beers";
const headers = { "Content-Type": "application/json" };

const getAllBeers = () => {
  return axios.get(`${API_URL}`, { headers });
};

const getAllNonAlcoholicBeers = () => {
  return axios.get(`${API_URL}?abv_lt=2`, { headers });
};

export { getAllBeers, getAllNonAlcoholicBeers };
