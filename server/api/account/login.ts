import { defineEventHandler, createError } from 'h3';
import { getPrismaClient } from '~/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const runtime = 'server';

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const { email, password } = await readBody(event);

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw createError({ statusCode: 400, statusMessage: 'Utilisateur non trouvé' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw createError({ statusCode: 400, statusMessage: 'Mot de passe incorrect' });

  const token = jwt.sign({ id: user.id, username: user.username }, 'votre_secret', { expiresIn: '1h' });
  return { token };
});
