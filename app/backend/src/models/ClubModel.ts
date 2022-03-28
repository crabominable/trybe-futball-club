import Club from '../database/models/Club';

import StatusCode from '../utils';

import ErrorCatcherMiddleware from '../middlewares/ErrorCatcherMiddleware';

class ClubModel {
  private _clubModel = Club;

  private _httpStatusCode = StatusCode;

  private _errorCatcher = ErrorCatcherMiddleware;

  async allClubs() {
    const clubs = await this._clubModel.findAll();

    return clubs;
  }

  async clubById(id: number) {
    const club = await this._clubModel.findByPk(id);

    if (!club) {
      return new this._errorCatcher(
        this._httpStatusCode.NotFound,
        'No club found',
      );
    }

    return club;
  }
}

export default ClubModel;
