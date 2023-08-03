const { ContentCreator } = require('../models/contentCreator');

class LoginController {//JA
    constructor() { }

    login(req, res) {

        console.log("------- login -------")
        console.log(req.body)
        console.log("---------------------")
        
        /* // nomas tenga la BD <<descomentar>>
            const query = `SELECT * FROM UsersContentCreator WHERE email='${req.body.Email}' and password='${req.body.Password}';`;
            db.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    //si quito el map entonces debo de usar results.id, results.email etc
                    const usersCC = results.map((user) => new ContentCreator(user.id, user.name, user.dateBirth, user.email, user.password, user.photo));
                    
                    //como ya verifique que concuerden password y user
                    res.send(JSON.stringify(usersCC)); // o res.send({"result":true,"name":req.body.Email})
                }
            });*/
     

        res.send({ "message": "todo bien!" })
    }
}

module.exports = new LoginController();