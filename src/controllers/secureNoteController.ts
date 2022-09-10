import { Request, Response } from "express";

import {
  createSecureNoteService,
  deleteSecureNoteService,
  getSecureNoteService,
  getUserSecureNotesService,
} from "../services/secureNoteService";
import { PayloadToken } from "../types/payload";
import { SecureNoteData, SecureNoteInsertData } from "../types/secureNote";

export async function createSecureNote(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;
  const { body }: Record<string, SecureNoteData> = res.locals;

  const secureNoteInsertData: SecureNoteInsertData = {
    ...body,
    userId: user.id,
  };

  await createSecureNoteService(secureNoteInsertData);

  return res.status(201).send({ message: "Credential created" });
}

export async function getUserSecureNotes(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const userNotes = await getUserSecureNotesService(user.email);

  return res.status(200).send({ userNotes });
}

export async function getSecureNote(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  const secureNote = await getSecureNoteService(Number(id), user.email);

  return res.status(200).send({ secureNote });
}

export async function deleteSecureNote(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  await deleteSecureNoteService(Number(id), user.email);

  return res.status(200).send({ message: `Secure note deleted` });
}
