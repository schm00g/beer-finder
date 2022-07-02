beforeEach(() => {
  cy.visit("/");
});

describe("beer finder most common user pathways", () => {
  it("should display random beer", () => {
    cy.get(".Title").should("exist");
    cy.get(".Image").should("exist");
  });

  it("should display new random beer", () => {
    cy.get('[data-cy="another-beer"]').click();
    cy.get(".Title").should("exist");
    cy.get(".Image").should("exist");
  });

  it("should display new random non-alcoholic beer", () => {
    cy.get('[data-cy="random-non-alcoholic-beer"]').click();
    cy.get(".Title").should("exist");
    cy.get(".Image").should("exist");
  });

  it("allow user to search for a specific beer by text", () => {
    cy.get('[data-cy="search-input"]').type("b");
    cy.get('[data-cy="search-button"]').click();
    cy.contains("Search Results").should("exist");
    cy.get('[data-cy="search-results"]').its("length").should("be.gte", 1);
  });

  it("allow user to search for a specific beer by brewed before date", () => {
    cy.get('[data-cy="search-type-brewed-before"]').click();
    cy.get('[data-cy="date-picker"]').click().type("2009-02-02");
    cy.get('[data-cy="search-button"]').click();
    cy.get('[data-cy="search-results"]').its("length").should("be.gte", 1);
    cy.contains("Search Results").should("exist");
    cy.contains("First brewed").should("exist");
  });

  it("XHR request for random beer should return HTTP status 200", () => {
    cy.request("https://api.punkapi.com/v2/beers/random").should((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");
    });
  });
});
