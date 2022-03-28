"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../auth");
const ErrorCatcherMiddleware_1 = require("../middlewares/ErrorCatcherMiddleware");
const models_1 = require("../models");
class LoginService {
    constructor() {
        this._loginModel = new models_1.LoginModel();
        this._token = auth_1.createToken;
    }
    async handle(userData) {
        const user = await this._loginModel.handle(userData);
        if (user instanceof ErrorCatcherMiddleware_1.default) {
            return user;
        }
        const token = this._token(user.data);
        return { user, token };
    }
}
exports.default = LoginService;
//# sourceMappingURL=LoginService.js.map