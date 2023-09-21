const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/artists', adminController.artists);
router.post('/artistsManagment', adminController.artistsStatus);

//top 5 songs
router.get('/TopSongs', adminController.topSongs);
//top 5 songs
router.get('/TopAlbums', adminController.topAlbums);
//top 5 songs
router.get('/TopArtists', adminController.topArtists);


module.exports = router;