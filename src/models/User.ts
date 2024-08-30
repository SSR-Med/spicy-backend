// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";
import { roleSchema } from "../schemas/UserSchema";

export const User = database.define('user',{
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
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM,
        values: roleSchema,
        defaultValue: 'user'
    },
    objects: {
        type: DataTypes.JSONB,
        allowNull: true
    }
},
{
    tableName:'user'
})