const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const userRegisterRoute = require('./routers/register/userRegisterRoute');
const artistRegisterRoute = require('./routers/register/artistRegisterRoute');
const mainRoute = require('./routers/mainRoute');
const loginRoute = require('./routers/loginRoute');
const adminRoute = require('./routers/adminRoute');
const artistRoute = require('./routers/artistRoute')
const userRoute = require('./routers/userRoute')
//logs
const {logEventsWrite} = require('./Helpers/logEvents');

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
        this.app.use('/user', userRoute);
        this.app.use('/artistRegister', artistRegisterRoute);
        this.app.use('/userRegister', userRegisterRoute);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Information: Server running on http://localhost:${this.port}`);
            
            //escribo en el log.txt el msg inicial
            logEventsWrite("inicio de aplicacion")
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