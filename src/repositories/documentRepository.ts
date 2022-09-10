import { prisma } from "../database/prisma";
import { DocumentInsertData } from "../types/document";

export async function insert(document: DocumentInsertData) {
  const result = await prisma.documents
    .create({
      data: document,
    })
    .catch((err) => {
      if (err.code === "P2002") {
        return null;
      }
    });

  return result;
}

export async function findByEmail(email: string) {
  const result = await prisma.documents.findMany({
    where: {
      User: {
        email,
      },
    },
  });

  return result;
}

export async function findById(id: number, email: string) {
  const result = await prisma.documents
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
    .then((document) => {
      if (document?.User?.email === email) {
        return document;
      }
      return null;
    });

  return result;
}

export async function remove(id: number, email: string) {
  const result = await prisma.documents
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
    .then((document) => {
      if (document?.User?.email === email) {
        return prisma.documents.delete({
          where: {
            id,
          },
        });
      }
      return null;
    });

  return result;
}
