const { User } = require("../../config/connect")
const { UserQueries } = require("../../config/connect")
const { CreateUserDto } = require("./dto/create-user.dto")

module.exports = class UserService {
    /**
     * Найти пользователя по его UUID.
     * @param {number} uuid - UUID пользователя.
     * @returns {Promise<User|null>} - Промис с найденным пользователем или null, если пользователь не найден.
     */
    async findByUUID(uuid) {
        return await User.findOne({ where: { uuid }, include: [UserQueries] })
    }

    /**
     * Создать пользователя по данные из CreateUserDto.
     * @param {CreateUserDto} user
     * @returns {Promise<User>}
     */
    async create(user) {
        console.log(user.getCreateData())
        return await User.create(user.getCreateData())
    }
}
