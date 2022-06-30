import React from "react";

function SearchResults({ filteredBeers }) {
  return (
    <>
      {filteredBeers.map(
        ({ id, name, description, image_url, first_brewed }) => (
          <div key={id} className="Card">
            <span>
              <p>
                <b>{name}</b>
              </p>
              <img src={image_url} width="50" height="150" />
            </span>
            <p>{description}</p>
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
