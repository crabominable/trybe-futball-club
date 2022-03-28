"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const auth_1 = require("../auth");
class DecodeTokenValidationMiddleware {
    constructor() {
        this._httpStatusCode = utils_1.default;
        this.handle = this.handle.bind(this);
    }
    handle(req, res, next) {
        const { authorization: token } = req.headers;
        if (!token || !token.length) {
            return res.status(this._httpStatusCode.NotAuthorized)
                .json({ message: 'Has no token in headers' });
        }
        const jwtDecoded = (0, auth_1.decodeToken)(token);
        if (typeof jwtDecoded === 'string') {
            return res.status(this._httpStatusCode.NotAuthorized)
                .json({ message: jwtDecoded });
        }
        req.user = jwtDecoded;
        next();
    }
}
exports.default = DecodeTokenValidationMiddleware;
//# sourceMappingURL=DecodeTokenValidationMiddleware.js.map