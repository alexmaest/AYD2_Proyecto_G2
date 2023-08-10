const db = require('../database');

class creatorRepository {
    save(creator){
        const urlBanner = 'https://i.ytimg.com/vi/k3TZZVEEKao/hqdefault.jpg';
        return new Promise((resolve,reject) => {
            const query = `
                INSERT INTO creador_contenido (usuario_id,banner) VALUES (?,?);
                `;
            const values = [
                creator.id_usuario,
                urlBanner
            ]

            db.connection.query(query, values, (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result.insertId);
                }
              });
        }

        );
    }

    update(url, creator) {
        return new Promise((resolve, reject) => {
          const query = 'UPDATE creador_contenido SET banner = ? WHERE usuario_id = ?';
          db.connection.query(query, [url, creator], (err, result) => {
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

module.exports = creatorRepository;