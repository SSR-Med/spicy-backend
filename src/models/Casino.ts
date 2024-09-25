// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const Casino = database.define('casino',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
},{
    tableName:'casino'
})