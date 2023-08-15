const songModel = require('../models/songModel');
const userController = require('./userController')
require('dotenv').config();

class songController {
    constructor() { }

    async createSong(req, res) {
        try {
            const { artistId, songName, length } = req.body;
            const { filename, path } = req.file;
            const song = await userController.uploadImage(req.body.image)
            console.log(song);
            res.status(200).send(true)
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new songController();