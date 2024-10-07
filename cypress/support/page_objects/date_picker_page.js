
function selectDayFromCurrent(day){
    let currentDateObject = new Date();
    currentDateObject.setDate(currentDateObject.getDate() + day);
    let futureDayObject = currentDateObject.getDate();
    let futureMonth = currentDateObject.toLocaleDateString('en-US',{month: 'short'});
    let futureYear = currentDateObject.getFullYear();
    let dateToAssert = `${futureMonth} ${futureDayObject}, ${futureYear}`;

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
        }else{
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDayObject).click();                        
        }
    });
    return dateToAssert
}

export class DatePickerPage{

    selectCommonDatepickerDateFromToday(dayFromToday){
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            const dateToAssert = selectDayFromCurrent(dayFromToday);
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssert);
            cy.wrap(input).should('have.value', dateToAssert);
        });
    }
}

export const onDatePickerPage = new DatePickerPage();