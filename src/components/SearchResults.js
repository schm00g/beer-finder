import React from "react";

function SearchResults({ searchResults }) {
  return (
    <div data-cy="search-results">
      {searchResults.length > 0 && (
        <h2>Search Results {`(${searchResults.length})`}</h2>
      )}
      {searchResults.map(
        ({ id, name, description, image_url, first_brewed }) => (
          <div key={id} className="Card">
            <h4 className="Title">{name}</h4>
            <img
              className="Image"
              src={image_url}
              alt="Beer bottle with label"
              width="30"
              height="100"
            />
            <p className="Truncate">{description}</p>
            <i>First brewed: {first_brewed}</i>
          </div>
        )
      )}
    </div>
  );
}

export default SearchResults;
