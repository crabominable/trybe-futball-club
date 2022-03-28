"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class ValidateLoginRequest {
    constructor() {
        this._httpStatusCode = utils_1.StatusCode;
        this._schemaUserRequest = schemaUserRequest;
        this.handle = this.handle.bind(this);
    }
    async handle(req, res, nextMiddleware) {
        const userData = req.body;
        const { error } = this.schemaUserRequest.validate(userData);
        if (error) {
            return res
                .status(this._httpStatusCode.NotAuthorized)
                .json({ message: error.message });
        }
        nextMiddleware();
    }
}
exports.default = ValidateLoginRequest;
//# sourceMappingURL=validationLogin.js.map