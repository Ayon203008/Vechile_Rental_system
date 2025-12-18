import { Request, Response } from "express";
import { pool } from "../../config/db";
import { VehicleServices } from "./vehicles.services";


const postVehicles = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  try {
    const result = await VehicleServices.postVehicles(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    );
    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: "False",
      message: err.message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await VehicleServices.getVehicles();
    res.status(200).json({
      success: true,
      message: "All vechiles get successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await VehicleServices.getSingleVehicle(
      req.params.vehicleId!
    );

    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "Vechile not fould",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vechile get successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const UpdateVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  try {
    const result = await VehicleServices.updateVehicle(vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
    req.params.vehicleId!

)
    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "Vechile not fould",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vechile Updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const DeleteVehicle = async (req: Request, res: Response) => {
    try {
      const result = await VehicleServices.deleteVehicle(req.params.vehicleId!)

      if (result.rows.length == 0) {
        res.status(404).json({
          success: false,
          message: "Vechile not fould",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Vechile DELETED successfully",
          data: null,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }



export const vehiclesController = {
  postVehicles,
  getAllVehicles,
  getSingleVehicle,
  UpdateVehicle,
  DeleteVehicle
};
