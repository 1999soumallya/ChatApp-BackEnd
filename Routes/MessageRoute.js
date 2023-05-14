const { SendMessage, AllMessages, SaveNotification, DeleteNotification, GetAllNotification, DeleteAllNotificationForSingleChat } = require("../Controller/MessageControllers")
const protect = require("../Middleware/authMiddleware")
const { SendMessageValidator } = require("../Validator/messageValidator")

const Router = require("express").Router()

Router.route("/").post(protect, SendMessageValidator, SendMessage).get(protect, GetAllNotification)
Router.route("/:chatId").get(protect, AllMessages)
Router.route("/notification").post(protect, SaveNotification).delete(protect, DeleteNotification)
Router.delete("/allnotificationdelete/:chatId", DeleteAllNotificationForSingleChat)

module.exports = Router