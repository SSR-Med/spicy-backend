// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const World = database.define('world', {
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
    urlImage: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        default: false,
    }
},
{
    tableName: 'world'
})