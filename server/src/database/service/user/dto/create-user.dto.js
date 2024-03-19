module.exports = class CreateUserDto {
    constructor({ uuid, name, wasPayload }) {
        this.uuid = uuid
        this.name = name
        this.wasPayload = wasPayload
    }

    getCreateData() {
        return { uuid: this.uuid, name: this.name, wasPayload: this.wasPayload }
    }
}
