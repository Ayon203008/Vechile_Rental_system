import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehiclesController } from "./vehicles.controller";


const router = express.Router()

router.post("/", vehiclesController.postVehicles);

router.get("/", vehiclesController.getAllVehicles);

router.get('/:vehicleId',vehiclesController.getSingleVehicle)

router.put('/:vehicleId',vehiclesController.UpdateVehicle)

router.delete('/:vehicleId',vehiclesController.DeleteVehicle)



export const VehicleRoutes = router