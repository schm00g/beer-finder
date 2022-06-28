import React, { useEffect, useState } from "react";
import { getAllBeers, getAllNonAlcoholicBeers } from "../services/http/index";

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

  const selectRandomBeer = () => {
    setDisplayedBeer(beers[Math.floor(Math.random() * beers.length)]);
  };

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
    // TODO: network request every time?
    // TODO: ensure random selection picks a different one each time...
    try {
      const { data } = await getAllNonAlcoholicBeers();
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
          <span>
            <p>
              <b>{displayedBeer.name}</b>
            </p>
            <img src={displayedBeer.image_url} width="50" height="150"></img>
          </span>
          <p className="Description">{displayedBeer.description}</p>
          <span>
            <button onClick={() => selectRandomNonAlcoholicBeer()}>
              Random non alcoholic beer
            </button>
            <button onClick={() => selectRandomBeer()}>Another Beer</button>
          </span>
        </div>
      )}
    </div>
  );
};

// https://www.pluralsight.com/guides/optimizing-data-fetching-in-react

export default BeerDetail;
