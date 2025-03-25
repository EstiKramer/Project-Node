import { Router } from "express";
import AouthMiddleware from "../Middleware/Aoth.js"


import { add, deleteById, update, getAllrPoducts, getById } from "../controllers/product.js";

const productRouter = Router()
productRouter.get("/",getAllrPoducts)
productRouter.get("/:id",getById)
productRouter.delete("/:id", AouthMiddleware, deleteById)
productRouter.post("/", AouthMiddleware ,add)
productRouter.put("/:id", AouthMiddleware ,update)

export default productRouter;