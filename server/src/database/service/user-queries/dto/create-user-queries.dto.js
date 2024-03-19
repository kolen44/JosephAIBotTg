const { User } = require("../../../config/connect")

module.exports = class CreateUserQueriesDto {
    /**
     * Создать пользователя по данные из CreateUserDto.
     * @param {Object} data
     * @param {User} data.user
     * @param {string} data.query
     */
    constructor({ user, query }) {
        this.user = user
        this.query = query
    }

    getCreateData() {
        return { userId: this.user.id, query: this.query }
    }
}
