/*
  Warnings:

  - You are about to alter the column `category` on the `Animal` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "category" SET DATA TYPE VARCHAR(255);
