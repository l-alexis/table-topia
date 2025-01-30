import { defineEventHandler, createError } from 'h3';
import { getPrismaClient } from '~/lib/prisma';
import bcrypt from 'bcrypt';

export const runtime = 'server';

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const { username, email, password } = await readBody(event);

  try {
    const now = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
      },
    });
    return { message: 'Utilisateur créé', user };
  } catch (error) {
    console.error('Erreur lors de la création de l utilisateur:', error);
    throw createError({
      statusCode: 400,
      statusMessage: 'Erreur lors de la création de l utilisateur',
    });
  }
});
