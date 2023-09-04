const userController = require('./userController')
const artistModel = require('../models/artistModel');
const songModel = require('../models/songModel');
const albumModel = require('../models/albumModel');
require('dotenv').config();
const {logEventsWrite} = require('../Helpers/logEvents');//logs


class albumController {
    constructor() { }

    async createAlbum(req, res) {
        try {
            console.log(req.body);
            const coverUrl = await userController.uploadImage(req.body.image)
            if (coverUrl) {
                const { userId, name, releaseDate, type, songs } = req.body;
                const artistId = await artistModel.getArtistIdByUserId(userId);
                if (!artistId) {
                    res.status(502).send('Artist account with that id doesnt exist');
                } else {
                    const newAlbum = {
                        name: name,
                        coverUrl: coverUrl,
                        releaseDate: releaseDate,
                        type: type,
                        artistId: artistId,
                        songs: songs
                    };
                    const savedAlbum = await albumModel.saveAlbum(newAlbum);
                    if (savedAlbum) {
                        const songs = newAlbum.songs;
                        const updatePromises = [];

                        for (const songId of songs) {
                            updatePromises.push(songModel.updateSongAlbumId(savedAlbum, songId));
                        }

                        const updateResults = await Promise.all(updatePromises);
                        const allUpdatesSuccessful = updateResults.every(result => result);
                        if (allUpdatesSuccessful) {
                            res.status(200).send('The album has been saved');
                        } else {
                            res.status(501).send('The songs could not be updated');
                        }
                    } else {
                        res.status(501).send('The album could not be saved');
                    }
                }
            } else {
                res.status(500).send('An error has occurred while uploading the album cover');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async getAlbums(req, res) {
        try {
            const artistId = await artistModel.getArtistIdByUserId(req.params.userId);
            if (!artistId) {
                res.status(502).send('Artist account with that id doesnt exist');
            } else {
                const albums = await albumModel.getAllArtistAlbums(artistId);
                if (albums) {
                    const albumsWithSongs = await Promise.all(
                        albums.map(async album => {
                            const songs = await songModel.getAllAlbumSongs(album.id);
                            return {
                                ...album,
                                songs: songs || []
                            };
                        })
                    );
                    res.status(200).json(albumsWithSongs);
                } else {
                    res.status(401).send('The albums could not be obtained');
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteAlbum(req, res) {
        try {
            const deletedReference = await songModel.deleteAlbum(req.params.id);
            const deleted = await albumModel.deleteAlbum(req.params.id);
            if (deleted) {
                res.status(200);
            } else {
                res.status(401).send('The albums could not be deleted');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    //JA - FASE 2
    async getAllAlbums(req, res) {
        try {
            
            //console.log(req.params.userId) <--- MAGIC
            
            const albums = await albumModel.getAllArtistAlbums2();
                if (albums) {
                    /*
                    const albumsWithSongs = await Promise.all(
                        albums.map(async album => {
                            const songs = await songModel.getAllAlbumSongs(album.id);
                            return {
                                ...album,
                                songs: songs || []
                            };
                        })
                    );
                    */
                    res.status(200).json(albums);
                    logEventsWrite(req.url,req.method,"","album enviado correctamente!",3)//log
                } else {
                    res.status(401).send('The albums could not be obtained');
                    logEventsWrite(req.url,req.method,"","error albumes no pudieron ser obtenidos",3)//log
                }
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            logEventsWrite(req.url,req.method,"","error servidor interno TuT",3)//log
        }
    }

}

module.exports = new albumController();