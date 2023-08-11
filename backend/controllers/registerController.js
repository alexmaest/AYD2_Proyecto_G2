const artistModel = require('../models/artistModel');
const userModel = require('../models/userModel');

class registerController {
    constructor() { }

    async artistRegister(req, res) {
        try {
            const { email, password, username, birthday, gender } = req.body;
            const genderMapping = {
                'Male': 1,
                'Female': 2,
                'Non-binary': 3,
                'Other': 4,
                'Prefer not to say': 5
            };
            const hash = await userModel.createUserHashedPassword(password);
            const artist = { username: username, password: hash, email: email, birthday: birthday, gender: genderMapping[gender] };

            const userByEmail = await userModel.getUserByEmail(artist.email);
            if (userByEmail) {
                res.status(501).send('Account with that email already exist');
            } else {
                const userByUsername = await userModel.getUserByUsername(artist.username);
                if (userByUsername) {
                    res.status(502).send('Account with that username already exist');
                } else {
                    const userAdded = await artistModel.saveArtist(artist);
                    if (userAdded) {
                        res.status(200).send('Account created');
                    } else {
                        res.status(503).send('Failed artist account creation');
                    }
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new registerController();