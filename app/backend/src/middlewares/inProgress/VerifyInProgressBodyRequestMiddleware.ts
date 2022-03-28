import {
  NextFunction,
  Request,
  Response } from 'express';

import { ErrorMessageInterface } from '../../interfaces';

import StatusCode from '../../utils';

class ValidateInProgressBodyRequest {
  private _httpStatusCode = StatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ErrorMessageInterface> | void> {
    const { inProgress } = req.body;

    if (typeof inProgress !== 'boolean') {
      return res
        .status(this._httpStatusCode.NotAuthorized)
        .json({ message: 'There is no team with such id!' });
    }

    next();
  }
}

export default ValidateInProgressBodyRequest;
