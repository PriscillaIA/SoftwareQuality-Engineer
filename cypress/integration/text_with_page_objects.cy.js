/// <reference types="cypress" />

const { navigationTo } = require("../support/page_objects/navigation_page");

describe('Test with Page Objects', () => {

    beforeEach('Open application', () => {
        cy.visit('/');
    });

    it('Verify navigation across the pagees', () => {
        navigationTo.formLayoutPage();
        navigationTo.datepickerPage();
        navigationTo.toastPage();
        navigationTo.tooltipPage();
        navigationTo.smartTablePage();
        navigationTo.treeGridPage();
    });
});