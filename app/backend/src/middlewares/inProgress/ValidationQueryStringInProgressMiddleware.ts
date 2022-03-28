import { NextFunction, Request, Response } from 'express';

import { ErrorMessageInterface } from '../../interfaces';

import StatusCode from '../../utils';

class ValidateInProgressQueryString {
  private _httpStatusCode = StatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ErrorMessageInterface> | void> {
    const { inProgress } = req.query;

    if (!inProgress || !inProgress.length) {
      return next();
    }
    const inProgressString = String(inProgress);

    if (!inProgressString.match(/^(true|false)$/i)) {
      return res
        .status(this._httpStatusCode.BadRequest)
        .json({ message: '\'inProgress\' must have \'true\' or \'false\'' });
    }

    return next();
  }
}

export default ValidateInProgressQueryString;
