const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/Database');

const Carta_Usuario = sequelize.define('Carta_Usuario', {
    id_carta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'carta',
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
    nivel : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ataque: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    defensa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vida: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    evasion : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {tableName: 'carta_usuario'});

module.exports = Carta_Usuario;