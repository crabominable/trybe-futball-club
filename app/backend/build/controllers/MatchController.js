"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const utils_1 = require("../utils");
class MatchController {
    constructor(_matchService = new services_1.MatchService()) {
        this._matchService = _matchService;
        this._httpStatusCode = utils_1.default;
        this.allMatchs = this.allMatchs.bind(this);
        this.createMatch = this.createMatch.bind(this);
        this.editById = this.editById.bind(this);
        this.finishMatchWithId = this.finishMatchWithId.bind(this);
    }
    async allMatchs(req, res, _next) {
        const { inProgress } = req.query;
        const allMatches = await this._matchService.allMatchs(inProgress);
        return res
            .status(this._httpStatusCode.Ok)
            .json(allMatches);
    }
    async createMatch(req, res, _next) {
        const matchBodyData = req.body;
        const createdMatch = await this._matchService.createMatch(matchBodyData);
        if (createdMatch instanceof middlewares_1.ErrorCatcherMiddleware) {
            return res
                .status(createdMatch._httpStatusCode)
                .json({ message: createdMatch.message });
        }
        return res
            .status(this._httpStatusCode.Created)
            .json(createdMatch);
    }
    async editById(req, res, _next) {
        const { id } = req.params;
        const matchBodyData = req.body;
        const editedMatch = await this._matchService.editById(matchBodyData, id);
        if (editedMatch instanceof middlewares_1.ErrorCatcherMiddleware) {
            return res
                .status(editedMatch._httpStatusCode)
                .json({ message: editedMatch.message });
        }
        return res
            .status(this._httpStatusCode.Ok)
            .json(editedMatch);
    }
    async finishMatchWithId(req, res, _nextMiddleware) {
        const { id } = req.params;
        const error = await this._matchService.finishMatchWithId(id);
        if (error instanceof middlewares_1.ErrorCatcherMiddleware) {
            return res
                .status(error._httpStatusCode)
                .json({ message: error.message });
        }
        return res
            .status(this._httpStatusCode.Ok)
            .json({ message: 'Match was finish' });
    }
}
exports.default = MatchController;
//# sourceMappingURL=MatchController.js.map