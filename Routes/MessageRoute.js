const { SendMessage, AllMessages } = require("../Controller/MessageControllers")
const protect = require("../Middleware/authMiddleware")
const { SendMessageValidator } = require("../Validator/messageValidator")

const Router = require("express").Router()

Router.route("/").post(protect, SendMessageValidator ,SendMessage)
Router.route("/:chatId").get(protect, AllMessages)

module.exports = Router