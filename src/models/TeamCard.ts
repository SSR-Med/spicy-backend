import { DataTypes } from "sequelize";
import { database } from "../config/Database";

export const TeamCard = database.define('teamcard', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    userCardId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'cardxuser',
            key: 'id'
        }
    }
}, {
    tableName: 'teamCard'
})