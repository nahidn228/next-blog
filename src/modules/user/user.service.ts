import { Prisma, user } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.userCreateInput): Promise<user> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  return createdUser;
};

const updateUser = async (id: number, payload: Partial<user>) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return updatedUser;
};

const deleteUser = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  return deletedUser;
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
      posts: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return users;
};

const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
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
      posts: true,
    },
  });
  return result;
};

export const UserService = {
  createUser,
  updateUser,
  deleteUser,
  getAllUserFromDb,
  getUserById,
};
