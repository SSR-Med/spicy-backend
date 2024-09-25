"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Database
const Database_1 = require("../config/Database");
const UserSchema_1 = require("../schemas/UserSchema");
exports.User = Database_1.database.define('user', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.ENUM,
        values: UserSchema_1.roleSchema,
        defaultValue: 'user'
    },
    energy: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 100
    },
    tokens: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'user'
});
