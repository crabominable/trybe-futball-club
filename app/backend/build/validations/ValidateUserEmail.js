"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateUserEmail = (data) => {
    if (!data.email) {
        return { message: 'All fields must be filled' };
    }
    const EMAIL_REGEX = /\S+@\S+\.\S+/;
    if (!data.email.match(EMAIL_REGEX)) {
        return { message: 'Incorrect email or password' };
    }
};
exports.default = ValidateUserEmail;
//# sourceMappingURL=ValidateUserEmail.js.map