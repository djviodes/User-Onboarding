describe("Testing our form inputs", () => {
    beforeEach(function() {
        cy.visit("http://localhost:3000")
    });
    it("Input Name into the Name input", () => {
        cy.get('[data-cy=name]').type("David Viodes").should("have.value", "David Viodes");
    });
    it("Input Email into the Email input", () => {
        cy.get('[data-cy=email]').type("djviodes26@gmail.com");
    });
    it("Input Password into the Password input", () => {
        cy.get('[data-cy=password]').type("passw0rd");
    });
    it("Check the Terms of Service Box", () => {
        cy.get('[data-cy=terms]').check();
    });
    it("Submit the Form", () => {
        cy.get('form').submit();
    });
});