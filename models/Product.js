import { Schema, model } from "mongoose";

const productSchema = Schema({
    productName:String,
    description: String,
    DateOfManufacture:{type:Date, default:new Date()},
    imagePath: String,
    price: Number,
    sizes: [{ size: Number, stock: Number }],
    type: [String]
})

export const productModel = model ("product", productSchema);