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

export async function getCurrentFarmContext() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      farmMemberships: {
        orderBy: { createdAt: 'asc' },
        include: { farm: true },
      },
    },
  });

  const membership = user?.farmMemberships[0] ?? null;
  if (!user || !membership) return null;

  return {
    user: { id: user.id, email: user.email, name: user.name },
    farm: membership.farm,
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
  if (farm.subscriptionStatus === 'TRIALING' && farm.stripeSubscriptionId) return false;
  return farm.trialEndsAt.getTime() < Date.now();
}

export function canFarmAccessDashboard(farm: {
  trialEndsAt: Date;
  subscriptionStatus: string;
  stripeSubscriptionId?: string | null;
}) {
  if (farm.subscriptionStatus === 'ACTIVE') return true;
  if (farm.subscriptionStatus === 'TRIALING' && farm.stripeSubscriptionId) return true;
  if (farm.trialEndsAt.getTime() > Date.now()) return true;
  return false;
}
