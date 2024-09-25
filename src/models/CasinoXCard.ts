// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const CasinoXCard = database.define('casinoxcard',{
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_casino:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'casino',
            key: 'id'
        }
    },
    id_card:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'card',
            key: 'id'
        }
    }
})