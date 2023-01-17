describe("create user spec", () => {
    before(() => {
        // this will launch the page in cypress browser
        cy.visit("http://localhost:8081/register");
    });

    // 1. Create a user scenario
    it("successfully create a user", () => {
        
        cy.get("input[name=name]").type("Humayun Kabir");
        cy.get("input[name=email]").type("Humayun@mail.com");
        cy.get("input[name=password]").type("12345678");
        cy.get("input[name=passwordConfirm]").type("12345678");

        // submit button
        cy.get("button[type=submit]").click();
        cy.contains("Your account has been created");       
       
    }); 

})