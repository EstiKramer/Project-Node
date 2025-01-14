import { Router } from "express";
import {add_signUp, getStudentByNamePassword_Login, getAllusers, updateUserDetails, updateUserPassword ,getById} from "../controllers/User.js"
const routerUser = Router()
routerUser.get("/",getAllusers)
routerUser.get("/:id",getById)
routerUser.put("/:id",updateUserDetails)
routerUser.put("/:id",updateUserPassword)
routerUser.post("/",add_signUp)
routerUser.post("/login",getStudentByNamePassword_Login)
export default routerUser;