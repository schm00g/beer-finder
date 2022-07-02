# Beer Finder

Interact with PunkAPI.

[Demo](https://beer-finder-iota.vercel.app/)

## Scripts

From the project root directory, run:

### npm install

This will install all the dependencies. I'm using Node `v16.14.2`.

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

The main component is [src/components/BeerDetail.js](src/components/BeerDetail.js) which calls for the random beer data when mounted and displays it. The user can search data [src/components/SearchForm.js](src/components/SearchForm.js) and see matching results with [src/components/SearchResults.js](src/components/SearchResults.js).

Axios HTTP requests are found [src/services/http/index.js](src/services/http/index.js).

Cypress test suite [cypress/e2e/spec.cy.js](cypress/e2e/spec.cy.js)

## To Do

Next steps would be to deal with pagination for search results returning more than 80 beers.

Implement rate limiting strategy for 3600 requests per hour using axios interceptors. One possible solution could be limiting to 1 req/sec in [src/services/http/index.js](src/services/http/index.js):

```
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

axios.interceptors.request.use(
  async function (config) {
    await delay(1000);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
```
