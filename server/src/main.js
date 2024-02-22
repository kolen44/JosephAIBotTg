const config = require('config')
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
	handlerTimeout: Infinity,
})

const channels = ['-1001922987322']

bot.on('text', async ctx => {
	try {
		const channel = '@sportikzz'
		const updateId = ctx.update.message.from.id
		//Функция работает для тг каналов если бот является администратором
		const member = await ctx.telegram.getChatMember(channel, updateId)

		if (
			member.status === 'member' ||
			member.status === 'administrator' ||
			member.status === 'creator'
		) {
			ctx.reply('Пользователь подписан на канал.')
		} else {
			ctx.reply('Пользователь не подписан на канал.')
		}
	} catch (error) {
		console.error(error)
		ctx.reply('Произошла ошибка при проверке подписки на канал.')
	}
})

bot.use(async (ctx, next) => {
	const my_chat_member = ctx.update.my_chat_member
	if (my_chat_member) {
		if (['kicked', 'left'].includes(my_chat_member.new_chat_member.status)) {
			ctx.reply('Вы вышли из группы(')
			// bot was kicked
		} else if (
			['member', 'administrator'].includes(
				my_chat_member.new_chat_member.status
			)
		) {
			// bot was added to a group or channel
			ctx.reply('Вы в группы)')
		}
	}
	next()
})

bot.command('start', ctx => {
	ctx.reply(
		'Добро пожаловать к боту Жозефу! Наш бот поможет вам сбросить вес или улучшить Ваши спортивные показатели - просто напишите свой вес и как часто вы занимаетесь физическими упражнениями (так же можете написать Вашу цель в силовых упражнениях) и Жозеф напишет вам четкий план для достижения Ваших целей!'
	)
})
//Подключу команду к кнопкам .on('text', greeting())

bot.use(require('./composer/check.js'))

bot.hears('hi', ctx => ctx.reply('Hey there'))
bot.hears(/money/i, ctx => ctx.reply('🤑'))

bot.on(message('text'), async ctx => {
	try {
		//const response = await ChatGPT(ctx.message.text)
		//await ctx.reply(response)
	} catch (error) {
		console.log(error)
	}
})

bot.on(message('sticker'), ctx => ctx.reply('👍'))

bot.launch()
