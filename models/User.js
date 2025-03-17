import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"; 



const userSchema = Schema({
    userName: String,
    email:  { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    registration: { type: Date, default: Date.now }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
        return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const passwordString = String(this.password);  
        this.password= await bcrypt.hash(passwordString, salt)
        next()
    }catch(err){
        next(err)
    }
})
export const userModel = model("user", userSchema) 