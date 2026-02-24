DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'WeightRecordType') THEN
    CREATE TYPE "WeightRecordType" AS ENUM ('PN', 'PS', 'PD', 'PA', 'OTHER');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "AnimalWeightHistory" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "animalId" TEXT NOT NULL,
  "weight" DOUBLE PRECISION NOT NULL,
  "recordType" "WeightRecordType" NOT NULL DEFAULT 'OTHER',
  "measuredAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AnimalWeightHistory_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "AnimalWeightHistory_animalId_fkey"
    FOREIGN KEY ("animalId")
    REFERENCES "Animal"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "AnimalWeightHistory_animalId_measuredAt_idx"
  ON "AnimalWeightHistory"("animalId", "measuredAt");

INSERT INTO "AnimalWeightHistory" (
  "id",
  "animalId",
  "weight",
  "recordType",
  "measuredAt",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid()::text,
  a."id",
  a."weight",
  'OTHER'::"WeightRecordType",
  COALESCE(a."updatedAt", a."createdAt", CURRENT_TIMESTAMP),
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Animal" a
WHERE NOT EXISTS (
  SELECT 1
  FROM "AnimalWeightHistory" h
  WHERE h."animalId" = a."id"
);
