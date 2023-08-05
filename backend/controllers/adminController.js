const artist = require('../models/artistModel');

class adminController {
    constructor() {}

    async artists(req, res) {
        try {
            const allArtists = await artist.getAllArtists();//modulo admin visualice a todos los CC
            res.status(200).json(allArtists);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new adminController();
