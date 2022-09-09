import { Request, Response } from "express";

import { createUser } from "../services/authService";
import { UserInsertData } from "../types/users";

export async function signup(req: Request, res: Response) {
  const { body }: Record<string, UserInsertData> = res.locals;

  await createUser(body);

  return res.status(201).send({ message: "User created" });
}
