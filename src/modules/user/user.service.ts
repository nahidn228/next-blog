import { prisma } from "../../config/db";

const createUser = (payload: any) => {
  console.log(payload);
  const createdUser = prisma.user.create({
    data: payload
  })
  return createdUser;
};

export const UserService = {
  createUser,
};
