import { Request, Response } from "express";
import {
  createNetworkService,
  deleteNetworkService,
  getNetworkService,
  getUserNetworksService,
} from "../services/networkService";
import { NetworkData, NetworkInsertData } from "../types/network";

import { PayloadToken } from "../types/payload";

export async function createNetwork(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;
  const { body }: Record<string, NetworkData> = res.locals;

  const networkInsertData: NetworkInsertData = {
    ...body,
    userId: user.id,
  };

  await createNetworkService(networkInsertData);

  return res.status(201).send({ message: "Network created" });
}

export async function getUserNetworks(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const networks = await getUserNetworksService(user.email);

  return res.status(200).send({ networks });
}

export async function getNetwork(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  const network = await getNetworkService(Number(id), user.email);

  return res.status(200).send({ network });
}

export async function deleteNetwork(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  await deleteNetworkService(Number(id), user.email);

  return res.status(200).send({ message: `Network deleted` });
}
