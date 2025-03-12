// import express from "express"
// import cors from "cors"
// import fs from "fs/promises"
// import dotenv from "dotenv"

// import productRouter from "./Routers/Product.js"
// import routerUser from "./Routers/User.js"
// import routerOrder from "./Routers/Order.js"
// import  {connectToDb} from "./config/db.js"


// function PrintToLog(req, res, next){
//     try{
//         fs.appendFile("./log.txt", `${new Date().toLocaleDateString()} ${req.method} ${req.url}`)
//         next();
//     }
//     catch(err){
//         return res.status(400).json({title:"error in print to log", message:err.message})
//     }
// }
// dotenv.config()
// const app = express();
// app.use(cors({
//     origin: "*", // אם אתה רוצה לאפשר לכל דומיין
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // כל המתודולוגיות שיכולות לעבוד
//     allowedHeaders: ["Content-Type", "Authorization"] // אם יש צורך
// }));


// connectToDb()
// app.use(PrintToLog)
// app.use(express.json())
// app.options("*", cors());
// app.use(cors({ origin: "*" }));

// app.use("/api/product",productRouter)
// app.use("/api/user",routerUser)
// app.use("/api/order",routerOrder)
// app.options("*", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.sendStatus(200);
// });

// let port = process.env.PORT || 3000
// app.listen(port,'0.0.0.0', () => {
//     console.log("app is listenning on port" + port)
// })


import express from "express";
import cors from "cors";
import fs from "fs/promises";
import dotenv from "dotenv";

import productRouter from "./Routers/Product.js";
import routerUser from "./Routers/User.js";
import routerOrder from "./Routers/Order.js";
import { connectToDb } from "./config/db.js";

dotenv.config();
const app = express();


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

async function PrintToLog(req, res, next) {
    try {
        await fs.appendFile("./log.txt", `${new Date().toISOString()} ${req.method} ${req.url}\n`);
        next();
    } catch (err) {
        res.status(500).json({ title: "Error in print to log", message: err.message });
    }
}

app.use(PrintToLog);
connectToDb();


app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});


app.use("/api/product", productRouter);
app.use("/api/user", routerUser);
app.use("/api/order", routerOrder);
app.use("/images",express.static(path.join(__dirname,"./Public/images")));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});

