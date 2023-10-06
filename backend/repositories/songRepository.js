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
              cover: result.link_foto,
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
  updateSongCounter(songId, userId) {
    console.log(">>>>>>>>>> idSong: "+songId+" userId: "+userId)
    return new Promise((resolve, reject) => {
      const query = 'UPDATE cancion SET reproducciones = IF(reproducciones IS NULL, 1, reproducciones + 1) WHERE id_cancion = ?  ;';
      db.connection.query(query, [songId], (err, result) => {
        if (err) {
          reject(null);

        } else { // como actualizo el contador de la cancion, ahora pues dejamos registro de esto en la tabla REPRODUCCIONES (fase 3)

          resolve(result.affectedRows > 0);// sino F

          const query2 = 'CALL registrar_reproduccion(?,?);';
          db.connection.query(query2, [songId,userId], (err, result2) => {
            if (err) {
              reject(null); // el proc db fallo
            } else {
              console.log("PROC DB REALIZADO CON EXITO!!!!!!!!!!!!!!!!")
              console.log(result2)
              
            }
          });
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
    console.log(" ***** top 5 cnaiones con filtro, genero recibido: " + genero)

    return new Promise((resolve, reject) => {

      let query = ``;

      if (genero == "All") {
        query = ` SELECT c.id_cancion as id, c.nombre as name, u.nombre as artist, c.reproducciones as plays, c.genero as genre FROM cancion as c
      join creador_contenido as cc on cc.id_creador = c.id_creador
      join usuario as u on u.id  = cc.usuario_id  
      ORDER BY
      c.reproducciones DESC
      LIMIT 5;  `;
      } else {
        query = ` SELECT c.id_cancion as id, c.nombre as name, u.nombre as artist, c.reproducciones as plays, c.genero as genre FROM cancion as c
      join creador_contenido as cc on cc.id_creador = c.id_creador
      join usuario as u on u.id  = cc.usuario_id  
      WHERE c.genero = ?
      ORDER BY
      c.reproducciones DESC
      LIMIT 5;  `;
      }

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

  topAlbumsFiltro(inf, sup) {
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
      db.connection.query(query, [inf, sup], (err, results) => {
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

  top5ArtistsFiltro(inf, sup) {
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
      db.connection.query(query, [inf, sup], (err, results) => {
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

  historial(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT
          DATE_FORMAT(r.fecha, '%d/%m/%Y') AS date,
          CONCAT(
            '[',
            GROUP_CONCAT(
              '{"songID":', r.id_cancion,
              ',"name":"', c.nombre,
              '","songUrl":"', c.link_cancion,
              '","duration":"', TIME_FORMAT(c.duracion, '%H:%i:%s'),
              '","genre":"', c.genero,
              '","cover":"', a.link_foto,
              '","artistID":', r.id_artista,
              ',"albumID":', r.id_album,
              ',"artistName":"', u_artist.nombre, '"',
              '}'
            ),
            ']'
          ) AS songs
        FROM
          reproducciones r
        JOIN
          album a ON r.id_album = a.id_album
        JOIN
          cancion c ON r.id_cancion = c.id_cancion
        JOIN
          creador_contenido cc ON r.id_artista = cc.id_creador
        JOIN
          usuario u_artist ON cc.usuario_id = u_artist.id
        WHERE
          r.id_usuario = ?
        GROUP BY
          date
        ORDER BY
          date ASC
      `;
      db.connection.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const listeningHistory = results.map(result => ({
              date: result.date,
              songs: JSON.parse(result.songs)
            }));
            resolve(listeningHistory);
          } else {
            resolve([]);
          }
        }
      });
    });
  }

  listenedTime(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT
          DATE_FORMAT(r.fecha, '%d/%m/%Y') AS date,
          SEC_TO_TIME(SUM(TIME_TO_SEC(c.duracion))) AS time
        FROM
          reproducciones r
        JOIN
          cancion c ON r.id_cancion = c.id_cancion
        WHERE
          r.id_usuario = ?
        GROUP BY
          date
        ORDER BY
          date ASC
      `;
      db.connection.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const listeningHistory = results.map(result => ({
              date: result.date,
              time: result.time
            }));
            resolve(listeningHistory);
          } else {
            resolve([]);
          }
        }
      });
    });
  }

  listenedSongs(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT
          DATE_FORMAT(r.fecha, '%d/%m/%Y') AS date,
          COUNT(*) AS quantity
        FROM
          reproducciones r
        WHERE
          r.id_usuario = ?
        GROUP BY
          date
        ORDER BY
          date ASC
      `;
      db.connection.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const listeningHistory = results.map(result => ({
              date: result.date,
              quantity: result.quantity
            }));
            resolve(listeningHistory);
          } else {
            resolve([]);
          }
        }
      });
    });
  }
  
  topSongsATFiltro(dateI,dateF) {
    console.log(" ***** top global cnaiones con filtro, fechas recibidas: " + dateI+" / "+dateF)

    return new Promise((resolve, reject) => {

      let query = ` SELECT r.genero, r.fecha, c.nombre as cancion, a.nombre as album, u.nombre as artista, userL.nombre as consumidor
      FROM reproducciones as r
      join cancion as c on c.id_cancion = r.id_cancion
      join album as a on a.id_album = r.id_album
      join creador_contenido as cc on cc.id_creador = r.id_artista
      join usuario as u on cc.usuario_id = u.id
      join usuario as userL on r.id_usuario  = userL.id
      WHERE fecha BETWEEN ? AND ? ;   `;
      

      db.connection.query(query, [dateI,dateF], (err, results) => {
        if (err) {
          reject(null);
        } else {
          if (results.length > 0) {
            const songs = results.map(result => ({
              genero: result.genero,
              fecha: result.fecha,
              cancion: result.cancion,
              album: result.album,
              artista: result.artista,

              consumidor: result.consumidor
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


  getAllSongsDates() {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT DISTINCT DATE_FORMAT(fecha, '%Y-%m-%d') as fecha
      FROM reproducciones;
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
            const dates = [];
            results.forEach(result => dates.push(result.fecha));

            resolve(dates);
          } else {
            resolve(null);
          }
        }
      });
    });
  }



}

module.exports = songRepository;
