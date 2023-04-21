const jsonwebtoken = require("jsonwebtoken")
const User = require("../Model/userModel")
const expressAsyncHandler = require("express-async-handler")

const protect = expressAsyncHandler(async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(" ")[1];

            const decoder = jsonwebtoken.verify(token, process.env.PASSWORD_SECRECT)
            
            req.user = await User.findById(decoder.id).select("-password")

            if (req.user) {
                next()
            } else {
                res.status(400).json({ message: "You are login but not authorized for this action", success: false })
            }

        } else {
            res.status(400).json({ message: "Please login your account", success: false })
        }
    } catch (error) {
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

module.exports = protect