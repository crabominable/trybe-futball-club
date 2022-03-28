"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateInProgressMatch = (inProgress) => {
    const IN_PROGRESS_REGEX = /^(true|false)$/i;
    if (!inProgress.toString().match(IN_PROGRESS_REGEX)) {
        return { message: '\'inProgress\' must have \'true\' or \'false\'' };
    }
};
exports.default = ValidateInProgressMatch;
//# sourceMappingURL=ValidateInProgressMatch.js.map