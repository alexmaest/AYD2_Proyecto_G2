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
    async updateProfile(req, res) {
        try {

            //primero verificar que tanto el nombre como email no EXISTAN previamente en otro usuario distinto en RetroMusic
            
            //console.log("::::::::::::::")
            //console.log(req.body)


            var userByEmail = false
            //valido si el flag de correo esta ACTIVO (si el usuario en frontend cambio el correo)
            if(req.body.flagEmail){
                userByEmail = await userModel.getUserByEmail(req.body.email);

            }

            var userByUsername = false
            //valido si el flag de correo esta ACTIVO (si el usuario en frontend cambio el correo)
            if(req.body.flagUsername){
                userByUsername = await userModel.getUserByUsername(req.body.username);

            }

            //console.log("- - - ")
            //console.log(userByEmail)
            //console.log(userByUsername)

            if (userByEmail) {
                res.status(501).send('Account with that email already exist');
            } else {
                if (userByUsername) {
                    res.status(502).send('Account with that username already exist');
                } else {

                    //guardar la imagen en bucket -> db
                    //console.log(":::::::::::::::::::::::::")
                    //console.log(req.body)

                    console.log(req.body.password)
                    const hash = await userModel.createUserHashedPassword(req.body.password);
                    req.body.password = hash

                    console.log("- - - - - - - - -")
                    console.log(req.body.password)

                    
                    //FORMA BUCKET
                
                    //PASO 1: guardar en bucket
                    const banner = await userController.uploadImage(req.body.image)
                    if (banner === null) {
                        res.status(401).send('Error')

                    } else {
                        //PASO 2: ahora guardar en db + la info cambiada
                        const bannerCreator = await artistModel.updateArtistInfo(banner, req.body)
                        if (bannerCreator === null) {
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
}

module.exports = new artistController();