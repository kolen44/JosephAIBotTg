const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("josephaibottg_database", "postgres", "password", {
    host: "localhost",
    dialect: "postgres",
})

module.exports = sequelize
