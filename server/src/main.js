import config from 'config'
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { ChatGPT } from './chatgpt.js'

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
	handlerTimeout: Infinity,
})
bot.command('start', ctx => {
	ctx.reply(
		'Добро пожаловать к боту Жозефу! Наш бот поможет вам сбросить вес или улучшить Ваши спортивные показатели - просто напишите свой вес и как часто вы занимаетесь физическими упражнениями (так же можете написать Вашу цель в силовых упражнениях) и Жозеф напишет вам четкий план для достижения Ваших целей!'
	)
})

bot.on(message('text'), async ctx => {
	try {
		const response = await ChatGPT(ctx.message.text)
		await ctx.reply(response)
	} catch (error) {
		console.log(error)
	}
})

bot.launch()
