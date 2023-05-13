const express = require("express")
const cors = require("cors")
const ConnectDb = require("./Config/dbConnection")
const { Server } = require("socket.io")

require("dotenv").config()
require("colors")

const app = express()
ConnectDb()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors({ origin: true }));
app.use(express.static("public"));

app.use("/api/user", require("./Routes/UserRoute"))
app.use("/api/chat", require("./Routes/ChatRoute"))
app.use("/api/message", require("./Routes/MessageRoute"))
app.use("/api/send", require("./Routes/SendDetailsRoute"))

const server = app.listen(PORT, () => {
    console.log(`My Server Is Run On Port ${PORT}`.yellow.bold)
});

const io = new Server(server, ({
    pingTimeout: 60000,
    cors: {
        origin: process.env.ORIGIN_URL
    }
}))

io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        socket.join(userData.id)
        socket.emit("connected")
    })

    socket.on("join chat", (room_id) => {
        socket.join(room_id)
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessage) => {
        if (!newMessage.chat.users) return console.log("No user in this chat");
        newMessage.chat.users.forEach(users => {
            if (users._id == newMessage.sender._id) return
            socket.in(users._id).emit("message recive", newMessage)
        });
    })

})