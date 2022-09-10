import { Request, Response } from "express";
import { createCredentialService } from "../services/credentialService";
import { CredentialData, CredentialInsertData } from "../types/credential";

export async function createCredential(req: Request, res: Response) {
  const payload = res.locals.payload;
  const { user } = payload;
  const { body }: Record<string, CredentialData> = res.locals;

  const credentialInsertData: CredentialInsertData = {
    ...body,
    userId: user.id,
  };

  await createCredentialService(credentialInsertData);

  return res.status(201).send({ message: "Credential created" });
}
