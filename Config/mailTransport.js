const nodemailer = require("nodemailer")

const ConnectToMail = () => {
    return nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        service: process.env.SERVICE,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    })
}

module.exports = { ConnectToMail }