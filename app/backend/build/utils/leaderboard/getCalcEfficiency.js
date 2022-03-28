"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEfficiency = (totalPoints, totalMatches) => {
    let result = ((totalPoints / (totalMatches * 3)) * 100).toFixed(2);
    result = Number(result);
    return result;
};
exports.default = getEfficiency;
//# sourceMappingURL=getCalcEfficiency.js.map