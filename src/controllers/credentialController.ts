import { Request, Response } from "express";
import {
  createCredentialService,
  deleteCredentialService,
  getCredentialService,
  getUserCredentialsService,
} from "../services/credentialService";
import { CredentialData, CredentialInsertData } from "../types/credential";
import { PayloadToken } from "../types/payload";

export async function createCredential(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;
  const { body }: Record<string, CredentialData> = res.locals;

  const credentialInsertData: CredentialInsertData = {
    ...body,
    userId: user.id,
  };

  await createCredentialService(credentialInsertData);

  return res.status(201).send({ message: "Credential created" });
}

export async function getUserCredentials(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const credentials = await getUserCredentialsService(user.email);

  return res.status(200).send({ credentials });
}

export async function getCredential(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  const credential = await getCredentialService(Number(id), user.email);

  return res.status(200).send({ credential });
}

export async function deleteCredential(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  await deleteCredentialService(Number(id), user.email);

  return res.status(200).send({ message: `Credential deleted` });
}
