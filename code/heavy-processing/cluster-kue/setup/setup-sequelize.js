/**
 *  Requires:
 *    - sequelize
 *    - Individual db driver (npm install --save ):
 *      - mysql2
 *      - pg pg-hstore  # Postgres
 *      - mariadb
 *      - sqlite3
 *      - tedious  # Microsoft SQL Server
 */

const Sequelize = require("sequelize");
const config = require("./setup-config");

let instance;

const setup = async () => {
  if (!instance) {
    const sequelize = new Sequelize(
      config.database.name,
      config.database.username,
      config.database.password,
      {
        host: config.database.host,
        port: config.database.port,
        dialect: config.database.connectionName,
      }
    );

    try {
      await sequelize.authenticate();
      console.log("Sequelize connected successfully.");
    } catch (err) {
      console.error(`Couldn't connect to Sequelize: ${err}`);
    }
  }

  return instance;
};

module.exports = setup;
