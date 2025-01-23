/*
  Warnings:

  - A unique constraint covering the columns `[manualId,ownerId]` on the table `Animal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "manualId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Animal_manualId_ownerId_key" ON "Animal"("manualId", "ownerId");
