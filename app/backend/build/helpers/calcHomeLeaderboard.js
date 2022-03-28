"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const sortLeaderboard_1 = require("./sortLeaderboard");
const calcLeaderboardHome = (matchs) => {
    let leaderboard = [];
    matchs.forEach((match) => {
        const homeClubName = match.homeClub.clubName;
        const { homeTeamGoals, awayTeamGoals } = match;
        if (homeTeamGoals > awayTeamGoals) {
            leaderboard = (0, functions_1.addWinLeaderboard)(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
        }
        else if (homeTeamGoals < awayTeamGoals) {
            leaderboard = (0, functions_1.addLossLeaderboard)(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
        }
        else {
            leaderboard = (0, functions_1.addDrawLeaderboard)(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
        }
    });
    return (0, sortLeaderboard_1.default)(leaderboard);
};
exports.default = calcLeaderboardHome;
//# sourceMappingURL=calcHomeLeaderboard.js.map