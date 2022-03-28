import {
  LeaderboardTeamInterface,
} from '../interfaces';

const sortLeaderboard = (leaderboard: LeaderboardTeamInterface[]) => leaderboard.sort((a, b) =>
  b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || a.goalsOwn - b.goalsOwn);

export default sortLeaderboard;
