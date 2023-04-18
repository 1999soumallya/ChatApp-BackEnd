const ExpressValidator = require("express-validator");

const CreateGroupBodyValidate = [
    ExpressValidator.body("users").notEmpty().bail(),
    ExpressValidator.body("name").notEmpty().bail()
]

module.exports = { CreateGroupBodyValidate }