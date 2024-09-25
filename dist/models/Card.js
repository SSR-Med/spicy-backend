"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Database
const Database_1 = require("../config/Database");
exports.Card = Database_1.database.define('card', {
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
    rarity: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    health: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    attack: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    defense: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    evasion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    xp_limit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'card'
});
