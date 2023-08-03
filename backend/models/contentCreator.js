const db = require('../database');//JA

//clase para ser molde de la BD
class ContentCreator {//albunes?
  constructor(id, name, dateBirth, email, password, photo) {
    this.id = id;
    this.name = name;
    this.dateBirth = dateBirth;
    this.email = email;
    this.password = password;
    this.photo = photo;
  }
}


//query que obtiene todo de la BD (esto es para el modulo de admin donde se enlista a todos los CC)
class contentCreatorModel {
  constructor() { }

  getAllContentCreator(req, res) {

    console.log("devuelvo todos los creadores de contenido!!!")

        const query = 'Select * from Usuario;';//BD en mi pc local
        db.connection.query(query, (err, results) => {
          if (err) {
            reject(err);
          } else {
            //my tests
            const json = JSON.stringify(results);//parseo a JSON
            console.log(json);
            res.send(json)

            /* //oficial xd
            const usersCC = results.map((user) => new ContentCreator(user.id, user.name, user.dateBirth, user.email, user.password, user.photo));
             res.send( JSON.stringify(usersCC);
            */
          }
        });
   
  }
}

module.exports = {
  contentCreatorModel: new contentCreatorModel(),
  ContentCreator: new ContentCreator()
};