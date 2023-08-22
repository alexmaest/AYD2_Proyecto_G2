const singletonServer = require('./app');
const server = new singletonServer().getInstance();

server.start();