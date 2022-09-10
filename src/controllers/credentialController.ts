import { Request, Response } from "express";

export async function createCredential(req: Request, res: Response) {
  const payload = res.locals.payload;

  const { user } = payload;

  console.log(user);

  return res.status(200).send({ message: "ok" });
}
