"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addLossCLub_1 = require("./club/addLossCLub");
const addLossLeaderboard = (clubName, clubGoals, adversaryGoals, leaderboard) => {
    const updatedLeaderboard = [...leaderboard];
    const clubIndex = updatedLeaderboard.findIndex((team) => team.name === clubName);
    const club = updatedLeaderboard[clubIndex];
    if (club) {
        updatedLeaderboard[clubIndex] = (0, addLossCLub_1.default)(clubName, clubGoals, adversaryGoals, club);
    }
    else
        updatedLeaderboard.push((0, addLossCLub_1.default)(clubName, clubGoals, adversaryGoals));
    return updatedLeaderboard;
};
exports.default = addLossLeaderboard;
//# sourceMappingURL=addLossLeaderboard.js.map