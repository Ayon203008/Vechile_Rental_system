import { Request, Response } from "express";
import { UserServices } from "./user.services";


const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  try {
    const result = await UserServices.Createuser(name, email, password, phone, role)
    res.status(201).json({
      success: true,
      message: "User added successfully",
      vehicle: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: "False",
      message: err.message,
    });
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.GetUser()
    res.status(200).json({
      success: true,
      message: "All Users get successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { name, email, password, phone,role } = req.body;
  const userId = req.params.userId;
  const currentUser = req.user as {id:string;role:string}
console.log("CURRENT USER IN UPDATE ===>", currentUser);
  console.log("PARAM USER ID ===>", userId);
  try {

    if(currentUser.role!=="admin" && currentUser.id!==userId){
      return res.status(403).json({
        success: false,
        message: "You can update your profile only"
      });
    }


    const result = await UserServices.UpdateUser(name, email, password, phone,role,req.params.userId! )



    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "user  not fould",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Updated successfully",
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


const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.DeleteUser(req.params.userId!)
    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "User not fould",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User DELETED successfully",
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

export const userController = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}