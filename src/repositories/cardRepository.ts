import { prisma } from "../database/prisma";
import { CardInsertData } from "../types/card";

export async function insert(card: CardInsertData) {
  const result = await prisma.cards
    .create({
      data: card,
    })
    .catch((err) => {
      if (err.code === "P2002") {
        return null;
      }
    });

  return result;
}

export async function findByEmail(email: string) {
  const result = await prisma.cards.findMany({
    where: {
      User: {
        email,
      },
    },
  });

  return result;
}

export async function findById(id: number, email: string) {
  const result = await prisma.cards
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
    .then((card) => {
      if (card?.User?.email === email) {
        return card;
      }
      return null;
    });

  return result;
}

export async function remove(id: number, email: string) {
  const result = await prisma.cards
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
    .then((card) => {
      if (card?.User?.email === email) {
        return prisma.cards.delete({
          where: {
            id,
          },
        });
      }
      return null;
    });

  return result;
}
