"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const fs_1 = require("fs");
const DecodeToken = (token) => {
    try {
        const secret = (0, fs_1.readFileSync)('jwt.evaluation.key', { encoding: 'utf-8' });
        const { id, role, email, username } = jwt.verify(token, secret);
        const userDataDecoded = { id, role, email, username };
        return userDataDecoded;
    }
    catch (error) {
        return 'Something went wrong';
    }
};
exports.default = DecodeToken;
//# sourceMappingURL=DecodeToken.js.map