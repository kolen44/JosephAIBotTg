const { UserQueries } = require("../../config/connect")
const { CreateUserQueriesDto } = require("./dto/create-user-queries.dto")

module.exports = class UserQueriesService {
    /**
     * Создать пользователя по данные из CreateUserDto.
     * @param {CreateUserQueriesDto} userQueries
     * @returns {Promise<UserQueries>}
     */
    async create(userQueries) {
        console.log(userQueries.getCreateData())
        return await UserQueries.create(userQueries.getCreateData())
    }
}
