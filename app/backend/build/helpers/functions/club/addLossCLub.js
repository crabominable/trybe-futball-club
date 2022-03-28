"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addLossClub = (clubName, clubGoals, adversaryGoals, club) => ({
    name: clubName,
    totalPoints: (club ? club.totalPoints : 0),
    totalGames: (club ? club.totalGames + 1 : 1),
    totalVictories: (club ? club.totalVictories : 0),
    totalDraws: (club ? club.totalDraws : 0),
    totalLosses: (club ? club.totalLosses + 1 : 1),
    goalsFavor: (club ? club.goalsFavor + clubGoals : clubGoals),
    goalsOwn: (club ? club.goalsOwn + adversaryGoals : adversaryGoals),
    goalsBalance: (club
        ? ((club.goalsFavor + clubGoals) - (club.goalsOwn + adversaryGoals))
        : clubGoals - adversaryGoals),
    efficiency: Math.round((club ? (club.totalPoints
        / ((club.totalGames + 1) * 3)) * 100 : 0) * 100) / 100,
});
exports.default = addLossClub;
//# sourceMappingURL=addLossCLub.js.map