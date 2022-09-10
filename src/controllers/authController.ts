import { Request, Response } from "express";

import { createUser, signinService } from "../services/authService";
import { UserInsertData } from "../types/users";

export async function signup(req: Request, res: Response) {
  const { body }: Record<string, UserInsertData> = res.locals;

  await createUser(body);

  return res.status(201).send({ message: "User created" });
}

export async function signin(req: Request, res: Response) {
  const { body }: Record<string, UserInsertData> = res.locals;

  const token = await signinService(body);

  return res.status(200).send({ token });
}
