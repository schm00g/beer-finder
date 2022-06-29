import React, { useEffect, useState } from "react";
import {
  getAllBeers,
  getAllNonAlcoholicBeers,
  getAllBeersBrewedBeforeDate,
} from "../services/http/index";
import SearchResults from "./SearchResults";

// TODO: Only beers with both a label and a description should be displayed.

const BeerDetail = () => {
  const [beers, setBeers] = useState([]);
  const [displayedBeer, setDisplayedBeer] = useState({});
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [loading, setLoading] = useState(true);
  const [inputValid, setInputValid] = useState(true);

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

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  const searchBeers = (query) => {
    setFilteredBeers(
      beers.filter((beer) =>
        beer.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const validateFieldInput = (input) => {
    setInputValid(!input.match(/[^A-Za-z0-9-\s]/));
  };

  async function searchBeersBrewedBeforeDate(date) {
    // TODO: do regex here?
    try {
      const { data } = await getAllBeersBrewedBeforeDate(date);
      setFilteredBeers(data);
    } catch (error) {
      console.error(error);
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: switch here or in function?
          switch (searchType) {
            case "name":
              searchBeers(searchQuery);
              break;
            case "brewed_before":
              searchBeersBrewedBeforeDate(searchQuery);
              break;
          }
        }}
      >
        <label>
          <h3>Search</h3>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              validateFieldInput(e.target.value);
            }}
            placeholder="search"
          />
        </label>
        <label>
          <input
            type="radio"
            value="name"
            name="search_type"
            checked={searchType === "name"}
            onChange={handleChange}
          />
          by name
        </label>
        <label>
          <input
            type="radio"
            value="brewed_before"
            name="search_type"
            checked={searchType === "brewed_before"}
            onChange={handleChange}
          />
          brewed before (MM-YYYY)
        </label>
        <button type="submit">Search</button>
      </form>
      {!inputValid && (
        <div className="Validation">
          you may only use letters, numbers, hyphens and spaces
        </div>
      )}
      {/* {filteredBeers.length === 0 && <div>No items</div>} */}
      <SearchResults filteredBeers={filteredBeers} />
    </div>
  );
};

// https://www.pluralsight.com/guides/optimizing-data-fetching-in-react

export default BeerDetail;
