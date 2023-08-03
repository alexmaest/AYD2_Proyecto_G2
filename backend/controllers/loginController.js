const { ContentCreator } = require('../models/contentCreator');

class LoginController {//JA
    constructor() { }

    login(req, res) {

        console.log("------- login -------")
        console.log(req.body)
        console.log("---------------------")

        /*
        const jsonData = req.body;
        const email = JSON.parse(jsonData).Email;
        const password = JSON.parse(jsonData).Password;
        console.log("correo: "+email+" password: "+password);*/

        

        /* // nomas tenga la BD <<descomentar>>

        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM UsersContentCreator WHERE email='${req.body.Email}' and password='${req.body.Password}';`;
            db.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    //si quito el map entonces debo de usar results.id, results.email etc
                    const usersCC = results.map((user) => new ContentCreator(user.id, user.name, user.dateBirth, user.email, user.password, user.photo));
                    resolve(usersCC);
                }
            });
        });*/

        res.send({ "message": "todo bien!" })
    }
}

module.exports = new LoginController();