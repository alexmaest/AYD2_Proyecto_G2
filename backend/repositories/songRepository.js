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
        usuario.nombre AS artist,
        album.id_album
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
              artist: result.artist,
              albumID: result.id_album//new
            }));
            resolve(songs);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  findAllRecomendations() {
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
      ORDER BY cancion.genero;
      `;
      db.connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const genres = {};
            results.forEach(result => {
              const genre = result.genre;
              if (!genres[genre]) {
                genres[genre] = [];
              }
              genres[genre].push({
                id: result.id,
                name: result.name,
                songUrl: result.songUrl,
                duration: result.duration,
                cover: result.albumCover,
                artist: result.artist
              });
            });
            resolve(genres);
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
      const query = `SELECT c.id_cancion, c.nombre,c.link_cancion,c.duracion,c.genero,a.link_foto,a.id_album,u.nombre as owner
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
              artist: result.owner,
              albumID: result.id_album//new
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
      const query = `SELECT c.id_cancion ,c.nombre ,c.link_cancion ,c.duracion ,c.genero ,a.link_foto,a.id_album ,u.nombre as owner 
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
              artist: result.owner,
              albumID: result.id_album//new
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
      const query = ` SELECT c.id_cancion as id, c.nombre as name, u.nombre as artist, c.reproducciones as plays, c.genero as genre FROM cancion as c
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
              plays: result.plays,
              genre: result.genre
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


  //top 5 albums
  topAlbums() {
    return new Promise((resolve, reject) => {
      const query = ` SELECT album.id_album, album.nombre, SUM(c.reproducciones) AS reproduccionesALBUM,u.nombre as artist FROM cancion as c
      JOIN album ON c.id_album = album.id_album
      join creador_contenido as cc on cc.id_creador = c.id_creador
      join usuario as u on u.id  = cc.usuario_id
      GROUP BY album.id_album
      ORDER BY
      reproduccionesALBUM DESC
      LIMIT 5; `;
      db.connection.query(query, [], (err, results) => {
        if (err) {
          reject(null);
        } else {
           if (results.length > 0) {
            const songs = results.map(result => ({
              id: result.id_album,
              name: result.nombre,
              plays: result.reproduccionesALBUM,
              artist: result.artist
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



   //top 5 artists
   topArtists() {
    return new Promise((resolve, reject) => {
      const query = ` SELECT creador_contenido.id_creador,u.nombre as nombre,u.id,SUM(cancion.reproducciones) AS reproducciones FROM cancion
      INNER JOIN album ON cancion.id_album = album.id_album
      INNER JOIN creador_contenido ON album.id_creador = creador_contenido.id_creador
      INNER join usuario as u on u.id  = creador_contenido.usuario_id
    GROUP BY
      creador_contenido.id_creador
    ORDER BY
      reproducciones DESC
    LIMIT
      5;  `;
      db.connection.query(query, [], (err, results) => {
        if (err) {
          reject(null);
        } else {
           if (results.length > 0) {
            const songs = results.map(result => ({
              idCreator: result.id_creador,
              idUsuario: result.id,
              artist: result.nombre,
              plays: result.reproducciones
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




  //fase 3 --------------------------------------------------------------------------------------------------------------------------------------------

  getAllSongsGenres() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT DISTINCT c.genero as genre
      FROM cancion as c;
      `;
      db.connection.query(query, [], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {

            //Objeto []
           /* const genresS = results.map(result => ({
              genre: result.genre
            }));*/

            //---------------------------------

            //Strings []
            const genresS = [];
            results.forEach(result => genresS.push(result.genre));

            resolve(genresS);
          } else {
            resolve(null);
          }
        }
      });
    });
  }


  topSongsFiltro(genero) {
    return new Promise((resolve, reject) => {
      const query = ` SELECT c.id_cancion as id, c.nombre as name, u.nombre as artist, c.reproducciones as plays, c.genero as genre FROM cancion as c
      join creador_contenido as cc on cc.id_creador = c.id_creador
      join usuario as u on u.id  = cc.usuario_id  
      WHERE c.genero = ?
      ORDER BY
      c.reproducciones DESC
      LIMIT 5;  `;
      db.connection.query(query, [genero], (err, results) => {
        if (err) {
          reject(null);
        } else {
           if (results.length > 0) {
            const songs = results.map(result => ({
              id: result.id,
              name: result.name,
              artist: result.artist,
              plays: result.plays,
              genre: result.genre
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


  topAlbumsFiltro(inf,sup) {
    return new Promise((resolve, reject) => {
      const query = ` SELECT album.id_album, album.nombre, SUM(c.reproducciones) AS reproduccionesALBUM,u.nombre as artist FROM cancion as c
      JOIN album ON c.id_album = album.id_album
      join creador_contenido as cc on cc.id_creador = c.id_creador
      join usuario as u on u.id  = cc.usuario_id
      GROUP BY album.id_album
      HAVING SUM(c.reproducciones) BETWEEN ? AND ?
      ORDER BY
      reproduccionesALBUM DESC
      LIMIT 5; `;
      db.connection.query(query, [inf,sup], (err, results) => {
        if (err) {
          reject(null);
        } else {
           if (results.length > 0) {
            const songs = results.map(result => ({
              id: result.id_album,
              name: result.nombre,
              plays: result.reproduccionesALBUM,
              artist: result.artist
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




  top5ArtistsFiltro(inf,sup) {
    return new Promise((resolve, reject) => {
      const query = ` SELECT creador_contenido.id_creador,u.nombre as nombre,u.id,SUM(cancion.reproducciones) AS reproducciones FROM cancion
      INNER JOIN album ON cancion.id_album = album.id_album
      INNER JOIN creador_contenido ON album.id_creador = creador_contenido.id_creador
      INNER join usuario as u on u.id  = creador_contenido.usuario_id
    GROUP BY
      creador_contenido.id_creador
      HAVING SUM(cancion.reproducciones) BETWEEN ? AND ?
    ORDER BY
      reproducciones DESC
    LIMIT
      5;  `;
      db.connection.query(query, [inf,sup], (err, results) => {
        if (err) {
          reject(null);
        } else {
           if (results.length > 0) {
            const songs = results.map(result => ({
              idCreator: result.id_creador,
              idUsuario: result.id,
              artist: result.nombre,
              plays: result.reproducciones
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
