"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCatcherMiddleware_1 = require("./ErrorCatcherMiddleware");
const utils_1 = require("../utils");
class ValidateMatchData {
    constructor() {
        this._errorCatcher = ErrorCatcherMiddleware_1.default;
        this._httpStatusCode = utils_1.default;
        this.handle = this.handle.bind(this);
    }
    verifyIsNumber(data, field) {
        if (Number.isNaN(Number(data))) {
            return new this._errorCatcher(this._httpStatusCode.NotAuthorized, `'${field}' must be a number`);
        }
        return data;
    }
    async handle(req, res, nextMiddleware) {
        const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
        const objectToValidate = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
        let error = {};
        Object.entries(objectToValidate).forEach((entries) => {
            const verify = this.verifyIsNumber(entries[1], entries[0]);
            if (verify instanceof ErrorCatcherMiddleware_1.default) {
                error = verify;
            }
        });
        if (error instanceof ErrorCatcherMiddleware_1.default) {
            return res.status(error._httpStatusCode).json({ message: error.message });
        }
        nextMiddleware();
    }
}
exports.default = ValidateMatchData;
//# sourceMappingURL=ValidationMatchBodyData.js.map