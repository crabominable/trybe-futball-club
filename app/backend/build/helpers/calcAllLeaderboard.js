"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const sortLeaderboard_1 = require("./sortLeaderboard");
const calcAllLeaderboard = (matchs) => {
    let leaderboard = [];
    matchs.forEach((match) => {
        const awayClubName = match.awayClub.clubName;
        const homeClubName = match.homeClub.clubName;
        const { homeTeamGoals, awayTeamGoals } = match;
        if (awayTeamGoals > homeTeamGoals) {
            leaderboard = (0, functions_1.addWinLeaderboard)(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
            leaderboard = (0, functions_1.addLossLeaderboard)(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
        }
        else if (awayTeamGoals < homeTeamGoals) {
            leaderboard = (0, functions_1.addLossLeaderboard)(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
            leaderboard = (0, functions_1.addWinLeaderboard)(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
        }
        else {
            leaderboard = (0, functions_1.addDrawLeaderboard)(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
            leaderboard = (0, functions_1.addDrawLeaderboard)(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
        }
    });
    return (0, sortLeaderboard_1.default)(leaderboard);
};
exports.default = calcAllLeaderboard;
//# sourceMappingURL=calcAllLeaderboard.js.map