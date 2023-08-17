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

  async updateArtistBanner(bannerUrl, userId) {
    try {
      const banner = await this.repository.updateArtistBanner(bannerUrl, userId);
      return banner;
    } catch (err) {
      console.log(err);
      throw new Error('Error while updating banner');
    }
  }

  async getArtistBanner(userId) {
    try {
      const banner = await this.repository.findArtistBannerById(userId);
      return banner;
    } catch (err) {
      console.log(err);
      throw new Error('Error while updating banner');
    }
  }


  //JA
  async updateArtistStatus(userId) {
    try {
      const status = await this.repository.updateArtistStatus(userId);
      return status;
    } catch (err) {
      console.log(err);
      throw new Error('Error while updating user status');
    }
  }

  //JA
  async updateArtistInfo(bannerUrl, userBody) {
    try {

      /*
      console.log("..................................")
      console.log(bannerUrl)
      console.log("- - -")
      console.log(userBody)*/

      const banner = await this.repository.updateArtistInfo(bannerUrl, userBody);
      return banner;//true

    } catch (err) {
      console.log(err);
      throw new Error('Error while updating user CC info');
    }
  }

  //JA
  async updateArtistInfo2(userBody) {
    try {

      /*
      console.log("..................................")
      console.log(bannerUrl)
      console.log("- - -")
      console.log(userBody)*/

      const banner = await this.repository.updateArtistInfo2( userBody);
      return banner;//true

    } catch (err) {
      console.log(err);
      throw new Error('Error while updating user CC info');
    }
  }

}

module.exports = new artistModel();
