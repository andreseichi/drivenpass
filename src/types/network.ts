import { Networks } from "@prisma/client";

export type NetworkData = Omit<
  Networks,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type NetworkInsertData = NetworkData & {
  userId: number;
};
