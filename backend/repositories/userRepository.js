const db = require('../database');

class userRepository {

  saveFreeUser(user) {
    return new Promise((resolve, reject) => {
      const userQuery = `
        INSERT INTO usuario (nombre, pwd, tipo_usuario, email, link_foto, fecha_nacimiento, genero)
        VALUES (?, ?, 2, ?, ?, ?, ?);
      `;

      const userValues = [
        user.username,
        user.password,
        user.email,
        null,
        user.birthday,
        user.gender
      ];

      db.connection.query(userQuery, userValues, (userErr, userResult) => {
        if (userErr) {
          reject(userErr);
        } else {
          resolve(userResult.insertId);
        }
      });
    });
  }

  //JA
  findByEmail(email) { // para el login del usuario
    return new Promise((resolve, reject) => {
      //cambiar para la base del proyecto
      const query = `SELECT usuario.id, usuario.nombre, usuario.pwd, usuario.tipo_usuario, usuario.email, usuario.link_foto, usuario.fecha_expiracion_token 
      FROM usuario 
      INNER JOIN 
      tipo_usuario ON tipo_usuario.id_tipo = usuario.tipo_usuario 
      WHERE usuario.email = ?
    `;
      db.connection.query(query, [email], (err, results) => {//por ahora esto luego busco password
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  findByTipoCC(id) { // para el login del usuario
    return new Promise((resolve, reject) => {
      //cambiar para la base del proyecto
      const query = `SELECT cc.estado
        FROM usuario 
        JOIN creador_contenido as cc on cc.usuario_id = usuario.id 
        WHERE usuario.id = ?
      `;
      db.connection.query(query, [id], (err, results) => {//por ahora esto luego busco password
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results);
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

  async findByToken(token) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario WHERE token = ?';
      db.connection.query(query, [token], (err, results) => {
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

  async saveUserToken(id, newToken, tokenExpiration) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE usuario SET token = ?, fecha_expiracion_token = ? WHERE id = ?';
      db.connection.query(query, [newToken, tokenExpiration, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }

  async saveUserPassword(id, newPassword, nowDate) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE usuario SET pwd = ?, fecha_expiracion_token = ? WHERE id = ?';
      db.connection.query(query, [newPassword, nowDate, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }
}

module.exports = userRepository;
