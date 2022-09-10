import { Request, Response } from "express";
import {
  createCardService,
  deleteCardService,
  getCardService,
  getUserCardsService,
} from "../services/cardService";
import { CardData, CardInsertData } from "../types/card";

import { PayloadToken } from "../types/payload";

export async function createCard(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;
  const { body }: Record<string, CardData> = res.locals;

  const cardInsertData: CardInsertData = {
    ...body,
    userId: user.id,
  };

  await createCardService(cardInsertData);

  return res.status(201).send({ message: "Card created" });
}

export async function getUserCards(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const cards = await getUserCardsService(user.email);

  return res.status(200).send({ cards });
}

export async function getCard(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  const card = await getCardService(Number(id), user.email);

  return res.status(200).send({ card });
}

export async function deleteCard(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  await deleteCardService(Number(id), user.email);

  return res.status(200).send({ message: `Card deleted` });
}
