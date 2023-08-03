const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
//const db = require('./database');

const mainRoute = require('./routers/mainRoute');
const loginRoute = require('./routers/loginRoute');

class Server {
    constructor() {
        this.app = express();
        this.port = 5000;
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.initRoutes();
    }

    initRoutes() {
        this.app.use('/', mainRoute);
        this.app.use('/login', loginRoute);
    }

    start() {
        this.app.use(cors());
        this.app.use(express.json());
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