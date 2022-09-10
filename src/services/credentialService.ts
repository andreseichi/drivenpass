import { insert } from "../repositories/credentialRepository";
import { encrypt } from "../utils/hash";

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
