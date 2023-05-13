const { SendMessage, AllMessages, SaveNotification, DeleteNotification, GetAllNotification } = require("../Controller/MessageControllers")
const protect = require("../Middleware/authMiddleware")
const { SendMessageValidator } = require("../Validator/messageValidator")

const Router = require("express").Router()

Router.route("/").post(protect, SendMessageValidator, SendMessage).get(GetAllNotification)
Router.route("/:chatId").get(protect, AllMessages)
Router.route("/notification").post(protect, SaveNotification).delete(protect, DeleteNotification)

module.exports = Router