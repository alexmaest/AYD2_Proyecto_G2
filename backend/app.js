const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
//const db = require('./database');

const mainRoute = require('./routers/mainRoute');

class Server {
    constructor() {
        this.app = express();
        this.port = 5000;
        this.initRoutes();
    }

    initRoutes() {
        this.app.use('/', mainRoute);
    }

    start() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.listen(this.port, () => {
            console.log(`Information: Server running on http://localhost:${this.port}`);
        });
    }
}


class SingletonServer {
    constructor() {
        if (!SingletonServer.instance) {
            SingletonServer.instance = new Server();
        }
    }

    getInstance() {
        return SingletonServer.instance;
    }
}

module.exports = SingletonServer;