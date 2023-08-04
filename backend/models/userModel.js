const userRepository = require('../repositories/userRepository');

class artistModel {
  constructor() {
    this.repository = new userRepository();
  }

  //JA
  async getUserByCredentials(id,tipo) {
    try {
      const user = await this.repository.findByCredentials(id,tipo);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching content creator by ID or TYPE');
    }
  }

}

module.exports = new artistModel();
