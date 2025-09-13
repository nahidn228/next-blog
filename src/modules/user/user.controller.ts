import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    console.log(result);

    res.send(result);
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const result = await UserService.getAllUserFromDb();
  res.send(result);
};

export const UserController = {
  createUser,
  getAllUsers
};
