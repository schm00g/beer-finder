import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { getAllBeersBrewedBeforeDate } from "../services/http/index";

function SearchForm({ beers }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [inputValid, setInputValid] = useState(true);
  const [filteredBeers, setFilteredBeers] = useState([]);

  const handleChange = (e) => {
    setSearchQuery("");
    setSearchType(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    switch (searchType) {
      case "name":
        searchBeers(searchQuery);
        break;
      case "brewed_before":
        searchBeersBrewedBeforeDate(formatDate(searchQuery));
        break;
    }
  };

  const validateFieldInput = (input) => {
    setInputValid(!input.match(/[^A-Za-z0-9-\s]/));
  };

  const formatDate = (date) => {
    const substrings = date.split("-");
    return `${substrings[1]}-${substrings[0]}`;
  };

  async function searchBeersBrewedBeforeDate(date) {
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
      <form className="Search" onSubmit={(e) => formSubmit(e)}>
        <label>
          <h2>Search</h2>
          {searchType === "name" && (
            <input
              id="search"
              type="text"
              data-cy="search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                validateFieldInput(e.target.value);
              }}
              placeholder="search"
            />
          )}
          {searchType === "brewed_before" && (
            <label htmlFor="brewed_before">
              <input
                type="date"
                id="brewed_before"
                name="brewed_before"
                data-cy="date-picker"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  formatDate(e.target.value);
                }}
              />
            </label>
          )}
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
            data-cy="search-type-brewed-before"
            name="search_type"
            checked={searchType === "brewed_before"}
            onChange={handleChange}
          />
          by brewed before date
        </label>
        <button data-cy="search-button" type="submit">
          Search
        </button>
      </form>
      {!inputValid && (
        <div className="Validation">
          only letters, numbers, hyphens and spaces are valid
        </div>
      )}
      <SearchResults filteredBeers={filteredBeers} />
    </div>
  );
}

export default SearchForm;
