const expressAsyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const User = require("../Model/userModel");
const Chat = require("../Model/chatModel");
const Message = require("../Model/messageModel")
const Notification = require("../Model/notificationModel")

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
            result = await result.populate([{ path: 'sender', select: 'name picture' }, { path: 'chat' }])
            result = await User.populate(result, { path: "chat.users", select: "name picture email" })

            await Chat.findByIdAndUpdate(chatId, { latestMessage: result }).then(() => {
                res.status(200).json(result)
            }).catch((error) => {
                res.status(400).json({ message: "Latest Message Update Failed", success: false, error: error })
            })
        }).catch((error) => {
            res.status(400).json({ message: "New Message Create Failed", success: false, error: error })
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

const AllMessages = expressAsyncHandler(async (req, res) => {
    try {

        const { chatId } = req.params

        await Message.find({ chat: chatId }).populate([{ path: "sender", select: "name picture email" }, { path: "chat" }]).then((allChats) => {
            res.status(200).json(allChats)
        }).catch((error) => {
            res.status(400).json({ message: "Message fetching failed", success: false, error: error })
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

const SaveNotification = expressAsyncHandler(async (req, res) => {
    try {
        const { MessageId, UserID } = req.body

        await Notification.create({ notificationMessages: MessageId, reciver: UserID }).then(async (result) => {
            result = await result.populate([{ path: "notificationMessages" }, { path: "reciver" }])
            result = await Chat.populate(result, { path: "notificationMessages.chat" })
            result = await User.populate(result, { path: "notificationMessages.chat.users", select: "name" })
            res.status(200).json(result)
        }).catch((error) => {
            res.status(400).json({ message: "Notification saved failed", success: false, error: error })
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

const DeleteNotification = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.query

        await Notification.deleteOne({ "_id": `${id}` }).then(() => {
            res.status(200).json({ message: "Notification delete successfull", success: true })
        }).catch((error) => {
            res.status(400).json({ message: "Notification delete failed", success: false, error: error })
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something wrong!", success: false, error: error.message })
    }
})

const GetAllNotification = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.query

        await Notification.find({ reciver: `${id}` }).populate([{ path: "notificationMessages" }, { path: "reciver" }]).then(async (result) => {
            result = await Chat.populate(result, { path: "notificationMessages.chat" })
            result = await User.populate(result, { path: "notificationMessages.chat.users", select: "name" })
            res.status(200).json(result)
        }).catch((error) => {
            console.log(error)
            res.status(400).json({ message: "Notification getting failed", success: false, error: error })
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something wrong!", success: false, error: error.message })
    }
})

module.exports = { SendMessage, AllMessages, SaveNotification, DeleteNotification, GetAllNotification }