const artistModel = require('../models/artistModel');
const userController = require('./userController')
const userModel = require('../models/userModel');
require('dotenv').config();
const {logEventsWrite} = require('../Helpers/logEvents');//logs

class artistController { //FG
    constructor() { }

    async updateBanner(req, res) {
        try {
            const banner = await userController.uploadImage(req.body.image)
            if (banner === null) {
                res.status(401).send('Error')
                logEventsWrite(req.originalUrl,req.method,"creador contenido","Error banner is null",3)//log
            } else {
                const bannerCreator = await artistModel.updateArtistBanner(banner, req.body.userId)
                if (bannerCreator === null) {
                    res.status(401).send('Error')
                    logEventsWrite(req.originalUrl,req.method,"creador contenido","Error bannerCreator is null",3)//log
                } else {
                    res.status(200).send(true)
                    logEventsWrite(req.originalUrl,req.method,"creador contenido","actualizacion de banner correctamente!",3)//log
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            logEventsWrite(req.originalUrl,req.method,"creador contenido","Internal Server Error",3)//log
        }
    }

    async getBanner(req, res) {
        try {
            const banner = await artistModel.getArtistBanner(req.params.userId)
            if (banner === null) {
                res.status(401).send('Invalid user');
                logEventsWrite(req.originalUrl,req.method,"creador contenido","Invalid user",3)//log
            } else {
                res.status(200).send(banner)
                logEventsWrite(req.originalUrl,req.method,"creador contenido","banner enviado correctamente",3)//log
            }
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
            logEventsWrite(req.originalUrl,req.method,"creador contenido","Internal Server Error",3)//log
        }
    }

    //JA
    async updateProfile(req, res) {//metodo que agrega los cambios del perfil de un artista en RetroMusic
        try {

            //primero verificar que tanto el nombre como email no EXISTAN previamente en otro usuario distinto en RetroMusic

            //console.log("::::::::::::::")
            //console.log(req.body)


            var userByEmail = false
            //valido si el flag de correo esta ACTIVO (si el usuario en frontend cambio el correo)
            if (req.body.flagEmail) {
                userByEmail = await userModel.getUserByEmail(req.body.email);

            }

            var userByUsername = false
            //valido si el flag de correo esta ACTIVO (si el usuario en frontend cambio el correo)
            if (req.body.flagUsername) {
                userByUsername = await userModel.getUserByUsername(req.body.username);

            }


            if (userByEmail) {// si el correo ya exite F
                res.status(501).send('Account with that email already exist');
                if (req.originalUrl.includes("user")) {
                    // La URL contiene el extracto "usuario"
                    logEventsWrite(req.originalUrl,req.method,"usuario","Account with that email already exist",3)//log
                  }else{
                    logEventsWrite(req.originalUrl,req.method,"creador contenido","Account with that email already exist",3)//log
                  }

            } else {
                if (userByUsername) {// si el username ya exite F
                    res.status(502).send('Account with that username already exist');
                    if (req.originalUrl.includes("user")) {
                        // La URL contiene el extracto "usuario"
                        logEventsWrite(req.originalUrl,req.method,"usuario","Account with that username already exist",3)//log
                      }else{
                        logEventsWrite(req.originalUrl,req.method,"creador contenido","Account with that username already exist",3)//log
                      }

                    //como username y email son nuevos y validos o son los mismos procedo a actualizar la info
                } else {

                    //console.log(":::::::::::::::::::::::::")
                    //console.log(req.body)
                    //console.log("---password---")
                    //console.log(req.body.password)


                    var passwordNew = false
                    //si el password es nuevo lo hasheo
                    if (req.body.flagPassword) {
                        const hash = await userModel.createUserHashedPassword(req.body.password);
                        req.body.password = hash
                        passwordNew = true
                    }

                    //console.log("- - - - - - - - -hash")
                    //console.log(req.body.password)





                    //PARTE DE LA IMAGEN
                    //guardar la imagen en bucket -> db si agrego imagen sino F
                    //FORMA BUCKET
                    if (req.body.image != null) {// porq me piden una nueva imagen
                        //PASO 1: guardar en bucket
                        const banner = await userController.uploadImage(req.body.image)
                        if (banner === null) {
                            res.status(401).send('Error')
                            if (req.originalUrl.includes("user")) {
                                // La URL contiene el extracto "usuario"
                                logEventsWrite(req.originalUrl,req.method,"usuario","Error banner is null",3)//log
                              }else{
                                logEventsWrite(req.originalUrl,req.method,"creador contenido","Error banner is null",3)//log
                              }
                            //console.log("F en actualizar foto en bucket")

                        } else {// guardo imagen en db
                            //PASO 2: ahora guardar en db + la info cambiada
                            const bannerCreator = await artistModel.updateArtistInfo(banner, req.body, passwordNew)//guardar <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            if (bannerCreator === null) {
                                //console.log("F en actualizar info")
                                res.status(401).send('Error')
                                if (req.originalUrl.includes("user")) {
                                    // La URL contiene el extracto "usuario"
                                    logEventsWrite(req.originalUrl,req.method,"usuario","Error bannerCreator is null",3)//log
                                  }else{
                                    logEventsWrite(req.originalUrl,req.method,"creador contenido","Error bannerCreator is null",3)//log
                                  }
                            } else {
                                res.status(200).send('Account updated!')
                                if (req.originalUrl.includes("user")) {
                                    // La URL contiene el extracto "usuario"
                                    logEventsWrite(req.originalUrl,req.method,"usuario","Account updated!",3)//log
                                  }else{
                                    logEventsWrite(req.originalUrl,req.method,"creador contenido","Account updated!",3)//log
                                  }
                            }
                        }


                        //ME PIDEN UPDATE SIN CAMBIO EN IMAGEN -------------------------------------

                    } else {//guardo sin imagen
                        //console.log("---GUARDO SIN IMAGEN---")
                        const bannerCreator = await artistModel.updateArtistInfo2(req.body, passwordNew)//guardar <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        if (bannerCreator === null) {
                            //console.log("F en actualizar info")
                            res.status(401).send('Error')
                            if (req.originalUrl.includes("user")) {
                                // La URL contiene el extracto "usuario"
                                logEventsWrite(req.originalUrl,req.method,"usuario","Error bannerCreator is null",3)//log
                              }else{
                                logEventsWrite(req.originalUrl,req.method,"creador contenido","Error bannerCreator is null",3)//log
                              }
                        } else {
                            res.status(200).send('Account updated!')
                            if (req.originalUrl.includes("user")) {
                                // La URL contiene el extracto "usuario"
                                logEventsWrite(req.originalUrl,req.method,"usuario","Account updated!",3)//log
                              }else{
                                logEventsWrite(req.originalUrl,req.method,"creador contenido","Account updated!",3)//log
                              }
                        }
                    }


                    /*

                    //modo chafa xd
                    const bannerCreator = await artistModel.updateArtistInfo(req.body.image, req.body)
                    if (bannerCreator === null) {//si fallo F
                        res.status(401).send('Error')
                    } else {
                        res.status(200).send('Account updated!')
                    }*/

                }// else de validacion de nombre y email UNICOS
            }


        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            if (req.originalUrl.includes("user")) {
                // La URL contiene el extracto "usuario"
                logEventsWrite(req.originalUrl,req.method,"usuario","Internal Server Error",3)//log
              }else{
                logEventsWrite(req.originalUrl,req.method,"creador contenido","Internal Server Error",3)//log
              }
        }
    }

    //JA
    async getInfo(req, res) {// para el update de perfil en el apartado de artistas(asi ve la info que agrego en el form)
        try {
            const user = await artistModel.getArtistById(req.body.userId)
            if (user === null) {
                res.status(401).send('Invalid user');
                if (req.originalUrl.includes("user")) {
                    // La URL contiene el extracto "usuario"
                    logEventsWrite(req.originalUrl,req.method,"usuario","Invalid user",3)//log
                  }else{
                    logEventsWrite(req.originalUrl,req.method,"creador contenido","Invalid user",3)//log
                  }
            } else {
                res.status(200).send(user)
                if (req.originalUrl.includes("user")) {
                    // La URL contiene el extracto "usuario"
                    logEventsWrite(req.originalUrl,req.method,"usuario","informacion de usuario enviado correctamente!",3)//log
                  }else{
                    logEventsWrite(req.originalUrl,req.method,"creador contenido","informacion de creador de contenido enviado correctamente!",3)//log
                  }
            }
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
            if (req.originalUrl.includes("user")) {
                // La URL contiene el extracto "usuario"
                logEventsWrite(req.originalUrl,req.method,"usuario","Internal Server Error",3)//log
              }else{
                logEventsWrite(req.originalUrl,req.method,"creador contenido","Internal Server Error",3)//log
              }
        }

    }

    async getAll(req, res) {
        try {
            const artist = await artistModel.getAllArtists();
            if (artist) {
                res.status(200).json(artist);
                logEventsWrite(req.originalUrl,req.method,"usuario","artistas enviados correctamente!",3)//log
            } else {
                res.status(204).json('The artist could not be obtained');
                logEventsWrite(req.originalUrl,req.method,"usuario","The artist could not be obtained",3)//log
            }

        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            logEventsWrite(req.originalUrl,req.method,"usuario","Internal Server Error",3)//log
        }
    }
}

module.exports = new artistController();