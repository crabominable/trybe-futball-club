"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateUserPassword = (data) => {
    if (!data.password) {
        return { message: 'All fields must be filled' };
    }
    if (data.password.length !== 6) {
        return { message: 'Incorrect email or password' };
    }
};
exports.default = ValidateUserPassword;
//# sourceMappingURL=ValidatePassword.js.map