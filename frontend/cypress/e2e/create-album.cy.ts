import { apiUrls, baseUrl } from '@/constants/urls'
import 'cypress-file-upload'

describe('create album spec', () => {
  it('create single', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-email"]').type("artista1@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("password")
    cy.get('[data-testid="cypress-logIn-Button"]').click();

    cy.wait(1000)
      
    cy.visit('http://localhost:3000/artist/create-album')
    
    cy.get('[data-testid="cypress-album-name"]').type("Album de prueba")
    
    const filePath = './resources/banner.jpg';
    cy.get('[data-testid="cypress-file"]').attachFile(filePath);

    cy.get('[data-testid="cypress-album-cover"]').should('exist')
    
    cy.get('[data-testid="cypress-song-0"]').click()

    cy.intercept('POST', baseUrl + apiUrls.artist.createAlbum).as('createAlbum')

    cy.get('[data-testid="cypress-album-create"]').click()

    cy.wait('@createAlbum').its('response.statusCode').should('eq', 200)

  })

  it('create album', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-email"]').type("artista1@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("password")
    cy.get('[data-testid="cypress-logIn-Button"]').click();

    cy.wait(1000)
      
    cy.visit('http://localhost:3000/artist/create-album')
    
    cy.get('[data-testid="cypress-album-name"]').type("Album de prueba")
    
    const filePath = './resources/banner.jpg';
    cy.get('[data-testid="cypress-file"]').attachFile(filePath);

    cy.get('[data-testid="cypress-album-cover"]').should('exist')
    
    cy.get('[data-testid="cypress-song-0"]').click()
    cy.get('[data-testid="cypress-song-1"]').click()
    cy.get('[data-testid="cypress-song-2"]').click()
    cy.get('[data-testid="cypress-song-3"]').click()

    cy.intercept('POST', baseUrl + apiUrls.artist.createAlbum).as('createAlbum')

    cy.get('[data-testid="cypress-album-create"]').click()

    cy.wait('@createAlbum').its('response.statusCode').should('eq', 200)

  })

  

})