const mongoose = require("mongoose")

const NotificationSchima = mongoose.Schema({
    notificationMessages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    reciver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isSeened: {
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model('Notification', NotificationSchima)