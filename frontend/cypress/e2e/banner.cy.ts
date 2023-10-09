import 'cypress-file-upload'

describe('fill banner form', () => {
    it('passes', () => {
      // login view
      cy.visit('http://localhost:3000/login')

      // login form fill data
      cy.get('[data-testid="cypress-email"]').type("artista1@retromusic.com")
      cy.get('[data-testid="cypress-password"]').type("password")
      cy.get('[data-testid="cypress-logIn-Button"]').click();
      
      // login response wait
      cy.wait(1000)
      
      // banner upload view
      cy.visit('http://localhost:3000/artist/profile/banner')
  
      // data entry
      const filePath = './resources/banner.jpg';
      cy.get('[data-testid="cypress-file"]').attachFile(filePath);

      // submit
      cy.get('[data-testid="cypress-upload-button"]').click();
      
      // Upload response wait
      cy.wait(1000)
    })
    
    it('not passes', () => {
        // login view
        cy.visit('http://localhost:3000/login')
  
        // login form fill data
        cy.get('[data-testid="cypress-email"]').type("artista1@retromusic.com")
        cy.get('[data-testid="cypress-password"]').type("password")
        cy.get('[data-testid="cypress-logIn-Button"]').click();
        
        // login response wait
        cy.wait(1000)
        
        // banner upload view
        cy.visit('http://localhost:3000/artist/profile/banner')
    
        // data entry
        const filePath = './resources/banner.txt';
        cy.get('[data-testid="cypress-file"]').attachFile(filePath);
  
        // submit
        cy.get('[data-testid="cypress-upload-button"]').click();

        // Upload response wait
        cy.wait(1000)
      })
  })