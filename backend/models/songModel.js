const db = require('./database');

class Song {
  constructor(id, name, songLenght) {
    this.id = id;
    this.name = name;
    this.songLenght = songLenght;
  }
}

class songModel {
  constructor() {}

  getAllSongs() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Cancion';
      db.connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const songs = results.map((song) => new Song(song.id, song.name, song.duration));
          resolve(songs);
        }
      });
    });
  }
}

module.exports = new songModel();