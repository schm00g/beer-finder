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
          only letters, numbers, hyphens and spaces are valid
        </div>
      )}
      <SearchResults filteredBeers={filteredBeers} searchQuery={searchQuery} />
    </div>
  );
}

export default SearchForm;
