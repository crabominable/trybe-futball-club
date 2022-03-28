"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserPassword = exports.validateUserEmail = void 0;
const validateUserEmail = () => {
    if (!data.email) {
        return false;
    }
    const EMAIL_REGEX = /\S+@\S+\.\S+/;
    if (!data.email.match(EMAIL_REGEX)) {
        return false;
    }
};
exports.validateUserEmail = validateUserEmail;
const validateUserPassword = (data) => {
    if (!data.password) {
        return false;
    }
    if (data.password.length !== 6) {
        return false;
    }
};
exports.validateUserPassword = validateUserPassword;
//# sourceMappingURL=ValidationLogin.js.map