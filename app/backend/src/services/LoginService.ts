import { createToken } from '../auth';

import ErrorCatcherMiddleware from '../middlewares/ErrorCatcherMiddleware';

import { UserRequestInterface } from '../interfaces';

import { LoginModel } from '../models';

class LoginService {
  private _loginModel = new LoginModel();

  private _token = createToken;

  async handle(userData: UserRequestInterface) {
    const user = await this._loginModel.handle(userData);

    if (user instanceof ErrorCatcherMiddleware) {
      return user;
    }

    const token = this._token(user.data);

    return { user, token };
  }
}

export default LoginService;
