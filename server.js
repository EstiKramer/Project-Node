import express from "express"
import cors from "cors"
import fs from "fs/promises"
import dotenv from "dotenv"

import productRouter from "./Routers/Product.js"
import routerUser from "./Routers/User.js"
import routerOrder from "./Routers/Order.js"
import  {connectToDb} from "./config/db.js"


function PrintToLog(req, res, next){
    try{
        fs.appendFile("./log.txt", `${new Date().toLocaleDateString()} ${req.method} ${req.url}`)
        next();
    }
    catch(err){
        return res.status(400).json({title:"error in print to log", message:err.message})
    }
}
dotenv.config()
const app = express();
const corses = cors();
connectToDb()
app.use(PrintToLog)
app.use(express.json())
app.use("/api/product",productRouter)
app.use("/api/user",routerUser)
app.use("/api/order",routerOrder)
let port = process.env.PORT || 3000
console.log("Using port: " + port);
app.listen(port,'0.0.0.0', () => {
    console.log("app is listenning on port" + port)
})