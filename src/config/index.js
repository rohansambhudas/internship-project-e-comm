import dotenv from "dotenv";

dotenv.config()

const config = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/ecomm",
    JWT_TOKEN: process.env.JWT_TOKEN || "yoursecret",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "7d"
}

export default config;