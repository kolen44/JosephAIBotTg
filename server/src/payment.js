const { Telegraf, session, Markup } = require("telegraf")

async function preCheckoutQuery(ctx) {
    await ctx.answerPreCheckoutQuery(true)
}

async function successfulPayment(ctx) {
    const { currency, total_amount } = ctx.message.successful_payment
    const userId = ctx.from.id
    const invoiceId = ctx.message.successful_payment.invoice_payload

    console.log(
        `Получен успешный платеж от пользователя ${userId} в размере ${total_amount} ${currency}.`
    )
    console.log(`Идентификатор счета: ${invoiceId}`)
}

async function handlePayment(ctx) {
    try {
        return ctx.sendInvoice({
            chat_id: ctx.chat.id,
            title: "ctx.chat.title",
            description: "ctx.chat.description",
            payload: ctx.chat.id,
            provider_token: "381764678:TEST:80684",
            currency: "RUB",
            start_parameter: "test",
            prices: [
                {
                    label: ctx.from.first_name,
                    amount: 100000, // 1000 рублей в копейках
                },
            ],
        })
    } catch (error) {
        console.error("Ошибка при отправке счета на оплату:", error)
        ctx.reply("Произошла ошибка при отправке счета на оплату. Пожалуйста, попробуйте позже.")
    }
}
// 1111 1111 1111 1026, 12/22, CVC 000

module.exports = { handlePayment, preCheckoutQuery, successfulPayment }
