"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-lines-per-function */
const models_1 = require("../models");
const utils_1 = require("../utils");
const ErrorCatcherMiddleware_1 = require("../middlewares/ErrorCatcherMiddleware");
const validations_1 = require("../validations");
class MatchService {
    constructor() {
        this._matchModel = new models_1.MatchModel();
        this._clubModel = new models_1.ClubModel();
        this._httpStatusCode = utils_1.default;
        this._errorCatcher = ErrorCatcherMiddleware_1.default;
        this._ValidateIsNumber = new validations_1.ValidateIsNumber();
        this._ValidateId = new validations_1.ValidateId();
    }
    async allMatchs(inProgress) {
        let booleanInProgress;
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
        return allMatchs;
    }
    async createMatch(matchBodyData) {
        const homeClub = await this._clubModel.clubById(matchBodyData.homeTeam);
        const awayClub = await this._clubModel.clubById(matchBodyData.awayTeam);
        if (homeClub instanceof ErrorCatcherMiddleware_1.default || awayClub instanceof ErrorCatcherMiddleware_1.default) {
            return new this._errorCatcher(this._httpStatusCode.NotAuthorized, 'There is no team with such id!');
        }
        if (homeClub.id === awayClub.id) {
            return new this._errorCatcher(this._httpStatusCode.NotAuthorized, 'It is not possible to create a match with two equal teams');
        }
        const createdMatch = await this._matchModel.createMatch(matchBodyData);
        return createdMatch;
    }
    async editById(matchData, id) {
        let error = {};
        Object.entries({ ...matchData, id }).forEach((entries) => {
            const verify = this._ValidateIsNumber.handle(entries[1], entries[0]);
            if (verify instanceof ErrorCatcherMiddleware_1.default) {
                error = verify;
            }
        });
        if (error instanceof ErrorCatcherMiddleware_1.default) {
            return error;
        }
        const validMatchData = matchData;
        await this._matchModel.editById(validMatchData, Number(id));
        const match = await this._matchModel.getMatchById(Number(id));
        return match;
    }
    async finishMatchWithId(id) {
        const verifyId = this._ValidateId.handle(id);
        if (verifyId instanceof ErrorCatcherMiddleware_1.default)
            return verifyId;
        const match = await this._matchModel.getMatchById(Number(id));
        if (match instanceof ErrorCatcherMiddleware_1.default) {
            return match;
        }
        if (match.inProgress === false) {
            return new this._errorCatcher(this._httpStatusCode.Conflict, 'This match is already finished');
        }
        await this._matchModel.finishMatchWithId(Number(id));
    }
}
exports.default = MatchService;
//# sourceMappingURL=MatchService.js.map