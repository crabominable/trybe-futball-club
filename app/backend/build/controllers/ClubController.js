"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const utils_1 = require("../utils");
const ErrorCatcherMiddleware_1 = require("../middlewares/ErrorCatcherMiddleware");
class ClubController {
    constructor(_clubService = new services_1.ClubService()) {
        this._clubService = _clubService;
        this._httpStatusCode = utils_1.default;
        this.allClubs = this.allClubs.bind(this);
        this.clubById = this.clubById.bind(this);
    }
    async allClubs(_req, res, _next) {
        const clubs = await this._clubService.allClubs();
        return res.status(this._httpStatusCode.Ok)
            .json(clubs);
    }
    async clubById(req, res, _next) {
        const { id } = req.params;
        const club = await this._clubService.clubById(id);
        if (club instanceof ErrorCatcherMiddleware_1.default) {
            return res
                .status(club._httpStatusCode)
                .json({ message: club.message });
        }
        return res
            .status(this._httpStatusCode.Ok)
            .json(club);
    }
}
exports.default = ClubController;
//# sourceMappingURL=ClubController.js.map