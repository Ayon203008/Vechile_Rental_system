import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehiclesController } from "./vehicles.controller";


const router = express.Router()

// post the vehicles data to the backend
router.post("/", vehiclesController.postVehicles);

// get the vehicles data

router.get("/", vehiclesController.getAllVehicles);




export const UserRoutes = router