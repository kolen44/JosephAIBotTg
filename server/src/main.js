const config = require('config')
const { Telegraf, session, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
const { Scenes } = require('telegraf')

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
	handlerTimeout: Infinity,
})

const contactDataWizard = new Scenes.WizardScene(
	'CONTACT_DATA_WIZARD_SCENE_ID', // first argument is Scene_ID, same as for BaseScene
	ctx => {
		ctx.reply('Давайте для начала познакомимся . Как Вас зовут?')
		ctx.wizard.state.contactData = {}
		return ctx.wizard.next()
	},
	ctx => {
		// validation example
		if (ctx.message.text.length < 2) {
			ctx.reply(`Не обманывайте . Введите Ваше настоящее имя`)
			return
		}
		ctx.wizard.state.contactData.fio = ctx.message.text
		check(ctx)
		ctx.reply(`Какой ваш вес ${ctx.message.text}?`)
		return ctx.wizard.next()
	},
	async ctx => {
		ctx.wizard.state.contactData.weight = ctx.message.text.replace('кг', '')
		ctx.reply(
			'Введите вашу спортивную цель и можем приступать к созданию плана...'
		)
		//await mySendContactDataMomentBeforeErase(ctx.wizard.state.contactData)
		return ctx.scene.leave()
	}
)
const stage = new Scenes.Stage([contactDataWizard])
bot.use(session())
bot.use(stage.middleware())

bot.action('greeting', ctx => ctx.scene.enter('CONTACT_DATA_WIZARD_SCENE_ID'))

const channels = ['-1001922987322']

async function check(ctx) {
	try {
		const channel = '@sportikzz'
		const updateId = ctx.update.message.from.id
		//Функция работает для тг груп и супергруп если бот является администратором
		const member = await ctx.telegram.getChatMember(channel, updateId)

		if (
			member.status === 'member' ||
			member.status === 'administrator' ||
			member.status === 'creator'
		) {
		} else {
			ctx.reply('Пользователь не подписан на канал.')
		}
	} catch (error) {
		console.error(error)
		ctx.reply('Произошла ошибка при проверке подписки на канал.')
	}
}

bot.command('start', ctx => {
	ctx.replyWithHTML(
		'Добро пожаловать к боту Жозефу! Наш бот поможет вам сбросить вес или улучшить Ваши спортивные показатели - просто напишите свой вес и как часто вы занимаетесь физическими упражнениями (так же можете написать Вашу цель в силовых упражнениях) и Жозеф напишет вам четкий план для достижения Ваших целей!<a href="https://t.me/sportikzz"> Но перед знакомством необходимо подписаться на тг группу</a>',
		Markup.inlineKeyboard([
			Markup.button.callback('Давайте познакомимся', 'greeting'),
		])
	)
})
//Подключу команду к кнопкам .on('text', greeting())

bot.use(require('./composer/check.js'))

bot.hears(/money/i, ctx => ctx.reply('🤑'))

// bot.on(message('text'), async ctx => {
// 	try {
// 		//const response = await ChatGPT(ctx.message.text)
// 		//await ctx.reply(response)
// 	} catch (error) {
// 		console.log(error)
// 	}
// })

bot.on(message('sticker'), ctx => ctx.reply('👍'))

bot.launch()
