const creatorModel = require('../models/creatorModel');
const filesController = require('./filesController')
require('dotenv').config();

class CreatorController { //FG
    constructor() { }

    async updateBanner(req,res) {
        try{
            const banner = await filesController.uploadImage(req.body.image)
            if (banner === null){
                res.status(401).send('Error')
            }else{
                const bannerCreator = await creatorModel.updateBanner(banner,req.body.userId)
                console.log("bannerCreator")
                console.log(bannerCreator   )
            }
        } catch(err){
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async getBanner(req,res){
        try{
            const banner = await creatorModel.getBanner(req.params.userId)
            if(banner === null){
                res.status(401).send('Invalid user');                    
            }else{
                res.status(200).send(banner)
            }
        }catch(err){
            console.log(err)
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new CreatorController();