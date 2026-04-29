-- CreateTable
CREATE TABLE "animal_calf_loss_history" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "animalId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "previousStatus" TEXT,
    "newStatus" TEXT NOT NULL,
    "expectedDueDate" TIMESTAMP(3),
    "lossDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "fatherType" TEXT NOT NULL,
    "fatherAnimalId" TEXT,
    "externalBullId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "animal_calf_loss_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "animal_calf_loss_history_animalId_lossDate_idx" ON "animal_calf_loss_history"("animalId", "lossDate");

-- CreateIndex
CREATE INDEX "animal_calf_loss_history_ownerId_createdAt_idx" ON "animal_calf_loss_history"("ownerId", "createdAt");

-- AddForeignKey
ALTER TABLE "animal_calf_loss_history" ADD CONSTRAINT "animal_calf_loss_history_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal_calf_loss_history" ADD CONSTRAINT "animal_calf_loss_history_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal_calf_loss_history" ADD CONSTRAINT "animal_calf_loss_history_fatherAnimalId_fkey" FOREIGN KEY ("fatherAnimalId") REFERENCES "Animal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal_calf_loss_history" ADD CONSTRAINT "animal_calf_loss_history_externalBullId_fkey" FOREIGN KEY ("externalBullId") REFERENCES "ExternalBull"("id") ON DELETE SET NULL ON UPDATE CASCADE;
