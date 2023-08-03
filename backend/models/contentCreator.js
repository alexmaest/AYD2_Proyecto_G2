//const db = require('../database');//JA

//clase para ser molde de la BD
class ContentCreator {//albunes?
  constructor(id, name, dateBirth,email,password,photo) {
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
  constructor() {}

  getAllContentCreator() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM UsersContentCreator';
      db.connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const usersCC = results.map((user) => new ContentCreator(user.id, user.name, user.dateBirth,user.email,user.password,user.photo));
          resolve(usersCC);
        }
      });
    });
  }
}

module.exports = {
    contentCreatorModel: new contentCreatorModel(),
    ContentCreator: new ContentCreator()
  };