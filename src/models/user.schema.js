import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: ["true", "Name is required"],
        maxLength: [120, "Name should be less than 120 characters"],
    },

    email: {
        type: String,
        required: ["true", "Email is required"]
    },

    password: {
        type: String,
        required: ["true", "Password is required"],
        minLength: [8, "Password must be at least 8 characters"],
        select: false
    },

    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: String
}, {timestamps: true})