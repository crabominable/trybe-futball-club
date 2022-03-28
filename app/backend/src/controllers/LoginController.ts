import { NextFunction, Request, Response } from 'express';

import { LoginService } from '../services';

import { UserRequestInterface, LoginResponseInterface } from '../interfaces';

import StatusCode from '../utils';

import ErrorCatcherMiddleware from '../middlewares/ErrorCatcherMiddleware';

class LoginController {
  private _httpStatusCode = StatusCode;

  constructor(
    private loginService: LoginService = new LoginService(),
  ) {
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response<LoginResponseInterface | ErrorCatcherMiddleware>> {
    const userData = req.body as UserRequestInterface;

    const userInstance = await this.loginService.handle(userData);

    if (userInstance instanceof ErrorCatcherMiddleware) {
      return res.status(this._httpStatusCode.NotAuthorized)
        .json({ message: userInstance.message });
    }

    const { user, token } = userInstance;

    const { id, username, role, email } = user.data;

    return res.status(this._httpStatusCode.Ok)
      .json({ user: { id, username, role, email }, token });
  }
}

export default LoginController;
