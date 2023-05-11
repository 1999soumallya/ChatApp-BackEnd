const ExpressValidator = require("express-validator");

const SendMessageValidator = [
    ExpressValidator.body("content").notEmpty().bail(),
    ExpressValidator.body("chatId").notEmpty().bail()
]

module.exports = { SendMessageValidator }