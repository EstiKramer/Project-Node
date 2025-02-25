import { Schema, model } from "mongoose";
const userSchema = Schema({
    userName: String,
    email: String,
    password: String,
    role: String,
    registration: Date
})
export const userModel = model("user", userSchema) 