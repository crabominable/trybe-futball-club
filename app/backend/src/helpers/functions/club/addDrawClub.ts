import {
  LeaderboardTeamInterface,
} from '../../../interfaces';

const addDrawClub = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  club?: LeaderboardTeamInterface,
) => ({
  name: clubName,
  totalPoints: (club ? club.totalPoints + 1 : 1),
  totalGames: (club ? club.totalGames + 1 : 1),
  totalVictories: (club ? club.totalVictories : 0),
  totalDraws: (club ? club.totalDraws + 1 : 1),
  totalLosses: (club ? club.totalLosses : 0),
  goalsFavor: (club ? club.goalsFavor + clubGoals : clubGoals),
  goalsOwn: (club ? club.goalsOwn + adversaryGoals : adversaryGoals),
  goalsBalance: (club
    ? ((club.goalsFavor + clubGoals) - (club.goalsOwn + adversaryGoals))
    : clubGoals - adversaryGoals),
  efficiency: Math.round((club ? ((club.totalPoints + 1)
    / ((club.totalGames + 1) * 3)) * 100 : 33.33) * 100) / 100,
});

export default addDrawClub;
