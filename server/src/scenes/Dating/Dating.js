const { Scenes, Markup } = require("telegraf")
const ChatGPT = require("../../chatgpt")

function greetingScene() {
    const greeting = new Scenes.WizardScene(
        "CONTACT_DATA_WIZARD_SCENE_ID", // first argument is Scene_ID, same as for BaseScene
        (ctx) => {
            ctx.reply("Давайте для начала познакомимся . Как Вас зовут?")
            ctx.wizard.state.firstDialog = {}
            return ctx.wizard.next()
        },
        (ctx) => {
            // validation example
            if (ctx.message.text.length < 2) {
                ctx.reply(`Не обманывайте . Введите Ваше настоящее имя`)
                return
            }
            ctx.wizard.state.firstDialog.fio = ctx.message.text
            ctx.reply(`Какой ваш вес ${ctx.message.text}?`)
            return ctx.wizard.next()
        },
        (ctx) => {
            ctx.wizard.state.firstDialog.weight = ctx.message.text
            ctx.reply(
                "Для начала, чтобы создать эффективный план тренировок и план питания, мне нужно знать больше информации о тебе: твоем возрасте,рост,пол, текущей физической подготовке, наличии травм или заболеваний, режиме дня и сколько времени в неделю ты готов уделять тренировкам. Постарайся написать это максимально подробно для генерации наилучшего плана тренировок!"
            )
            //await mySendContactDataMomentBeforeErase(ctx.wizard.state.contactData)
            return ctx.wizard.next()
        },
        (ctx) => {
            ctx.wizard.state.firstDialog.someInfo = ctx.message.text
            ctx.reply(
                "Также важно определить конкретную цель: хотите ли вы похудеть, набрать мышечную массу, улучшить выносливость или силу. Поэтому напиши свою цель, так же можешь указать время за которое хочешь ее достичь🤠"
            )
            return ctx.wizard.next()
        },
        async (ctx) => {
            ctx.reply("Нейросеть генерирует ответ...🔍")
            ctx.wizard.state.firstDialog.goal = ctx.message.text
            const response = await ChatGPT(
                ctx.wizard.state.firstDialog.fio,
                ctx.wizard.state.firstDialog.wight,
                ctx.wizard.state.firstDialog.someInfo,
                ctx.wizard.state.firstDialog.goal
            )
            await ctx.reply(
                response,
                Markup.inlineKeyboard([Markup.button.callback("Хочу другой план", "other")])
            )
            return ctx.scene.leave()
        }
    )
    return greeting
}
module.exports.greetingScene = greetingScene()
