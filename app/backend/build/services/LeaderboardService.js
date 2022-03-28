"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const MatchService_1 = require("./MatchService");
class LeaderboardService {
    constructor() {
        this._matchService = new MatchService_1.default();
        this.getAll = this.getAll.bind(this);
        this.getAllHome = this.getAllHome.bind(this);
        this.getAllAway = this.getAllAway.bind(this);
    }
    async getAll() {
        const matchs = await this._matchService.allMatchs('false');
        const leaderboard = (0, helpers_1.calcAllLeaderboard)(matchs);
        return leaderboard;
    }
    async getAllHome() {
        const matchs = await this._matchService.allMatchs('false');
        const leaderboard = (0, helpers_1.calcHomeLeaderboard)(matchs);
        return leaderboard;
    }
    async getAllAway() {
        const matchs = await this._matchService.allMatchs('false');
        const leaderboard = (0, helpers_1.calcAwayLeaderboard)(matchs);
        return leaderboard;
    }
}
exports.default = LeaderboardService;
//# sourceMappingURL=LeaderboardService.js.map