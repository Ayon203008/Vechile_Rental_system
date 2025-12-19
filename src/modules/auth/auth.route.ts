import { Router } from "express";
import { authController } from "./auth.controller";

///api/v1/auth/signup
///api/v1/auth/signin

const router = Router()

router.post('/signin',authController.loginUser)

export const authRoutes = router