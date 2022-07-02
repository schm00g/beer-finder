import axios from "axios";
const API_URL = "https://api.punkapi.com/v2/beers";
const headers = { "Content-Type": "application/json" };
const MAX_ABV_FOR_NON_ALCOHOLIC_BEER = 1;

const getBeersByName = (name) => {
  return axios.get(`${API_URL}?per_page=80&beer_name=${name}`, { headers });
};

const getAllNonAlcoholicBeers = () => {
  return axios.get(
    `${API_URL}?per_page=80&abv_lt=${MAX_ABV_FOR_NON_ALCOHOLIC_BEER}`,
    {
      headers,
    }
  );
};

const getRandomBeer = () => {
  // TODO: Only beers with both a label and a description should be displayed
  return axios.get(`${API_URL}/random`, { headers });
};

const getAllBeersBrewedBeforeDate = (date) => {
  return axios.get(`${API_URL}?per_page=80&brewed_before=${date}`, { headers });
};

export {
  getBeersByName,
  getAllNonAlcoholicBeers,
  getAllBeersBrewedBeforeDate,
  getRandomBeer,
};
