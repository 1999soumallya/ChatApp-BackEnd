const expressAsyncHandler = require("express-async-handler");
const Chat = require("../Model/chatModel");
const User = require("../Model/userModel");
const { validationResult } = require("express-validator");

const accessChat = expressAsyncHandler(async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            res.status(400).send("Please provide a userid")
        }

        let isChat = await Chat.find({ isGroupChat: false, $and: [{ users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: userId } } }] }).populate("users", "-password").populate("latestMessage")

        isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "name picture email" })

        if (isChat.length > 0) {
            res.status(200).send(isChat[0])
        } else {
            const chatData = { chatName: "Sender", isGroupChat: false, users: [req.user._id, userId] }

            await Chat.create(chatData).then(async (chatDetails) => {
                await Chat.findOne({ _id: chatDetails._id }).populate("users", "-password").then((result) => {
                    if (result) {
                        res.status(200).send(result)
                    }
                }).catch((error) => {
                    console.log(error)
                    res.status(400).send("Full chat access failed")
                })
            }).catch((error) => {
                console.log(error)
                res.status(400).send("Chat create failed")
            })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send("Something wrong!")
    }
})

const fetchChats = expressAsyncHandler(async (req, res) => {
    try {

        const { user } = req

        await Chat.find({ users: { $elemMatch: { $eq: user._id } } }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 }).then(async (chats) => {
            chats = await User.populate(chats, { path: "latestMessage.sender", select: "name pic email" })
            res.status(200).send(chats)
        }).catch((error) => {
            res.status(400).json({ message: "Chat fetching failed", success: false, error: error })
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

const createGroupChat = expressAsyncHandler(async (req, res) => {
    try {

        const { users, name } = req.body

        let validate = validationResult(req)

        if (!validate.isEmpty()) {
            res.status(400).json({ message: "Please fill all the details", success: false, error: validate.array() })
        }

        let user = JSON.parse(users)

        if (user.length < 2) {
            res.status(400).json({ message: "More than 2 users are required to form a group chat", success: false })
        }

        user.push(req.user);

        await Chat.create({ chatName: name, users: user, isGroupChat: true, groupAdmin: req.user }).then(async (created) => {
            await Chat.find({ _id: created._id }).populate("users", "-password").populate("groupAdmin", "-password").then((result) => {
                res.status(200).send(result)
            }).catch((error) => {
                console.log(error)
                res.status(400).json({ message: "Chats fatching failed", success: false, error: error })
            })
        }).catch((error) => {
            console.log(error)
            res.status(400).json({ message: "Group Create failed", success: false, error: error })
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

const renameGroup = expressAsyncHandler(async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup }