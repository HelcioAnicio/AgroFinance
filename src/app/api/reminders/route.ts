import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';
import { pushNotificationsNow } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = String(body.message ?? '').trim();
  const notifyAt = new Date(String(body.notifyAt ?? ''));
  // scope 'farm' avisa toda a equipe (comportamento original, usado pela
  // tela de manejo reprodutivo); 'me' cria um lembrete pessoal só para quem
  // criou (usado pela tela de notificações). Default 'farm' preserva o
  // comportamento de quem já chama essa rota sem informar o campo.
  const scope: 'me' | 'farm' = body.scope === 'me' ? 'me' : 'farm';
  const animalId = typeof body.animalId === 'string' ? body.animalId : null;

  // Lembrete pessoal não exige permissão de gestão — qualquer membro da
  // fazenda pode criar um lembrete só para si. Avisar a equipe inteira
  // continua exigindo manage_animals, igual antes.
  const { context, error, status } = await requireFarmContext(
    scope === 'farm' ? 'manage_animals' : undefined
  );
  if (!context) return NextResponse.json({ error }, { status });

  if (!message) {
    return NextResponse.json(
      { error: 'Informe a mensagem do lembrete.' },
      { status: 400 }
    );
  }
  if (isNaN(notifyAt.getTime())) {
    return NextResponse.json(
      { error: 'Informe uma data válida.' },
      { status: 400 }
    );
  }

  const targetUserIds =
    scope === 'farm'
      ? (
          await prisma.farmMembership.findMany({
            where: { farmId: context.farm.id },
            select: { userId: true },
          })
        ).map((m) => m.userId)
      : [context.user.id];

  const created = await prisma.notification.createManyAndReturn({
    data: targetUserIds.map((userId) => ({
      userId,
      message: `Lembrete: ${message}`,
      notifyAt,
      read: false,
      animalId,
    })),
  });

  // Dispara push imediato para lembretes que já valem agora — sem isso o
  // usuário só veria o lembrete no próximo envio em lote (cron diário).
  await pushNotificationsNow(created);

  return NextResponse.json(
    { message: 'Lembrete criado com sucesso.' },
    { status: 201 }
  );
}
