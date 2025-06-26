import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: String,
    title: String,
    slug:String,
    description: String,
    price: Number,
    discountPrice: Number,
    image: String,
    stock: Number,
},{timestamps: true});

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);