describe('Limited plays', () => {
    it('passes', () => {
      // login view
      cy.visit('http://localhost:3000/login')

      // login as user
      cy.get('[data-testid="cypress-email"]').type("usuario@retromusic.com")
      cy.get('[data-testid="cypress-password"]').type("password")
      cy.get('[data-testid="cypress-logIn-Button"]').click();
      
      // login response wait
      cy.wait(1000)

      cy.get('[data-testid="cypress-song-1"]').click();    

      cy.on('window:alert',(t)=>{
        //assertions
        expect(t).to.contains('You have reached your limit of songs for today');
     })
    })
})