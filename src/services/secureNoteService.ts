import {
  findByEmail,
  findById,
  insert,
  remove,
} from "../repositories/secureNoteRepository";

import { SecureNoteInsertData } from "../types/secureNote";

export async function createSecureNoteService(
  secureNoteData: SecureNoteInsertData
) {
  const result = await insert(secureNoteData);
  if (!result) {
    throw {
      type: "CONFLICT",
      message: "Title of secure note already exists for the user",
    };
  }
}

export async function getUserSecureNotesService(email: string) {
  const secureNotes = await findByEmail(email);

  const secureNotesData = secureNotes.map((secureNote) => {
    const { id, title, note, createdAt } = secureNote;

    return { id, title, note, createdAt };
  });

  return secureNotesData;
}

export async function getSecureNoteService(id: number, email: string) {
  const secureNote = await findById(id, email);
  if (!secureNote) {
    throw {
      type: "NOT_FOUND",
      message: "Secure note not found",
    };
  }

  const secureNoteData = {
    id: secureNote.id,
    title: secureNote.title,
    note: secureNote.note,
    createdAt: secureNote.createdAt,
  };

  return secureNoteData;
}

export async function deleteSecureNoteService(id: number, email: string) {
  const result = await remove(id, email);
  if (!result) {
    throw {
      type: "NOT_FOUND",
      message: "Secure note not found",
    };
  }
}
