import {
  NextFunction,
  Request,
  Response } from 'express';

import { ErrorMessageInterface } from '../interfaces';

import StatusCode from '../utils';

import { decodeToken } from '../auth';

class DecodeTokenValidationMiddleware {
  private _httpStatusCode = StatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response<ErrorMessageInterface> | void {
    const { authorization: token } = req.headers;

    if (!token || !token.length) {
      return res.status(this._httpStatusCode.NotAuthorized)
        .json({ message: 'Has no token in headers' });
    }

    const jwtDecoded = decodeToken(token);

    if (typeof jwtDecoded === 'string') {
      return res.status(this._httpStatusCode.NotAuthorized)
        .json({ message: jwtDecoded });
    }

    req.user = jwtDecoded;

    next();
  }
}

export default DecodeTokenValidationMiddleware;
