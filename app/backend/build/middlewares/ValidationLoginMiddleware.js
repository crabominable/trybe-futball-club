"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const validations_1 = require("../validations");
class ValidationLoginMiddleware {
    constructor() {
        this._httpStatusCode = utils_1.default;
        this._validateUserEmail = validations_1.ValidateUserEmail;
        this._validateUserPassword = validations_1.ValidateUserPassword;
        this.handle = this.handle.bind(this);
    }
    // eslint-disable-next-line max-lines-per-function
    async handle(req, res, next) {
        const userData = req.body;
        const email = this._validateUserEmail(userData);
        if (email) {
            return res
                .status(this._httpStatusCode.NotAuthorized)
                .json({ message: email.message });
        }
        const pass = this._validateUserPassword(userData);
        if (pass) {
            return res
                .status(this._httpStatusCode.NotAuthorized)
                .json({ message: pass.message });
        }
        next();
    }
}
exports.default = ValidationLoginMiddleware;
//# sourceMappingURL=ValidationLoginMiddleware.js.map