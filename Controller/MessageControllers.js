const expressAsyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const User = require("../Model/userModel");
const Chat = require("../Model/chatModel");

const SendMessage = expressAsyncHandler(async (req, res) => {
    try {
        const { content, chatId } = req.body
        const { user } = req

        let validate = validationResult(req)

        if (!validate.isEmpty()) {
            res.status(400).json({ message: "Invalid data passed into request", success: false, error: validate.array() })
            return
        }

        await Message.create({ sender: user._id, content: content, chat: chatId }).then(async (result) => {
            result = await result.populate([{ path: 'sender', select: 'name pic' }, { path: 'chat' }])
            result = await User.populate(result, { path: "chat.users", select: "name pic email" })
            // result = await result.populate("chat").execPopulate()
            await Chat.findByIdAndUpdate(chatId, { latestMessage: message }).then(() => {
                res.status(200).json(result)
            }).catch((error) => {
                res.status(400).json({ message: "Latest Message Update Failed", success: false, error: error })
            })
        }).catch((error) => {
            res.status(400).json({ message: "New Message Create Failed", success: false, error: error })
        })

    } catch (error) {
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

const AllMessages = expressAsyncHandler(async (req, res) => {
    try {

    } catch (error) {

    }
})

module.exports = { SendMessage, AllMessages }