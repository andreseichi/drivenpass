/*
  Warnings:

  - The values [CREDIT,DEBIT,BOTH] on the enum `cardType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "cardType_new" AS ENUM ('credit', 'debit', 'both');
ALTER TABLE "Cards" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Cards" ALTER COLUMN "type" TYPE "cardType_new" USING ("type"::text::"cardType_new");
ALTER TYPE "cardType" RENAME TO "cardType_old";
ALTER TYPE "cardType_new" RENAME TO "cardType";
DROP TYPE "cardType_old";
ALTER TABLE "Cards" ALTER COLUMN "type" SET DEFAULT 'credit';
COMMIT;

-- AlterTable
ALTER TABLE "Cards" ALTER COLUMN "type" SET DEFAULT 'credit';
