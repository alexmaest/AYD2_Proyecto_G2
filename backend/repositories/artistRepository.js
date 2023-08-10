const db = require('../database');

class artistRepository {

  save(artist) {
    return new Promise((resolve, reject) => {
      const userQuery = `
        INSERT INTO usuario (nombre, pwd, tipo_usuario, email, link_foto, fecha_nacimiento, genero)
        VALUES (?, ?, 2, ?, ?, ?, ?);
      `;

      const userValues = [
        artist.username,
        artist.password,
        artist.email,
        null,
        artist.birthday,
        artist.gender
      ];

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

  update(artist) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE usuario SET ? WHERE id = ?';
      db.connection.query(query, [artist, artist.id], (err, result) => {
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
            const artist = new artist(
              results[0].id,
              results[0].name,
              results[0].dateBirth,
              results[0].email,
              results[0].password,
              results[0].photo
            );
            resolve(artist);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  findAll() { //query que obtiene todo de la BD (esto es para el modulo de admin donde se enlista a todos los CC)
    return new Promise((resolve, reject) => {
      const query = 'SELECT u.id,u.nombre,u.tipo_usuario as tipoUsuario,u.email,u.link_foto as linkPhoto,g.nombre as genero,u.fecha_nacimiento as dateBirth,u.pwd  FROM usuario as u JOIN genero as g on g.id_tipo = u.genero WHERE u.tipo_usuario !=1;'
      db.connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          /*
          console.log(":::::::::::::::::::::::::::::::::")
            console.log(results)
            console.log("............")*/
          //const artists = results.map((artist) => new artist(artist.id, artist.name, artist.dateBirth, artist.email, artist.password, artist.photo));
          resolve(results);
        }
      });
    });
  }

  updateArtistBanner(url, creator) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE creador_contenido SET banner = ? WHERE usuario_id = ?';
      db.connection.query(query, [url, creator], (err, result) => {
        if (err) {
          reject(null);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  findArtistBannerById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT banner as image FROM creador_contenido WHERE usuario_id = ?';
      db.connection.query(query, [id], (err, results) => {
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

module.exports = artistRepository;
