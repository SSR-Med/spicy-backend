// Dependencies
import dotenv from "dotenv";
dotenv.config();

// Port of the service
export const port = Number(process.env.PORT);

// Database credentials
export const database_host = process.env.DATABASE_HOST;
export const database_name = process.env.DATABASE_NAME;
export const database_user = process.env.DATABASE_USER;
export const database_password = process.env.DATABASE_PASSWORD;
export const database_port = Number(process.env.DATABASE_PORT);
export const endpoint_database = process.env.ENDPOINT_DATABASE;
// Token
export const jwt_key = process.env.JWT_KEY;
export const jwt_expires_in = process.env.JWT_EXPIRES_IN;
// Password
export const password_salt = Number(process.env.PASSWORD_SALT);