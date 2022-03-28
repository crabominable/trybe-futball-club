import {
  MatchClubResponseInterface,
  LeaderboardTeamInterface,
} from '../interfaces';

import {
  addWinLeaderboard,
  addLossLeaderboard,
  addDrawLeaderboard,
} from './functions';

import sortLeaderboard from './sortLeaderboard';

const calcLeaderboardHome = (matchs: MatchClubResponseInterface[]) => {
  let leaderboard = [] as LeaderboardTeamInterface[];
  matchs.forEach((match) => {
    const homeClubName = match.homeClub.clubName;
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      leaderboard = addWinLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else if (homeTeamGoals < awayTeamGoals) {
      leaderboard = addLossLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else {
      leaderboard = addDrawLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    }
  });
  return sortLeaderboard(leaderboard);
};

export default calcLeaderboardHome;
