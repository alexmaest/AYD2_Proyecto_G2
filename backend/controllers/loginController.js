const user = require('../models/userModel');

class LoginController {//JA
    constructor() { }

    //JA
    async usersLogin(req, res) {
        try {
            const users = await user.getUserByCredentials(req.body.id,req.body.tipo);
            res.status(200).json(users);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new LoginController();