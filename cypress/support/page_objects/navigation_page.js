
function selectGroupMenuItem(groupName){
    cy.contains('a',groupName).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
                    if(attr.includes('left')){
                        cy.wrap(menu).click();
            }
        });
    });        
}

export class NavigationPage{
    
    formLayoutPage(){
        selectGroupMenuItem('Form')
        cy.contains('Form Layouts').click();
    }

    datepickerPage(){
        selectGroupMenuItem('Form')
        cy.contains('Datepicker').click();
    }

    toastPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click();
    }

    tooltipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click();
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click();
    }

    treeGridPage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Tree Grid').click();
    }

}

export const navigationTo = new NavigationPage();

