import { DataTypes } from "sequelize";
import { database } from "../config/Database";

export const CardxUser = database.define('cardxuser', {
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
    id_card: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'card',
            key: 'id'
        }
    },
    level :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    xp :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attack :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    evasion :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    defense :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    health :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'cardxuser',
    indexes: [{
        unique: true,
        fields: ['id_user', 'id_card']
    }]

})