import axios from "axios";
const API_URL = "https://api.punkapi.com/v2/beers";
const headers = { "Content-Type": "application/json" };
const MAX_ABV_FOR_NON_ALCOHOLIC_BEER = 2;

const getAllBeers = () => {
  return axios.get(`${API_URL}`, { headers });
};

const getAllNonAlcoholicBeers = () => {
  return axios.get(`${API_URL}?abv_lt=${MAX_ABV_FOR_NON_ALCOHOLIC_BEER}`, {
    headers,
  });
};

const getAllBeersBrewedBeforeDate = (date) => {
  return axios.get(`${API_URL}?brewed_before=${date}`, { headers });
};

export { getAllBeers, getAllNonAlcoholicBeers, getAllBeersBrewedBeforeDate };
