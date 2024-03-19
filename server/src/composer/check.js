const { Composer, Markup } = require("telegraf")

module.exports = Composer.action("check", async (ctx) => {
    try {
        const channel = "@sportikzz"
        const updateId = ctx.chat.id
        //Функция работает для тг груп и супергруп если бот является администратором
        const member = await ctx.telegram.getChatMember(channel, updateId)
        if (
            member.status === "member" ||
            member.status === "administrator" ||
            member.status === "creator"
        ) {
            ctx.reply(
                "Проверка пройдена",
                Markup.inlineKeyboard([Markup.button.callback("Давайте познакомимся", "greeting")])
            )
        } else {
            return ctx.reply("Пользователь не подписан на канал.")
        }
    } catch (error) {
        console.error(error)
        ctx.reply("Произошла ошибка при проверке подписки на канал.")
    }
})
