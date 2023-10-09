describe('fill register form', () => {
  it('user passes', () => {
    // User register view
    cy.visit('http://localhost:3000/register/user/')

    // data entry
    cy.get('[data-testid="cypress-email"]').type("cypress@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("password")
    cy.get('[data-testid="cypress-username"]').type("cypress")
    cy.get('[data-testid="cypress-day"]').type("01")
    cy.get('[data-testid="cypress-month"]').select("February")
    cy.get('[data-testid="cypress-year"]').type("1990")
    cy.get('[data-testid="cypress-Other"]').check()

    // data validations
    cy.get('[data-testid="cypress-email"]').should('have.value', "cypress@retromusic.com")
    cy.get('[data-testid="cypress-password"]').should('have.value', "password")
    cy.get('[data-testid="cypress-username"]').should('have.value', "cypress")
    cy.get('[data-testid="cypress-day"]').should('have.value', "01")
    cy.get('[data-testid="cypress-month"]').should('have.value', "February")
    cy.get('[data-testid="cypress-year"]').should('have.value', "1990")
    cy.get('[data-testid="cypress-Other"]').should('be.checked');

    // submit
    cy.get('[data-testid="cypress-signUp-Button"]').click();

    // submit response wait
    cy.wait(1000)
  })

  it('user not passes', () => {
    // User register view
    cy.visit('http://localhost:3000/register/user/')

    // data entry
    cy.get('[data-testid="cypress-email"]').type("cypress")
    cy.get('[data-testid="cypress-password"]').type("123")
    cy.get('[data-testid="cypress-username"]').type("c")
    cy.get('[data-testid="cypress-day"]').type("99")
    cy.get('[data-testid="cypress-month"]').select("February")
    cy.get('[data-testid="cypress-year"]').type("9999")
    
    // data validations
    cy.get('[data-testid="cypress-email"]').should('have.value', "cypress")
    cy.get('[data-testid="cypress-password"]').should('have.value', "123")
    cy.get('[data-testid="cypress-username"]').should('have.value', "c")
    cy.get('[data-testid="cypress-day"]').should('have.value', "99")
    cy.get('[data-testid="cypress-month"]').should('have.value', "February")
    cy.get('[data-testid="cypress-year"]').should('have.value', "9999")

    // submit
    cy.get('[data-testid="cypress-signUp-Button"]').click();

    // submit response wait
    cy.wait(1000)
  })

  it('artist not passes', () => {
    // Artist register view
    cy.visit('http://localhost:3000/register/')

    // data entry
    cy.get('[data-testid="cypress-email"]').type("cypressartist@retromusic.com")
    cy.get('[data-testid="cypress-password"]').type("password")
    cy.get('[data-testid="cypress-username"]').type("cypressartist")
    cy.get('[data-testid="cypress-day"]').type("01")
    cy.get('[data-testid="cypress-month"]').select("February")
    cy.get('[data-testid="cypress-year"]').type("1990")
    cy.get('[data-testid="cypress-Other"]').check()

    // data validations
    cy.get('[data-testid="cypress-email"]').should('have.value', "cypressartist@retromusic.com")
    cy.get('[data-testid="cypress-password"]').should('have.value', "password")
    cy.get('[data-testid="cypress-username"]').should('have.value', "cypressartist")
    cy.get('[data-testid="cypress-day"]').should('have.value', "01")
    cy.get('[data-testid="cypress-month"]').should('have.value', "February")
    cy.get('[data-testid="cypress-year"]').should('have.value', "1990")
    cy.get('[data-testid="cypress-Other"]').should('be.checked');

    // submit
    cy.get('[data-testid="cypress-signUp-Button"]').click();

    // submit response wait
    cy.wait(1000)
  })

  it('artist not passes', () => {
    // Artist register view
    cy.visit('http://localhost:3000/register/')

    // data entry
    cy.get('[data-testid="cypress-email"]').type("cypress")
    cy.get('[data-testid="cypress-password"]').type("123")
    cy.get('[data-testid="cypress-username"]').type("c")
    cy.get('[data-testid="cypress-day"]').type("99")
    cy.get('[data-testid="cypress-month"]').select("February")
    cy.get('[data-testid="cypress-year"]').type("9999")
    
    // data validations
    cy.get('[data-testid="cypress-email"]').should('have.value', "cypress")
    cy.get('[data-testid="cypress-password"]').should('have.value', "123")
    cy.get('[data-testid="cypress-username"]').should('have.value', "c")
    cy.get('[data-testid="cypress-day"]').should('have.value', "99")
    cy.get('[data-testid="cypress-month"]').should('have.value', "February")
    cy.get('[data-testid="cypress-year"]').should('have.value', "9999")

    // submit
    cy.get('[data-testid="cypress-signUp-Button"]').click();

    // submit response wait
    cy.wait(1000)
  })
})