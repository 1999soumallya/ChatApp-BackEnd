const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dv2rk4htu/image/upload/v1681739813/87-1024_i220jr.png"
    }
}, { timestamps: true })

userSchema.pre("save", async function (req, res, next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcryptjs.compare(enterPassword, this.password);
};

const User = mongoose.model("User", userSchema)

module.exports = User