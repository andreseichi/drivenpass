import { prisma } from "../database/prisma";
import { SecureNoteInsertData } from "../types/secureNote";

export async function insert(secureNote: SecureNoteInsertData) {
  const result = await prisma.secureNotes
    .create({
      data: secureNote,
    })
    .catch((err) => {
      if (err.code === "P2002") {
        return null;
      }
    });

  return result;
}

export async function findByEmail(email: string) {
  const result = await prisma.secureNotes.findMany({
    where: {
      User: {
        email,
      },
    },
  });

  return result;
}

export async function findById(id: number, email: string) {
  const result = await prisma.secureNotes
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
    .then((secureNote) => {
      if (secureNote?.User?.email === email) {
        return secureNote;
      }
      return null;
    });

  return result;
}

export async function remove(id: number, email: string) {
  const result = await prisma.secureNotes
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
    .then((secureNote) => {
      if (secureNote?.User?.email === email) {
        return prisma.secureNotes.delete({
          where: {
            id,
          },
        });
      }
      return null;
    });

  return result;
}
