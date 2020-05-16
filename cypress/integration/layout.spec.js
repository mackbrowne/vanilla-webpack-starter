/// <reference types="cypress" />

context('Layout', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  const RANDOM_OVERRIDE1 = 'sameexample@gmail.com';
  const RANDOM_OVERRIDE2 = 'notreal@gmail.com';
  const RANDOM_OVERRIDE3 = 'superfake@gmail.com';

  it('with a empty input', () => {
    cy.takeSnapshot();
  });

  it('with some valid emails', () => {
    cy.addEmailWithEnter(RANDOM_OVERRIDE1);
    cy.addEmailWithEnter(RANDOM_OVERRIDE2);
    cy.takeSnapshot();
  });

  it('with lots of valid emails', () => {
    cy.addEmailWithEnter(RANDOM_OVERRIDE3);
    cy.addEmailWithEnter(RANDOM_OVERRIDE2);
    cy.addEmailWithEnter(RANDOM_OVERRIDE1);
    cy.addEmailWithEnter(RANDOM_OVERRIDE2);
    cy.addEmailWithEnter(RANDOM_OVERRIDE3);
    cy.addEmailWithEnter(RANDOM_OVERRIDE2);
    cy.addEmailWithEnter(RANDOM_OVERRIDE1);
    cy.takeSnapshot();
  });

  it('with some invalid emails', () => {
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
