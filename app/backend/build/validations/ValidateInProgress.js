"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validate = (data) => {
    if (!data.password) {
        return { message: 'All fields must be filled' };
    }
    if (data.password.length !== 6) {
        return { message: 'Incorrect email or password' };
    }
};
exports.default = ValidateUserPassword;
//# sourceMappingURL=ValidateInProgress.js.map