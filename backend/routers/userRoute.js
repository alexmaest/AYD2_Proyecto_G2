const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artistController');
const songController = require('../controllers/songController');
const albumController = require('../controllers/albumController');
const { deleteSong } = require('../models/songModel');

//router.get('/banner/:userId', artistController.getBanner);
router.get('/songs/:userId', songController.getAllSongs);
//router.get('/availableSongs/:userId', songController.getAvailableSongs);

router.get('/albums/:userId', albumController.getAllAlbums);
router.get('/albums/songs/:idAlbum', songController.getAllSongs2);

router.get('/artists', artistController.getAll);
router.get('/artists/songs/:userId', songController.getSongs);

router.post('/Profile', artistController.getInfo);
router.post('/ProfileConfig', artistController.updateProfile);//JA

//router.post('/createAlbum', albumController.createAlbum);


module.exports = router;