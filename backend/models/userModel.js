const userRepository = require('../repositories/userRepository');

class artistModel {
  constructor() {
    this.repository = new userRepository();
  }

  //JA
  async getUserByCredentials(email,pwd) {
    try {
      const user = await this.repository.findByCredentials(email,pwd);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching content creator by ID or TYPE');
    }
  }

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
}

module.exports = new artistModel();
