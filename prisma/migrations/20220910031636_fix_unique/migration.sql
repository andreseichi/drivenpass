/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `SecureNotes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Cards_number_key";

-- DropIndex
DROP INDEX "Cards_title_key";

-- DropIndex
DROP INDEX "Credentials_title_key";

-- DropIndex
DROP INDEX "SecureNotes_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cards_userId_title_key" ON "Cards"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_userId_title_key" ON "Credentials"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "SecureNotes_userId_title_key" ON "SecureNotes"("userId", "title");
