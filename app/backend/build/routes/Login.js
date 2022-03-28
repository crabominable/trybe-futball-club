"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
class Login {
    constructor() {
        this._loginController = new controllers_1.LoginController();
        this._validationLoginMiddleware = new middlewares_1.ValidationLoginMiddleware();
        this._decodeTokenValidationMiddleware = new middlewares_1.DecodeTokenValidationMiddleware();
        this._verifyTokenMiddleware = new middlewares_1.VerifyTokenMiddleware();
        this.router = (0, express_1.Router)();
        this.start();
    }
    start() {
        this.router.post('/', this._validationLoginMiddleware.handle, this._loginController.handleLogin);
        this.router.get('/validate', this._decodeTokenValidationMiddleware.handle, this._verifyTokenMiddleware.handle);
    }
}
exports.default = Login;
//# sourceMappingURL=Login.js.map