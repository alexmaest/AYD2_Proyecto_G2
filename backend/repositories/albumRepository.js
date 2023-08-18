const songRepository = require('./songRepository');
const db = require('../database');

class albumRepository {

  save(album) {
    return new Promise((resolve, reject) => {
      const albumQuery = `
        INSERT INTO album (nombre, link_foto, fecha_lanzamiento, id_creador, tipo_album)
        VALUES (?, ?, ?, ?, ?);
      `;
      db.connection.query(albumQuery, [album.name, album.coverUrl, album.releaseDate, album.artistId, album.type], (albumErr, albumResult) => {
        if (albumErr) {
          reject(albumErr);
        } else {
          const albumId = albumResult.insertId;
          resolve(albumId);
        }
      });
    });
  }

  update(album) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE album SET ? WHERE id = ?';
      db.connection.query(query, [album, album.id], (err, result) => {
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
      const query = 'DELETE FROM album WHERE id = ?';
      db.connection.query(query, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  findAllArtistAlbums(artistId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM album WHERE id_creador = ?';
      db.connection.query(query, [artistId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            const albums = results.map(result => ({
              id: result.id_album,
              name: result.nombre,
              albumUrl: result.link_foto,
              releaseDate: result.fecha_lanzamiento,
              type: result.tipo_album === 1 ? "Sencillo" : "Álbum"
            }));
            resolve(albums);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}

module.exports = albumRepository;
