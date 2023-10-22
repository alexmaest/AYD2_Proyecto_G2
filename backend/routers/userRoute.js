const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artistController');
const songController = require('../controllers/songController');
const albumController = require('../controllers/albumController');

router.get('/songs/:userId', songController.getAllSongs);

router.get('/albums/:userId', albumController.getAllAlbums);
router.get('/albums/songs/:idAlbum', songController.getAllSongs2);

router.get('/artists', artistController.getAll);
router.get('/artists/songs/:userId', songController.getSongs);
router.get('/artists/albums/:userId', albumController.getAlbums);

router.post('/Profile', artistController.getInfo);
router.post('/ProfileConfig', artistController.updateProfile);//JA

//sprint 2
router.get('/recomendations', songController.getRecomendations);
router.get('/userLimit/:id', songController.userLimit);

router.post('/MusicCounter', songController.musicCounter);

router.get('/historial/:id', songController.historial);
router.get('/listenedTime/:id', songController.listenedTime);
router.get('/listenedSongs/:id', songController.listenedSongs);

module.exports = router;