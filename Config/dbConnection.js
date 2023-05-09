const mongoose = require("mongoose")

const ConnectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        });
        console.log(`Mongodb Connected: ${connection.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        ConnectDb()
        // process.exit();
    }
}

module.exports = ConnectDb