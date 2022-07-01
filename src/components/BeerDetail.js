import React, { useEffect, useState } from "react";
import {
  getAllBeers,
  getAllNonAlcoholicBeers,
  getRandomBeer,
} from "../services/http/index";
import SearchForm from "./SearchForm";

const BeerDetail = () => {
  const [beers, setBeers] = useState([]);
  const [displayedBeer, setDisplayedBeer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBeerData();
  }, []);

  useEffect(() => {
    if (!loading && beers) {
      selectRandomBeer();
    }
  }, [beers]);

  async function selectRandomBeer() {
    try {
      const { data } = await getRandomBeer();
      // TODO: index 0 avoidable and recursive call here?
      if (data[0].image_url === null || data[0].description === null) {
        selectRandomBeer();
      }
      setDisplayedBeer(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getAllBeerData() {
    try {
      const { data } = await getAllBeers();
      setBeers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function selectRandomNonAlcoholicBeer() {
    try {
      // TODO: network request every time?
      const { data } = await getAllNonAlcoholicBeers();
      // TODO: ensure random selection picks a different one each time...
      setDisplayedBeer(data[Math.floor(Math.random() * data.length)]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!loading && beers.length > 0 && (
        <div className="Card">
          <h4 className="Title">{displayedBeer.name}</h4>
          <img
            className="Image"
            src={displayedBeer.image_url}
            width="50"
            height="150"
          ></img>
          <span className="Description">{displayedBeer.description}</span>
          <span>
            <button onClick={() => selectRandomBeer()}>Another Beer</button>
            <button onClick={() => selectRandomNonAlcoholicBeer()}>
              Random non alcoholic beer
            </button>
          </span>
        </div>
      )}
      <SearchForm beers={beers} />
    </div>
  );
};

// TODO: https://www.pluralsight.com/guides/optimizing-data-fetching-in-react

// TODO: https://www.everydayreact.com/articles/solid-principles-in-react

export default BeerDetail;
