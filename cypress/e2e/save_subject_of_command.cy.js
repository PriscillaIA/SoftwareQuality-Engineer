/// <reference types="cypress" />

describe('First Test Suit', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    })

    it('Save subject of command', () => {

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        
        cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
        
        //Can't assigne the result of cypress function to the const variable
        //const usingTheGrid = cy.contains('nb-card','Using the Grid');
        //usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email');
       //usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password');*/

       //Approche 1 - Use cypress Alias 
       cy.contains('nb-card','Using the Grid').as('usingtheGrid');
       cy.get('@usingtheGrid').find('[for="inputEmail1"]').should('contain', 'Email');
       cy.get('@usingtheGrid').find('[for="inputPassword2"]').should('contain', 'Password');

       //Approche 2 - Use cypress then() method
       cy.contains('nb-card','Using the Grid').then(usingtheGridForm => {
        cy.wrap(usingtheGridForm).find('[for="inputEmail1"]').should('contain', 'Email');
        cy.wrap(usingtheGridForm).find('[for="inputPassword2"]').should('contain', 'Password');

      //Mixed then() with alias
        cy.wrap(usingtheGridForm).as('usingtheGridForm')
        cy.get('@usingtheGridForm').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.get('@usingtheGridForm').find('[for="inputPassword2"]').should('contain', 'Password');
            });
        });
    });