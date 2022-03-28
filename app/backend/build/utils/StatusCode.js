"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Ok"] = 200] = "Ok";
    StatusCode[StatusCode["Created"] = 201] = "Created";
    StatusCode[StatusCode["NoContent"] = 204] = "NoContent";
    StatusCode[StatusCode["BadRequest"] = 400] = "BadRequest";
    StatusCode[StatusCode["NotAuthorized"] = 401] = "NotAuthorized";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["Conflict"] = 409] = "Conflict";
    StatusCode[StatusCode["InternalServerError"] = 500] = "InternalServerError";
})(StatusCode || (StatusCode = {}));
exports.default = StatusCode;
//# sourceMappingURL=StatusCode.js.map