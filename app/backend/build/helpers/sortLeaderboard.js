"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortLeaderboard = (leaderboard) => leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
exports.default = sortLeaderboard;
//# sourceMappingURL=sortLeaderboard.js.map