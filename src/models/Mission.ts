// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const Mission = database.define('mission', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.STRING,
    },
    worldId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'world',
            key: 'id'
        }
    }
},{
    tableName: 'mission'
})