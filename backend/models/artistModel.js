const artistRepository = require('../repositories/artistRepository');

class artistModel {
  constructor() {
    this.repository = new artistRepository();
  }

  async saveArtist(artist) {
    try {
      const id = await this.repository.save(artist);
      return id;
    } catch (err) {
      console.error(err);
      throw new Error('Error while saving content creator');
    }
  }

  async updateArtist(artist) {
    try {
      const updated = await this.repository.update(artist);
      return updated;
    } catch (err) {
      console.error(err);
      throw new Error('Error while updating content creator');
    }
  }

  async deleteArtist(id) {
    try {
      const deleted = await this.repository.delete(id);
      return deleted;
    } catch (err) {
      console.error(err);
      throw new Error('Error while deleting content creator');
    }
  }

  async getArtistById(id) {
    try {
      const artist = await this.repository.findById(id);
      return artist;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching content creator by ID');
    }
  }

  async getAllArtists() {//modulo admin visualice a todos los CC
    try {
      const creators = await this.repository.findAll();
      return creators;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all content creators');
    }
  }
}

module.exports = new artistModel();
