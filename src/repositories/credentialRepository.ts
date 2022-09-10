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

export async function findByEmail(email: string) {
  const result = await prisma.credentials.findMany({
    where: {
      User: {
        email,
      },
    },
  });

  return result;
}

export async function findById(id: number, email: string) {
  const result = await prisma.credentials
    .findUnique({
      include: {
        User: {
          select: {
            email: true,
          },
        },
      },
      where: {
        id,
      },
    })
    .then((credential) => {
      if (credential?.User?.email === email) {
        return credential;
      }
      return null;
    });

  return result;
}
