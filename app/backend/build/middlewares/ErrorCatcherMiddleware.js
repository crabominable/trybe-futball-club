"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorCatcher {
    constructor(_httpStatusCode, message) {
        this._httpStatusCode = _httpStatusCode;
        this.message = message;
    }
}
exports.default = ErrorCatcher;
//# sourceMappingURL=ErrorCatcherMiddleware.js.map