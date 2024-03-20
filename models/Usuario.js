const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/Database');
const Carta_Usuario = require('./Carta_Usuario');
const Mision_Usuario = require('./Mision_Usuario');

const Usuario = sequelize.define('Usuario', {
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
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    objetos : {
        type: DataTypes.JSONB,
    }
}, {tableName: 'usuario'});

Usuario.hasMany(Carta_Usuario);
Usuario.hasMany(Mision_Usuario);

module.exports = Usuario;