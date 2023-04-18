const expressAsyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const User = require("../Model/userModel")
const GenerateToken = require("../utils/GenerateToken")

const registerUser = expressAsyncHandler(async (req, res) => {
    try {
        const { name, email, password, picture } = req.body

        const validateresult = validationResult(req)

        if (!validateresult.isEmpty()) {
            res.status(400).json({ message: "Please fill all details to register", success: false, error: validateresult.array() })
        }

        const UserExsist = await User.findOne({ email })

        if (UserExsist) {
            res.status(400).json({ message: "User already exsist", success: false, details: UserExsist })
        }

        const user = await User.create({ name, email, password, picture })

        if (user) {
            res.status(200).json({ message: "You are successfully register", success: true, details: { id: user._id, name: user.name, email: user.email, picture: user.picture }, token: await GenerateToken(user._id) })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something wrong", success: false, error: error.message })
    }
})

const loginUser = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body

        const validateresult = validationResult(req)

        if (!validateresult.isEmpty()) {
            res.status(400).json({ message: "Please fill all fields to login", success: false, error: validateresult.array() })
        }

        const UserFind = await User.findOne({ email })

        if (UserFind && (await UserFind.matchPassword(password))) {
            res.status(200).json({ message: "Login Success", success: true, details: { id: UserFind._id, name: UserFind.name, email: UserFind.email, picture: UserFind.picture }, token: await GenerateToken(UserFind._id) })
        } else {
            res.status(400).json({ message: "User not found", success: false })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something wrong", success: false, error: error.message })
    }
})

const allUsers = expressAsyncHandler(async (req, res) => {
    try {
        const search = (JSON.stringify(req.query) != "{}") ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ]
        } : {}

        const users = await User.find(search).find({ _id: { $ne: req.user._id } })

        if (users && users.length > 0) {
            res.status(200).json({ message: "Find all the users", success: true, users: users })
        } else {
            res.status(200).json({ message: "Find all the users", success: true, users: [] })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something wrong", success: false, error: error })
    }
})

module.exports = { registerUser, loginUser, allUsers }