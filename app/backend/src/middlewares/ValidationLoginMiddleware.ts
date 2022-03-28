/* eslint-disable import/no-cycle */
import { NextFunction, Request, Response } from 'express';

import StatusCode from '../utils';

import {
  ErrorMessageInterface,
  UserRequestInterface } from '../interfaces';

import {
  ValidateUserEmail,
  ValidateUserPassword,
} from '../validations';

class ValidationLoginMiddleware {
  private _httpStatusCode = StatusCode;

  private _validateUserEmail = ValidateUserEmail;

  private _validateUserPassword = ValidateUserPassword;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  // eslint-disable-next-line max-lines-per-function
  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<ErrorMessageInterface>> {
    const userData = req.body as UserRequestInterface;

    const email = this._validateUserEmail(userData);

    if (email) {
      return res
        .status(this._httpStatusCode.NotAuthorized)
        .json({ message: email.message });
    }

    const pass = this._validateUserPassword(userData);

    if (pass) {
      return res
        .status(this._httpStatusCode.NotAuthorized)
        .json({ message: pass.message });
    }
    next();
  }
}

export default ValidationLoginMiddleware;
