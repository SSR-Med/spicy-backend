"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Database
const Database_1 = require("../config/Database");
exports.Enemy = Database_1.database.define('enemy', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    cardId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'card',
            key: 'id'
        }
    },
    missionId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'mission',
            key: 'id'
        }
    }
}, {
    tableName: 'enemy'
});
