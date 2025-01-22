/*
  Warnings:

  - Made the column `category` on table `Animal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DEFAULT '',
ALTER COLUMN "category" SET DATA TYPE TEXT;
