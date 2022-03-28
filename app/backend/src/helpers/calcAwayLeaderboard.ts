import {
  LeaderboardTeamInterface,
  MatchClubResponseInterface,
} from '../interfaces';

import {
  addWinLeaderboard,
  addLossLeaderboard,
  addDrawLeaderboard,
} from './functions';

import sortLeaderboard from './sortLeaderboard';

const calcAwayLeaderboard = (matchs: MatchClubResponseInterface[]) => {
  let leaderboard = [] as LeaderboardTeamInterface[];
  matchs.forEach((match) => {
    const awayClubName = match.awayClub.clubName;
    const { homeTeamGoals, awayTeamGoals } = match;
    if (awayTeamGoals > homeTeamGoals) {
      leaderboard = addWinLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
    } else if (awayTeamGoals < homeTeamGoals) {
      leaderboard = addLossLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
    } else {
      leaderboard = addDrawLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
    }
  });
  return sortLeaderboard(leaderboard);
};

export default calcAwayLeaderboard;
