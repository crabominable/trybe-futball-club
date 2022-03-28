"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const sortLeaderboard_1 = require("./sortLeaderboard");
const calcAwayLeaderboard = (matchs) => {
    let leaderboard = [];
    matchs.forEach((match) => {
        const awayClubName = match.awayClub.clubName;
        const { homeTeamGoals, awayTeamGoals } = match;
        if (awayTeamGoals > homeTeamGoals) {
            leaderboard = (0, functions_1.addWinLeaderboard)(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
        }
        else if (awayTeamGoals < homeTeamGoals) {
            leaderboard = (0, functions_1.addLossLeaderboard)(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
        }
        else {
            leaderboard = (0, functions_1.addDrawLeaderboard)(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
        }
    });
    return (0, sortLeaderboard_1.default)(leaderboard);
};
exports.default = calcAwayLeaderboard;
//# sourceMappingURL=calcAwayLeaderboard.js.map