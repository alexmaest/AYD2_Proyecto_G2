const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artistController');

router.post('/banner', artistController.updateBanner);
router.get('/banner/:userId', artistController.getBanner);
//JA
router.post('/ProfileConfig', artistController.updateProfile);

module.exports = router;