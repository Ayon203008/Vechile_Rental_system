import express, { Request, Response } from "express";
import { userController } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";
const router = express.Router()

router.post("/",userController.createUser)

router.get("/",logger,auth(),userController.getUser)

router.put("/:userId",userController.updateUser)

router.delete("/:userId",userController.deleteUser)

export const UserRoutes = router