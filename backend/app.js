const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const mainRoute = require('./routers/mainRoute');
const loginRoute = require('./routers/loginRoute');
const adminRoute = require('./routers/adminRoute');
const artistRegisterRoute = require('./routers/register/artistRegisterRoute');
const artistRoute = require('./routers/artistRoute')

class Server {
    constructor() {
        this.app = express();
        this.port = 5000;
        this.app.use(cors());
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(express.json());
        this.initRoutes();
    }

    initRoutes() {
        this.app.use('/', mainRoute);
        this.app.use('/login', loginRoute);
        this.app.use('/admin', adminRoute);
        this.app.use('/artist', artistRoute);
        this.app.use('/artistRegister', artistRegisterRoute);
    }

    start() {
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