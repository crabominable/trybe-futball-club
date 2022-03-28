import {
  NextFunction,
  Request,
  Response } from 'express';

import { ErrorMessageInterface } from '../interfaces';

import StatusCode from '../utils';

class VerifyTokenController {
  private _httpStatusCode = StatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Response<string | ErrorMessageInterface> {
    const { user: jwtDecoded } = req;

    if (!jwtDecoded) {
      return res
        .status(this._httpStatusCode.NotAuthorized)
        .json({ message: 'Has no token in the headers' });
    }

    return res.status(this._httpStatusCode.Ok).json(jwtDecoded.role);
  }
}

export default VerifyTokenController;
