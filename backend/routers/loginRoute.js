const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/', loginController.login);
router.post('/2', loginController.login);//para cuando vaya escalando

module.exports = router;