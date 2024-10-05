/// <reference types="cypress" />

describe('Test Suit 7', () => {

    beforeEach('visitURL', () => {
        cy.visit('/');
    });

    it('Web Date Pickers - select only actual date', () => {   
        cy.contains('Form').click();
        cy.contains('Datepicker').click();
        
        //Simple way to take and make the assertion of date
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

    it('Web Date Pickers - select month and year', () => {   
        cy.contains('Form').click();
        cy.contains('Datepicker').click();

        let currentDateObject = new Date();
        let day = currentDateObject.toDateString(); // don't make part of code, just do see the day at cy.lo
        currentDateObject.setDate(currentDateObject.getDate() + 240);
        let futureDayObject = currentDateObject.getDate();
        let futureMonth = currentDateObject.toLocaleDateString('en-US',{month: 'short'});
        let futureYear = currentDateObject.getFullYear();
        let dateToAssert = `${futureMonth} ${futureDayObject}, ${futureYear}`;
        cy.log(day)
        cy.log(futureDayObject)
        cy.log(futureMonth)
        cy.log(futureYear)

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();

            function selectDatFromCurrent(){
                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                    if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                        cy.get('[data-name="chevron-right"]').click();
                        selectDatFromCurrent();
                    }else{
                        cy.get('.day-cell').not('.bounding-month').contains(futureDayObject).click();                        
                    }
                });
            }
            selectDatFromCurrent();
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssert);
            cy.wrap(input).should('have.value', dateToAssert);
        });
    });
    //Improve the organization of code
    it.only('Web Date Pickers - select month and year', () => {   

        function selectDatFromCurrent(day){
            let currentDateObject = new Date();
            let dayAtual = currentDateObject.toDateString(); // don't make part of code, just do see the day at cy.lo
            currentDateObject.setDate(currentDateObject.getDate() + day);
            let futureDayObject = currentDateObject.getDate();
            let futureMonth = currentDateObject.toLocaleDateString('en-US',{month: 'short'});
            let futureYear = currentDateObject.getFullYear();
            let dateToAssert = `${futureMonth} ${futureDayObject}, ${futureYear}`;
            cy.log('Current date: '+dayAtual)
            cy.log('Future month: '+futureMonth)
            cy.log('Future day: '+futureDayObject)
            cy.log('Future year: '+futureYear)

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                    cy.get('[data-name="chevron-right"]').click();
                    selectDatFromCurrent(day);
                }else{
                    cy.get('.day-cell').not('.bounding-month').contains(futureDayObject).click();                        
                }
            });
            return dateToAssert
        }
        
        cy.contains('Form').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            const dateToAssert = selectDatFromCurrent(400);
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssert);
            cy.wrap(input).should('have.value', dateToAssert);
        });
    });
});