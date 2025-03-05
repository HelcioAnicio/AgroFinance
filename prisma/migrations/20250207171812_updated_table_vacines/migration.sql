/*
  Warnings:

  - Added the required column `expiryDate` to the `Vaccine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vaccine" ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL;
