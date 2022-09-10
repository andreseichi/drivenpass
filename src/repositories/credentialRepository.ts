import { prisma } from "../database/prisma";
import { CredentialInsertData } from "../types/credential";

export async function insert(credential: CredentialInsertData) {
  const result = await prisma.credentials
    .create({
      data: credential,
    })
    .catch((err) => {
      if (err.code === "P2002") {
        return null;
      }
    });

  return result;
}
