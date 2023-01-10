const Sequelize = require("sequelize");
const { db } = require("../config/mainconfig.js");

const category = db.define("category", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = category;
