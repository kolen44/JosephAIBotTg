const { Composer } = require('telegraf')
const composer = new Composer()

composer.command('check', ctx => {
	ctx.reply('Check started')
})
module.exports = composer
