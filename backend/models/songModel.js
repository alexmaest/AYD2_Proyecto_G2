const songRepository = require('../repositories/songRepository');

class songModel {
  constructor() {
    this.repository = new songRepository();
  }

  async saveSong(song) {
    try {
      const id = await this.repository.save(song);
      return id;
    } catch (err) {
      console.error(err);
      throw new Error('Error while saving content song');
    }
  }

  async updateSong(song) {
    try {
      const updated = await this.repository.update(song);
      return updated;
    } catch (err) {
      console.error(err);
      throw new Error('Error while updating content song');
    }
  }

  async deleteSong(id) {
    try {
      const deleted = await this.repository.delete(id);
      return deleted;
    } catch (err) {
      console.error(err);
      throw new Error('Error while deleting content song');
    }
  }

  async getSongById(id) {
    try {
      const song = await this.repository.findById(id);
      return song;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching content song by ID');
    }
  }

  async getAllSongs() {
    try {
      const songs = await this.repository.findAll();
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all songs');
    }
  }
}

module.exports = new songModel();
