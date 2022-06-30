import React from "react";

function SearchResults({ filteredBeers, searchQuery }) {
  return (
    <>
      {filteredBeers.length > 0 && <h2>Search Results</h2>}
      {searchQuery && filteredBeers.length === 0 && (
        <p>No search results for {`"${searchQuery}"`}</p>
      )}
      {filteredBeers.map(
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
      )}
    </>
  );
}

export default SearchResults;
