"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const Club_1 = require("./Club");
class Match extends sequelize_1.Model {
}
Match.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    homeTeam: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    homeTeamGoals: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    awayTeam: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    awayTeamGoals: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    inProgress: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'Match',
    tableName: 'matchs',
    timestamps: false,
});
Club_1.default.hasMany(Match, {
    foreignKey: 'homeTeam',
    as: 'homeMatch',
});
Club_1.default.hasMany(Match, {
    foreignKey: 'awayTeam',
    as: 'awayMatch',
});
Match.belongsTo(Club_1.default, {
    foreignKey: 'homeTeam',
    as: 'homeClub',
});
Match.belongsTo(Club_1.default, {
    foreignKey: 'awayTeam',
    as: 'awayClub',
});
exports.default = Match;
//# sourceMappingURL=Match.js.map