import React, { useState } from "react";
import SearchResults from "./SearchResults";
import {
  getAllBeersBrewedBeforeDate,
  getBeersByName,
} from "../services/http/index";

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [inputValid, setInputValid] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

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
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function searchBeers(query) {
    try {
      const { data } = await getBeersByName(query);
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  }

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
              placeholder="search beers"
            />
          )}
          {searchType === "brewed_before" && (
            <label htmlFor="brewed_before">
              <input
                type="date"
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
        <button
          disabled={searchQuery.length === 0}
          data-cy="search-button"
          type="submit"
        >
          Search
        </button>
      </form>
      {!inputValid && (
        <div className="Validation">
          only letters, numbers, hyphens and spaces are valid
        </div>
      )}
      <SearchResults searchResults={searchResults} />
    </div>
  );
}

export default SearchForm;
