import {
  findByEmail,
  findById,
  insert,
} from "../repositories/credentialRepository";
import { decrypt, encrypt } from "../utils/hash";

import { CredentialInsertData } from "../types/credential";

export async function createCredentialService(
  credentialData: CredentialInsertData
) {
  const credentialDataInsert = {
    ...credentialData,
    password: encrypt(credentialData.password),
  };

  const result = await insert(credentialDataInsert);
  if (!result) {
    throw {
      type: "CONFLICT",
      message: "Credential already exists for the user",
    };
  }
}

export async function getUserCredentialsService(email: string) {
  const credentials = await findByEmail(email);

  const credentialsData = credentials.map((credential) => {
    const { id, title, url, username, password } = credential;
    const passwordDecrypted = decrypt(password);
    return { id, title, url, username, password: passwordDecrypted };
  });

  return credentialsData;
}

export async function getCredentialService(id: number, email: string) {
  const credential = await findById(id, email);
  if (!credential) {
    throw {
      type: "NOT_FOUND",
      message: "Credential not found",
    };
  }

  const passwordDecrypted = decrypt(credential.password);
  const credentialData = {
    id: credential.id,
    title: credential.title,
    url: credential.url,
    username: credential.username,
    password: passwordDecrypted,
  };

  return credentialData;
}
