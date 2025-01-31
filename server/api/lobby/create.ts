export const runtime = "server";

import { getPrismaClient } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const query = getQuery(event);

  try {
    const map = await prisma.map.findFirst().then((map) => ({
      connect: { id: map.id },
    }));

    const gameIdNumber = 1
    const game = await prisma.game.findFirst().then((game) => ({
      connect: { id: parseInt(gameIdNumber as string) },
    }));

    const userId = query.userId;

    if (!userId) {
      return { error: "ID de l'utilisateur non fourni." };
    }

    const user = await prisma.user.findFirst({ where: { id: parseInt(userId as string) } });

    if (!user) {
      return { error: "Utilisateur non trouvé." };
    }

    let gameSession = await prisma.gameSession.create({
      data: {
        Map: map,
        Game: game,
        User: {
          connect: { id: user.id },
        },
        code: Math.floor(1000 + Math.random() * 9000),
        status: 'waiting',
        rulesVersion: '1.0',
      },
    });

    return {
      gameSessionId: gameSession.id,
      status: gameSession.status,
      lobbyCode: gameSession.code,
      users: [user]
    };
  } catch (error) {
    console.error("Erreur lors de la création de la game session:", error);
    return { error: "Impossible de créer la game session." };
  }
});