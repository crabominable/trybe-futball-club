import {
  LeaderboardTeamInterface,
} from '../../interfaces';

import addWinClub from './club/addWinClub';

const addWinLeaderboard = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  leaderboard: LeaderboardTeamInterface[],
)
: LeaderboardTeamInterface[] => {
  const updatedLeaderboard = [...leaderboard] as LeaderboardTeamInterface[];
  const clubIndex = updatedLeaderboard.findIndex((team) => team.name === clubName);
  const club = updatedLeaderboard[clubIndex] as LeaderboardTeamInterface;
  if (club) {
    updatedLeaderboard[clubIndex] = addWinClub(
      clubName,
      clubGoals,
      adversaryGoals,
      club,
    );
  } else updatedLeaderboard.push(addWinClub(clubName, clubGoals, adversaryGoals));
  return updatedLeaderboard;
};

export default addWinLeaderboard;
