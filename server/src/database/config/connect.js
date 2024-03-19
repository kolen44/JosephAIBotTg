const sequelize = require("./config")
const { DataTypes } = require("sequelize")

/*
| id  | uuid    | name  | wasPayload |
| --- | ------- | ----- | ---------- |
| 1   | 5523325 | @name | true       |
*/
const User = sequelize.define("user", {
    uuid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wasPayload: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
})

/*
| id  | userId | query  |
| --- | ------ | ------ |
| 1   | 1      | Запрос |
*/
const UserQueries = sequelize.define("user_query", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    query: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

User.hasMany(UserQueries, { foreignKey: "userId" })
UserQueries.belongsTo(User, { foreignKey: "userId" })

async function connect() {
    try {
        await sequelize.sync()
        console.log("Модель синхронизирована с базой данных")
    } catch (error) {
        console.error("Ошибка синхронизации модели с базой данных:", error)
    }
}
connect()

module.exports = {
    sequelize,
    User,
    UserQueries,
    connect: connect,
}
