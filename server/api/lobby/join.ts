export const runtime = "server";

import { getPrismaClient } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const query = getQuery(event);
  const lobbyCode = query.lobbyCode;
  const userId = query.userId;

  if (!lobbyCode || !userId) {
    return { error: "ID du jeu ou ID de l'utilisateur non fourni." };
  }

  try {
    const gameSession = await prisma.gameSession.findFirst({
      where: { code: lobbyCode, status: 'waiting' },
    });

    if (!gameSession) {
      return { error: "GameSession non trouvée." };
    }


    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      return { error: "Utilisateur non trouvé." };
    }

    await prisma.player.create({
      data: {
        User: {
          connect: { id: user.id },
        },
        GameSession: {
          connect: { id: gameSession.id },
        },
      },
    });

    return { message: "Utilisateur ajouté au lobby avec succès." };
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur au lobby:", error);
    return { error: "Impossible d'ajouter l'utilisateur au lobby." };
  }
});
