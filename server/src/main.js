const config = require("config")
const { Telegraf, session, Markup } = require("telegraf")
const { message } = require("telegraf/filters")
const { Scenes } = require("telegraf")
const { stage } = require("./scenes/index.js")
const checkSubscribe = require("./composer/check.js")
const { handlePayment, preCheckoutQuery, successfulPayment } = require("./payment.js")

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"), {
    handlerTimeout: Infinity,
})

bot.action("other", (ctx) => {
    ctx.wizard.stepsctx.wizard.cursor
})
bot.use(checkSubscribe)
bot.use(session())
bot.use(stage.middleware())

bot.action("greeting", (ctx) => {
    ctx.scene.enter("CONTACT_DATA_WIZARD_SCENE_ID")
})
// const channels = ["-1001922987322"]

bot.command("start", (ctx) => {
    ctx.replyWithHTML(
        'Добро пожаловать к боту Жозефу! Наш бот поможет вам сбросить вес или улучшить Ваши спортивные показатели - просто напишите свой вес и как часто вы занимаетесь физическими упражнениями (так же можете написать Вашу цель в силовых упражнениях) и Жозеф напишет вам четкий план для достижения Ваших целей!<a href="https://t.me/sportikzz"> Но перед знакомством необходимо подписаться на тг группу</a>',
        Markup.inlineKeyboard([Markup.button.callback("Проверить подписку", "greeting")])
    )
})
//Подключу команду к кнопкам .on('text', greeting())

bot.hears(/money/i, (ctx) => ctx.reply("🤑"))

bot.command("pay", handlePayment)
// Обработка платежных уведомлений от Telegram
bot.on("pre_checkout_query", preCheckoutQuery)
bot.on("successful_payment", successfulPayment)

// bot.on(message('text'), async ctx => {
// 	try {
// 		//const response = await ChatGPT(ctx.message.text)
// 		//await ctx.reply(response)
// 	} catch (error) {
// 		console.log(error)
// 	}
// })

bot.on(message("sticker"), (ctx) => ctx.reply("👍"))

bot.launch()
console.log("Bot started")
