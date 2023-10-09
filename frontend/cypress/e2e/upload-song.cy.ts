describe('upload song spec', () => {
  it('renders default components', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-email"]').type("artista1@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("password")
    cy.get('[data-testid="cypress-logIn-Button"]').click();

    cy.wait(1000)
      
    cy.visit('http://localhost:3000/artist/upload')
    cy.get('audio').should('not.exist')
    cy.get('h2').should('contain', 'Track Upload')
  })

  it('upload song', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="cypress-email"]').type("artista1@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("password")
    cy.get('[data-testid="cypress-logIn-Button"]').click();

    cy.wait(1000)
      
    cy.visit('http://localhost:3000/artist/upload')

    const filePath = 'cypress/fixtures/resources/track.mp3';
    cy.get('form').within(() => {
      cy.get('input[type="file"]').selectFile(filePath, { force: true });
      cy.get('input[id="name"]').type('test song')
      cy.get('p').should('contain', 'Duration: 3:55')
      cy.get('input[id="genre"]').type('test genre')
      cy.get('button').click()
      cy.wait(1000)
    })
  })
})