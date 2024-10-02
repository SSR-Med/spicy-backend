"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.password_salt = exports.jwt_expires_in = exports.jwt_key = exports.endpoint_database = exports.database_port = exports.database_password = exports.database_user = exports.database_name = exports.database_host = exports.port = void 0;
// Dependencies
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Port of the service
exports.port = Number(process.env.PORT);
// Database credentials
exports.database_host = process.env.DATABASE_HOST;
exports.database_name = process.env.DATABASE_NAME;
exports.database_user = process.env.DATABASE_USER;
exports.database_password = process.env.DATABASE_PASSWORD;
exports.database_port = Number(process.env.DATABASE_PORT);
exports.endpoint_database = process.env.ENDPOINT_DATABASE;
// Token
exports.jwt_key = process.env.JWT_KEY;
exports.jwt_expires_in = process.env.JWT_EXPIRES_IN;
// Password
exports.password_salt = Number(process.env.PASSWORD_SALT);
