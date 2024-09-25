"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Database
const Database_1 = require("../config/Database");
exports.World = Database_1.database.define('world', {
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
    urlImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hidden: {
        type: sequelize_1.DataTypes.BOOLEAN,
        default: false,
    }
}, {
    tableName: 'world'
});
