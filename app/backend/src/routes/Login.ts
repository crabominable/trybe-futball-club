import { Router } from 'express';

import { LoginController } from '../controllers';

import {
  ValidationLoginMiddleware,
  DecodeTokenValidationMiddleware,
  VerifyTokenMiddleware } from '../middlewares';

class Login {
  public router: Router;

  private _loginController = new LoginController();

  private _validationLoginMiddleware = new ValidationLoginMiddleware();

  private _decodeTokenValidationMiddleware = new DecodeTokenValidationMiddleware();

  private _verifyTokenMiddleware = new VerifyTokenMiddleware();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.post(
      '/',
      this._validationLoginMiddleware.handle,
      this._loginController.handleLogin,
    );

    this.router.get(
      '/validate',
      this._decodeTokenValidationMiddleware.handle,
      this._verifyTokenMiddleware.handle,
    );
  }
}

export default Login;
