import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";


const router = express.Router()

router.post("/",auth('admin'), vehiclesController.postVehicles);

router.get("/", vehiclesController.getAllVehicles);

router.get('/:vehicleId',vehiclesController.getSingleVehicle)

router.put('/:vehicleId',auth('admin'),vehiclesController.UpdateVehicle)

router.delete('/:vehicleId',auth('admin'),vehiclesController.DeleteVehicle)



export const VehicleRoutes = router