"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
// Dependencies
const { Sequelize } = require('sequelize');
// Env variables
const Constants_1 = require("./Constants");
exports.database = new Sequelize({
    host: Constants_1.database_host,
    database: Constants_1.database_name,
    username: Constants_1.database_user,
    password: Constants_1.database_password,
    port: Constants_1.database_port,
    dialect: 'postgres',
    logging: false,
    "dialectOptions": {
        "ssl": {
            "require": true
        }
    },
    connection: {
        options: `project=${Constants_1.endpoint_database}`,
    }
});
