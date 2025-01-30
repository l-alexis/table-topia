export const runtime = 'server';

import { getPrismaClient } from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const { id } = event.context.params;

  try {
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!game) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Game not found',
      });
    }

    return { game };
  } catch (error) {
    console.error('Error fetching game:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch game',
    });
  }
});
