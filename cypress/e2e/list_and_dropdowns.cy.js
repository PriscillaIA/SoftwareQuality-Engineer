/// <reference types="cypress" />


describe('Test Suit 8', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    });

    it('Run list with loop (each)', () => {   
        //cy.get('nav').find('nb-select').click();
        //cy.get('nav nb-select').click(); // more simple way to take elements sun from father
        //cy.get('.options-list').contains('Cosmic').click();
        //cy.get('nav nb-select').should('contain', 'Cosmic');

        //Select all itens of list and assert by loop
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click();
            cy.get('.options-list nb-option').each(listItem => { //run for each item of list
                const itemText = listItem.text().trim() //trim remove espacos no texto
                cy.wrap(listItem).click();
                cy.wrap(dropDown).should('contain', itemText);
                cy.wrap(dropDown).click();
            });

        });
    });

    
    it.only('Run list with loop (each) and index inside of each', () => {   
        //cy.get('nav').find('nb-select').click();
        //cy.get('nav nb-select').click(); // more simple way to take elements sun from father
        //cy.get('.options-list').contains('Cosmic').click();
        //cy.get('nav nb-select').should('contain', 'Cosmic');

        //Select all itens of list and assert by loop
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click();
            cy.get('.options-list nb-option').each((listItem, index) => { //run for each item of list
                const itemText = listItem.text().trim() //trim remove espacos no texto
                cy.log(listItem +" "+index)
                cy.wrap(listItem).click();
                cy.wrap(dropDown).should('contain', itemText);
                if (index < 3){
                    cy.wrap(dropDown).click();
                }
            });

        });
    });
});