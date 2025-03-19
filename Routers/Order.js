import { Router } from "express";
import AouthMiddleware from "../Middleware/Aoth.js"

import { addOrder, getAllOrders, getorderUsertId, updateOrderDispatched, deleteOrder } from "../controllers/Order.js";

const routerOrder = Router();
routerOrder.get("/",getAllOrders)
routerOrder.get("/user/:userId", getorderUsertId)
routerOrder.put("/:id",AouthMiddleware, updateOrderDispatched)
routerOrder.post("/", AouthMiddleware, addOrder)
routerOrder.delete("/:id",AouthMiddleware, deleteOrder)
export default routerOrder;