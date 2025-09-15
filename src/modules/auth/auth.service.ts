import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const loginWithEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (password === user.password) {
    return user;
  } else {
    throw new Error("Password not match");
  }
};



export const AuthService = {
  loginWithEmailPassword,
};
