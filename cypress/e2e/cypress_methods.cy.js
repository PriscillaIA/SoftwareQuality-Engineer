/// <reference types="cypress" />

describe('First Test Suit', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    })

    it('Cypress Methods to interact with web elements', () => {
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        /*Cypress has three main methods to interact with web elements (get, find and contains)*/
        // get() - find web elements globally on the entire page by locator/seletores (tag, id, class, attributes, mixed of attributes)
        // find() - find child web elements by locator/seletores
        // contains() - find elements by text and find elements by text and locator
        
        cy. contains('Sign in');
        cy.contains('[status="primary"]','Sign in');
        cy.contains('[status="warning"]','Sign in');
        cy.contains('nb-card','Horizontal form').find('button');
        cy.contains('nb-card','Horizontal form').contains('Sign in');
        cy.contains('nb-card','Horizontal form').get('button');

        //cypress chains and DOM

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    });
});

  