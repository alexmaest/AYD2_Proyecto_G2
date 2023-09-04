const fsP = require('fs').promises;
const path = require('path')
const fs = require("fs");
//const moment = require("moment");


//metodo el cual crea la carpeta Logs y el archivo log.txt
const LogInit = async () => {

    //console.log("inicializacion de logs.....")

    // Obtenemos la ruta actual de la aplicación
    const currentDir = process.cwd();

    // Creamos la carpeta `Logs` si no existe
    const logsDir = path.join(currentDir, "Logs");
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    // Creamos el archivo `log.txt` en la carpeta `Logs`
    const logsFile = path.join(logsDir, "log.txt");

    if (!fs.existsSync(logsFile)) {
        fs.writeFileSync(logsFile, "", {encoding: "utf-8"});
    }

}





//------------------------------------------------------------------------------
const fileName = path.join(__dirname, '../Logs', 'log.txt')

const logEventsWrite = async (msg) => {

    //const formattedDate = moment(now).format("YYYY-MM-DD h:mm:ss a");
    //console.log(formattedDate);
    try {

        fsP.appendFile(fileName, msg + "\n")
    } catch (error) {
        console.error(error)
    }

}

module.exports = {logEventsWrite,LogInit}