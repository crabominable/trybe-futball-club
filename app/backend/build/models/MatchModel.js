"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Match_1 = require("../database/models/Match");
const Club_1 = require("../database/models/Club");
const utils_1 = require("../utils");
const ErrorCatcherMiddleware_1 = require("../middlewares/ErrorCatcherMiddleware");
class ClubModel {
    constructor() {
        this._matchModel = Match_1.default;
        this._clubModel = Club_1.default;
        this._httpStatusCode = utils_1.default;
        this._errorCatcher = ErrorCatcherMiddleware_1.default;
    }
    async getMatchById(id) {
        const match = await this._matchModel.findByPk(id);
        if (!match) {
            return new this._errorCatcher(this._httpStatusCode.NotFound, 'Has no match with this id');
        }
        return match.get({ plain: true });
    }
    async allMatchs() {
        const matchs = await this._matchModel.findAll({
            include: [
                { model: this._clubModel, as: 'homeClub' },
                { model: this._clubModel, as: 'awayClub' },
            ],
        });
        return matchs;
    }
    async allMatchsInProgress(inProgress) {
        const matchs = await this._matchModel.findAll({
            where: { inProgress },
            include: [{
                    model: Club_1.default,
                    as: 'homeClub',
                    attributes: { exclude: ['id'] },
                },
                {
                    model: Club_1.default,
                    as: 'awayClub',
                    attributes: { exclude: ['id'] },
                }],
        }).then((matchArr) => matchArr.map((match) => match.get({ plain: true })));
        return matchs;
    }
    async createMatch(matchData) {
        const club = await this._matchModel.create(matchData);
        // console.log('Teste aqui', club);
        if (!club) {
            return new this._errorCatcher(this._httpStatusCode.NotFound, 'No club found');
        }
        return club;
    }
    async editById(matchData, id) {
        await this._matchModel.update(matchData, { where: { id } });
    }
    async finishMatchWithId(id) {
        await this._matchModel.update({ inProgress: false }, { where: { id } });
    }
}
exports.default = ClubModel;
//# sourceMappingURL=MatchModel.js.map