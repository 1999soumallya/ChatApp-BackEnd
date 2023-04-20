const ExpressValidator = require("express-validator");

const CreateGroupBodyValidate = [
    ExpressValidator.body("users").notEmpty().bail(),
    ExpressValidator.body("name").notEmpty().bail()
]

const RenameGroupBodyValidator = [
    ExpressValidator.body("chatId").notEmpty().bail(),
    ExpressValidator.body("chatName").notEmpty().bail()
]

module.exports = { CreateGroupBodyValidate, RenameGroupBodyValidator }