import type { Password, User } from "@prisma/client";
import { AppLoadContext } from "@remix-run/cloudflare";
import bcrypt from "bcryptjs";

import { getClient } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"], context: AppLoadContext) {
  const { DATABASE_URL} = context;
  return getClient(DATABASE_URL).user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"], context: AppLoadContext) {
  const { DATABASE_URL} = context;
  return getClient(DATABASE_URL).user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string, context: AppLoadContext) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { DATABASE_URL} = context;
  
  return getClient(DATABASE_URL).user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"], context: AppLoadContext) {
  const { DATABASE_URL} = context;
  return getClient(DATABASE_URL).user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
  context: AppLoadContext
) {
  const { DATABASE_URL} = context;
  const userWithPassword = await getClient(DATABASE_URL).user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
