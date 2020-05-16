/// <reference types="cypress" />

context('Methods', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  context('getEmails', () => {
    it('empty', () => {
      cy.window().then((win) =>
        expect(win.emailsInput1.getEmails()).to.have.length(0)
      );
    });

    it('with values', () => {
      cy.addEmailWithEnter();
      cy.addEmailWithEnter();
      cy.addEmailWithEnter();
      cy.window().then((win) =>
        expect(win.emailsInput1.getEmails()).to.have.length(3)
      );
    });
  });

  context('replaceEmails', () => {
    it('when empty', () => {
      cy.window().then((win) => {
        expect(win.emailsInput1.getEmails()).to.have.length(0);
        win.emailsInput1.replaceEmails([
          'asdf@gmail.com',
          'asdfasdfa'
        ]);

        cy.window().then((win) =>
          expect(win.emailsInput1.getEmails()).to.have.length(2)
        );
      });
    });

    it('when emails already exist', () => {
      cy.addEmailWithEnter();
      cy.addEmailWithEnter();
      cy.addEmailWithEnter();
      cy.window().then((win) => {
        expect(win.emailsInput1.getEmails()).to.have.length(3);
        win.emailsInput1.replaceEmails([
          'asdf@gmail.com',
          'asdfasdfa'
        ]);

        cy.window().then((win) =>
          expect(win.emailsInput1.getEmails()).to.have.length(2)
        );
      });
    });
  });
});
