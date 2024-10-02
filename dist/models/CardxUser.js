"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardxUser = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../config/Database");
exports.CardxUser = Database_1.database.define('cardxuser', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    id_card: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'card',
            key: 'id'
        }
    },
    level: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    xp: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    attack: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    evasion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    defense: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    health: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'cardxuser',
    indexes: [{
            unique: true,
            fields: ['id_user', 'id_card']
        }]
});
