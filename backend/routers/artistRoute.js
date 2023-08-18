const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artistController');
const songController = require('../controllers/songController');
const albumController = require('../controllers/albumController');

router.get('/banner/:userId', artistController.getBanner);
router.get('/songs/:userId', songController.getSongs);

router.post('/banner', artistController.updateBanner);
router.post('/Profile', artistController.getInfo);
router.post('/ProfileConfig', artistController.updateProfile);//JA
router.post('/uploadSong', songController.createSong);
router.post('/createAlbum', albumController.createAlbum);

module.exports = router;