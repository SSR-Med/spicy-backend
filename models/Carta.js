// Dependencies
const { DataTypes } = require('sequelize');
// Modules
const { sequelize } = require('../config/Database');
// Models
const Carta_Usuario = require('./Carta_Usuario');
const Casino_Carta = require('./Casino_Carta');
const Enemigo = require('./Enemigo');

const Carta = sequelize.define('Carta', {
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
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rareza: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ataque_base: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    defensa_base: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vida_base: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    evasion_base: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {tableName: 'carta'});

Carta.hasMany(Carta_Usuario);
Carta.hasMany(Casino_Carta);
Carta.hasMany(Enemigo);

module.exports = Carta;