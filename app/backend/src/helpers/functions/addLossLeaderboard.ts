import {
  LeaderboardTeamInterface,
} from '../../interfaces';

import addLossClub from './club/addLossCLub';

const addLossLeaderboard = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  leaderboard: LeaderboardTeamInterface[],
): LeaderboardTeamInterface[] => {
  const updatedLeaderboard = [...leaderboard] as LeaderboardTeamInterface[];
  const clubIndex = updatedLeaderboard.findIndex((team) => team.name === clubName);
  const club = updatedLeaderboard[clubIndex] as LeaderboardTeamInterface;
  if (club) {
    updatedLeaderboard[clubIndex] = addLossClub(
      clubName,
      clubGoals,
      adversaryGoals,
      club,
    );
  } else updatedLeaderboard.push(addLossClub(clubName, clubGoals, adversaryGoals));
  return updatedLeaderboard;
};

export default addLossLeaderboard;
