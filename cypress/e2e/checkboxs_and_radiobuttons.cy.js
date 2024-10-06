/// <reference types="cypress" />

describe('First Test Suit', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    })
 
    it('Radio Buttons', () => {    
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked');
            cy.wrap(radioButtons).eq(1).check({force: true});
            cy.wrap(radioButtons).eq(0).should('not.be.checked');
            cy.wrap(radioButtons).eq(2).should('be.disabled');
        });
    });

    it('Checkboxs', () => {   
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();
        cy.get('[type="checkbox"]').check({force:true}); // cypress avoid clicking on elements that are covered for another status. That is, verify the current status element (check or uncheck), and if be different then don't click (check or uncheck). Then we use {force:true} to force the metodo execute the action
        cy.get('[type="checkbox"]').eq(2).uncheck({force:true}); // need {force:true} because the current element's status is check, that is, different of uncheck
        cy.get('[type="checkbox"]').eq(2).uncheck(); // don't need {force:true}, because the current status (uncheck) is equal
        cy.get('[type="checkbox"]').eq(2).check({force:true}); //need {force:true} because check will cover the previous element status (uncheck)
        
        cy.get('[type="checkbox"]').eq(0).uncheck({force:true});
        cy.get('[type="checkbox"]').eq(0).click({force:true}); // method click don't verify the current element status, just click.

    });
});
