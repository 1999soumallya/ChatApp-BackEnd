const cloudinary = require("cloudinary").v2

const CloudinaryConfig = () => {
    return cloudinary.config({
        cloud_name: "dv2rk4htu",
        api_key: "869169361276533",
        api_secret: "W5uTvRMOGBA5o3sLWUFRMTHnhfY"
    })
}

module.exports = CloudinaryConfig