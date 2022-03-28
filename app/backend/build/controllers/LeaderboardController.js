"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const utils_1 = require("../utils");
class LeaderboardController {
    constructor(_leaderboardService = new services_1.LeaderboardService()) {
        this._leaderboardService = _leaderboardService;
        this._httpStatusCode = utils_1.default;
        this.getAll = this.getAll.bind(this);
        this.getAllHome = this.getAllHome.bind(this);
        this.getAllAway = this.getAllAway.bind(this);
    }
    async getAll(_req, res, _nextMiddleware) {
        const leaderboards = await this._leaderboardService.getAll();
        return res
            .status(this._httpStatusCode.Ok)
            .json(leaderboards);
    }
    async getAllHome(_req, res, _nextMiddleware) {
        const leaderboards = await this._leaderboardService.getAllHome();
        return res
            .status(this._httpStatusCode.Ok)
            .json(leaderboards);
    }
    async getAllAway(_req, res, _nextMiddleware) {
        const leaderboards = await this._leaderboardService.getAllAway();
        return res
            .status(this._httpStatusCode.Ok)
            .json(leaderboards);
    }
}
exports.default = LeaderboardController;
//# sourceMappingURL=LeaderboardController.js.map