require('dotenv').config();
const mysql = require('mysql');

const {logEventsWrite} = require('./Helpers/logEvents');//logs

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            ssh: "Amazon RDS",
            port:3306,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Failed to connect to the database', err);
                logEventsWrite("Failed to connect to the database")//log
                return;
            }
            console.log('Information: Database connection succeeded');
            logEventsWrite("Information: Database connection succeeded")//log
        });
    }
}

module.exports = new Database();
