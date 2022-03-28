import { Router } from 'express';

import { LeaderboardController } from '../controllers';

class Leaderboard {
  public router: Router;

  private _leaderboardController = new LeaderboardController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/',
      this._leaderboardController.getAll,
    );

    this.router.get(
      '/home',
      this._leaderboardController.getAllHome,
    );

    this.router.get(
      '/away',
      this._leaderboardController.getAllAway,
    );
  }
}

export default Leaderboard;
