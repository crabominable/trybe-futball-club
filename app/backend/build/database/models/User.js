"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
exports.default = User;
//# sourceMappingURL=User.js.map