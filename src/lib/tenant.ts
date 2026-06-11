import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import type { FarmRole, Prisma } from '@prisma/client';

export type FarmPermission =
  | 'manage_farm'
  | 'manage_team'
  | 'manage_animals'
  | 'view_animals'
  | 'manage_finance'
  | 'view_finance';

const ROLE_PERMISSIONS: Record<FarmRole, FarmPermission[]> = {
  OWNER: [
    'manage_farm',
    'manage_team',
    'manage_animals',
    'view_animals',
    'manage_finance',
    'view_finance',
  ],
  EMPLOYEE: ['manage_animals', 'view_animals'],
  CAREGIVER_VETERINARIAN: ['manage_animals', 'view_animals'],
  FINANCIAL: ['manage_finance', 'view_finance'],
};

export function hasFarmPermission(
  role: FarmRole | null | undefined,
  permission: FarmPermission
) {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export async function getCurrentUserWithFarmContext() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await (prisma.user.findUnique as any)({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      cnpj: true,
      activeFarmId: true, // added in schema — run `prisma generate` to refresh types
      farmMemberships: {
        orderBy: { createdAt: 'asc' },
        include: { farm: true },
      },
    },
  }) as {
    id: string;
    email: string;
    name: string;
    cnpj: string | null;
    activeFarmId: string | null;
    farmMemberships: Array<{
      id: string;
      farmId: string;
      userId: string;
      role: import('@prisma/client').FarmRole;
      createdAt: Date;
      updatedAt: Date;
      farm: import('@prisma/client').Farm;
    }>;
  } | null;

  if (!user) return null;

  // Prefer the explicitly chosen active farm; fall back to the oldest membership
  const membership =
    (user.activeFarmId
      ? user.farmMemberships.find((m) => m.farmId === user.activeFarmId)
      : null) ??
    user.farmMemberships[0] ??
    null;

  return {
    user: { id: user.id, email: user.email, name: user.name, cnpj: user.cnpj },
    farm: membership?.farm ?? null,
    membership,
    role: membership?.role ?? null,
    allMemberships: user.farmMemberships,
  };
}

export async function getCurrentFarmContext() {
  const userContext = await getCurrentUserWithFarmContext();
  const membership = userContext?.membership ?? null;
  if (!userContext || !membership || !userContext.farm) return null;

  return {
    user: userContext.user,
    farm: userContext.farm,
    membership,
    role: membership.role,
  };
}

export async function requireFarmContext(permission?: FarmPermission) {
  const context = await getCurrentFarmContext();

  if (!context) {
    return { context: null, error: 'Unauthorized', status: 401 as const };
  }

  if (permission && !hasFarmPermission(context.role, permission)) {
    return { context: null, error: 'Forbidden', status: 403 as const };
  }

  return { context, error: null, status: null };
}

export async function createAuditLog(
  tx: Prisma.TransactionClient,
  input: {
    farmId: string;
    actorUserId?: string | null;
    action: string;
    entityType: string;
    entityId?: string | null;
    before?: Prisma.InputJsonValue | null;
    after?: Prisma.InputJsonValue | null;
    metadata?: Prisma.InputJsonValue | null;
  }
) {
  await tx.auditLog.create({
    data: {
      farmId: input.farmId,
      actorUserId: input.actorUserId ?? null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      before: input.before ?? undefined,
      after: input.after ?? undefined,
      metadata: input.metadata ?? undefined,
    },
  });
}

export function isFarmPastTrial(farm: {
  trialEndsAt: Date;
  subscriptionStatus: string;
  stripeSubscriptionId?: string | null;
}) {
  if (farm.subscriptionStatus === 'ACTIVE') return false;
  if (
    farm.subscriptionStatus === 'TRIALING' &&
    farm.stripeSubscriptionId &&
    farm.trialEndsAt.getTime() > Date.now()
  ) {
    return false;
  }
  return true;
}

export function canFarmAccessDashboard(farm: {
  trialEndsAt: Date;
  subscriptionStatus: string;
  stripeSubscriptionId?: string | null;
}) {
  if (farm.subscriptionStatus === 'ACTIVE') return true;
  if (
    farm.subscriptionStatus === 'TRIALING' &&
    farm.stripeSubscriptionId &&
    farm.trialEndsAt.getTime() > Date.now()
  ) {
    return true;
  }
  return false;
}
