import { SecureNotes } from "@prisma/client";

export type SecureNoteData = Omit<
  SecureNotes,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type SecureNoteInsertData = SecureNoteData & {
  userId: number;
};
