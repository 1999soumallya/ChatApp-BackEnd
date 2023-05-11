const express = require("express")
const cors = require("cors")
const ConnectDb = require("./Config/dbConnection")

require("dotenv").config()
require("colors")

const app = express()
ConnectDb()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors({ origin: true }));

app.use("/api/user", require("./Routes/UserRoute"))
app.use("/api/chat", require("./Routes/ChatRoute"))
app.use("/api/message", require("./Routes/MessageRoute"))
app.use("/api/send", require("./Routes/SendDetailsRoute"))

app.listen(PORT, () => {
    console.log(`My Server Is Run On Port ${PORT}`.yellow.bold)
});