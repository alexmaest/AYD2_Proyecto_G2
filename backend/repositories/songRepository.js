const db = require('../database');

class songRepository {

  save(song) {
    return new Promise((resolve, reject) => {
      const userQuery = `
        INSERT INTO usuario (nombre, pwd, tipo_usuario, email, link_foto, fecha_nacimiento, genero)
        VALUES (?, ?, 2, ?, ?, ?, ?);
      `;
      db.connection.query(userQuery, userValues, (userErr, userResult) => {
        if (userErr) {
          reject(userErr);
        } else {
          const userId = userResult.insertId;
          const creatorQuery = `INSERT INTO creador_contenido (usuario_id) VALUES (?);`;
          db.connection.query(creatorQuery, [userId], (creatorErr, creatorResult) => {
            if (creatorErr) {
              reject(creatorErr);
            } else {
              resolve(userId);
            }
          });
        }
      });
    });
  }

  update(song) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE usuario SET ? WHERE id = ?';
      db.connection.query(query, [song, song.id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM usuario WHERE id = ?';
      db.connection.query(query, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario WHERE id = ?';
      db.connection.query(query, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const song = new song(
              results[0].id,
              results[0].name,
              results[0].dateBirth,
              results[0].email,
              results[0].password,
              results[0].photo
            );
            resolve(song);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}

module.exports = songRepository;
