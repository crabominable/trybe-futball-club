"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
class Match {
    constructor() {
        this._decodeTokenValidationMiddleware = new middlewares_1.DecodeTokenValidationMiddleware();
        this._validationQueryStringInProgressMiddleware = new middlewares_1.ValidationQueryStringInProgressMiddleware();
        this._verifyInProgressBodyRequestMiddleware = new middlewares_1.VerifyInProgressBodyRequestMiddleware();
        this._validationMatchBodyData = new middlewares_1.ValidationMatchBodyData();
        this._matchController = new controllers_1.MatchController();
        this.router = (0, express_1.Router)();
        this.start();
    }
    patchRoutes() {
        this.router.patch('/:id', this._decodeTokenValidationMiddleware.handle, this._matchController.editById);
        this.router.patch('/:id/finish', this._decodeTokenValidationMiddleware.handle, this._matchController.finishMatchWithId);
    }
    start() {
        this.router.get('/', this._validationQueryStringInProgressMiddleware.handle, this._matchController.allMatchs);
        this.router.post('/', this._decodeTokenValidationMiddleware.handle, this._verifyInProgressBodyRequestMiddleware.handle, this._validationMatchBodyData.handle, this._matchController.createMatch);
        this.patchRoutes();
    }
}
exports.default = Match;
//# sourceMappingURL=Match.js.map