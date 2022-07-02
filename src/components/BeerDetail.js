import React, { useEffect, useState } from "react";
import { getAllNonAlcoholicBeers, getRandomBeer } from "../services/http/index";
import SearchForm from "./SearchForm";

const BeerDetail = () => {
  const [displayedBeer, setDisplayedBeer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    selectRandomBeer();
  }, []);

  async function selectRandomBeer() {
    try {
      const { data } = await getRandomBeer();
      if (
        data[0].image_url === null ||
        data[0].description === null ||
        data[0].name.toLowerCase().includes("no label")
      ) {
        selectRandomBeer();
      }
      setDisplayedBeer(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function selectRandomNonAlcoholicBeer() {
    try {
      const { data } = await getAllNonAlcoholicBeers();
      const randomIndex = Math.floor(Math.random() * data.length);
      setDisplayedBeer(data[randomIndex]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!loading && (
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
