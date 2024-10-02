"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamCard = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../config/Database");
exports.TeamCard = Database_1.database.define('teamcard', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    userCardId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'cardxuser',
            key: 'id'
        }
    }
}, {
    tableName: 'teamCard'
});
