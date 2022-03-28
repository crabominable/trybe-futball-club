"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class ValidateInProgressBodyRequest {
    constructor() {
        this._httpStatusCode = utils_1.StatusCode;
        this.handle = this.handle.bind(this);
    }
    async handle(req, res, next) {
        const { inProgress } = req.body;
        if (typeof inProgress !== 'boolean') {
            return res
                .status(this._httpStatusCode.NotAuthorized)
                .json({ message: 'There is no team with such id!' });
        }
        next();
    }
}
exports.default = ValidateInProgressBodyRequest;
//# sourceMappingURL=VerifyInProgressBodyRequestMiddleware.js.map