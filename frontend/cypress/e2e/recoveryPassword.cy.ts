describe('fill recovery password form and set one new', () => {

  

  //todo bien(correo existe en RetroMusic, token valido y password con el formato requerido correcto)
  it('passes, email exist, token is valid, new password format is correct', () => {
    // login view
    cy.visit('http://localhost:3000/login')

    //nos vamos a recuperacion de password desde el login
    cy.get('[data-testid="cypress-recoveryPassword-Button"]').click();

    // recovery password fill data ------------------------------

    //primero chequeamos que existe el input donde apelamos por nuestro cambio de password
    cy.get('[data-testid="cypress-email-recovery"]').should("exist")

    //agrego el correo que desea cambiar su password porq la olvido
    cy.get('[data-testid="cypress-email-recovery"]').type("javieralfarogt2@gmail.com")
    
    //una vez ingresado le damos al boton de send, para que nos envien un token y podamos cambiar el password
    cy.get('[data-testid="cypress-recoveryPassword-SendButton"]').click();

    // token response wait
    cy.wait(3000)

    // ahora seteamos la nueva password y agegamos el token que recibimos por correo
    cy.get('[data-testid="cypress-password"]').type("12345678")
    cy.get('[data-testid="cypress-token"]').type("HRF82WV95E")//esto cambia cada vez TuT

    cy.get('[data-testid="cypress-recoveryPassword-ChangeButton"]').click();

    // change password response wait
    cy.wait(3000)

  })


// error en la nueva password (correo existe en RetroMusic, token valido y password no cuenta con el formato requerido)
  it('not passes, password to short', () => {
    // login view
    cy.visit('http://localhost:3000/login')

    //nos vamos a recuperacion de password desde el login
    cy.get('[data-testid="cypress-recoveryPassword-Button"]').click();

    // recovery password fill data ------------------------------

    //primero chequeamos que existe el input donde apelamos por nuestro cambio de password
    cy.get('[data-testid="cypress-email-recovery"]').should("exist")

    //agrego el correo que desea cambiar su password porq la olvido
    cy.get('[data-testid="cypress-email-recovery"]').type("javieralfarogt2@gmail.com")
    
    //una vez ingresado le damos al boton de send, para que nos envien un token y podamos cambiar el password
    cy.get('[data-testid="cypress-recoveryPassword-SendButton"]').click();

    // token response wait
    cy.wait(3000)

    // ahora seteamos la nueva password y agegamos el token que recibimos por correo
    cy.get('[data-testid="cypress-password"]').type("123")
    cy.get('[data-testid="cypress-token"]').type("HRF82WV95E") //esto cambia cada vez TuT

    cy.get('[data-testid="cypress-recoveryPassword-ChangeButton"]').click();

    // change password response wait
    cy.wait(3000)

  })


  //error en el token(correo existe en RetroMusic, token invalido y password con el formato requerido correcto)
  it('not passes, token invalid', () => {
    // login view
    cy.visit('http://localhost:3000/login')

    //nos vamos a recuperacion de password desde el login
    cy.get('[data-testid="cypress-recoveryPassword-Button"]').click();

    // recovery password fill data ------------------------------

    //primero chequeamos que existe el input donde apelamos por nuestro cambio de password
    cy.get('[data-testid="cypress-email-recovery"]').should("exist")

    //agrego el correo que desea cambiar su password porq la olvido
    cy.get('[data-testid="cypress-email-recovery"]').type("javieralfarogt2@gmail.com")
    
    //una vez ingresado le damos al boton de send, para que nos envien un token y podamos cambiar el password
    cy.get('[data-testid="cypress-recoveryPassword-SendButton"]').click();

    // token response wait
    cy.wait(3000)

    // ahora seteamos la nueva password y agegamos el token que recibimos por correo
    cy.get('[data-testid="cypress-password"]').type("12345678")
    cy.get('[data-testid="cypress-token"]').type("FFFFFFFFFF")

    cy.get('[data-testid="cypress-recoveryPassword-ChangeButton"]').click();

    // change password response wait
    cy.wait(3000)

  })


  //error en el correo(correo no existe en RetroMusic y por ende no se puede cambiar el password, en el servicio)
  it('not passes, email invalid (dont exist in RetroMusic)', () => {
    // login view
    cy.visit('http://localhost:3000/login')

    //nos vamos a recuperacion de password desde el login
    cy.get('[data-testid="cypress-recoveryPassword-Button"]').click();

    // recovery password fill data ------------------------------

    //primero chequeamos que existe el input donde apelamos por nuestro cambio de password
    cy.get('[data-testid="cypress-email-recovery"]').should("exist")

    //agrego el correo que desea cambiar su password porq la olvido
    cy.get('[data-testid="cypress-email-recovery"]').type("javierAlfarogt777@gmail.com")
    cy.wait(5000)
    
    //una vez ingresado le damos al boton de send, para que nos envien un token y podamos cambiar el password
    cy.get('[data-testid="cypress-recoveryPassword-SendButton"]').click();

  })


})