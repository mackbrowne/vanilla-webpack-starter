/// <reference types="cypress" />

context('Actions', () => {
  let message;
  beforeEach(() => {
    cy.visit('http://localhost:8080');

    message = cy.stub();
    cy.on('window:alert', message);
  });

  it('Renders the dom with a message', () => {
    cy.fixture('example').then(({ title }) => {
      cy.get('h1').should('have.text', title);

      cy.get('body').snapshot();
    });
  });

  it('Click Add Email Button', () => {
    cy.clickButton('Add email');
    cy.get('.pill').should('have.length', 1);

    cy.clickButton('Get emails count').then(() => {
      expect(message.getCall(0)).to.be.calledWith('Total Emails: 1');
    });
  });

  it('Click Add Email Button 50 Times', () => {
    for (let i = 0; i < 50; i++) {
      cy.clickButton('Add email');
    }
    cy.get('.pill').should('have.length', 50);

    cy.clickButton('Get emails count').then(() =>
      expect(message.getCall(0)).to.be.calledWith('Total Emails: 50')
    );
  });
});
