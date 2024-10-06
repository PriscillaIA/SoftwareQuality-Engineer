/// <reference types="cypress" />

describe('First Test Suit', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    })

    it('Types of locators', () => {

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        
        //by Tag
        cy.get('input');

        //by ID
        cy.get('#inputEmail1');

        //by Class Value
        cy.get('.input-full-width');

        //by Attribute Name
        cy.get('[fullwidth]');

        //by Attribute and Value
        cy.get('[placeholder="Email"]');

        //by Entire Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        //by two attributes -> 
        cy.get('[placeholder="Email"][fullwidth]');

        //by tag, attribute id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by cypress test ID
        cy.get('[data-cy="imputEmail1"]');

    });
});

  