const userController = require('./userController')
const artistModel = require('../models/artistModel');
const songModel = require('../models/songModel');
const multer = require('multer');
require('dotenv').config();
const {logEventsWrite} = require('../Helpers/logEvents');//logs

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
                    logEventsWrite(req.originalUrl,req.method,"content creator","Internal Server Error",3)//log
                    return res.status(500).send('Internal Server Error');
                    
                }
                if (!req.file) {
                    logEventsWrite(req.originalUrl,req.method,"content creator","No detected file in request",3)//log
                    return res.status(400).send('No detected file in request');
                }
                const songUrl = await userController.uploadSong(req.file.buffer, req.file.originalname)
                if (songUrl) {
                    const { userId, name, duration, genre } = req.body;
                    const artistId = await artistModel.getArtistIdByUserId(userId);
                    if (!artistId) {
                        logEventsWrite(req.originalUrl,req.method,"content creator","Artist account with that id doesnt exist",3)//log
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
                            logEventsWrite(req.originalUrl,req.method,"content creator","The song has been saved",3)//log
                            res.status(200).send('The song has been saved');
                        } else {
                            logEventsWrite(req.originalUrl,req.method,"content creator","The song could not be saved",3)//log
                            res.status(501).send('The song could not be saved');
                        }
                    }
                } else {
                    logEventsWrite(req.originalUrl,req.method,"content creator","An error has occurred while uploading the song",3)//log
                    res.status(500).send('An error has occurred while uploading the song');
                }
            });
        } catch (err) {
            console.error(err);
            logEventsWrite(req.originalUrl,req.method,"content creator","Internal Server Error",3)//log
            res.status(500).send('Internal Server Error');
        }
    }

    async getSongs(req, res) {
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
                const songs = await songModel.getAllArtistSongs(artistId);
                if (songs) {
                    res.status(200).json(songs);
                    if (req.originalUrl.includes("user")) {
                        // La URL contiene el extracto "usuario"
                        logEventsWrite(req.originalUrl,req.method,"user","artist songs submitted successfully!",3)//log
                      }else{
                        logEventsWrite(req.originalUrl,req.method,"content creator","artist songs submitted successfully!",3)//log
                      }
                } else {
                    res.status(204).json('The songs could not be obtained');
                    if (req.originalUrl.includes("user")) {
                        // La URL contiene el extracto "usuario"
                        logEventsWrite(req.originalUrl,req.method,"user","The songs could not be obtained",3)//log
                      }else{
                        logEventsWrite(req.originalUrl,req.method,"content creator","The songs could not be obtained",3)//log
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

    async getAvailableSongs(req, res) {
        try {
            const artistId = await artistModel.getArtistIdByUserId(req.params.userId);
            if (!artistId) {
                res.status(502).send('Artist account with that id doesnt exist');
                logEventsWrite(req.originalUrl,req.method,"content creator","Artist account with that id doesnt exist",3)//log
                
            } else {
                const songs = await songModel.getAllArtistAvailableSongs(artistId);
                if (songs) {
                    res.status(200).json(songs);
                    logEventsWrite(req.originalUrl,req.method,"content creator","songs available from artists submitted successfully!",3)//log
                } else {
                    res.status(501).json('The songs could not be deleted');
                    logEventsWrite(req.originalUrl,req.method,"content creator","The songs could not be deleted",3)//log
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            logEventsWrite(req.originalUrl,req.method,"content creator","Internal Server Error",3)//log
        }
    }

    async deleteSong(req, res) {
        try{
            const deleted = await songModel.deleteSong(req.params.id)
            if(deleted){
                logEventsWrite(req.originalUrl,req.method,"content creator","song successfully removed!",3)//log
                res.status(200)
                
            }else{

            }            
        } catch (err) {
            console.error(err);
            logEventsWrite(req.originalUrl,req.method,"content creator","Internal Server Error",3)//log
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
                    logEventsWrite(req.originalUrl,req.method,"user","songs sent successfully!",3)//log
                } else {
                    res.status(204).json('The songs could not be obtained');
                    logEventsWrite(req.originalUrl,req.method,"user","The songs could not be obtained",3)//log
                }
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            logEventsWrite(req.originalUrl,req.method,"user","Internal Server Error",3)//log
        }
    }


    //JA- fase 2
    async getAllSongs2(req, res) {
        try {
            //console.log("1")
                const songs = await songModel.getAllAlbumSongs(req.params.idAlbum);
                if (songs) {
                    res.status(200).json(songs);
                    logEventsWrite(req.originalUrl,req.method,"user","songs sent successfully!",3)//log
                } else {
                    res.status(204).json('The songs could not be obtained');
                    logEventsWrite(req.originalUrl,req.method,"user","The songs could not be obtained",3)//log
                }
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            logEventsWrite(req.originalUrl,req.method,"user","Internal Server Error",3)//log
        }
    }

    async getAllArtistSongs(req, res) {
        try {
                const songs = await songModel.getAllArtistSongs(req.params.id);
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

    //sprint 2 - fase2
    async musicCounter(req, res) {
        try {
            //console.log(req.body)
            const songCounter = await songModel.updateMusic(req.body.id);//modulo admin visualice a todos los CC
            if (songCounter === null) {
                logEventsWrite(req.originalUrl, req.method, "user", "Song counter can't updated!", 3)//log
                res.status(401).send('Error')
            } else {
                logEventsWrite(req.originalUrl, req.method, "user", "Song counter successfully updated!", 3)//log
                res.status(204).json('The song are updated');
            }
        } catch (err) {
            console.error(err);
            logEventsWrite(req.originalUrl, req.method, "user", "Internal Server Error", 3)//log
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new songController();