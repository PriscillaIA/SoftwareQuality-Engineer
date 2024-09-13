/// <reference types="cypress" />

describe('Test Suit 7', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    });

    it.only('Web Date Pickers', () => {   
        cy.contains('Form').click();
        cy.contains('Datepicker').click();

        // cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
        //     cy.wrap(input).click();
        //     cy.get('.day-cell').not('.bounding-month'). contains('1').click();
        //     cy.wrap(input).invoke('prop','value').should('contain','Sep 1, 2024');
        //     cy.wrap(input).should('have.value', 'Sep 1, 2024')   
        // });

        //Taking date updated, that is, according with current date with javaScript class/object Date
        let currentDateObject = new Date() // the instance of Date javascript class will have different methods to work with date and time
        currentDateObject.setDate(currentDateObject.getDate() + 20);
        let futureDateObject = currentDateObject.getDate();
        cy.log(futureDateObject)
        console.log(futureDateObject)
        let dateToAssert = `Sep ${futureDateObject}, 2024`;

       cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
             cy.wrap(input).click();
             cy.get('.day-cell').not('.bounding-month').contains(futureDateObject).click();
             cy.wrap(input).invoke('prop','value').should('contain',dateToAssert);
             cy.wrap(input).should('have.value', dateToAssert)   
         });
        
    });
});