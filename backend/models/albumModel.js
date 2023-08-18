const albumRepository = require('../repositories/albumRepository');

class albumModel {
  constructor() {
    this.repository = new albumRepository();
  }

  async saveAlbum(album) {
    try {
      const id = await this.repository.save(album);
      return id;
    } catch (err) {
      console.error(err);
      throw new Error('Error while saving content album');
    }
  }

  async updateAlbum(album) {
    try {
      const updated = await this.repository.update(album);
      return updated;
    } catch (err) {
      console.error(err);
      throw new Error('Error while updating content album');
    }
  }

  async deleteAlbum(id) {
    try {
      const deleted = await this.repository.delete(id);
      return deleted;
    } catch (err) {
      console.error(err);
      throw new Error('Error while deleting content album');
    }
  }

  async getAlbumById(id) {
    try {
      const album = await this.repository.findById(id);
      return album;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching content album by ID');
    }
  }

  async getAllArtistAlbums(artistId) {
    try {
      const albums = await this.repository.findAllArtistAlbums(artistId);
      return albums;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all artist albums');
    }
  }
}

module.exports = new albumModel();
