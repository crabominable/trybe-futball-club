"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateInProgressIsBoolean = (inProgress) => {
    if (typeof inProgress !== 'boolean') {
        return { message: 'There is no team with such id!' };
    }
};
exports.default = ValidateInProgressIsBoolean;
//# sourceMappingURL=ValidateInProgressIsBoolean.js.map