import createDebug from 'debug'

import packag from '../../package.json' with { type: "json" }
const { author, homepage, name, version } = packag

const debug = createDebug('bot:about_command')

const about = () => ctx => {
	const message = `*${name} *\n*Version*:${version}*\nMain developer(s)*: ${author}`
	debug(`Triggered "about" command with message \n${message}`)

	return ctx.replyWithMarkdown(message)
}

export default about
