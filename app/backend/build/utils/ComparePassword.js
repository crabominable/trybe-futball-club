"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ComparePassword(receivedPass, storedPass) {
    if (receivedPass !== storedPass) {
        return false;
    }
    return true;
}
exports.default = ComparePassword;
//# sourceMappingURL=ComparePassword.js.map