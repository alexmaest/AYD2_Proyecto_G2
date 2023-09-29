const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/artists', adminController.artists);
router.post('/artistsManagment', adminController.artistsStatus);

//top 5 songs
router.get('/TopSongs', adminController.topSongs);
//top 5 albums
router.get('/TopAlbums', adminController.topAlbums);
//top 5 artists
router.get('/TopArtists', adminController.topArtists);


//fase 3
router.get('/allSongsGenres', adminController.allGenres);//para el top songs por filtro de generos

//top 5 songs con filtro
router.post('/TopSongsFiltro', adminController.topSongsFiltro);
//top 5 albums
router.post('/TopAlbumsFiltro', adminController.topAlbumsFiltro);
//top 5 artists
router.post('/TopArtistsFiltro', adminController.topArtistsFiltro);

module.exports = router;