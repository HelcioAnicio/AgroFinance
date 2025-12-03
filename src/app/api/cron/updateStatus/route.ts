import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export async function GET() {
  try {
    const limite = dayjs().subtract(40, 'day').toDate();
    console.log('limite: ', limite);

    const result = await prisma.animal.updateMany({
      where: {
        reproductiveStatus: 'pev',
      },
      data: {
        reproductiveStatus: 'empty',
      },
    });

    return Response.json({
      message: 'Status atualizados com sucesso',
      updated: result.count,
    });
  } catch (error) {
    return Response.json(
      { error: 'Erro ao executar o cron', details: error },
      { status: 500 }
    );
  }
}
