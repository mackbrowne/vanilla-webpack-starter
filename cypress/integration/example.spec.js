/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000");
  });

  it("Renders the dom with a message", () => {
    cy.fixture("example").then(({ bodyMessage }) =>
      cy.get("div").should("have.text", bodyMessage)
    );
  });
});
