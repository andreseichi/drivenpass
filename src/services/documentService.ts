import {
  findByEmail,
  findById,
  insert,
  remove,
} from "../repositories/documentRepository";
import { DocumentInsertData } from "../types/document";

export async function createDocumentService(documentData: DocumentInsertData) {
  const result = await insert(documentData);
  if (!result) {
    throw {
      type: "CONFLICT",
      message: "Document title already exists for the user",
    };
  }
}

export async function getUserDocumentsService(email: string) {
  const documents = await findByEmail(email);

  const documentsData = documents.map((document) => {
    const {
      id,
      type,
      username,
      emitionDate,
      validate,
      number,
      emiter,
      createdAt,
    } = document;
    return {
      id,
      type,
      username,
      emitionDate,
      validate,
      number,
      emiter,
      createdAt,
    };
  });

  return documentsData;
}

export async function getDocumentService(id: number, email: string) {
  const document = await findById(id, email);
  if (!document) {
    throw {
      type: "NOT_FOUND",
      message: "Document not found",
    };
  }

  const documentData = {
    id: document.id,
    type: document.type,
    username: document.username,
    emitionDate: document.emitionDate,
    validate: document.validate,
    number: document.number,
    emiter: document.emiter,
    createdAt: document.createdAt,
  };

  return documentData;
}

export async function deleteDocumentService(id: number, email: string) {
  const result = await remove(id, email);
  if (!result) {
    throw {
      type: "NOT_FOUND",
      message: "Document not found",
    };
  }
}
