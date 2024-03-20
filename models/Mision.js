// Dependencies
const { DataTypes } = require('sequelize');
// Modules
const { sequelize } = require('../config/Database');
// Modles
const Mision_Usuario = require('./Mision_Usuario');
const enemigo = require('./Enemigo');

const Mision = sequelize.define('Mision', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desgaste: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    recompensa_base: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
}, {tableName: 'mision'});

Mision.hasMany(Mision_Usuario, {onDelete: 'cascade'});
Mision.hasMany(enemigo, {onDelete: 'cascade'});

module.exports = Mision;