const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/artists', adminController.artists);
router.post('/artistsManagment', adminController.artistsStatus);


module.exports = router;