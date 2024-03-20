// Dependencies
const { DataTypes } = require('sequelize');
// Modules
const { sequelize } = require('../config/Database');

const Mision_Usuario = sequelize.define('Mision_Usuario', {
    id_mision: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'mision',
            key: 'id'
        }
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'usuario',
            key: 'id'
        }
    },
}, {tableName: 'mision_usuario'});

module.exports = Mision_Usuario;