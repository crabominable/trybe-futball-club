import { NextFunction, Request, Response } from 'express';

import ErrorCatcherMiddleware from './ErrorCatcherMiddleware';

import StatusCode from '../utils';

import { ErrorMessageInterface } from '../interfaces';

class ValidateMatchData {
  private _errorCatcher = ErrorCatcherMiddleware;

  private _httpStatusCode = StatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  verifyIsNumber(
    data: string | object | undefined | null | number | boolean,
    field: string,
  ): ErrorCatcherMiddleware | string | object | undefined | null | number | boolean {
    if (Number.isNaN(Number(data))) {
      return new this._errorCatcher(
        this._httpStatusCode.NotAuthorized,
        `'${field}' must be a number`,
      );
    }

    return data;
  }

  async handle(
    req: Request,
    res: Response,
    nextMiddleware: NextFunction,
  ): Promise<Response<ErrorMessageInterface> | void> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const objectToValidate = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };

    let error = {};

    Object.entries(objectToValidate).forEach((entries) => {
      const verify = this.verifyIsNumber(entries[1], entries[0]);
      if (verify instanceof ErrorCatcherMiddleware) {
        error = verify;
      }
    });

    if (error instanceof ErrorCatcherMiddleware) {
      return res.status(error._httpStatusCode).json({ message: error.message });
    }

    nextMiddleware();
  }
}

export default ValidateMatchData;
