import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { getAllBeersBrewedBeforeDate } from "../services/http/index";

function SearchForm({ beers }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [inputValid, setInputValid] = useState(true);
  const [filteredBeers, setFilteredBeers] = useState([]);

  const handleChange = (e) => {
    setSearchType(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    switch (searchType) {
      case "name":
        searchBeers(searchQuery);
        break;
      case "brewed_before":
        searchBeersBrewedBeforeDate(searchQuery);
        break;
    }
  };

  const validateFieldInput = (input) => {
    // TODO: negate a negative regex match...
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

  const searchBeers = (query) => {
    setFilteredBeers(
      beers.filter((beer) =>
        beer.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div>
      <form onSubmit={(e) => formSubmit(e)}>
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
      <SearchResults filteredBeers={filteredBeers} />
    </div>
  );
}

export default SearchForm;
