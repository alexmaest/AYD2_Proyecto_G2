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
      const query = `
      SELECT 
        cancion.id_cancion AS id,
        cancion.nombre AS name,
        cancion.link_cancion AS songUrl,
        cancion.duracion AS duration,
        cancion.genero AS genre,
        album.link_foto AS albumCover,
        usuario.nombre AS artist
      FROM cancion
      JOIN album ON cancion.id_album = album.id_album
      JOIN creador_contenido ON cancion.id_creador = creador_contenido.id_creador
      JOIN usuario ON creador_contenido.usuario_id = usuario.id
      WHERE cancion.id_creador = ?
      `;
      db.connection.query(query, [artistId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const songs = results.map(result => ({
              id: result.id,
              name: result.name,
              songUrl: result.songUrl,
              duration: result.duration,
              genre: result.genre,
              cover: result.albumCover,
              artist: result.artist
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
      const query = `SELECT c.id_cancion, c.nombre,c.link_cancion,c.duracion,c.genero,a.link_foto,u.nombre as owner
      FROM cancion as c 
      join album as a on c.id_album = a.id_album
      join creador_contenido as cc on a.id_creador = cc.id_creador
      join usuario as u on u.id = cc.usuario_id 
      WHERE c.id_album = ?;  `
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
              genre: result.genero,
              cover:result.link_foto,
              artist: result.owner
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
      const query = `SELECT c.id_cancion ,c.nombre ,c.link_cancion ,c.duracion ,c.genero ,a.link_foto,u.nombre as owner 
      FROM cancion as c 
      join album as a on a.id_album = c.id_album
      join creador_contenido as cc on a.id_creador = cc.id_creador
      join usuario as u on u.id = cc.usuario_id;     `;
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
              genre: result.genero,
              cover: result.link_foto,
              artist: result.owner
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



  //sprint 2 - fase2
  updateSongCounter(songId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE cancion SET reproducciones = IF(reproducciones IS NULL, 1, reproducciones + 1) WHERE id_cancion = ?  ;';
      db.connection.query(query, [songId], (err, result) => {
        if (err) {
          reject(null);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }


  //top 5 canciones
  topSongs() {
    return new Promise((resolve, reject) => {
      const query = ` SELECT c.id_cancion as id, c.nombre as name, u.nombre as artist, c.reproducciones as plays FROM cancion as c
      join creador_contenido as cc on cc.id_creador = c.id_creador
      join usuario as u on u.id  = cc.usuario_id  
      ORDER BY
      c.reproducciones DESC
      LIMIT 5;  `;
      db.connection.query(query, [], (err, results) => {
        if (err) {
          reject(null);
        } else {
           if (results.length > 0) {
            const songs = results.map(result => ({
              id: result.id,
              name: result.name,
              artist: result.artist,
              plays: result.plays
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
