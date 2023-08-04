const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/', loginController.usersLogin);
//router.post('/2', loginController.login);//para cuando vaya escalando

module.exports = router;