const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class LoginController {//JA
    constructor() { }

    //JA
    async usersLogin(req, res) {
        try {
            const user = await userModel.getUserByEmail(req.body.email);
            if (user === null) {
                res.status(401).send('Invalid user');
            } else {
                const hashedPassword = await userModel.createUserHashedPassword(req.body.pwd);
                if (hashedPassword !== user[0].pwd) {
                    res.status(401).send('Invalid password');
                } else {
                    // JWT
                    const correo = user[0].email;
                    const rol = user[0].tipo_usuario;

                    // OBJ
                    const User = {
                        id: user[0].id,
                        username: user[0].nombre,
                        role: user[0].tipo_usuario,
                        email: user[0].email,
                        photo: user[0].link_foto,
                        token: "xd" // Esto se actualizará con el token JWT
                    };

                    const token = jwt.sign({ correo, rol }, 'secret_key');
                    User.token = token;

                    res.status(200).json(User);
                }
            }
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

                if (user[0].fecha_expiracion_token) {
                    const currentDate = new Date();
                    const tokenExpirationDate = new Date(user[0].fecha_expiracion_token);
                    if (currentDate <= tokenExpirationDate) {
                        res.status(406).send('User has an active token');
                        return;
                    }
                }
                const newToken = await userModel.createUserToken();
                const tokenExpiration = new Date(Date.now() + 15 * 60 * 1000); // Token active 15 minutes from now
                await userModel.updateUserToken(user[0].id, newToken, tokenExpiration);

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
                    to: user[0].email,
                    subject: 'Recuperación de contraseña',
                    text: `Estimado/a ${user[0].nombre},\n\nHas solicitado un cambio de contraseña, en la página que se te ha redirigido ingresa el siguiente token: ${newToken}\n\nTienes 15 minutos para que el token sea válido.\n\nEquipo de RetroMusic.`
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