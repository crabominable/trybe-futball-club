"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class VerifyTokenController {
    constructor() {
        this._httpStatusCode = utils_1.default;
        this.handle = this.handle.bind(this);
    }
    handle(req, res, _next) {
        const { user: jwtDecoded } = req;
        if (!jwtDecoded) {
            return res
                .status(this._httpStatusCode.NotAuthorized)
                .json({ message: 'Has no token in the headers' });
        }
        return res.status(this._httpStatusCode.Ok).json(jwtDecoded.role);
    }
}
exports.default = VerifyTokenController;
//# sourceMappingURL=VerifyTokenMiddleware.js.map