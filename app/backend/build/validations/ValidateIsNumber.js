"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
// eslint-disable-next-line import/no-cycle
const middlewares_1 = require("../middlewares");
class ValidateIsNumber {
    constructor() {
        this._errorCatcher = middlewares_1.ErrorCatcherMiddleware;
        this._httpStatusCode = utils_1.default;
    }
    handle(data, field) {
        if (Number.isNaN(Number(data))) {
            return new this._errorCatcher(this._httpStatusCode.NotAuthorized, `'${field}' must be a number`);
        }
        return data;
    }
}
exports.default = ValidateIsNumber;
//# sourceMappingURL=ValidateIsNumber.js.map