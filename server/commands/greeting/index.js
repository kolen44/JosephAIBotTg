import createDebug from 'debug'

const debug = createDebug('bot:greeting_textas')

const replyToMessage = (ctx, messageId, string) =>
	ctx.reply(string, {
		reply_to_message_id: messageId,
	})

const greeting = () => ctx => {
	debug('Triggered "greeting" text command')

	const messageId = ctx.message?.message_id
	const userName = `${ctx.message?.from.first_name} ${
		ctx.message?.from.last_name ? ctx.message?.from.last_name : ''
	}`

	if (messageId) {
		replyToMessage(
			ctx,
			messageId,
			`Привет, ${userName}! Напиши вопрос который тебя интересует и я обязательно отвечу!`
		)
	}
}

export default greeting
