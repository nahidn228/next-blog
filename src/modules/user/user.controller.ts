import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    console.log(result);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: (error as Error).message,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDb();
    res.status(201).json({
      success: true,
      message: "User Retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: (error as Error).message,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await UserService.getUserById(Number(id));
    res.status(201).json({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to Get User",
      error: (error as Error).message,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
};
