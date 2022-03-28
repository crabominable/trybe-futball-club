"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const jwt = require("jsonwebtoken");
const utils_1 = require("../utils");
class ValidateToken {
    constructor() {
        this._httpStatusCode = utils_1.StatusCode;
        this._readFile = (file) => (0, fs_1.readFileSync)(file, { encoding: 'utf-8' });
        this.handle = this.handle.bind(this);
        this.decodeToken = this.decodeToken.bind(this);
    }
    decodeToken(token) {
        try {
            const secret = this._readFile('jwt.evaluation.key');
            const { id, role, email, username } = jwt.verify(token, secret);
            const userDataDecoded = { id, role, email, username };
            return userDataDecoded;
        }
        catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return 'Something went wrong';
        }
    }
    handle(req, res, nextMiddleware) {
        const { authorization: token } = req.headers;
        if (!token || !token.length) {
            return res.status(this._httpStatusCode.NotAuthorized)
                .json({ message: 'Has no token in headers' });
        }
        const jwtDecoded = this.decodeToken(token);
        if (typeof jwtDecoded === 'string') {
            return res.status(this._httpStatusCode.NotAuthorized)
                .json({ message: jwtDecoded });
        }
        req.userDataDecoded = jwtDecoded;
        nextMiddleware();
    }
}
exports.default = ValidateToken;
//# sourceMappingURL=ValidateToken.js.map