const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/', loginController.usersLogin);
router.post('/passwordChange', loginController.passwordChange);

module.exports = router;