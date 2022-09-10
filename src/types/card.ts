import { Cards } from "@prisma/client";

export type CardData = Omit<Cards, "id" | "userId" | "createdAt" | "updatedAt">;

export type CardInsertData = CardData & {
  userId: number;
};
