import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    orderId: String,
    name: String,
    phone: String,
    address: String,
    items: [{
        id: String,
        title: String,
        price: Number,
        image: String,
        quantity: Number,
    }],
    subtotal: Number,
    shippingCost: Number,
    total: Number,
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled"],
        default: "pending"
    },
   
    
},{timestamps: true});

export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);