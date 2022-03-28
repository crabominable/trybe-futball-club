import Match from '../database/models/Match';

import Club from '../database/models/Club';

import StatusCode from '../utils';

import ErrorCatcherMiddleware from '../middlewares/ErrorCatcherMiddleware';

import {
  MatchClubResponseInterface,
  MatchPatchMainInterface,
  MatchPostRequestInterface,
  MatchResponseInterface } from '../interfaces';

class ClubModel {
  private _matchModel = Match;

  private _clubModel = Club;

  private _httpStatusCode = StatusCode;

  private _errorCatcher = ErrorCatcherMiddleware;

  async getMatchById(id: number): Promise<MatchResponseInterface | ErrorCatcherMiddleware> {
    const match = await this._matchModel.findByPk(id);

    if (!match) {
      return new this._errorCatcher(
        this._httpStatusCode.NotFound,
        'Has no match with this id',
      );
    }

    return match.get({ plain: true });
  }

  async allMatchs(): Promise<MatchResponseInterface[]> {
    const matchs = await this._matchModel.findAll({
      include: [
        { model: this._clubModel, as: 'homeClub' },
        { model: this._clubModel, as: 'awayClub' },
      ],
    });

    return matchs;
  }

  async allMatchsInProgress(inProgress: boolean): Promise<MatchClubResponseInterface[]> {
    const matchs: MatchClubResponseInterface[] = await this._matchModel.findAll({
      where: { inProgress },
      include: [{
        model: Club,
        as: 'homeClub',
        attributes: { exclude: ['id'] },
      },
      {
        model: Club,
        as: 'awayClub',
        attributes: { exclude: ['id'] },
      }],
    }).then((matchArr) => matchArr.map((match) => match.get({ plain: true })));

    return matchs;
  }

  async createMatch(matchData: MatchPostRequestInterface) {
    const club = await this._matchModel.create(matchData);
    // console.log('Teste aqui', club);
    if (!club) {
      return new this._errorCatcher(
        this._httpStatusCode.NotFound,
        'No club found',
      );
    }

    return club;
  }

  async editById(
    matchData: MatchPatchMainInterface,
    id: number,
  ) {
    await this._matchModel.update(
      matchData,
      { where: { id } },
    );
  }

  async finishMatchWithId(id: number): Promise<void> {
    await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}

export default ClubModel;
