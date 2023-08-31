const userRepository = require('../repositories/userRepository');
const crypto = require('crypto');

class artistModel {
  constructor() {
    this.repository = new userRepository();
  }

  async saveFreeUser(user) {
    try {
      const id = await this.repository.saveFreeUser(user);
      return id;
    } catch (err) {
      console.error(err);
      throw new Error('Error while saving user');
    }
  }

  //JA
  async getUserByEmail(email) {
    try {
      const user = await this.repository.findByEmail(email);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching user by email');
    }
  }

  //JA
  async getUserByTipoCC(id) {// esta habilitado o no
    try {
      const user = await this.repository.findByTipoCC(id);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching user by email');
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await this.repository.findByUsername(username);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching user by username');
    }
  }

  async getUserByToken(token) {
    try {
      const user = await this.repository.findByToken(token);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching user by token');
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

  async createUserToken() {
    try {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      return code;
    } catch (err) {
      console.error(err);
      throw new Error('Error while generating token');
    }
  }

  async updateUserToken(id, newToken, tokenExpiration) {
    try {
      const user = await this.repository.saveUserToken(id, newToken, tokenExpiration);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching user by email');
    }
  }

  async changeUserPassword(id, newPassword, nowDate) {
    try {
      const userId = await this.repository.saveUserPassword(id, newPassword, nowDate);
      return userId;
    } catch (err) {
      console.error(err);
      throw new Error('Error while changing user password');
    }
  }
}

module.exports = new artistModel();
