"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const utils_1 = require("../utils");
const ErrorCatcherMiddleware_1 = require("../middlewares/ErrorCatcherMiddleware");
class LoginController {
    constructor(loginService = new services_1.LoginService()) {
        this.loginService = loginService;
        this._httpStatusCode = utils_1.default;
        this.handleLogin = this.handleLogin.bind(this);
    }
    async handleLogin(req, res, _next) {
        const userData = req.body;
        const userInstance = await this.loginService.handle(userData);
        if (userInstance instanceof ErrorCatcherMiddleware_1.default) {
            return res.status(this._httpStatusCode.NotAuthorized)
                .json({ message: userInstance.message });
        }
        const { user, token } = userInstance;
        const { id, username, role, email } = user.data;
        return res.status(this._httpStatusCode.Ok)
            .json({ user: { id, username, role, email }, token });
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map