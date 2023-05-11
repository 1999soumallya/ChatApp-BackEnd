const fs = require("fs")
const { ConnectToMail } = require("../Config/mailTransport")

const EmailSend = async (data, token, email) => {
    return new Promise((resolve, reject) => {
        let TemplateContent = fs.readFileSync("/Public/EmailTemplate/ResetPasswordTemplate.html")

        ConnectToMail().sendMail({
            from: process.env.USERNAME,
            to: `${email}`,
            subject: "Reset your Talk-A-Tive password",
            html: TemplateContent
        }).then((sendSuccess) => {
            resolve(sendSuccess)
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports = { EmailSend }