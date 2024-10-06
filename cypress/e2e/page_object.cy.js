/// <reference types="cypress" />

describe('First Test Suit', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    })

    it('First Test', () => {

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        cy.request('http://localhost:4200/pages/forms/layouts').its('status').should('eq', 200);
    });
    });