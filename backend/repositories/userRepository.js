const db = require('../database');

class userRepository {
  //JA
  findByCredentials(email, pwd) { // para el login del usuario
    return new Promise((resolve, reject) => {
      //cambiar para la base del proyecto
      const query = 'SELECT id,nombre,tipo_usuario ,email,link_foto FROM usuario WHERE email = ? and pwd = ?';
      db.connection.query(query, [email, pwd], (err, results) => {//por ahora esto luego busco password
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            /*
            console.log(":::::::::::::::::::::::::::::::::")
            console.log(results)
            console.log("............")*/

            /* //deprecated
            const artist = new Usuario(
              results[0].idUsuario,
              results[0].Nombre
            );*/
            //console.log("yupii")//delete
            //console.log(results)
            //OBJ
            const User = {
              id: results[0].id,
              username: results[0].nombre,
              role: results[0].tipo_usuario,
              email: results[0].email,
              photo: results[0].link_foto,
              token: "xd"
            };
            //resolve(results[0]);
            console.log(User)
            resolve(User);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario WHERE email = ?';
      db.connection.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  async findByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario WHERE nombre = ?';
      db.connection.query(query, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

}

module.exports = userRepository;
