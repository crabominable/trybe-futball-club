"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
class ValidateInProgressQueryString {
    constructor() {
        this._httpStatusCode = utils_1.default;
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