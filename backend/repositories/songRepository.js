const db = require('../database');

class songRepository {

  save(song) {
    return new Promise((resolve, reject) => {
      const songQuery = `
        INSERT INTO cancion (nombre, link_cancion, duracion, genero, id_creador, id_album)
        VALUES (?, ?, ?, ?, ?, NULL);
      `;
      db.connection.query(songQuery, [song.name, song.songUrl, song.duration, song.genre, song.artistId], (userErr, userResult) => {
        if (userErr) {
          reject(userErr);
        } else {
          const userId = userResult.insertId;
          resolve(userId);
        }
      });
    });
  }

  updateAlbumId(albumId, songId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE cancion SET id_album = ? WHERE id_cancion = ?';
      db.connection.query(query, [albumId, songId], (err, result) => {
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
      const query = 'DELETE FROM cancion WHERE id_cancion = ?';
      db.connection.query(query, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  findAllArtistSongs(artistId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cancion WHERE id_creador = ?';
      db.connection.query(query, [artistId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const songs = results.map(result => ({
              id: result.id_cancion,
              name: result.nombre,
              songUrl: result.link_cancion,
              duration: result.duracion,
              genre: result.genero
            }));
            resolve(songs);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  findAllArtistAvailableSongs(artistId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cancion WHERE id_creador = ? AND id_album IS NULL';
      db.connection.query(query, [artistId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const songs = results.map(result => ({
              id: result.id_cancion,
              name: result.nombre,
              songUrl: result.link_cancion,
              duration: result.duracion,
              genre: result.genero
            }));
            resolve(songs);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  deleteAlbum(albumId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE cancion SET id_album = ? WHERE id_album = ?';
      db.connection.query(query, [null, albumId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  findAllAlbumSongs(albumId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cancion WHERE id_album = ?';
      db.connection.query(query, [albumId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const songs = results.map(result => ({
              id: result.id_cancion,
              name: result.nombre,
              songUrl: result.link_cancion,
              duration: result.duracion,
              genre: result.genero
            }));

            //console.log("yyyyyyyyyyyyyyyyyyyyyyyyy")
            //console.log(songs)
            resolve(songs);
          } else {
            resolve(null);
          }
        }
      });
    });
  }


  //JA - fase2
  findAllArtistSongs2() {
    //console.log("3")
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cancion';
      db.connection.query(query, [], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const songs = results.map(result => ({
              id: result.id_cancion,
              name: result.nombre,
              songUrl: result.link_cancion,
              duration: result.duracion,
              genre: result.genero
            }));

            //console.log("..............")
            //console.log(songs)
            resolve(songs);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}

module.exports = songRepository;
