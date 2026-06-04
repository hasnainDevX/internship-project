import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true,
        ref: "user",
    },
    items: [{
        product: {
            type: String,
            ref: "product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
        ref: "Address",
    },
    status: {
        type: String,
        required: true,
        default: "Order Placed",
    },
    date: {type: Number, required: true}
})

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;