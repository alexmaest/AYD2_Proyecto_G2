const userModel = require('../models/userModel');

class registerController {
    constructor() { }

    async artistRegister(req, res) {
        try {
            const { email, password, username, birthday, gender } = req.body;
            console.log(email, password, username, birthday, gender);
            const userByEmail = await userModel.getUserByEmail(email);
            if (userByEmail) {
                res.status(501).send('Account with that email already exist');
            } else {
                const userByUsername = await userModel.getUserByUsername(username);
                if (userByUsername) {
                    res.status(502).send('Account with that username already exist');
                } else {
                    console.log("Usuario creado");
                    res.status(200).send('Account created');
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new registerController();