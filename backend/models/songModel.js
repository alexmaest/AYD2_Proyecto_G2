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

  async updateSongAlbumId(albumId, songId) {
    try {
      const updated = await this.repository.updateAlbumId(albumId, songId);
      return updated;
    } catch (err) {
      console.error(err);
      throw new Error('Error while updating song');
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

  async getAllArtistSongs(songId) {
    try {
      const songs = await this.repository.findAllArtistSongs(songId);
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all artist songs');
    }
  }

  async getAllAlbumSongs(albumId) {
    try {
      const songs = await this.repository.findAllAlbumSongs(albumId);
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all album songs');
    }
  }
}

module.exports = new songModel();
