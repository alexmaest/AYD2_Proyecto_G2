const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

class LoginController {//JA
    constructor() { }

    //JA
    async usersLogin(req, res) {
        try {
            const user = await userModel.getUserByCredentials(req.body.email, req.body.pwd);
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async passwordChange(req, res) {
        try {
            const email = req.body.email;
            const user = await userModel.getUserByEmail(email);

            if (user) {
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
                    to: user.email,
                    subject: 'Recuperación de contraseña',
                    text : `Estimado/a ${user.nombre},\n\nTu contraseña es: ${user.pwd}`
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('The email has not been sent');
                    } else {
                        console.log('Information: Email sent');
                        res.status(200).send('The email has been sent');
                    }
                });
            } else {
                res.status(501).send('User not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new LoginController();