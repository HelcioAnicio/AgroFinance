-- CreateTable
CREATE TABLE "animal_status_history" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "animalId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "previousStatus" TEXT,
    "newStatus" TEXT NOT NULL,
    "reason" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animal_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "animal_status_history_ownerId_year_month_idx" ON "animal_status_history"("ownerId", "year", "month");

-- CreateIndex
CREATE INDEX "animal_status_history_animalId_changedAt_idx" ON "animal_status_history"("animalId", "changedAt");

-- AddForeignKey
ALTER TABLE "animal_status_history" ADD CONSTRAINT "animal_status_history_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal_status_history" ADD CONSTRAINT "animal_status_history_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
