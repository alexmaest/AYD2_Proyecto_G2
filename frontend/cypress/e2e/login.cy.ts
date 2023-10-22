describe('Login', () => {
  it('should log in with admin valid credentials', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-email"]').type("admin@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("password")
    cy.get('[data-testid="cypress-logIn-Button"]').click();
    
    cy.wait(1000)

    cy.visit('http://localhost:3000/admin')

    cy.wait(1000)
    cy.get('[data-testid="cypress-artists"]').should('exist')
    .should('have.text', 'Artistas')
  })

  it('should log in with artist valid credentials', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-email"]').type("artista1@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("password")
    cy.get('[data-testid="cypress-logIn-Button"]').click();

    cy.wait(1000)

    cy.visit('http://localhost:3000/artist')

    cy.wait(1000)

    cy.get('[data-testid="cypress-header"]').should('exist')
  })

  it('should log in with user valid credentials', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-email"]').type("usuario@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("password")
    cy.get('[data-testid="cypress-logIn-Button"]').click();

    cy.wait(1000)

    cy.visit('http://localhost:3000/user')

    cy.wait(1000)

    cy.get('[data-testid="cypress-recommendations"]').should('exist')
    .should('have.text', 'Recommendations')
  })

  it('should log in with user invalid credentials', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-email"]').type("usuario@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("passworddd")
    cy.get('[data-testid="cypress-logIn-Button"]').click();

    cy.wait(1000)

    cy.visit('http://localhost:3000/user')

    cy.wait(1000)
  })

})