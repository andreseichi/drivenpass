import { Request, Response } from "express";
import {
  createDocumentService,
  deleteDocumentService,
  getDocumentService,
  getUserDocumentsService,
} from "../services/documentService";
import { DocumentData, DocumentInsertData } from "../types/document";

import { PayloadToken } from "../types/payload";

export async function createDocument(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;
  const { body }: Record<string, DocumentData> = res.locals;

  const documentInsertData: DocumentInsertData = {
    ...body,
    userId: user.id,
  };

  await createDocumentService(documentInsertData);

  return res.status(201).send({ message: "Document created" });
}

export async function getUserDocuments(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const documents = await getUserDocumentsService(user.email);

  return res.status(200).send({ documents });
}

export async function getDocument(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  const document = await getDocumentService(Number(id), user.email);

  return res.status(200).send({ document });
}

export async function deleteDocument(req: Request, res: Response) {
  const payload: PayloadToken = res.locals.payload;
  const { user } = payload;

  const { id } = req.params;

  await deleteDocumentService(Number(id), user.email);

  return res.status(200).send({ message: `Document deleted` });
}
