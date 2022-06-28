import React, { useEffect, useState } from "react";
import {
  getAllBeers,
  getAllNonAlcoholicBeers,
  getAllBeersBrewedBeforeDate,
} from "../services/http/index";
import SearchResults from "./SearchResults";

const BeerDetail = () => {
  const [beers, setBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [displayedBeer, setDisplayedBeer] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBeerData();
  }, []);

  useEffect(() => {
    if (!loading && beers) {
      selectRandomBeer();
    }
  }, [beers]);

  // // TODO: live search?
  // useEffect(() => {
  //   searchBeers(searchQuery);
  // }, [searchQuery]);

  const selectRandomBeer = () => {
    setDisplayedBeer(beers[Math.floor(Math.random() * beers.length)]);
  };

  const searchBeers = (query) => {
    setFilteredBeers(
      beers.filter(
        (beer) =>
          beer.name.toLowerCase().includes(query.toLowerCase()) ||
          beer.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  async function searchBeersBrewedBeforeDate(date) {
    // 2022-06-15 YYYY-MM-DD ~~~~ to ~~~~~ MM-YYYY
    // TODO: this is naaaaasty...
    const dateFormat = date.split("-");
    try {
      const { data } = await getAllBeersBrewedBeforeDate(
        `${dateFormat[1]}-${dateFormat[0]}`
      );
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
          searchBeers(searchQuery);
        }}
      >
        <label htmlFor="search">
          Search
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchBeersBrewedBeforeDate(dateQuery);
        }}
      >
        {/* https://api.punkapi.com/v2/beers?brewed_before=05-2007 */}
        <label htmlFor="brewed-before">Brewed before:</label>
        <input
          type="date"
          id="brewed-before"
          name="date"
          onChange={(e) => setDateQuery(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
      {/* TODO: what if no search results found */}
      {/* {filteredBeers.length === 0 && <div>No items</div>} */}
      <SearchResults filteredBeers={filteredBeers} />
    </div>
  );
};

// https://www.pluralsight.com/guides/optimizing-data-fetching-in-react

export default BeerDetail;
