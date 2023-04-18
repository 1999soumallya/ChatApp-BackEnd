const Router = require("express").Router()

const { accessChat, fetchChats, createGroupChat, renameGroup } = require("../Controller/chatControllers");
const protect = require("../Middleware/authMiddleware");
const { CreateGroupBodyValidate } = require("../Validator/chatValidator");

Router.route("/").post(protect, accessChat).get(protect, fetchChats)
Router.route("/group_settings").post(protect, CreateGroupBodyValidate ,createGroupChat).put(protect, renameGroup)
// Router.route("/remove_user").put(protect, removeFromGroup)
// Router.route("/add_user_in_group").put(protect, addToGroup)

module.exports = Router