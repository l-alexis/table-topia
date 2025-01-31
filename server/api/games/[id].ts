export const runtime = 'server';

import { getPrismaClient } from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const { id } = event.context.params;

  try {
    const map = await prisma.map.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!map) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Map not found',
      });
    }

    return { map };
  } catch (error) {
    console.error('Error fetching map:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch map',
    });
  }
});
