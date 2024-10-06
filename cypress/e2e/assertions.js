/// <reference types="cypress" />

describe('Test Suit 11', () => {
    
    //should -> cy.get('button).should('have.class', 'active') / cy.get('nb-tooltip').should('be.visible')
    //expect -> expect(labelText).to.equal('Email address');

    beforeEach('visitURL', () => {
        cy.visit('/');
    });

    it('Veirfy a Tooltips is visible and contain a specific text', () => {
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click();
        cy.get('nb-tooltip').should('be.visible')
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    });
});