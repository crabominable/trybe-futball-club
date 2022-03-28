import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as cors from 'cors';

import {
  Login,
  Club,
  Match,
  Leaderboard } from './routes';

class App {
  public app: express.Express;

  private _parseJson = bodyParser;

  private _loginRouter = new Login();

  private _clubRouter = new Club();

  private _matchRouter = new Match();

  private _leaderboard = new Leaderboard();

  constructor() {
    this.app = express();

    this.config();

    this.app.use(this._parseJson.json());

    this.app.use(cors());

    this.app.use('/login', this._loginRouter.router);

    this.app.use('/clubs', this._clubRouter.router);

    this.app.use('/matchs', this._matchRouter.router);

    this.app.use('/leaderboard', this._leaderboard.router);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`server listen at port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
