import 'cypress-file-upload'

describe('delete an album', () => {
    it('passes', () => {
      // login view
      cy.visit('http://localhost:3000/login')

      // login form fill data
      cy.get('[data-testid="cypress-email"]').type("artista1@retromusic.com")
      cy.get('[data-testid="cypress-password"]').type("password")
      cy.get('[data-testid="cypress-logIn-Button"]').click();
      
      // login response wait
      cy.wait(1000)

      cy.visit('http://localhost:3000/artist/albums')
      cy.get('[data-testid="cypress-delete-album-2"]').click();
    })
})