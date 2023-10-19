![Net Image](banner.jpg "Banner | RetroMusic")

# Historias de usuario y pruebas asociadas | Fase 3 <img src="https://media.tenor.com/dHk-LfzHrtwAAAAi/linux-computer.gif" alt="drawing" width="30"/>

---

## Registro de artistas/usuario - HUG2300002/HUG2300003 - versión móvil - Puntos de Historia=8 - Prioridad=Media

Como artista/usuario necesito un apartado para poder registrarme ingresando los datos respectivos para poder crear mi cuenta.

* El sistema debe permitir a los artistas llenar un formulario con sus datos para crear un perfil dentro de la plataforma.

**Prueba asociada E2E**
```
def suma(a, b):
  return a + b

print(suma(1, 2))
```

---
## Recuperación de contraseña de usuarios - HUG2200002 - Puntos de Historia=5 - Prioridad=Baja

Como usuario cliente quiero tener la posibilidad de tener un apartado para poder recuperar mi contraseña en caso de olvidarla.

* Se debe tener un apartado para ingresar el correo electrónico del usuario para comprobar que existe.
* Se debe de poseer en el sistema una notificación por correo al usuario para indicarle el procedimiento para recuperar su contraseña y un formulario para llenar y cambiar la misma.



**Prueba asociada E2E**
```


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
```

<img src="./E2E-javier/cypress-test-7.png"/>
<img src="./E2E-javier/cypress-test-6.png" />

---

```
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

```

<img src="./E2E-javier/cypress-test-mala 1 password short new version xd - 3.png"/>
<img src="./E2E-javier/cypress-test-mala 1 password short new version xd.png" />

---

```

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

```

<img src="./E2E-javier/cypress-test-mala 1 invalid token alfa.png"/>
<img src="./E2E-javier/cypress-test-mala 1 invalid token.png" />

---

```

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
```

<img src="./E2E-javier/cypress-test-mala 4 invalid email NEW 4.png"/>
<img src="./E2E-javier/cypress-test-mala 4 invalid email NEW 2.png" />

---

## Sistema de login - HUG210001 - Puntos de Historia=8 - Prioridad=Alta

Como usuario, deseo poder iniciar sesión en mi cuenta personal para así acceder a mi contenido personal y servicios dentro del sistema.


* Se debe de tener un apartado para ingresar mi nombre de usuario y contraseña de manera segura. 
* Se debe de poseer un sistema el cual permita el poder recibir un mensaje de confirmación o de error si el nombre de usuario o la contraseña son incorrectos.



**Prueba asociada E2E**
```
def suma(a, b):
  return a + b

print(suma(1, 2))
```
---

## Actualización del banner de un creador de contenido-HUG230004 - Puntos de Historia=8 - Prioridad= Media

Como usuario creador de contenido de la plataforma deseo subir o actualizar la imagen del banner en mi perfil.


* El usuario creador de contenido debe ser capaz de ingresar a su perfil, seleccionar la opción para subir un banner y actualizarlo.

**Prueba asociada E2E**
```
def suma(a, b):
  return a + b

print(suma(1, 2))
```
---
## Subir música en vista catálogo-HUG240004 - Puntos de Historia=20 Prioridad = Alta

Como artista necesito un apartado para poder registrarme ingresando los datos respectivos para poder crear mi cuenta.

* El sistema debe permitir a los artistas llenar un formulario con sus datos para crear un perfil dentro de la plataforma.

**Prueba asociada E2E**
```
def suma(a, b):
  return a + b

print(suma(1, 2))
```
---
## Crear álbumes en el perfil del creador de contenido - HUG200003 - Puntos de Historia=20 - Prioridad=Alta

Como creador de contenido quiero tener la posibilidad de crear álbumes para agrupar mis canciones o serie de podcast.

* Se debe tener un apartado para crear un álbum, ingresando el nombre, fecha de lanzamiento, poder seleccionar una imagen de portada para el álbum y seleccionar las canciones o podcast que pertenecen al mismo.


**Prueba asociada E2E**
```
def suma(a, b):
  return a + b

print(suma(1, 2))
```