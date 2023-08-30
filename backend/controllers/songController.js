const userController = require('./userController')
const artistModel = require('../models/artistModel');
const songModel = require('../models/songModel');
const multer = require('multer');
require('dotenv').config();

class songController {
    constructor() { }

    async createSong(req, res) {
        try {
            const storage = multer.memoryStorage();
            const upload = multer({
                storage,
                limits: { fileSize: 10000000, files: 1 }
            });
            const uploadMiddleware = upload.single('track');
            uploadMiddleware(req, res, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }
                if (!req.file) {
                    return res.status(400).send('No detected file in request');
                }
                const songUrl = await userController.uploadSong(req.file.buffer)
                if (songUrl) {
                    const { userId, name, duration, genre } = req.body;
                    const artistId = await artistModel.getArtistIdByUserId(userId);
                    if (!artistId) {
                        res.status(502).send('Artist account with that id doesnt exist');
                    } else {
                        const newSong = {
                            name: name,
                            songUrl: songUrl,
                            duration: duration,
                            genre: genre,
                            artistId: artistId
                        };
                        const savedSong = await songModel.saveSong(newSong);
                        if (savedSong) {
                            res.status(200).send('The song has been saved');
                        } else {
                            res.status(501).send('The song could not be saved');
                        }
                    }
                } else {
                    res.status(500).send('An error has occurred while uploading the song');
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async getSongs(req, res) {
        try {
            const artistId = await artistModel.getArtistIdByUserId(req.params.userId);
            if (!artistId) {
                res.status(502).send('Artist account with that id doesnt exist');
            } else {
                const songs = await songModel.getAllArtistSongs(artistId);
                if (songs) {
                    res.status(200).json(songs);
                } else {
                    res.status(204).json('The songs could not be obtained');
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async getAvailableSongs(req, res) {
        try {
            const artistId = await artistModel.getArtistIdByUserId(req.params.userId);
            if (!artistId) {
                res.status(502).send('Artist account with that id doesnt exist');
            } else {
                const songs = await songModel.getAllArtistAvailableSongs(artistId);
                if (songs) {
                    res.status(200).json(songs);
                } else {
                    res.status(501).json('The songs could not be deleted');
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteSong(req, res) {
        try{
            const deleted = await songModel.deleteSong(req.params.id)
            if(deleted){
                res.status(200)
            }else{

            }            
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteAlbum(req, res) {
        try{
            console.log(req.body)
            res.status(200)
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
    
    
    //JA- fase 2
    async getAllSongs(req, res) {
        try {
            //console.log("1")
                const songs = await songModel.getAllArtistSongs2();
                if (songs) {
                    res.status(200).json(songs);
                } else {
                    res.status(204).json('The songs could not be obtained');
                }
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new songController();