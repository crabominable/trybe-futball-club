/* eslint-disable max-lines-per-function */
import {
  ClubModel,
  MatchModel } from '../models';

import StatusCode from '../utils';

import ErrorCatcherMiddleware from '../middlewares/ErrorCatcherMiddleware';

import {
  MatchClubResponseInterface,
  MatchPatchMainInterface,
  MatchPostRequestInterface,
  MatchResponseInterface } from '../interfaces';

import {
  ValidateIsNumber,
  ValidateId } from '../validations';

class MatchService {
  private _matchModel = new MatchModel();

  private _clubModel = new ClubModel();

  private _httpStatusCode = StatusCode;

  private _errorCatcher = ErrorCatcherMiddleware;

  private _ValidateIsNumber = new ValidateIsNumber();

  private _ValidateId = new ValidateId();

  async allMatchs(inProgress?: string): Promise<MatchClubResponseInterface[]> {
    let booleanInProgress: boolean;

    let allMatchs;

    if (inProgress && inProgress.match(/^(false)$/i)) {
      booleanInProgress = false;
      allMatchs = await this._matchModel.allMatchsInProgress(booleanInProgress);
    }

    if (inProgress && inProgress.match(/^(true)$/i)) {
      booleanInProgress = true;
      allMatchs = await this._matchModel.allMatchsInProgress(booleanInProgress);
    }

    if (!inProgress) {
      allMatchs = await this._matchModel.allMatchs();
    }

    return allMatchs as MatchClubResponseInterface[];
  }

  async createMatch(matchBodyData: MatchPostRequestInterface) {
    const homeClub = await this._clubModel.clubById(matchBodyData.homeTeam);

    const awayClub = await this._clubModel.clubById(matchBodyData.awayTeam);

    if (homeClub instanceof ErrorCatcherMiddleware || awayClub instanceof ErrorCatcherMiddleware) {
      return new this._errorCatcher(
        this._httpStatusCode.NotAuthorized,
        'There is no team with such id!',
      );
    }

    if (homeClub.id === awayClub.id) {
      return new this._errorCatcher(
        this._httpStatusCode.NotAuthorized,
        'It is not possible to create a match with two equal teams',
      );
    }

    const createdMatch = await this._matchModel.createMatch(matchBodyData);

    return createdMatch;
  }

  async editById(
    matchData: object,
    id: string,
  ): Promise<ErrorCatcherMiddleware | MatchResponseInterface> {
    let error = {};

    Object.entries({ ...matchData, id }).forEach((entries) => {
      const verify = this._ValidateIsNumber.handle(entries[1], entries[0]);
      if (verify instanceof ErrorCatcherMiddleware) {
        error = verify;
      }
    });

    if (error instanceof ErrorCatcherMiddleware) {
      return error;
    }

    const validMatchData = matchData as MatchPatchMainInterface;

    await this._matchModel.editById(validMatchData, Number(id));

    const match = await this._matchModel.getMatchById(Number(id));

    return match;
  }

  async finishMatchWithId(id: string) {
    const verifyId = this._ValidateId.handle(id);

    if (verifyId instanceof ErrorCatcherMiddleware) return verifyId;

    const match = await this._matchModel.getMatchById(Number(id));

    if (match instanceof ErrorCatcherMiddleware) {
      return match;
    }

    if (match.inProgress === false) {
      return new this._errorCatcher(
        this._httpStatusCode.Conflict,
        'This match is already finished',
      );
    }

    await this._matchModel.finishMatchWithId(Number(id));
  }
}

export default MatchService;
