// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const ItemxUser = database.define('itemxuser',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    id_item: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'item',
            key: 'id'
        }
    }
},{
    tableName:'itemxuser'
})