"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemxUser = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Database
const Database_1 = require("../config/Database");
exports.ItemxUser = Database_1.database.define('itemxuser', {
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
    id_item: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'item',
            key: 'id'
        }
    }
}, {
    tableName: 'itemxuser'
});
