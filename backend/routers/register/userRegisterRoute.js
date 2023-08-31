const express = require('express');
const router = express.Router();

const registerController = require('../../controllers/registerController');

router.post('/free', registerController.userFreeRegister);
//router.post('/paid', registerController.userPaidRegister);

module.exports = router;