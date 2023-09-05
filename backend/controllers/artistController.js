const artistModel = require('../models/artistModel');
const userController = require('./userController')
const userModel = require('../models/userModel');
require('dotenv').config();

class artistController { //FG
    constructor() { }

    async updateBanner(req, res) {
        try {
            const banner = await userController.uploadImage(req.body.image)
            if (banner === null) {
                res.status(401).send('Error')
            } else {
                const bannerCreator = await artistModel.updateArtistBanner(banner, req.body.userId)
                if (bannerCreator === null) {
                    res.status(401).send('Error')
                } else {
                    res.status(200).send(true)
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async getBanner(req, res) {
        try {
            const banner = await artistModel.getArtistBanner(req.params.userId)
            if (banner === null) {
                res.status(401).send('Invalid user');
            } else {
                res.status(200).send(banner)
            }
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
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
            } else {
                if (userByUsername) {// si el username ya exite F
                    res.status(502).send('Account with that username already exist');

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
                            //console.log("F en actualizar foto en bucket")

                        } else {// guardo imagen en db
                            //PASO 2: ahora guardar en db + la info cambiada
                            const bannerCreator = await artistModel.updateArtistInfo(banner, req.body, passwordNew)//guardar <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            if (bannerCreator === null) {
                                //console.log("F en actualizar info")
                                res.status(401).send('Error')
                            } else {
                                res.status(200).send('Account updated!')
                            }
                        }


                        //ME PIDEN UPDATE SIN CAMBIO EN IMAGEN -------------------------------------

                    } else {//guardo sin imagen
                        //console.log("---GUARDO SIN IMAGEN---")
                        const bannerCreator = await artistModel.updateArtistInfo2(req.body, passwordNew)//guardar <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        if (bannerCreator === null) {
                            //console.log("F en actualizar info")
                            res.status(401).send('Error')
                        } else {
                            res.status(200).send('Account updated!')
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
        }
    }

    //JA
    async getInfo(req, res) {// para el update de perfil en el apartado de artistas(asi ve la info que agrego en el form)
        try {
            const user = await artistModel.getArtistById(req.body.userId)
            if (user === null) {
                res.status(401).send('Invalid user');
            } else {
                res.status(200).send(user)
            }
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        }

    }

    async getAll(req, res) {
        try {
            const artist = await artistModel.getAllArtists();
            if (artist) {
                res.status(200).json(artist);
            } else {
                res.status(204).json('The artist could not be obtained');
            }

        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new artistController();