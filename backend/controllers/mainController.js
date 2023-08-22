class MainController {
    constructor() {}

    index(req, res) {
        res.send('Information: Singleton and MVC implemented');
    }
}

module.exports = new MainController();
