const Sequelize = require("sequelize");
const { db } = require("../config/mainconfig.js");

const note = db.define("note", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    archived: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
});

module.exports = note;
