// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const Card = database.define('card',{
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
    rarity: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    health:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attack:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    defense:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    evasion:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName:'card'
})