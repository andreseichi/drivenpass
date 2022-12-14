import { hashSync, compareSync } from "bcrypt";

import { findByEmail, insert } from "../repositories/authRepository";

import { UserInsertData } from "../types/users";
import { generateAccessToken } from "../utils/jwt";

export async function createUser(user: UserInsertData) {
  const userData = { ...user, password: hashSync(user.password, 10) };
  const result = await insert(userData);

  if (!result) {
    throw {
      type: "CONFLICT",
      message: "User already exists",
    };
  }
}

export async function signinService(user: UserInsertData) {
  const userDB = await findByEmail(user.email);

  if (!userDB) {
    throw {
      type: "UNAUTHORIZED",
      message: "email or password is incorrect",
    };
  }

  const isPasswordMatch = compareSync(user.password, userDB.password);
  if (!isPasswordMatch) {
    throw {
      type: "UNAUTHORIZED",
      message: "email or password is incorrect",
    };
  }

  const token = generateAccessToken({ id: userDB.id, email: userDB.email });
  return token;
}
