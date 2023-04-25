import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";

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

// Encrypt the password before saving it in DB : Hooks
userSchema.pre("Save", async function(next){
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Methods
userSchema.methods = {
    // Compare password
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    }
}