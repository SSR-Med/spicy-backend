const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/Database');

const Enemigo = sequelize.define('Enemigo', {
    id_carta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'carta',
            key: 'id'
        }
    },
    id_mision: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'mision',
            key: 'id'
        }
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {tableName: 'enemigo'});

module.exports = Enemigo;