describe("Application E2E", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/products").as("getProducts");
    cy.visit("/");
    cy.wait("@getProducts");
  });

  context("Products View", () => {
    it("1. Loads main page", () => {
      cy.get("h1").should("contain.text", "Produkty");
    });

    it("2. Downloads and displays products list", () => {
      cy.get("button")
        .contains("Dodaj do koszyka")
        .should("have.length.at.least", 1);
      cy.get("span").contains("PLN").should("be.visible");
    });

    it("3. Navigation should link to the Cart", () => {
      cy.get('a[href="/cart"]').should("exist").and("be.visible");
    });

    it("4. Should add product to Cart", () => {
      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/cart"]').should("exist");
    });

    it("5. Navigation links correctly", () => {
      cy.get('a[href="/payments"]').click();
      cy.url().should("include", "/payments");
      cy.get("h1").should("contain.text", "Płatności");
      cy.get('a[href="/"]').click();
      cy.url().should("include", "/");
    });
  });

  context("Cart View", () => {
    it("6. Displays message when cart is empty", () => {
      cy.get('a[href="/cart"]').click();
      cy.get("h1").should("contain.text", "Twój koszyk");
      cy.get("p").should("contain.text", "Koszyk jest pusty");
    });

    it("7. Displays product after it is added to the cart", () => {
      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/cart"]').click();

      cy.get("button").contains("Usuń z koszyka").should("be.visible");
      cy.get("span").contains("szt.").should("be.visible");
    });

    it('8. Button "Usuń wszystkie przedmioty z koszyka" clears the cart', () => {
      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/cart"]').click();

      cy.get("button").contains("Usuń wszystkie przedmioty z koszyka").click();
      cy.get("p").should("contain.text", "Koszyk jest pusty");
      cy.contains("button", "Usuń wszystkie przedmioty z koszyka").should(
        "not.exist",
      );
    });

    it('9. Button "Usuń z koszyka" removes product from cart', () => {
      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/cart"]').click();

      cy.get("button").contains("Usuń z koszyka").click();
      cy.get("p").should("contain.text", "Koszyk jest pusty");
    });

    it('10. Button "Przejdź do płatności" is visible when cart is not empty', () => {
      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/cart"]').click();

      cy.get("button")
        .contains("Przejdź do płatności")
        .should("exist")
        .and("be.visible");
    });

    it('11. Button "Przejdź do płatności" does not exist for empty cart', () => {
      cy.get('a[href="/cart"]').click();
      cy.contains("button", "Przejdź do płatności").should("not.exist");
    });

    it("12. Adding 3 identical products merges them into one item", () => {
      cy.get("button")
        .contains("Dodaj do koszyka")
        .first()
        .click()
        .click()
        .click();
      cy.get('a[href="/cart"]').click();

      cy.get("button").contains("Usuń z koszyka").should("have.length", 1);
      cy.get("span").contains("3 szt.").should("be.visible");
    });

    it('13. Button "Przejdź do płatności" navigates to payments page', () => {
      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/cart"]').click();

      cy.get("button").contains("Przejdź do płatności").click();
      cy.url().should("include", "/payments");
      cy.get("h1").should("contain.text", "Płatności");
    });
  });

  context("Payments View", () => {
    it("14. BLocks payment if cart is empty", () => {
      cy.get('a[href="/payments"]').click();
      cy.get("p").should("contain.text", "Nie masz nic w koszyku.");
      cy.contains("button", "Zapłać").should("not.exist");
    });

    it("15. Displays correct total amount", () => {
      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/payments"]').click();

      cy.get("p").should("contain.text", "Należność:");
      cy.get("p").should("contain.text", "PLN");
      cy.get("button").contains("Zapłać").should("be.visible");
    });

    it("16. Simulates payment", () => {
      cy.intercept("POST", "**/api/payments", {
        statusCode: 200,
        body: { success: true },
      }).as("paymentRequest");

      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/payments"]').click();

      cy.get("button").contains("Zapłać").click();
      cy.wait("@paymentRequest").then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          "Płatność została zrealizowana",
        );
      });

      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("17. Cart is emptied if payment succeeds", () => {
      cy.intercept("POST", "**/api/payments", {
        statusCode: 200,
        body: { success: true },
      });

      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/payments"]').click();
      cy.get("button").contains("Zapłać").click();

      cy.get('a[href="/cart"]').click();
      cy.get("p").should("contain.text", "Koszyk jest pusty");
      cy.contains("button", "Usuń z koszyka").should("not.exist");
    });

    it("18. Cart is not emptied if payment error was encountered", () => {
      cy.intercept("POST", "**/api/payments", { statusCode: 400 });

      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/payments"]').click();
      cy.get("button").contains("Zapłać").click();

      cy.url().should("include", "/payments");
      cy.get("p").should("contain.text", "Należność:");
    });

    it('19. Button "Zapłać" does not disappear after payment fail', () => {
      cy.intercept("POST", "**/api/payments", { statusCode: 400 });

      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/payments"]').click();
      cy.get("button").contains("Zapłać").click();

      cy.get("button").contains("Zapłać").should("exist").and("be.visible");
    });

    it("20. Complete workflow works properly", () => {
      cy.get("button").contains("Dodaj do koszyka").first().click();
      cy.get('a[href="/cart"]').click();
      cy.get("button").contains("Przejdź do płatności").click();

      cy.url().should("include", "/payments");
      cy.get("p").should("contain.text", "Należność:");
      cy.get("button").contains("Zapłać").should("be.visible");
    });
  });
});
