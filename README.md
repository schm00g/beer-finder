# Beer Finder

Interact with PunkAPI.

[Demo](https://beer-finder-iota.vercel.app/)

my env: Node `v16.14.2`.

## Scripts

From the project root directory, run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run cypress:open`

Open the cypress app to view end-to-end tests running.

### `npm run build`

Builds the app for production to the `build` folder.

## Notes

For code consistency and static analysis eslint & prettier are used.

Cypress.io e2e tests are provided to cover the most common user journeys.

The main component is [src/components/BeerDetail.js](src/components/BeerDetail.js) which calls for the data when mounted and displays random beer. The user can search data [src/components/SearchForm.js](src/components/SearchForm.js) and see results displayed with [src/components/SearchResults.js](src/components/SearchResults.js).

Axios HTTP requests are found [src/services/http/index.js](src/services/http/index.js).

Cypress test suite [cypress/e2e/spec.cy.js](cypress/e2e/spec.cy.js)

## Todo

rate limiting
best to grab all beers from API and use localStorage?
