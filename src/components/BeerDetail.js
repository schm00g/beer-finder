import React, { useEffect, useState } from "react";
import { getAllNonAlcoholicBeers, getRandomBeer } from "../services/http/index";
import SearchForm from "./SearchForm";

const BeerDetail = () => {
  const [displayedBeer, setDisplayedBeer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    selectRandomBeer();
  }, []);

  const selectRandomBeer = async () => {
    try {
      const { data } = await getRandomBeer();
      if (data[0].image_url === null || data[0].description === null) {
        selectRandomBeer();
      }
      setDisplayedBeer(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectRandomNonAlcoholicBeer = async () => {
    try {
      const { data } = await getAllNonAlcoholicBeers();
      const randomIndex = Math.floor(Math.random() * data.length);
      setDisplayedBeer(data[randomIndex]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!loading && (
        <div className="Card">
          <h4 className="Title">{displayedBeer.name}</h4>
          <img
            className="Image"
            src={displayedBeer.image_url}
            alt="Beer bottle with label"
            width="50"
            height="150"
          ></img>
          <span className="Description">{displayedBeer.description}</span>
          <span>
            <button data-cy="another-beer" onClick={() => selectRandomBeer()}>
              Another Beer
            </button>
            <button
              data-cy="random-non-alcoholic-beer"
              onClick={() => selectRandomNonAlcoholicBeer()}
            >
              Random non alcoholic beer
            </button>
          </span>
        </div>
      )}
      <SearchForm />
    </div>
  );
};

export default BeerDetail;
