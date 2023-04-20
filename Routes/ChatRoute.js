const Router = require("express").Router()

const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../Controller/chatControllers");
const protect = require("../Middleware/authMiddleware");
const { CreateGroupBodyValidate, RenameGroupBodyValidator } = require("../Validator/chatValidator");

Router.route("/").post(protect, accessChat).get(protect, fetchChats)
Router.route("/group_settings").post(protect, CreateGroupBodyValidate, createGroupChat).put(protect, RenameGroupBodyValidator, renameGroup)
Router.route("/add_user_in_group").put(protect, addToGroup)
Router.route("/remove_user").put(protect, removeFromGroup)

module.exports = Router