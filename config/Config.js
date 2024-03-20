const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  database_url: process.env.DATABASE_URL,
  host: process.env.HOST,
  port: process.env.PORT,
};