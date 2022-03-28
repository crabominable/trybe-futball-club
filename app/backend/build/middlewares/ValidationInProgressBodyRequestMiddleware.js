"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class ValidateInProgressBodyRequest {
    constructor() {
        this.httpStatusCode = utils_1.HttpStatusCode;
        this.handle = this.handle.bind(this);
    }
    async handle(req, res, nextMiddleware) {
        const { inProgress } = req.body;
        if (typeof inProgress === 'boolean') {
            return nextMiddleware();
        }
        return res
            .status(this.httpStatusCode.NotAuthorized)
            .json({ message: 'There is no team with such id!' });
    }
}
exports.default = ValidateInProgressBodyRequest;
//# sourceMappingURL=ValidationInProgressBodyRequestMiddleware.js.map