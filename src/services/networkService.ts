import {
  findByEmail,
  findById,
  insert,
  remove,
} from "../repositories/networkRepository";
import { NetworkInsertData } from "../types/network";
import { decrypt, encrypt } from "../utils/hash";

export async function createNetworkService(networkData: NetworkInsertData) {
  const networkDataInsert = {
    ...networkData,
    password: encrypt(networkData.password),
  };

  const result = await insert(networkDataInsert);
  if (!result) {
    throw {
      type: "CONFLICT",
      message: "Network name already exists for the user",
    };
  }
}

export async function getUserNetworksService(email: string) {
  const networks = await findByEmail(email);

  const networksData = networks.map((network) => {
    const { id, title, name, password, createdAt } = network;
    const passwordDecrypted = decrypt(password);
    return { id, title, name, password: passwordDecrypted, createdAt };
  });

  return networksData;
}

export async function getNetworkService(id: number, email: string) {
  const network = await findById(id, email);
  if (!network) {
    throw {
      type: "NOT_FOUND",
      message: "Network not found",
    };
  }

  const passwordDecrypted = decrypt(network.password);
  const networkData = {
    id: network.id,
    title: network.title,
    name: network.name,
    password: passwordDecrypted,
    createdAt: network.createdAt,
  };

  return networkData;
}

export async function deleteNetworkService(id: number, email: string) {
  const result = await remove(id, email);
  if (!result) {
    throw {
      type: "NOT_FOUND",
      message: "Network not found",
    };
  }
}
