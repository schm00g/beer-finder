import axios from "axios";
const API_URL = "https://api.punkapi.com/v2/beers";
const headers = { "Content-Type": "application/json" };
// TODO: what is definition of non alcoholic beer
const MAX_ABV_FOR_NON_ALCOHOLIC_BEER = 1;

const getAllBeers = () => {
  return axios.get(`${API_URL}`, { headers });
};

const getAllNonAlcoholicBeers = () => {
  return axios.get(`${API_URL}?abv_lt=${MAX_ABV_FOR_NON_ALCOHOLIC_BEER}`, {
    headers,
  });
};

const getRandomBeer = () => {
  // TODO: Only beers with both a label and a description should be displayed
  return axios.get(`${API_URL}/random`, { headers });
};

const getAllBeersBrewedBeforeDate = (date) => {
  return axios.get(`${API_URL}?brewed_before=${date}`, { headers });
};

export {
  getAllBeers,
  getAllNonAlcoholicBeers,
  getAllBeersBrewedBeforeDate,
  getRandomBeer,
};
