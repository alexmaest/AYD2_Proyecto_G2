const userRepository = require('../repositories/userRepository');
const crypto = require('crypto');

class artistModel {
  constructor() {
    this.repository = new userRepository();
  }

  //JA
  async getUserByEmail(email) {
    try {
      const user = await this.repository.findByEmail(email);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching content creator by email');
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await this.repository.findByUsername(username);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching content creator by username');
    }
  }

  async createUserHashedPassword(password) {
    try {
      const md5 = crypto.createHash('md5');
      return md5.update(password).digest('hex');
    } catch (err) {
      console.error(err);
      throw new Error('Error while hashing password');
    }
  }

  async updateArtistBanner(bannerUrl, userId) {
    try {
      const banner = await this.repository.update(bannerUrl, userId)
      return banner
    } catch (err) {
      console.log(err)
      throw new Error('Error while updating banner');
    }
  }

  async getArtistBanner(userId) {
    try {
      const banner = await this.repository.findById(userId)
      return banner
    } catch (err) {
      console.log(err)
      throw new Error('Error while updating banner');
    }
  }
}

module.exports = new artistModel();
