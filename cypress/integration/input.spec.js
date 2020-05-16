/// <reference types="cypress" />

context('Input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  context('Focus', () => {
    it('Clicks the textarea', () => {
        cy.get('.input').type('example@examplemail.com,');
      cy.get('.emails-input--wrapper')
        .click('topLeft')
        .then(() => {
          cy.get('.input').should('not.be.focused');
        });
    });

    it('Clicks the textarea', () => {
      cy.get('.textarea')
        .click('bottom')
        .then(() => {
          cy.get('.input').should('be.focused');
        });

      cy.get('.emails-input--wrapper')
        .click('topLeft')
        .then(() => {
          cy.get('.input').should('not.be.focused');
        });
    });

    it('Clicks the input directly', () => {
      cy.get('.input')
        .click()
        .then(() => {
          cy.get('.input').should('be.focused');
        });

      cy.get('body')
        .click('topLeft')
        .then(() => {
          cy.get('.input').should('not.be.focused');
        });
    });
  });

  context('Adding Pills', () => {
    it('with de-focus', () => {
      cy.addEmailWithUnfocus().then(() => {
        cy.get('.input').should('be.focused');
        cy.get('.pill').should('have.length', 1);
      });
    });

    it('with enter', () => {
      cy.addEmailWithEnter().then(() => {
        cy.get('.input').should('be.focused');
        cy.get('.pill').should('have.length', 1);
      });
    });

    it('empty, with enter should not create empty pill', () => {
      cy.addEmailWithEnter(' ').then(() => {
        cy.get('.input').should('be.focused');
        cy.get('.pills-group').should('not.have.descendants');
      });
    });

    it('with comma', () => {
      cy.addEmailWithComma().then(() => {
        cy.get('.input').should('be.focused');
        cy.get('.pill').should('have.length', 1);
      });
    });
  });

  context('Error', () => {
    it('inactive when empty', () => {
      cy.get('.pills-group').should('not.have.descendants');
      cy.get('.error-message').should('have.css', 'opacity', '0');
      cy.get('.error-container').should('have.css', 'border-color', 'rgba(0, 0, 0, 0)');
    });

    it('inactive when valid email', () => {
      cy.addEmailWithEnter().then(() => {
        cy.get('.input').should('be.focused');
        cy.get('.pill').should('have.length', 1);
        cy.get('.error-message').should('have.css', 'opacity', '0');
        cy.get('.error-container').should('have.css', 'border-color', 'rgba(0, 0, 0, 0)');
      });
    });

    it('active with invalid email', () => {
      cy.addEmailWithEnter('inv@lidem@ail@@@.c').then(() => {
        cy.get('.input').should('be.focused');
        cy.get('.pill').should('have.length', 1);
        cy.get('.error-message').should('have.css', 'opacity', '1');
        cy.get('.error-container').should('not.have.css', 'border-color', 'rgba(0, 0, 0, 0)');
      });
    });
  });
});
