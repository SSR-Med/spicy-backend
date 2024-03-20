// Dependencies
const { DataTypes } = require('sequelize');
// Modules
const { sequelize } = require('../config/Database');
// Models
const Mision = require('./Mision');

const Mundo = sequelize.define('Mundo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {tableName: 'mundo'});

Mundo.hasMany(Mision, {onDelete: 'cascade'});

module.exports = Mundo;