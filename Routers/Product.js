import { Router } from "express";

import { add, deleteById, update, getAllrPoducts, getById } from "../controllers/product";

const productRouter = Router()
productRouter.get("/",getAllrPoducts)
productRouter.get("/:id",getById)
productRouter.delete("/:id",deleteById)
productRouter.post("/",add)
productRouter.put("/:id",update)

export default productRouter;