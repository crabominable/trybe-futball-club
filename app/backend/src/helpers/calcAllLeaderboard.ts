import {
  LeaderboardTeamInterface,
  MatchClubResponseInterface } from '../interfaces';

import {
  addWinLeaderboard,
  addLossLeaderboard,
  addDrawLeaderboard,
} from './functions';

import sortLeaderboard from './sortLeaderboard';

const calcAllLeaderboard = (matchs: MatchClubResponseInterface[]) => {
  let leaderboard = [] as LeaderboardTeamInterface[];
  matchs.forEach((match) => {
    const awayClubName = match.awayClub.clubName;
    const homeClubName = match.homeClub.clubName;
    const { homeTeamGoals, awayTeamGoals } = match;
    if (awayTeamGoals > homeTeamGoals) {
      leaderboard = addWinLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
      leaderboard = addLossLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else if (awayTeamGoals < homeTeamGoals) {
      leaderboard = addLossLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
      leaderboard = addWinLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else {
      leaderboard = addDrawLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
      leaderboard = addDrawLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    }
  });
  return sortLeaderboard(leaderboard);
};

export default calcAllLeaderboard;
