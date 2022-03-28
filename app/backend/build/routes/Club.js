"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
class Club {
    constructor() {
        this._clubController = new controllers_1.ClubController();
        this.router = (0, express_1.Router)();
        this.start();
    }
    start() {
        this.router.get('/', this._clubController.allClubs);
        this.router.get('/:id', this._clubController.clubById);
    }
}
exports.default = Club;
//# sourceMappingURL=Club.js.map