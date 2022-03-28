"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Club_1 = require("../database/models/Club");
const utils_1 = require("../utils");
const ErrorCatcherMiddleware_1 = require("../middlewares/ErrorCatcherMiddleware");
class ClubModel {
    constructor() {
        this._clubModel = Club_1.default;
        this._httpStatusCode = utils_1.default;
        this._errorCatcher = ErrorCatcherMiddleware_1.default;
    }
    async allClubs() {
        const clubs = await this._clubModel.findAll();
        return clubs;
    }
    async clubById(id) {
        const club = await this._clubModel.findByPk(id);
        if (!club) {
            return new this._errorCatcher(this._httpStatusCode.NotFound, 'No club found');
        }
        return club;
    }
}
exports.default = ClubModel;
//# sourceMappingURL=ClubModel.js.map