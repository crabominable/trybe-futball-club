import { Router } from 'express';

import {
  DecodeTokenValidationMiddleware,
  ValidationQueryStringInProgressMiddleware,
  VerifyInProgressBodyRequestMiddleware,
  ValidationMatchBodyData,
} from '../middlewares';

import { MatchController } from '../controllers';

class Match {
  public router: Router;

  private _decodeTokenValidationMiddleware = new DecodeTokenValidationMiddleware();

  private _validationQueryStringInProgressMiddleware = new
  ValidationQueryStringInProgressMiddleware();

  private _verifyInProgressBodyRequestMiddleware = new VerifyInProgressBodyRequestMiddleware();

  private _validationMatchBodyData = new ValidationMatchBodyData();

  private _matchController = new MatchController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private patchRoutes() {
    this.router.patch(
      '/:id',
      this._decodeTokenValidationMiddleware.handle,
      this._matchController.editById,
    );

    this.router.patch(
      '/:id/finish',
      this._decodeTokenValidationMiddleware.handle,
      this._matchController.finishMatchWithId,
    );
  }

  private start() {
    this.router.get(
      '/',
      this._validationQueryStringInProgressMiddleware.handle,
      this._matchController.allMatchs,
    );

    this.router.post(
      '/',
      this._decodeTokenValidationMiddleware.handle,
      this._verifyInProgressBodyRequestMiddleware.handle,
      this._validationMatchBodyData.handle,
      this._matchController.createMatch,
    );

    this.patchRoutes();
  }
}

export default Match;
