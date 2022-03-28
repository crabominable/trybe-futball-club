"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const fs_1 = require("fs");
const createToken = (data) => {
    const TOKEN_SECRET = (0, fs_1.readFileSync)('jwt.evaluation.key', { encoding: 'utf-8' });
    const jwtConfig = { expiresIn: '4d' };
    return (0, jsonwebtoken_1.sign)({ ...data }, TOKEN_SECRET, jwtConfig);
};
exports.default = createToken;
//# sourceMappingURL=createToken.js.map