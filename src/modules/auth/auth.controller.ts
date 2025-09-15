import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginWithEmailPassword = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const result = await AuthService.loginWithEmailPassword(data);

    res.status(200).json({
      success: true,
      message: "User Login successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: (error as Error).message,
    });
  }
};

export const AuthController = {
  loginWithEmailPassword,
};
