import { json, Request, Response } from "express";
import { authServices } from "./auth.services";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.LoginUser(email, password);
    res.status(201).json({
      success: true,
      message: "LOgin successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  loginUser,
};
