/// <reference types="cypress" />

describe('Test Suit 10', () => {
    

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

    it('Dialog box', () => {
        cy.contains('Modal & Overlays').click();
        cy.contains('Dialog').click();

        cy.contains('nb-card', 'Open Dialog').find('button')
            .contains('Open Dialog with component').click();
        cy.get('ngx-showcase-dialog').should('be.visible');
        cy.get('ngx-showcase-dialog').should('contain', 'This is a title passed to the dialog component')
        cy.get('ngx-showcase-dialog nb-card-footer').find('button').click();
    });

    it ('Browser Dialog box - when there is itens to delete', () => {
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        cy.get('tbody tr').first().find('.nb-trash').click();
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?');
        });
    });

    it('Browser Dialog box - when there is not itens to delete', () => {
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(()=> {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });
    });

    it.only('Browser Dialog box - Select the Cancel button', () => {
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        cy.get('tbody tr').first().find('.nb-trash').click();
        cy.on('window:confirm', () => false);
    });
});