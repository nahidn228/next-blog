import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = (req: Request, res: Response) => {
  const userData = req.body;

  try {
    const result = UserService.createUser(userData);
    console.log(result);

    res.send(result);
  } catch (error) {
    console.error(error);
  }
};

export const UserController = {
  createUser,
};
