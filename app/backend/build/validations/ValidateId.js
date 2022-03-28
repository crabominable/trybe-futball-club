"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
// eslint-disable-next-line import/no-cycle
const middlewares_1 = require("../middlewares");
class ValidateId {
    constructor() {
        this._errorCatcher = middlewares_1.ErrorCatcherMiddleware;
        this._httpStatusCode = utils_1.default;
    }
    handle(id) {
        if (Number.isNaN(Number(id))) {
            return new this._errorCatcher(this._httpStatusCode.NotAuthorized, 'id must be a number');
        }
    }
}
exports.default = ValidateId;
//# sourceMappingURL=ValidateId.js.map