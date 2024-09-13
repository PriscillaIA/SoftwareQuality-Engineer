/// <reference types="cypress" />

describe('First Test Suit', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    })

    it('First Test', () => {

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

    it('Second test', () => {
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //Cypress has three main methods to interact with web elements (get, find and contains)
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

       //Approche 2 - Use cypress then() methods 
       cy.contains('nb-card','Using the Grid').then(usingtheGridForm => {
        cy.wrap(usingtheGridForm).find('[for="inputEmail1"]').should('contain', 'Email');
        cy.wrap(usingtheGridForm).find('[for="inputPassword2"]').should('contain', 'Password');

      //Mixed then() with alias
        cy.wrap(usingtheGridForm).as('usingtheGridForm')
        cy.get('@usingtheGridForm').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.get('@usingtheGridForm').find('[for="inputPassword2"]').should('contain', 'Password');
        });

    });

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
