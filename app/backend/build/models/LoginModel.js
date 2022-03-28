"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const User_1 = require("../database/models/User");
const ErrorCatcherMiddleware_1 = require("../middlewares/ErrorCatcherMiddleware");
const utils_1 = require("../utils");
class LoginModel {
    constructor() {
        this._userModel = User_1.default;
        this._errorCatcher = ErrorCatcherMiddleware_1.default;
        this._httpStatusCode = utils_1.default;
    }
    async handle({ email, password }) {
        const user = await this._userModel.findOne({ where: { email } });
        if (!user) {
            const message = 'Has no user with this email';
            return new this._errorCatcher(this._httpStatusCode.NotFound, message);
        }
        const verifyPassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!verifyPassword) {
            const message = 'Password is incorrect';
            return new this._errorCatcher(this._httpStatusCode.BadRequest, message);
        }
        return {
            data: {
                id: user.id,
                username: user.username,
                role: user.role,
                email: user.email,
            },
        };
    }
}
exports.default = LoginModel;
//# sourceMappingURL=LoginModel.js.map