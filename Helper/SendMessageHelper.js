const client = require("twilio")(process.env.TWILLO_SID, process.env.TWILLO_TOKEN)

const SendMessage = async (receiver, messageBody) => {
    return new Promise((resolve, reject) => {
        client.messages.create({ body: messageBody, from: process.env.TWILLO_NUMBER, to: receiver }).then((messages) => {
            resolve(messages)
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports = { SendMessage }