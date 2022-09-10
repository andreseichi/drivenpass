import { prisma } from "../database/prisma";
import { NetworkInsertData } from "../types/network";

export async function insert(network: NetworkInsertData) {
  const result = await prisma.networks
    .create({
      data: network,
    })
    .catch((err) => {
      if (err.code === "P2002") {
        return null;
      }
    });

  return result;
}

export async function findByEmail(email: string) {
  const result = await prisma.networks.findMany({
    where: {
      User: {
        email,
      },
    },
  });

  return result;
}

export async function findById(id: number, email: string) {
  const result = await prisma.networks
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
    .then((network) => {
      if (network?.User?.email === email) {
        return network;
      }
      return null;
    });

  return result;
}

export async function remove(id: number, email: string) {
  const result = await prisma.networks
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
    .then((network) => {
      if (network?.User?.email === email) {
        return prisma.networks.delete({
          where: {
            id,
          },
        });
      }
      return null;
    });

  return result;
}
