const artistModel = require('../models/artistModel');
const userModel = require('../models/userModel');
const {logEventsWrite} = require('../Helpers/logEvents');//logs

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
                logEventsWrite(req.originalUrl,req.method,"nuevo usuario artista","Account with that email already exist",3)//log
                res.status(501).send('Account with that email already exist');
            } else {
                const userByUsername = await userModel.getUserByUsername(artist.username);
                if (userByUsername) {
                    logEventsWrite(req.originalUrl,req.method,"nuevo usuario artista","Account with that username already exist",3)//log
                    res.status(502).send('Account with that username already exist');
                } else {
                    const userAdded = await artistModel.saveArtist(artist);
                    if (userAdded) {
                        logEventsWrite(req.originalUrl,req.method,"nuevo usuario artista","Account created",3)//log
                        res.status(200).send('Account created');
                    } else {
                        logEventsWrite(req.originalUrl,req.method,"nuevo usuario artista","Failed artist account creation",3)//log
                        res.status(503).send('Failed artist account creation');
                    }
                }
            }
        } catch (err) {
            console.error(err);
            logEventsWrite(req.originalUrl,req.method,"nuevo usuario","Internal Server Error",3)//log
            res.status(500).send('Internal Server Error');
        }
    }

    async userFreeRegister(req, res) {
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
            const user = { username: username, password: hash, email: email, birthday: birthday, gender: genderMapping[gender] };

            const userByEmail = await userModel.getUserByEmail(user.email);
            if (userByEmail) {
                logEventsWrite(req.originalUrl,req.method,"nuevo usuario","Account with that email already exist",3)//log
                res.status(501).send('Account with that email already exist');
            } else {
                const userByUsername = await userModel.getUserByUsername(user.username);
                if (userByUsername) {
                    logEventsWrite(req.originalUrl,req.method,"nuevo usuario","Account with that username already exist",3)//log
                    res.status(502).send('Account with that username already exist');
                } else {
                    const userAdded = await userModel.saveFreeUser(user);
                    if (userAdded) {
                        logEventsWrite(req.originalUrl,req.method,"nuevo usuario","Account created",3)//log
                        res.status(200).send('Account created');
                    } else {
                        logEventsWrite(req.originalUrl,req.method,"nuevo usuario","Failed artist account creation",3)//log
                        res.status(503).send('Failed artist account creation');
                    }
                }
            }
        } catch (err) {
            console.error(err);
            logEventsWrite(req.originalUrl,req.method,"nuevo usuario","Internal Server Error",3)//log
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new registerController();