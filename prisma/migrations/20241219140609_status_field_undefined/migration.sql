-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "dewormingDate" TIMESTAMP(3),
ADD COLUMN     "dewormingExpiry" TIMESTAMP(3),
ADD COLUMN     "dewormingName" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "vaccineDate" TIMESTAMP(3),
ADD COLUMN     "vaccineExpiry" TIMESTAMP(3),
ADD COLUMN     "vaccineName" TEXT;
