"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes_1 = require("./routes");
class App {
    constructor() {
        this._parseJson = bodyParser;
        this._loginRouter = new routes_1.Login();
        this._clubRouter = new routes_1.Club();
        this._matchRouter = new routes_1.Match();
        this._leaderboard = new routes_1.Leaderboard();
        this.app = express();
        this.config();
        this.app.use(this._parseJson.json());
        this.app.use(cors());
        this.app.use('/login', this._loginRouter.router);
        this.app.use('/clubs', this._clubRouter.router);
        this.app.use('/matchs', this._matchRouter.router);
        this.app.use('/leaderboard', this._leaderboard.router);
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
    }
    start(PORT) {
        this.app.listen(PORT, () => {
            console.log(`server listen at port ${PORT}`);
        });
    }
}
exports.App = App;
// A execução dos testes de cobertura depende dessa exportação
exports.app = new App().app;
//# sourceMappingURL=app.js.map