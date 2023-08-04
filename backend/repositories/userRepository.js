const db = require('../database');

class userRepository {
  //JA
  findByCredentials(id,tipo) { // para el login del usuario
    return new Promise((resolve, reject) => {
      //cambiar para la base del proyecto
      const query = 'SELECT * FROM Usuario WHERE idUsuario = ? and Tipo = ?';
      db.connection.query(query, [id, tipo], (err, results) => {//por ahora esto luego busco password
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            console.log(":::::::::::::::::::::::::::::::::")
            console.log(results)
            console.log("............")
            /* //ojo pendiente
            const artist = new Usuario(
              results[0].idUsuario,
              results[0].Nombre
            );*/
            //console.log("yupii")//delete
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
