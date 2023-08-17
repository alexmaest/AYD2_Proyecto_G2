const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artistController');
const songController = require('../controllers/songController');

router.get('/banner/:userId', artistController.getBanner);
router.get('/songs/:userId', songController.getSongs);

router.post('/banner', artistController.updateBanner);
router.post('/ProfileConfig', artistController.updateProfile);//JA
router.post('/uploadSong', songController.createSong);

module.exports = router;