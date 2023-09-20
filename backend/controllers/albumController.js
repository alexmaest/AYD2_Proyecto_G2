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
            const coverUrl = await userController.uploadImage(req.body.image)
            if (coverUrl) {
                const { userId, name, releaseDate, type, songs } = req.body;
                const artistId = await artistModel.getArtistIdByUserId(userId);
                if (!artistId) {
                    logEventsWrite(req.originalUrl,req.method,"content creator","Artist account with that id doesnt exist",3)//log
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
                            logEventsWrite(req.originalUrl,req.method,"content creator","The album has been saved",3)//log
                            res.status(200).send('The album has been saved');
                        } else {
                            logEventsWrite(req.originalUrl,req.method,"content creator","The songs could not be updated",3)//log
                            res.status(501).send('The songs could not be updated');
                        }
                    } else {
                        logEventsWrite(req.originalUrl,req.method,"content creator","The album could not be saved",3)//log
                        res.status(501).send('The album could not be saved');
                    }
                }
            } else {
                logEventsWrite(req.originalUrl,req.method,"content creator","An error has occurred while uploading the album cover",3)//log
                res.status(500).send('An error has occurred while uploading the album cover');
            }
        } catch (err) {
            console.error(err);
            logEventsWrite(req.originalUrl,req.method,"content creator","Internal Server Error",3)//log
            res.status(500).send('Internal Server Error');
        }
    }

    async getAlbums(req, res) {
        try {
            const artistId = await artistModel.getArtistIdByUserId(req.params.userId);
            if (!artistId) {
                res.status(502).send('Artist account with that id doesnt exist');
                if (req.originalUrl.includes("user")) {
                    // La URL contiene el extracto "usuario"
                    logEventsWrite(req.originalUrl,req.method,"user","Artist account with that id doesnt exist",3)//log
                  }else{
                    logEventsWrite(req.originalUrl,req.method,"content creator","Artist account with that id doesnt exist",3)//log
                  }
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
                    if (req.originalUrl.includes("user")) {
                        // La URL contiene el extracto "usuario"
                        logEventsWrite(req.originalUrl,req.method,"user","artist albums sent successfully!",3)//log
                      }else{
                        logEventsWrite(req.originalUrl,req.method,"content creator","artist albums sent successfully!",3)//log
                      }
                } else {
                    res.status(401).send('The albums could not be obtained');
                    if (req.originalUrl.includes("user")) {
                        // La URL contiene el extracto "usuario"
                        logEventsWrite(req.originalUrl,req.method,"user","The albums could not be obtained",3)//log
                      }else{
                        logEventsWrite(req.originalUrl,req.method,"content creator","The albums could not be obtained",3)//log
                      }
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            if (req.originalUrl.includes("user")) {
                // La URL contiene el extracto "usuario"
                logEventsWrite(req.originalUrl,req.method,"user","Internal Server Error",3)//log
              }else{
                logEventsWrite(req.originalUrl,req.method,"content creator","Internal Server Error",3)//log
              }
        }
    }

    async deleteAlbum(req, res) {
        try {
            const deleted = await albumModel.deleteAlbum(req.params.id);
            if (deleted) {
                logEventsWrite(req.originalUrl,req.method,"content creator","album deleted successfully!",3)//log
                res.status(200);
            } else {
                logEventsWrite(req.originalUrl,req.method,"content creator","The albums could not be deleted",3)//log
                res.status(401).send('The albums could not be deleted');
            }
        } catch (err) {
            console.error(err);
            logEventsWrite(req.originalUrl,req.method,"content creator","Internal Server Error",3)//log
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
                    logEventsWrite(req.originalUrl,req.method,"user","album sent successfully!",3)//log
                } else {
                    res.status(401).send('The albums could not be obtained');
                    logEventsWrite(req.originalUrl,req.method,"user","error albums could not be obtained",3)//log
                }
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            logEventsWrite(req.originalUrl,req.method,"user","Internal Server Error",3)//log
        }
    }

}

module.exports = new albumController();