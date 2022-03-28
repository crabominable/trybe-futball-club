import { NextFunction, Request, Response } from 'express';

import { MatchService } from '../services';

import {
  MatchResponseInterface,
  ErrorMessageInterface,
  ExpressQueryInterface } from '../interfaces';

import { ErrorCatcherMiddleware } from '../middlewares';

import StatusCode from '../utils';

class MatchController {
  private _httpStatusCode = StatusCode;

  constructor(
    private _matchService: MatchService = new MatchService(),
  ) {
    this.allMatchs = this.allMatchs.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.editById = this.editById.bind(this);
    this.finishMatchWithId = this.finishMatchWithId.bind(this);
  }

  async allMatchs(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { inProgress } = req.query as unknown as ExpressQueryInterface;

    const allMatches = await this._matchService.allMatchs(inProgress);

    return res
      .status(this._httpStatusCode.Ok)
      .json(allMatches);
  }

  async createMatch(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response<ErrorMessageInterface | MatchResponseInterface>> {
    const matchBodyData = req.body;

    const createdMatch = await this._matchService.createMatch(matchBodyData);

    if (createdMatch instanceof ErrorCatcherMiddleware) {
      return res
        .status(createdMatch._httpStatusCode)
        .json({ message: createdMatch.message });
    }

    return res
      .status(this._httpStatusCode.Created)
      .json(createdMatch);
  }

  async editById(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response<ErrorMessageInterface | MatchResponseInterface>> {
    const { id } = req.params;
    const matchBodyData = req.body;

    const editedMatch = await this._matchService.editById(matchBodyData, id);

    if (editedMatch instanceof ErrorCatcherMiddleware) {
      return res
        .status(editedMatch._httpStatusCode)
        .json({ message: editedMatch.message });
    }

    return res
      .status(this._httpStatusCode.Ok)
      .json(editedMatch);
  }

  async finishMatchWithId(
    req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ): Promise<Response<ErrorMessageInterface | void>> {
    const { id } = req.params;

    const error = await this._matchService.finishMatchWithId(id);

    if (error instanceof ErrorCatcherMiddleware) {
      return res
        .status(error._httpStatusCode)
        .json({ message: error.message });
    }

    return res
      .status(this._httpStatusCode.Ok)
      .json({ message: 'Match was finish' });
  }
}

export default MatchController;
