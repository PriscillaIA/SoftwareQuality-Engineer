/// <reference types="cypress" />


describe('Test Suit 9', () => {
    

    beforeEach('visitURL', () => {
        cy.visit('/');
    });

    it('Get the row by text', () => {
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('contain', '35');
        });
    });

    it('Get the row by index', () => {

        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(tableRow => { 
            cy.wrap(tableRow).find('[placeholder="First Name"]').type("Priscilla");
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Silva");
            cy.wrap(tableRow).find('.nb-checkmark').click();
        });
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain','Priscilla');
            cy.wrap(tableColumns).eq(3).should('contain','Silva');
        });
    });

    it('Validate that the filter return the correct row', () => {

        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        // Set the "Age" filter to 20
        cy.get('thead').find('[placeholder="Age"]').clear().type('20');
        cy.wait(500)
        // Iterate over each table row and assert the 7th column value is 20
        cy.get('tbody tr').each(tableRow => {
            cy.wrap(tableRow).find('td').eq(6).should('contain', '20')
        });
    });

    it.only('Validate that the filter return the correct value according the enter', () => {

        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead').find('[placeholder="Age"]').clear().type(age);
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            });
        });
    });
});