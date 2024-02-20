import config from 'config'
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import about from '../commands/about/index.js'

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
	handlerTimeout: Infinity,
})

const channels = ['-1001343518482']

bot.command('check', async ctx => {
	channels.forEach(async channel => {
		const member = await ctx.telegram.getChannelMember(channel, ctx.chat.id)
		if (
			member.status != 'member' &&
			member.status != 'administrator' &&
			member.status != 'creator'
		) {
			ctx.reply('You are not member')
		} else {
			ctx.reply('true')
		}
	})
})
bot.command('start', ctx => {
	ctx.reply(
		'Добро пожаловать к боту Жозефу! Наш бот поможет вам сбросить вес или улучшить Ваши спортивные показатели - просто напишите свой вес и как часто вы занимаетесь физическими упражнениями (так же можете написать Вашу цель в силовых упражнениях) и Жозеф напишет вам четкий план для достижения Ваших целей!'
	)
})
//Подключу команду к кнопкам .on('text', greeting())

bot.hears('hi', ctx => ctx.reply('Hey there'))
bot.hears(/money/i, ctx => ctx.reply('🤑'))
bot.command('about', about())

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
