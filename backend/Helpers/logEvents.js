const fsP = require('fs').promises;
const path = require('path')
const fs = require("fs");
const moment = require("moment");


//metodo el cual crea la carpeta Logs y el archivo log.txt
const LogInit = async () => {

    //console.log("inicializacion de logs.....")

    // Obtenemos la ruta actual de la aplicación
    const currentDir = process.cwd();

    // Creamos la carpeta `Logs` si no existe
    const logsDir = path.join(currentDir, "Logs");
    if (!fs.existsSync(logsDir)) {//si no existe crea
        fs.mkdirSync(logsDir);
    }

    // Creamos el archivo `log.txt` en la carpeta `Logs`
    const logsFile = path.join(logsDir, "log.txt");

    if (!fs.existsSync(logsFile)) {//si no existe crea
        fs.writeFileSync(logsFile, "", { encoding: "utf-8" });
    }

}





//------------------------------------------------------------------------------
const fileName = path.join(__dirname, '../Logs', 'log.txt')

const logEventsWrite = async (url,method,usuario,msg,type) => {

    const now = new Date();
    moment.locale("America/Guatemala");// para evitar bug en EC2 de otro lado del mundo
    const formattedDate = moment(now).format("YYYY-MM-DD h:mm:ss a");

    try {

        if (type === 1) {//msg exlusivo cuando inicia backend
            fsP.appendFile(fileName,":::::::::::::::::::::::::::::::::::::: " + msg + " ::::::::::::::::::::::::::::::::::::::"+"\n[fecha]\t" + formattedDate + "\tinicio de backend" + "\n");
       
        } else if (type === 2) {//msg generico
            fsP.appendFile(fileName,"[fecha]\t" + formattedDate + "\t[msg]: "+msg + "\n");
        }
        else {//msg especifico
            fsP.appendFile(fileName, "[fecha]: " + formattedDate + "\t" + "[url]:\t"+url+"\t[metodo]: "+method+"\t[usuario]: "+usuario+"\t[msg]: "+msg + "\n");
        }
    } catch (error) {
        console.error(error)
    }

}

module.exports = { logEventsWrite, LogInit }