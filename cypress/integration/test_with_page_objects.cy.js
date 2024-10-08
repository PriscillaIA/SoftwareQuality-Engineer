/// <reference types="cypress" />

const { onDatePickerPage } = require("../support/page_objects/date_picker_page");
const { onformLayoutPage } = require("../support/page_objects/form_layout_page");
const { navigationTo } = require("../support/page_objects/navigation_page");
const { onSmartTablePage } = require("../support/page_objects/smart_table_page");

describe('Test with Page Objects', () => {

    beforeEach('Open application', () => {
        cy.openHomePage();
    });

    it('Verify navigation across the pagees', () => {
        navigationTo.formLayoutPage();
        navigationTo.datepickerPage();
        navigationTo.toastPage();
        navigationTo.tooltipPage();
        navigationTo.smartTablePage();
        navigationTo.treeGridPage();
    });

    
    it.only('Should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigationTo.formLayoutPage();
        onformLayoutPage.submitInlineFormWithNameAndEmail('Priscilla Silva', 'test@gmail.com');
        onformLayoutPage.submitBasicFormWithEmailAndPassword('test@gmail.com', 'password');
        navigationTo.datepickerPage();
        onDatePickerPage.selectCommonDatepickerDateFromToday(1);
        onDatePickerPage.selectDatepickerWithRangeFormToday(1,2);
        navigationTo.smartTablePage();
        onSmartTablePage.addNewRecordWithFirstAndLastName('Priscilla', 'Silva')
        onSmartTablePage.updateAgeByFirstName('Priscilla', '32');
        onSmartTablePage.deleteRowByIndex(1);
    });
});
