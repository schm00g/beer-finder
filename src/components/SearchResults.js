import React from "react";

function SearchResults({ filteredBeers }) {
  return (
    <div>
      {filteredBeers.length > 0 && <h2>Search Results</h2>}
      {!filteredBeers.length ? (
        <div>No search results found</div>
      ) : (
        filteredBeers.map(
          ({ id, name, description, image_url, first_brewed }) => (
            <div key={id} className="Card">
              <span>
                <p>
                  <b>{name}</b>
                </p>
                <img src={image_url} width="50" height="150" />
              </span>
              <p className="truncate">{description}</p>
              <p>
                <i>First brewed: {first_brewed}</i>
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}

export default SearchResults;
