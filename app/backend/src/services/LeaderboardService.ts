import {
  calcAllLeaderboard,
  calcHomeLeaderboard,
  calcAwayLeaderboard,
} from '../helpers';

import MatchService from './MatchService';

class LeaderboardService {
  private _matchService = new MatchService();

  constructor() {
    this.getAll = this.getAll.bind(this);
    this.getAllHome = this.getAllHome.bind(this);
    this.getAllAway = this.getAllAway.bind(this);
  }

  async getAll() {
    const matchs = await this._matchService.allMatchs('false');
    const leaderboard = calcAllLeaderboard(matchs);
    return leaderboard;
  }

  async getAllHome() {
    const matchs = await this._matchService.allMatchs('false');
    const leaderboard = calcHomeLeaderboard(matchs);
    return leaderboard;
  }

  async getAllAway() {
    const matchs = await this._matchService.allMatchs('false');
    const leaderboard = calcAwayLeaderboard(matchs);
    return leaderboard;
  }
}

export default LeaderboardService;
