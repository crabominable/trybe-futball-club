import { Router } from 'express';

import { ClubController } from '../controllers';

class Club {
  public router: Router;

  private _clubController = new ClubController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get('/', this._clubController.allClubs);
    this.router.get('/:id', this._clubController.clubById);
  }
}

export default Club;
