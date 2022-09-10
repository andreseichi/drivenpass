import { Documents } from "@prisma/client";

export type DocumentData = Omit<
  Documents,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type DocumentInsertData = DocumentData & {
  userId: number;
};
