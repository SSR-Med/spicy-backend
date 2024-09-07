// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const Enemy = database.define('enemy',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    cardId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'card',
            key: 'id'
        }
    },
    missionId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'mission',
            key: 'id'
        }
    }
}, {
    tableName: 'enemy'
})