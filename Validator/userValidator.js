const ExpressValidator = require("express-validator")

const RegisterBodyValidator = [
    ExpressValidator.body("name").isString().notEmpty().bail(),
    ExpressValidator.body("email").isEmail().notEmpty().bail(),
    ExpressValidator.body("password").notEmpty().bail()
]

const LoginBodyVlidator = [
    ExpressValidator.body("email").notEmpty().isEmail().bail(),
    ExpressValidator.body("password").notEmpty().bail()
]

module.exports = { RegisterBodyValidator, LoginBodyVlidator }