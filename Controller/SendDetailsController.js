const expressAsyncHandler = require("express-async-handler");

const SendMail = expressAsyncHandler(async (req, res) => {
    try {

        const { } = req.body

        

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something wrong!", success: false, error: error })
    }
})

module.exports = { SendMail }