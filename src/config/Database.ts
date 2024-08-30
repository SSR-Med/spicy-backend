// Dependencies
const {Sequelize} = require('sequelize');
// Env variables
import { database_name, database_host, database_password, database_port, database_user, endpoint_database } from './Constants';

export const database= new Sequelize({
    host: database_host,
    database: database_name,
    username: database_user,
    password: database_password,
    port: database_port,
    dialect: 'postgres',
    logging: false,
    "dialectOptions": {
      "ssl":{
        "require": true
      }
    },
    connection: {
      options: `project=${endpoint_database}`,
    }
});