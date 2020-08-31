/// <reference types="cypress" />

context("ForntEnd Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("Login ", () => {
    // https://on.cypress.io/type
    cy.get("input[name=username]").type("admin");
    cy.get("input[name=password]").type("eyJ0eXAiOiJKV1QiLCJhbGciOi");
    cy.get(".v-btn--block").click();
  });
});

context("Backend Test", () => {
  it("Login Success", () => {
    cy.request("POST", "http://localhost:3000/API/authentication", {
      username: "admin",
      password: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
    }).then((response) => {
      // https://on.cypress.io/assertions
      expect(response).property("status").to.equal(200);
      expect(response).property("body").to.have.property("token").to.not.be
        .empty;
      expect(response).to.include.keys("headers", "duration");
    });
  });

  it("Login Faild", () => {
    cy.request("POST", "http://localhost:3000/API/authentication", {
      username: "123",
      password: "123",
    }).then((response) => {
      // https://on.cypress.io/assertions
      expect(response).property("status").to.equal(200);
      expect(response)
        .property("body")
        .to.have.property("mensaje")
        .to.equal("Usuario o contraseña incorrectos");
      expect(response).to.include.keys("headers", "duration");
    });
  });
});
