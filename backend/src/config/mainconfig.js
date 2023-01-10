require("dotenv").config();

const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const db = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

db.authenticate()
  .then(() => {
    console.log("Connection established.");
  })
  .catch((err) => console.error("Unable to connect. Error: ", err));

module.exports = { db: db };
