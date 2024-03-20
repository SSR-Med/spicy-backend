const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/Database');
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

Mundo.hasMany(Mision);

module.exports = Mundo;