"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addDrawClub_1 = require("./club/addDrawClub");
const addDrawLeaderboard = (clubName, clubGoals, adversaryGoals, leaderboard) => {
    const updatedLeaderboard = [...leaderboard];
    const clubIndex = updatedLeaderboard.findIndex((team) => team.name === clubName);
    const club = updatedLeaderboard[clubIndex];
    if (club) {
        updatedLeaderboard[clubIndex] = (0, addDrawClub_1.default)(clubName, clubGoals, adversaryGoals, club);
    }
    else
        updatedLeaderboard.push((0, addDrawClub_1.default)(clubName, clubGoals, adversaryGoals));
    return updatedLeaderboard;
};
exports.default = addDrawLeaderboard;
//# sourceMappingURL=addDrawLeaderboard.js.map