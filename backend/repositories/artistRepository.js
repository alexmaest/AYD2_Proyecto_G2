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

    console.log(">>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<")
    console.log(id)
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario WHERE id = ?';
      db.connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {


            const artist = {
              email: results[0].email,
              nombre: results[0].nombre,
              dateBirth: results[0].fecha_nacimiento,
              year: 0,
              month: 0,
              day: 0,
              gender: results[0].genero
            }

            //const dateBirth = "2012-05-09T06:00:00.000Z";

            const date = new Date(artist.dateBirth);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            console.log(year, month, day);
            artist.year = year
            artist.month = month
            artist.day = day

            console.log(">>>>>>><<<<<<<")
            console.log(artist)
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
      const query = 'SELECT u.id,u.nombre,u.tipo_usuario as tipoUsuario,u.email,u.link_foto as linkPhoto,g.nombre as genero,u.fecha_nacimiento as dateBirth,cc.estado as estado  FROM usuario as u JOIN genero as g on g.id_tipo = u.genero JOIN creador_contenido as cc on cc.usuario_id = u.id WHERE u.tipo_usuario !=1;'
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


  // SPRINT 2 F1  ----------------------------------------------------------------------------


  //JA
  updateArtistStatus(creator) {

    return new Promise((resolve, reject) => {

      const query0 = 'SELECT u.email,u.nombre,cc.estado FROM usuario as u JOIN creador_contenido as cc on cc.usuario_id=u.id  WHERE u.id = ?';
      db.connection.query(query0, [creator], (err, results0) => {
        if (err) {
          reject(err);
        } else {
          if (results0.length > 0) {
            //console.log("**************************** correo")
            //console.log(results0)

            //sub-query
            const query = 'UPDATE creador_contenido SET estado = !estado WHERE usuario_id = ?';
            db.connection.query(query, [creator], (err, result) => {
              if (err) {
                reject(err);
              } else {
                // OBJ
                const UserStatus = {
                  email: results0[0].email,
                  nombre: results0[0].nombre,
                  estado: results0[0].estado,
                  affected: result.affectedRows > 0
                };

                //console.log("**************************** habilitar/deshabilitar")
                //console.log(UserStatus)
                resolve(UserStatus);
              }
            });

          } else {
            resolve(null);
          }
        }
      });

    });
  }


  //JA con imagen el update
  updateArtistInfo(url, creator) {
    //console.log(">>>>>>>>>>>>>>")
    //console.log(creator)

    return new Promise((resolve, reject) => {
      const query = 'UPDATE usuario SET link_foto = ? , nombre = ? , pwd = ? , email = ? , fecha_nacimiento = ? , genero = ?  WHERE id = ?';
      db.connection.query(query, [url, creator.username, creator.password, creator.email, creator.birthday, creator.gender, creator.userId], (err, result) => {
        if (err) {
          reject(null);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  //JA sin imagen
  updateArtistInfo2(creator) {
    //console.log(">>>>>>>>>>>>>>")
    //console.log(creator)

    return new Promise((resolve, reject) => {
      const query = 'UPDATE usuario SET nombre = ? , pwd = ? , email = ? , fecha_nacimiento = ? , genero = ?  WHERE id = ?';
      db.connection.query(query, [creator.username, creator.password, creator.email, creator.birthday, creator.gender, creator.userId], (err, result) => {
        if (err) {
          reject(null);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }




}



module.exports = artistRepository;
