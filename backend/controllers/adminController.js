const e = require('express');
const artist = require('../models/artistModel');
const songModel = require('../models/songModel');
const albumModel = require('../models/albumModel');

const nodemailer = require('nodemailer');
require('dotenv').config();
const {logEventsWrite} = require('../Helpers/logEvents');//logs

class adminController {
    constructor() { }

    async artists(req, res) {
        try {
            const allArtists = await artist.getAllArtists();//modulo admin visualice a todos los CC
            logEventsWrite(req.originalUrl,req.method,"Administrator","user list sent successfully!",3)//log
            res.status(200).json(allArtists);
        } catch (err) {
            console.error(err);
            logEventsWrite(req.originalUrl,req.method,"Administrator","Internal Server Error",3)//log
            res.status(500).send('Internal Server Error');
        }
    }

    //JA
    async artistsStatus(req, res) {//habilitar o deshabilitar usuarios Creadores de contenido ( CC )
        try {
            const Artist = await artist.updateArtistStatus(req.body.userId);//modulo admin visualice a todos los CC

            //console.log(":::::::::::::::::::::::")
            //console.log(Artist)

            let UserStatus = "Desactivada"
            let UserStatusD = "que su cuenta ha sido reportada como inapropiada y/o viola la clausula de uso del servicio."

            if (Artist.estado === 1) {
                UserStatus = "Reactivada"
                UserStatusD = "que el caso de su cuenta ha sido revisado y se determino su aceptacion de nuevo al servicio."
            }

            //enviamos informacion al CC
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: Artist.email,
                subject: 'Estado de cuenta RetroMusic',
                text: `Estimado/a ${Artist.nombre},\n\nSe le informa que su cuenta ha sido ${UserStatus} esto debido a ${UserStatusD} \n\nAtt. Equipo de RetroMusic.`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(err);
                    logEventsWrite(req.originalUrl,req.method,"Administrator","The email has not been sent",3)//log
                    res.status(500).send('The email has not been sent');
                } else {
                    console.log('Information: Email sent');
                    logEventsWrite(req.originalUrl,req.method,"Administrator","The email has been sent",3)//log
                    res.status(200).send('The email has been sent');
                }
            });


            //res.status(200).json(Artist);
        } catch (err) {
            //console.error(err);
            logEventsWrite(req.originalUrl,req.method,"Administrator","User not found",3)//log
            res.status(501).send('User not found');
        }
    }


    //sprint 2 fase2
    async topSongs(req, res) {
        try {
            const allTopSongs = await songModel.top5Songs();//modulo admin visualice a todos los CC
            logEventsWrite(req.originalUrl,req.method,"Administrator","top 5 songs sent successfully!",3)//log
            res.status(200).json(allTopSongs);
        } catch (err) {
            console.error(err);
            logEventsWrite(req.originalUrl,req.method,"Administrator","Internal Server Error",3)//log
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = new adminController();
