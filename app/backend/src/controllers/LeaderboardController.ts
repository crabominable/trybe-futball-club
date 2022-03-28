import {
  Request,
  Response,
  NextFunction } from 'express';

import { LeaderboardService } from '../services';

import StatusCode from '../utils';

class LeaderboardController {
  private _httpStatusCode = StatusCode;

  constructor(
    private _leaderboardService: LeaderboardService = new LeaderboardService(),
  ) {
    this.getAll = this.getAll.bind(this);
    this.getAllHome = this.getAllHome.bind(this);
    this.getAllAway = this.getAllAway.bind(this);
  }

  async getAll(
    _req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ) {
    const leaderboards = await this._leaderboardService.getAll();

    return res
      .status(this._httpStatusCode.Ok)
      .json(leaderboards);
  }

  async getAllHome(
    _req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ) {
    const leaderboards = await this._leaderboardService.getAllHome();

    return res
      .status(this._httpStatusCode.Ok)
      .json(leaderboards);
  }

  async getAllAway(
    _req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ) {
    const leaderboards = await this._leaderboardService.getAllAway();

    return res
      .status(this._httpStatusCode.Ok)
      .json(leaderboards);
  }
}

export default LeaderboardController;
