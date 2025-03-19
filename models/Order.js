import { Schema, model, Types } from "mongoose";
const minimalProduct = Schema({
    name: String,
    price: Number,
    sizes: Number,
    // imagePuth:String
})

const orderSchema = Schema({
    date: { type: Date, default: new Date()},
    targetDate: { type: Date, default: new Date()},
    address: String,
    city: String,
    zip: Number,
    country:String,
    products: [minimalProduct],
     userId: {
        type: Types.ObjectId,
        ref: "user"
    },
    isdispatched: Boolean,
    pricesend: Number,
    finallprice: Number,

})
export const orderModel = model("order", orderSchema);