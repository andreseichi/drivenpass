import { Credentials } from "@prisma/client";

export type CredentialData = Omit<
  Credentials,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type CredentialInsertData = CredentialData & {
  userId: number;
};
