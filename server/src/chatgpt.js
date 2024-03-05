const config = require('config')
const OpenAI = require('openai')

const CHATGPT_MODEL = 'gpt-3.5-turbo'

const ROLES = {
	ASSISTANT: 'assistant',
	SYSTEM: 'system',
	USER: 'user',
}

const openai = new OpenAI({
	apiKey: config.get('OPENAI_KEY'),
})

const getMessage = (name, weight, info, goal) => `
Привет, меня зовут ${name} , я вешу ${weight} ,вот некоторая информация обо мне которая может помочь тебе сгенерировать ответ - ${info}, моя спортивная цель - ${goal}
Постарайся вникнуть в эти данные и предоставить четкий план тренировок и хороший план питания. Так же нужно что бы этот план был  хорошим и понятным насколько это возможно без каких либо уточнений! Сгенерируй ответ основываясь только на тех данных которые я тебе предоставил , не переспрашивай и не задавай уточняющие вопросы . Постарайся составить план тренировок учитывая отдых для организма и учитывай некоторые дни отдыха .
`

module.exports = async function ChatGPT(name, weight, info, goal) {
	const messages = [
		{
			role: ROLES.SYSTEM,
			content:
				'Ты опытный тренер по имени Жозеф который помогает людям достигать спортивных целей с помощью самых четких планов и Подготовь план тренировок , а так же Составь план питания для конкретной цели',
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
