const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class LoginController {//JA
    constructor() { }

    //JA
    async usersLogin(req, res) {
        try {
            const user = await userModel.getUserByCredentials(req.body.email, req.body.pwd);

            /*console.log("::::::::::;;")
            console.log(user);*/

            if (user === null) {//ubo error con el correo/password
                res.status(401).send('Invalid user or password');
            } else {
                //JWT
                const correo = user[0].email
                const rol = user[0].tipo_usuario

                //OBJ
                const User = {
                    id: user[0].id,
                    username: user[0].nombre,
                    role: user[0].tipo_usuario,
                    email: user[0].email,
                    photo: user[0].link_foto,
                    token: "xd"
                };
                const token = jwt.sign({ correo, rol }, 'secret_key');
                User.token = token

                //console.log(User)
                res.status(200).json(User);
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
                    text: `Estimado/a ${user.nombre},\n\nTu contraseña es: ${user.pwd}`
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