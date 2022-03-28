import { NextFunction, Request, Response } from 'express';

import { ClubService } from '../services';

import {
  ClubResponseInterface,
  ErrorMessageInterface } from '../interfaces';

import StatusCode from '../utils';
import ErrorCatcherMiddleware from '../middlewares/ErrorCatcherMiddleware';

class ClubController {
  private _httpStatusCode = StatusCode;

  constructor(
    private _clubService: ClubService = new ClubService(),
  ) {
    this.allClubs = this.allClubs.bind(this);
    this.clubById = this.clubById.bind(this);
  }

  async allClubs(
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response<ClubResponseInterface>> {
    const clubs = await this._clubService.allClubs();

    return res.status(this._httpStatusCode.Ok)
      .json(clubs);
  }

  async clubById(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response<ErrorMessageInterface> | ClubResponseInterface> {
    const { id } = req.params;

    const club = await this._clubService.clubById(id);

    if (club instanceof ErrorCatcherMiddleware) {
      return res
        .status(club._httpStatusCode)
        .json({ message: club.message });
    }

    return res
      .status(this._httpStatusCode.Ok)
      .json(club);
  }
}

export default ClubController;
