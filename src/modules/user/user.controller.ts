import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    console.log(result);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDb();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await UserService.getUserById(Number(id));
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
};
