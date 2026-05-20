import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const raw = json.userRegister ?? json.updateUser;
    console.log('userRegister: ', raw);

    if (!raw || typeof raw !== 'object') {
      return NextResponse.json(
        { message: 'Payload inválido' },
        { status: 400 }
      );
    }

    const allowed = [
      'name',
      'email',
      'cnpj',
      'password',
      'image',
      'farmName',
      'inviteToken',
    ] as const;

    type CreatePayloadOptional = Partial<{
      name: string;
      email: string;
      cnpj: string;
      password: string;
      image: string;
      farmName: string;
      inviteToken: string;
    }>;

    type CreatePayload = {
      name: string;
      email: string;
      cnpj?: string;
      password?: string;
      image?: string;
      farmName?: string;
      inviteToken?: string;
    };

    const partialPayload = allowed.reduce<CreatePayloadOptional>((acc, key) => {
      const val = (raw as Record<string, unknown>)[key];
      if (typeof val === 'string' && val !== '') acc[key] = val;
      return acc;
    }, {} as CreatePayloadOptional);

    if (!partialPayload.name || !partialPayload.email) {
      return NextResponse.json(
        { message: 'Campos obrigatórios ausentes: name e email' },
        { status: 400 }
      );
    }

    const createPayload: CreatePayload = {
      name: partialPayload.name!,
      email: partialPayload.email!,
      ...(partialPayload.cnpj ? { cnpj: partialPayload.cnpj } : {}),
      ...(partialPayload.password ? { password: partialPayload.password } : {}),
      ...(partialPayload.image ? { image: partialPayload.image } : {}),
    };

    console.log('createPayload:', createPayload);

    const trialEndsAt = new Date();

    const registerNewUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: createPayload.name,
          email: createPayload.email,
          ...(createPayload.cnpj ? { cnpj: createPayload.cnpj } : {}),
          ...(createPayload.password
            ? { password: createPayload.password }
            : {}),
          ...(createPayload.image ? { image: createPayload.image } : {}),
        },
      });

      const inviteToken = partialPayload.inviteToken;
      const invite = inviteToken
        ? await tx.farmInvite.findUnique({ where: { token: inviteToken } })
        : null;

      if (
        invite &&
        invite.status === 'PENDING' &&
        invite.email.toLowerCase() === user.email.toLowerCase() &&
        invite.expiresAt > new Date()
      ) {
        await tx.farmMembership.create({
          data: {
            farmId: invite.farmId,
            userId: user.id,
            role: invite.role,
          },
        });
        await tx.farmInvite.update({
          where: { id: invite.id },
          data: {
            status: 'ACCEPTED',
            acceptedById: user.id,
            acceptedAt: new Date(),
          },
        });
        return user;
      }

      const farm = await tx.farm.create({
        data: {
          name: partialPayload.farmName || `${user.name} Fazenda`,
          ownerUserId: user.id,
          trialEndsAt,
        },
      });

      await tx.farmMembership.create({
        data: {
          farmId: farm.id,
          userId: user.id,
          role: 'OWNER',
        },
      });

      return user;
    });

    return NextResponse.json(
      {
        message: 'Usuario cadastrado com sucesso',
        user: {
          id: registerNewUser.id,
          name: registerNewUser.name,
          email: registerNewUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Erro ao cadastrar usuario:', error);

    // tratar erro de campo único (e-mail/cnpj duplicado)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error as Prisma.PrismaClientKnownRequestError).code === 'P2002'
    ) {
      return NextResponse.json(
        { message: 'Campo único duplicado (e-mail ou cnpj já cadastrado)' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Erro ao cadastrar usuario', error: String(error) },
      { status: 500 }
    );
  }
}
