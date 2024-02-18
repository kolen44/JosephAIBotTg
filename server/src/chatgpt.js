import config from 'config'
import OpenAI from 'openai'

const CHATGPT_MODEL = 'gpt-3.5-turbo'

const ROLES = {
	ASSISTANT: 'assistant',
	SYSTEM: 'system',
	USER: 'user',
}

const openai = new OpenAI({
	apiKey: config.get('OPENAI_KEY'),
})

const getMessage = m => `
напиши на основе этих данных: ${m} историю о том как можно похудеть 
Постарайся вникнуть в эти данные и предоставить четкий план для похудения или достижения спортивной цели . 
`

export async function ChatGPT(message = '') {
	const messages = [
		{
			role: ROLES.SYSTEM,
			content:
				'Ты опытный тренер по имени Жозеф который помогает людям худеть и напиши четкий план для похудения или достижения цели в спорте ',
		},
		{
			role: ROLES.USER,
			content: getMessage(),
		},
	]
	try {
		const response = await openai.chat.completions.create({
			messages,
			model: CHATGPT_MODEL,
		})
		return response.choices[0].message.content
	} catch (error) {
		console.error(error.message)
	}
}
