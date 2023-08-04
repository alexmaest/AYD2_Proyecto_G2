//const db = require('../database');

class artistRepository {

  save(artist) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO artist SET ?';
      db.connection.query(query, artist, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  update(artist) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE artist SET ? WHERE id = ?';
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
      const query = 'DELETE FROM artist WHERE id = ?';
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
      const query = 'SELECT * FROM artist WHERE id = ?';
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
      const query = 'SELECT * FROM artist'; //BD en mi pc local
      db.connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const artists = results.map((artist) => new artist(artist.id, artist.name, artist.dateBirth, artist.email, artist.password, artist.photo));
          resolve(artists);
        }
      });
    });
  }
}

module.exports = artistRepository;
