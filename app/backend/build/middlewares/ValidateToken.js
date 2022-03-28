"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const auth_1 = require("../auth");
class ValidateToken {
    constructor() {
        this._httpStatusCode = utils_1.StatusCode;
        this.handle = this.handle.bind(this);
    }
    handle(req, res, nextMiddleware) {
        const token = req.headers.authorization;
        if (!token || !token.length) {
            return res.status(this._httpStatusCode.NotAuthorized)
                .json({ message: 'Has no token in headers' });
        }
        const jwtDecoded = (0, auth_1.DecodeToken)(token);
        if (typeof jwtDecoded === 'string') {
            return res.status(this._httpStatusCode.NotAuthorized)
                .json({ message: jwtDecoded });
        }
        req.user = jwtDecoded;
        nextMiddleware();
    }
}
exports.default = ValidateToken;
//# sourceMappingURL=ValidateToken.js.map