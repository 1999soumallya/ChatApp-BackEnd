const { registerUser, loginUser, allUsers } = require("../Controller/userControllers")
const protect = require("../Middleware/authMiddleware")
const { RegisterBodyValidator, LoginBodyVlidator } = require("../Validator/userValidator")

const Router = require("express").Router()

Router.route("/").post(RegisterBodyValidator, registerUser).get(protect, allUsers)
Router.post("/login", LoginBodyVlidator, loginUser)

module.exports = Router