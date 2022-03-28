"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addWinClub = (clubName, clubGoals, adversaryGoals, club) => ({
    name: clubName,
    totalPoints: (club ? club.totalPoints + 3 : 3),
    totalGames: (club ? club.totalGames + 1 : 1),
    totalVictories: (club ? club.totalVictories + 1 : 1),
    totalDraws: (club ? club.totalDraws : 0),
    totalLosses: (club ? club.totalLosses : 0),
    goalsFavor: (club ? club.goalsFavor + clubGoals : clubGoals),
    goalsOwn: (club ? club.goalsOwn + adversaryGoals : adversaryGoals),
    goalsBalance: (club
        ? ((club.goalsFavor + clubGoals) - (club.goalsOwn + adversaryGoals))
        : clubGoals - adversaryGoals),
    efficiency: Math.round((club ? ((club.totalPoints + 3)
        / ((club.totalGames + 1) * 3)) * 100 : 100) * 100) / 100,
});
exports.default = addWinClub;
//# sourceMappingURL=addWinClub.js.map