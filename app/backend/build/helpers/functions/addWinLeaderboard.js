"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addWinClub_1 = require("./club/addWinClub");
const addWinLeaderboard = (clubName, clubGoals, adversaryGoals, leaderboard) => {
    const updatedLeaderboard = [...leaderboard];
    const clubIndex = updatedLeaderboard.findIndex((team) => team.name === clubName);
    const club = updatedLeaderboard[clubIndex];
    if (club) {
        updatedLeaderboard[clubIndex] = (0, addWinClub_1.default)(clubName, clubGoals, adversaryGoals, club);
    }
    else
        updatedLeaderboard.push((0, addWinClub_1.default)(clubName, clubGoals, adversaryGoals));
    return updatedLeaderboard;
};
exports.default = addWinLeaderboard;
//# sourceMappingURL=addWinLeaderboard.js.map