"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
// eslint-disable-next-line import/no-cycle
// import { ValidateInProgressMatch } from '../validations';
class ValidateInProgressQueryString {
    // private _validateInProgressMatch = ValidateInProgressMatch;
    constructor() {
        this._httpStatusCode = utils_1.StatusCode;
        this.handle = this.handle.bind(this);
    }
    async handle(req, res, next) {
        const { inProgress } = req.query;
        if (!inProgress || !inProgress.length) {
            return next();
        }
        const inProgressString = String(inProgress);
        if (!inProgressString.match(/^(true|false)$/i)) {
            return res
                .status(this._httpStatusCode.BadRequest)
                .json({ message: '\'inProgress\' must have \'true\' or \'false\'' });
        }
        return next();
    }
}
exports.default = ValidateInProgressQueryString;
//# sourceMappingURL=ValidationQueryStringInProgressMiddleware.js.map