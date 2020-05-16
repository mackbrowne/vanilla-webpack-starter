/// <reference types="cypress" />

context('Pill', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('valid email', () => {
    cy.addEmailWithEnter().then(() => {
      cy.get('.pill')
        .first()
        .should('not.have.class', 'pill-invalid')
        .get('.pill-remove')
        .click();

      cy.get('.pills-group').should('not.have.descendants');

      cy.get('.input').should('not.be.focused');
    });
  });

  it('invalid email', () => {
    cy.addEmailWithEnter('asdf@!das@@fadf.asdfafd').then(() => {
      cy.get('.pill')
        .first()
        .should('have.class', 'pill-invalid')
        .get('.pill-remove')
        .click();

      cy.get('.pills-group').should('not.have.descendants');

      cy.get('.input').should('not.be.focused');
    });
  });
});
