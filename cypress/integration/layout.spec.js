/// <reference types="cypress" />

context('Layout Snapshots', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  const RANDOM_OVERRIDE1 = 'sameexample@gmail.com';
  const RANDOM_OVERRIDE2 = 'notreal@gmail.com';
  const RANDOM_OVERRIDE3 = 'superfake@gmail.com';

  it('empty input', () => {
    cy.fixture('example').then(({ title }) => {
      cy.get('h1').should('have.text', title);

      cy.takeSnapshot();
    });
  });

  it('some valid emails', () => {
    cy.addEmailWithEnter(RANDOM_OVERRIDE1);
    cy.addEmailWithEnter(RANDOM_OVERRIDE2);
    cy.takeSnapshot();
  });

  it('lots of valid emails', () => {
    cy.addEmailWithEnter(RANDOM_OVERRIDE3);
    cy.addEmailWithEnter(RANDOM_OVERRIDE2);
    cy.addEmailWithEnter(RANDOM_OVERRIDE1);
    cy.addEmailWithEnter(RANDOM_OVERRIDE2);
    cy.addEmailWithEnter(RANDOM_OVERRIDE3);
    cy.addEmailWithEnter(RANDOM_OVERRIDE2);
    cy.addEmailWithEnter(RANDOM_OVERRIDE1);
    cy.takeSnapshot();
  });

  it('some invalid emails', () => {
    cy.addEmailWithEnter('invalid');
    cy.addEmailWithComma(RANDOM_OVERRIDE2);
    cy.addEmailWithUnfocus();
    cy.addEmailWithEnter('asdfasdfx');
    cy.addEmailWithEnter(RANDOM_OVERRIDE1);
    cy.addEmailWithEnter('invalid');
    cy.addEmailWithEnter(RANDOM_OVERRIDE3);
    cy.addEmailWithEnter(RANDOM_OVERRIDE2);
    cy.takeSnapshot();
  });
});
