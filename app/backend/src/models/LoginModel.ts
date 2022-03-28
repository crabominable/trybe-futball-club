import { compare } from 'bcryptjs';

import User from '../database/models/User';

import ErrorCatcherMiddleware from '../middlewares/ErrorCatcherMiddleware';

import StatusCode from '../utils';

import { UserRequestInterface } from '../interfaces';

class LoginModel {
  private _userModel = User;

  private _errorCatcher = ErrorCatcherMiddleware;

  private _httpStatusCode = StatusCode;

  async handle({ email, password }: UserRequestInterface) {
    const user = await this._userModel.findOne({ where: { email } });

    if (!user) {
      const message = 'Has no user with this email';
      return new this._errorCatcher(this._httpStatusCode.NotFound, message);
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      const message = 'Password is incorrect';
      return new this._errorCatcher(this._httpStatusCode.BadRequest, message);
    }

    return {
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    };
  }
}

export default LoginModel;
