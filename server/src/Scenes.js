import Scene from 'telegraf'

export class SceneGenerator {
	GenAgeScene() {
		const age = new Scene('age')
		age.enter(async ctx => {
			await ctx.reply('Hello! Ты вошел в сцену общения укажи возраст')
		})
		age.on('text', async ctx => {
			const currAge = Number(ctx.message.text)
			if (currAge && currAge > 0) {
				await ctx.reply('Thanks for respond')
				ctx.scene.enter('name')
			} else {
				await ctx.reply('Bro... укажи реальный возраст!')
				ctx.scene.reenter()
			}
		})
		age.on('message', ctx => ctx.reply('Мне нужен твой возраст...'))
		return age
	}
	GenNameScene() {
		const name = new Scene('name')
		name.enter(ctx => ctx.reply('Как тебя зовут'))
		name.on('text', async ctx => {
			const name = ctx.message.text
			if (name) {
				ctx.reply('Благодарю за ввод имени,' + name)
				await ctx.scene.leave()
			} else {
				ctx.reply('Я так и не понял как тебя зовут...')
				scene.reenter()
			}
		})
		return name
	}
}
