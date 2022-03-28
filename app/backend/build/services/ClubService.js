"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const validations_1 = require("../validations");
class ClubService {
    constructor() {
        this._clubModel = new models_1.ClubModel();
        this._ValidateId = new validations_1.ValidateId();
    }
    async allClubs() {
        const clubs = await this._clubModel.allClubs();
        return clubs;
    }
    async clubById(id) {
        const theIdIsInvalid = this._ValidateId.handle(id);
        if (theIdIsInvalid) {
            return theIdIsInvalid;
        }
        const club = await this._clubModel.clubById(Number(id));
        return club;
    }
}
exports.default = ClubService;
//# sourceMappingURL=ClubService.js.map