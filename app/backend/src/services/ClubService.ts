import { ClubModel } from '../models';

import {
  ValidateId } from '../validations';

class ClubService {
  private _clubModel = new ClubModel();

  private _ValidateId = new ValidateId();

  async allClubs() {
    const clubs = await this._clubModel.allClubs();

    return clubs;
  }

  async clubById(id: string) {
    const theIdIsInvalid = this._ValidateId.handle(id);
    if (theIdIsInvalid) {
      return theIdIsInvalid;
    }

    const club = await this._clubModel.clubById(Number(id));

    return club;
  }
}

export default ClubService;
