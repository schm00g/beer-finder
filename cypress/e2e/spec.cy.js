describe("beer finder e2e tests", () => {
  it("should visit", () => {
    cy.visit("/");
  });

  it("user should see random beer", () => {
    cy.visit("/");
    cy.get(".Title").should("exist");
    cy.get(".Image").should("exist");
  });

  it("user selects new random beer", () => {
    cy.visit("/");
    cy.get('[data-cy="another-beer"]').click();
    cy.get(".Title").should("exist");
    cy.get(".Image").should("exist");
  });

  it("user selects new random non-alcoholic beer", () => {
    cy.visit("/");
    cy.get('[data-cy="random-non-alcoholic-beer"]').click();
    cy.get(".Title").should("exist");
    cy.get(".Image").should("exist");
  });

  it("user searches for a specific beer by text", () => {
    cy.visit("/");
    cy.get('[data-cy="search-input"]').type("b");
    cy.get('[data-cy="search-button"]').click();
    cy.contains("Search Results").should("exist");
  });

  it("user searches for a specific beer by brewed before date", () => {
    cy.visit("/");
    cy.get('[data-cy="search-type-brewed-before"]').click();
    cy.get('[data-cy="search-input"]').type("10-2009");
    cy.get('[data-cy="search-button"]').click();
    cy.contains("Search Results").should("exist");
    cy.contains("First brewed").should("exist");
  });
});
