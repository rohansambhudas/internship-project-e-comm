import mongoose from "mongoose";
import orderStatus from "../utils/orderStatus";

const orderSchema = new mongoose.Schema({
    product: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                count: Number,
                price: Number
            }
        ],
        required: ["true", "Please provide a product"],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: ["true", "Please provide the User Id"]
        },
        address: {
            type: String,
            required: ["true", "Please provide user address"]
        },
        phoneNumber: {
            type: Number,
            required: ["true", "Please provide user phone number"]
        },
        amount: {
            type: Number,
            required: ["true", "Please provide amount"]
        },
        coupon: String,
        transactionId: String,
        status: {
            type: String,
            enum: Object.values(orderStatus),
            default: orderStatus.ORDERED
        }
    }
}, {timestamps: true})

export default mongoose.model("Order", orderSchema)