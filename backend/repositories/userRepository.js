const db = require('../database');


class userRepository {
  //JA
  findByCredentials(email, pwd) { // para el login del usuario
    return new Promise((resolve, reject) => {
      //cambiar para la base del proyecto
      const query = 'SELECT usuario.id,usuario.nombre,usuario.tipo_usuario ,usuario.email,usuario.link_foto FROM usuario INNER JOIN tipo_usuario ON tipo_usuario.id_tipo = usuario.tipo_usuario WHERE usuario.email = ? and usuario.pwd = ?';
      db.connection.query(query, [email, pwd], (err, results) => {//por ahora esto luego busco password
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            /*
            console.log(":::::::::::::::::::::::::::::::::")
            console.log(results[0])
            console.log("............")*/
            
            resolve(results);
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
