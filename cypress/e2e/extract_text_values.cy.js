/// <reference types="cypress" />

describe('First Test Suit', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    })

    it('Extract text values', () => {

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //Simple way -> element web contain the text
        //cy.get('[for="exampleInputEmail1"]'). should('contain', 'Email address');
        //cy.get('[for="exampleInputPassword1"]'). should('contain', 'Password');
        //cy.get('label.label').find('[class="text"]').contains('Check me out');

        //Save the value of text in variable
        cy.get('[for="exampleInputEmail1"]').then(label => { 
            //don't need to wrap the label object because JQuery objects have the method text
            const labelText = label.text();
            expect(labelText).to.equal('Email address'); //Jquery assertion
            //Wraping the object to use cypress assertion command
            cy.wrap(label).should('contain', 'Email address')
        });

        //Instead of to use Jquare method 'then' we can use a cypress method named 'invoke'
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address');
        });

        cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain', 'Email address');
        
        //invoke wit allias
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address');
        cy.get('@labelText').should('contain', 'Email address');

        //invoke the attribute. Some times validate de attribute can help us validade the state of aplication 
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label');
        });

        //Invoke Propertys
        cy.get('#exampleInputEmail1').type('pdesouza@gmail.com');
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'pdesouza@gmail.com')


    });
});
