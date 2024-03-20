// Dependencies
const { DataTypes } = require('sequelize');
// Modules
const { sequelize } = require('../config/Database');

const Casino_Carta = sequelize.define('Casino_Carta', {
    id_casino: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'casino',
            key: 'id'
        }
    },
    id_carta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'carta',
            key: 'id'
        }
    },
    probabilidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {tableName: 'casino_carta'});

module.exports = Casino_Carta;