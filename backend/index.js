const singletonServer = require('./app');
const { LogInit} = require('./Helpers/logEvents');//inicializar la carpeta Logs/log.txt

const server = new singletonServer().getInstance();
LogInit()//creo la carpeta Logs y el archivo log.txt si no existe


server.start();