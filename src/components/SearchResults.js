import React from "react";

function SearchResults({ filteredBeers }) {
  return (
    <div>
      {filteredBeers.length > 0 && <h2>Search Results</h2>}
      {filteredBeers.map(
        ({ id, name, description, image_url, first_brewed }) => (
          <div key={id} className="Card">
            <h4 className="Title">{name}</h4>
            <img className="Image" src={image_url} width="30" height="100" />
            <p className="Truncate">{description}</p>
            <i>First brewed: {first_brewed}</i>
          </div>
        )
      )}
    </div>
  );
}

export default SearchResults;
