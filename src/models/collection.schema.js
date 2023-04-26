import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: ["true", "Please provide the collection name"],
        trim: true,
        maxLength: [120, "Collection name should be less than 120 characters"]
    },

    description: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model("Collection", collectionSchema)