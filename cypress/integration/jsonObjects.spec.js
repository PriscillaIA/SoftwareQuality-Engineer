/// <reference types="cypress" />

describe('JSON objects', () => {

    it('JSON objects', () => {
        cy.openHomePage();

        const simpleObject = {"key": "value", "key2": "value2"};

        const simpleArrayOfValues = ["one", "two", "three"];

        const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}];
        
        const typeOfData = {"string": "This is a string", "number": 10};

        const mixObject ={
            "FirstName": "Priscilla",
            "LastName": "Perez",
            "Age": 25,
            "Students": [
                {
                    "firstName": "Carol",
                    "lastName": "Garcia",
                },
                {
                    "firstName": "Bruce",
                    "lastName": "Willis",   
                }
            ]
        }

        console.log(simpleObject.key)
        console.log(simpleObject["key"])
        console.log(simpleArrayOfValues[0])
        console.log(simpleArrayOfValues[1])
        console.log(arrayOfObjects[2].key)
        console.log(mixObject.Students[0].firstName)

        //how to take the value of json and use how we want

        const lastNameOfSecondStudent = mixObject.Students[1].LastName
        const textOfString = typeOfData.string
        cy.log(textOfString)
    })


});