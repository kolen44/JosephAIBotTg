const { Scenes } = require('telegraf')

function greetingScene() {
	const greeting = new Scenes.WizardScene(
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
	return greeting
}
module.exports.greetingScene = greetingScene()
