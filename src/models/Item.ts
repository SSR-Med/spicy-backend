// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const Item = database.define('item',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    xp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName:'item'
})