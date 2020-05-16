/// <reference types="cypress" />

context('Actions', () => {
  let message;
  beforeEach(() => {
    cy.visit('http://localhost:8080');

    message = cy.stub();
    cy.on('window:alert', message);
  });

  it('add email button', () => {
    cy.clickButton('Add email');
    cy.get('.pill').should('have.length', 1);

    cy.clickButton('Get emails count').then(() => {
      expect(message.getCall(0)).to.be.calledWith('Total Emails: 1');
    });
  });

  it('50 times', () => {
    for (let i = 0; i < 50; i++) {
      cy.clickButton('Add email');
    }
    cy.get('.pill').should('have.length', 50);

    cy.clickButton('Get emails count').then(() =>
      expect(message.getCall(0)).to.be.calledWith('Total Emails: 50')
    );
  });
});
