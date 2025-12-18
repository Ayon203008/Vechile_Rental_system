import express, { Request, Response } from "express";
import { userController } from "./user.controller";
const router = express.Router()

router.post("/",userController.createUser)

router.get("/",userController.getUser)

router.put("/:userId",userController.updateUser)

router.delete("/:userId",userController.deleteUser)

export const UserRoutes = router