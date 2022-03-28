"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
class Leaderboard {
    constructor() {
        this._leaderboardController = new controllers_1.LeaderboardController();
        this.router = (0, express_1.Router)();
        this.start();
    }
    start() {
        this.router.get('/', this._leaderboardController.getAll);
        this.router.get('/home', this._leaderboardController.getAllHome);
        this.router.get('/away', this._leaderboardController.getAllAway);
    }
}
exports.default = Leaderboard;
//# sourceMappingURL=Leaderboard.js.map