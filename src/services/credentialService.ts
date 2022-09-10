import { hashSync } from "bcrypt";

import { insert } from "../repositories/credentialRepository";
import { CredentialInsertData } from "../types/credential";

export async function createCredentialService(
  credentialData: CredentialInsertData
) {
  const credentialDataInsert = {
    ...credentialData,
    password: hashSync(credentialData.password, 10),
  };

  const result = await insert(credentialDataInsert);
  if (!result) {
    throw {
      type: "CONFLICT",
      message: "Credential already exists for the user",
    };
  }
}
