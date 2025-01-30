export const runtime = 'server';

import { getPrismaClient } from '~/lib/prisma';

export default defineEventHandler(async () => {
  const prisma = getPrismaClient();

  try {
    const games = await prisma.game.findMany();
    return { games };
  } catch (error) {
    console.error('Error fetching games:', error);
    return { error: 'Failed to fetch games' };
  }
});
