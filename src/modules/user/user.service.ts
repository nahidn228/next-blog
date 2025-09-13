import { Prisma, user } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.userCreateInput): Promise<user> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  return createdUser;
};

const getAllUserFromDb = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      // password: false,
      role: true,
      phone: true,
      picture: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return users;
};

export const UserService = {
  createUser,
  getAllUserFromDb,
};
