const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/Database');
const Casino_Carta = require('./Casino_Carta');

const Casino = sequelize.define('Casino', {
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
    coste: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {tableName: 'casino'});

Casino.hasMany(Casino_Carta);
module.exports = Casino;