import {
  LeaderboardTeamInterface,
} from '../../interfaces';

import addDrawClub from './club/addDrawClub';

const addDrawLeaderboard = (
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
    updatedLeaderboard[clubIndex] = addDrawClub(
      clubName,
      clubGoals,
      adversaryGoals,
      club,
    );
  } else updatedLeaderboard.push(addDrawClub(clubName, clubGoals, adversaryGoals));
  return updatedLeaderboard;
};

export default addDrawLeaderboard;
