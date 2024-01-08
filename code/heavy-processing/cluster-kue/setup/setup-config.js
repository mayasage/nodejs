require("dotenv").config();

const {
  DB_CONNECTION,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} = process.env;

const config = {
  database: {
    connectionName: DB_CONNECTION,
    host: DB_HOST,
    name: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
    username: DB_USERNAME
  },
};

module.exports = config;
