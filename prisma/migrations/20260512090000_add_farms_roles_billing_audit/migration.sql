-- Multi-tenant base: additive migration with backfill from the current User-owned data.

CREATE TYPE "FarmRole" AS ENUM ('OWNER', 'EMPLOYEE', 'CAREGIVER_VETERINARIAN', 'FINANCIAL');
CREATE TYPE "FarmInviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REVOKED', 'EXPIRED');
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'INCOMPLETE');

CREATE TABLE "Farm" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "trialStartedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trialEndsAt" TIMESTAMP(3) NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'TRIALING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FarmMembership" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "farmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "FarmRole" NOT NULL DEFAULT 'OWNER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FarmMembership_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FarmInvite" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "farmId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "FarmRole" NOT NULL,
    "token" TEXT NOT NULL,
    "status" "FarmInviteStatus" NOT NULL DEFAULT 'PENDING',
    "invitedById" TEXT NOT NULL,
    "acceptedById" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FarmInvite_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "farmId" TEXT NOT NULL,
    "actorUserId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "before" JSONB,
    "after" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Animal" ADD COLUMN "farmId" TEXT;
ALTER TABLE "ExternalBull" ADD COLUMN "farmId" TEXT;
ALTER TABLE "transactions" ADD COLUMN "farmId" TEXT;

CREATE UNIQUE INDEX "FarmMembership_farmId_userId_key" ON "FarmMembership"("farmId", "userId");
CREATE UNIQUE INDEX "FarmInvite_token_key" ON "FarmInvite"("token");
CREATE INDEX "Farm_ownerUserId_idx" ON "Farm"("ownerUserId");
CREATE INDEX "FarmMembership_userId_idx" ON "FarmMembership"("userId");
CREATE INDEX "FarmInvite_farmId_status_idx" ON "FarmInvite"("farmId", "status");
CREATE INDEX "FarmInvite_email_idx" ON "FarmInvite"("email");
CREATE INDEX "AuditLog_farmId_createdAt_idx" ON "AuditLog"("farmId", "createdAt");
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");
CREATE INDEX "Animal_farmId_idx" ON "Animal"("farmId");
CREATE INDEX "ExternalBull_farmId_idx" ON "ExternalBull"("farmId");
CREATE INDEX "transactions_farm_id_idx" ON "transactions"("farmId");

ALTER TABLE "FarmMembership" ADD CONSTRAINT "FarmMembership_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FarmMembership" ADD CONSTRAINT "FarmMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FarmInvite" ADD CONSTRAINT "FarmInvite_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FarmInvite" ADD CONSTRAINT "FarmInvite_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ExternalBull" ADD CONSTRAINT "ExternalBull_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "Farm" ("id", "name", "ownerUserId", "trialStartedAt", "trialEndsAt", "createdAt", "updatedAt")
SELECT gen_random_uuid(), COALESCE(NULLIF("name", ''), 'Minha Fazenda'), "id", "createdAt", "createdAt" + INTERVAL '30 days', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "User" u
WHERE NOT EXISTS (
  SELECT 1 FROM "Farm" f WHERE f."ownerUserId" = u."id"
);

INSERT INTO "FarmMembership" ("id", "farmId", "userId", "role", "createdAt", "updatedAt")
SELECT gen_random_uuid(), f."id", f."ownerUserId", 'OWNER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "Farm" f
WHERE NOT EXISTS (
  SELECT 1 FROM "FarmMembership" fm WHERE fm."farmId" = f."id" AND fm."userId" = f."ownerUserId"
);

UPDATE "Animal" a
SET "farmId" = fm."farmId"
FROM "FarmMembership" fm
WHERE a."ownerId" = fm."userId" AND fm."role" = 'OWNER' AND a."farmId" IS NULL;

UPDATE "ExternalBull" eb
SET "farmId" = fm."farmId"
FROM "FarmMembership" fm
WHERE eb."ownerId" = fm."userId" AND fm."role" = 'OWNER' AND eb."farmId" IS NULL;

UPDATE "transactions" t
SET "farmId" = fm."farmId"
FROM "FarmMembership" fm
WHERE t."userId" = fm."userId" AND fm."role" = 'OWNER' AND t."farmId" IS NULL;
