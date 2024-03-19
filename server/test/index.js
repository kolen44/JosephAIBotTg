const { connect } = require("../src/database/config/connect.js")

const UserService = require("../src/database/service/user/user.service")
const CreateUserDto = require("../src/database/service/user/dto/create-user.dto")

const UserQueriesService = require("../src/database/service/user-queries/user-queries.service")
const UserQueriesDto = require("../src/database/service/user-queries/dto/create-user-queries.dto")

// Сервисы
const userService = new UserService()
const userQueriesService = new UserQueriesService()

async function testUserFind(uuid) {
    // Поиск пользователя по uuid
    const user = await userService.findByUUID(uuid)
    console.log(user)
    return user
}

async function testUser() {
    // Данные для пользователя
    const data = { uuid: 12831232, name: "lol", wasPayload: true }
    const createUserDto = new CreateUserDto(data)

    const newUser = userService.create(createUserDto)

    const user = await testUserFind(newUser.uuid)

    return user
}

async function testUserQueries(user) {
    // Данные для пользователя
    const createUserQueriesDto = new UserQueriesDto({ user, query: "query" })

    const userQueries = await userQueriesService.create(createUserQueriesDto)

    console.log(userQueries)
    return userQueries
}

async function main() {
    await connect()
    // const user = await testUser()
    const user = await testUserFind(12831232)

    const userQueries = await testUserQueries(user)
}

main()
