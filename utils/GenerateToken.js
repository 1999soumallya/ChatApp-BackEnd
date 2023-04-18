const jsonwebtoken = require("jsonwebtoken")

const GenerateToken = (id) => {
    return jsonwebtoken.sign({ id }, process.env.PASSWORD_SECRECT)
}

module.exports = GenerateToken